import NextAuth from "next-auth";
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import PostgresAdapter from "@/util/adapter";
import pool from "@/util/database";

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
          emailVerified: profile.response.emailVerified,
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
          image: profile.properties.profile_image,
          emailVerified: profile.kakao_account.is_email_verified,
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
          let sql = `select * from user_cred where user_id = $1 and user_pw = $2`;
          let user = await pool.query(sql, [
            credentials.user_id,
            credentials.user_pw,
          ]);

          // 아이디와 비밀번호가 일치하지 않으면 null 리턴
          if (!user.rows[0]) {
            return null;
          }

          return user.rows[0];
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
      if (user && profile) {
        token.user = {};
        token.user.id = user.id;
        token.user.type = "users";
      } else if (user) {
        token.user = {};
        token.user.user_no = user.user_no;
        token.user.type = "user_cred";
      }

      return token;
    },
    // 5. 유저 세션이 조회될 때 마다 실행되는 코드
    session: async ({ session, token }) => {
      session.user = token.user;
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
