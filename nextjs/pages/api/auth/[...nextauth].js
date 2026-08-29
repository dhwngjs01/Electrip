import NextAuth from "next-auth";
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import PostgresAdapter from "@/util/adapter";
import pool from "@/util/database";
import {
  consumeRateLimit,
  getClientAddress,
} from "@/util/rateLimit";

const INVALID_PASSWORD_HASH =
  "$2b$12$iVZfmI7bgTpo9wELjIHSxOT.xuQMlN71uxa4fsduRTasH1ou5hdxi";

export const authOptions = {
  providers: [
    NaverProvider({
      name: "naver",
      clientId: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.response.id,
          name: profile.response.name,
          email: profile.response.email,
          mobile: profile.response.mobile,
        };
      },
    }),
    KakaoProvider({
      name: "kakao",
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.id,
          name: profile.properties.nickname,
          email: profile.kakao_account.email,
        };
      },
    }),
    CredentialsProvider({
      // 1. 로그인페이지 폼 자동생성해주는 코드
      name: "credentials",
      // 2. 로그인요청시 실행되는코드
      // 직접 DB에서 아이디,비번 비교하고
      // 아이디,비번 맞으면 return 결과, 틀리면 return null 해야함
      async authorize(credentials, req) {
        try {
          if (
            typeof credentials?.user_id !== "string" ||
            typeof credentials?.user_pw !== "string" ||
            bcrypt.truncates(credentials.user_pw)
          ) {
            return null;
          }

          const normalizedEmail = credentials.user_id.trim().toLowerCase();
          const clientAddress = getClientAddress(req);
          if (!clientAddress) {
            return null;
          }

          const [accountAllowed, clientAllowed] = await Promise.all([
            consumeRateLimit(pool, {
              namespace: "login-account",
              identity: normalizedEmail,
              limit: 20,
              windowSeconds: 15 * 60,
            }),
            consumeRateLimit(pool, {
              namespace: "login-client",
              identity: clientAddress,
              limit: 100,
              windowSeconds: 15 * 60,
            }),
          ]);

          if (!accountAllowed || !clientAllowed) {
            return null;
          }

          const sql = `SELECT * FROM users WHERE email = $1 AND is_active = true`;
          const user = await pool.query(sql, [normalizedEmail]);
          const account = user.rows[0];
          const passwordMatches = await bcrypt.compare(
            credentials.user_pw,
            account?.password || INVALID_PASSWORD_HASH
          );

          if (!account || !passwordMatches) {
            return null;
          }

          return account;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/member/login",
  },
  // 3. jwt 써놔야 잘됩니다 + jwt 만료일설정
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30일
  },
  callbacks: {
    // 4. jwt 만들 때 실행되는 코드
    // user변수는 DB의 유저정보담겨있고 token.user에 뭐 저장하면 jwt에 들어갑니다.
    jwt: async ({ token, user, profile }) => {
      if (user) {
        token.user = {};
        token.user.user_no = user.id;
        token.user.user_name = user.name;
        token.user.user_email = user.email;
        token.user.user_phone = user.mobile;
        token.user.user_is_staff = user.is_staff;
      }

      if (token.user) {
        const currentUser = await pool.query(
          `SELECT id, name, email, mobile, is_staff
           FROM users
           WHERE id = $1 AND is_active = true`,
          [token.user.user_no]
        );

        if (!currentUser.rows[0]) {
          token.user = null;
          token.apiAccessToken = null;
          return token;
        }

        token.user = {
          user_no: currentUser.rows[0].id,
          user_name: currentUser.rows[0].name,
          user_email: currentUser.rows[0].email,
          user_phone: currentUser.rows[0].mobile,
          user_is_staff: currentUser.rows[0].is_staff,
        };

        if (
          !process.env.API_JWT_SECRET ||
          process.env.API_JWT_SECRET.length < 32
        ) {
          throw new Error(
            "API_JWT_SECRET은 32자 이상의 값으로 설정해야 합니다."
          );
        }

        token.apiAccessToken = jwt.sign(
          {
            userNo: token.user.user_no,
          },
          process.env.API_JWT_SECRET,
          {
            algorithm: "HS256",
            expiresIn: "1h",
            subject: String(token.user.user_no),
            issuer: "electrip-nextjs",
            audience: "electrip-api",
          }
        );
      }

      return token;
    },
    // 5. 유저 세션이 조회될 때 마다 실행되는 코드
    session: async ({ session, token }) => {
      if (!token.user) {
        return null;
      }

      session.user = token.user;
      session.apiAccessToken = token.apiAccessToken;
      return session;
    },
    redirect: async ({ url, baseUrl }) => {
      return baseUrl;
    },
  },
  secret: process.env.JWT_SECRET,
  adapter: PostgresAdapter(pool),
};

export default NextAuth(authOptions);
