const db = require("../../util/db");
const Axios = require("axios");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
  const user_id = req.body.user_id;
  const user_pw = req.body.user_pw;

  var sql = "select * from users where user_id = $1";
  const findUser = await db.query(sql, [user_id]);

  if (findUser.rowCount) {
    const user_pw_compare = await bcrypt.compare(
      user_pw,
      findUser.rows[0].user_pw
    );

    if (!user_pw_compare)
      return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });

    const accessToken = jwt.sign(
      {
        user_no: findUser.rows[0].user_no,
      },
      process.env.JWT_SECRET,
      { expiresIn: 60 * 60 }
    );

    const refreshToken = jwt.sign(
      { user_no: findUser.rows[0].user_no },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "1d" }
    );

    console.log(req.headers);

    return res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
      })
      .status(200)
      .json({ success: true, accessToken: accessToken });
  } else {
    return res.status(401).json({
      message: "입력하신 아이디는 존재하지 않습니다.",
    });
  }
};

exports.kakaoLogin = async (req, res) => {
  const code = req.query.code; // 인가 코드

  try {
    // 토큰 발급 받기
    const authToken = await Axios.post(
      "https://kauth.kakao.com/oauth/token",
      {},
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        params: {
          grant_type: "authorization_code",
          client_id: process.env.KAKAO_CLIENT_ID,
          client_secret: process.env.KAKAO_CLIENT_SECRET,
          code,
          redirect_uri: "http://localhost:8000/api/auth/kakao",
        },
      }
    );

    tokenType = authToken.data.token_type; // 토큰 타입
    accessToken = authToken.data.access_token; // 액세스 토큰
    refreshToken = authToken.data.refresh_token; // 리프레시 토큰
    expiresIn = authToken.data.expires_in; // 토큰 만료 시간
    refreshTokenExpiresIn = authToken.data.refresh_token_expires_in; // 리프레시 토큰 만료 시간
    scope = authToken.data.scope; // 토큰 권한 범위

    const authInfo = await Axios.post(
      "https://kapi.kakao.com/v2/user/me",
      {},
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const result = await db.query(
      `select * from user where snsPrimaryKey=? and snsType="kakao"`,
      [authInfo.data.id]
    )[0];

    if (result) {
      req.session.userId = result.id;
      req.session.save();
      req.redirect("http://localhost:3000");

      return;
    } else {
      res.redirect(
        "http://localhost:3000/member/join?token=" +
          (data.properties && data.properties.nickname
            ? "&name=" + encodeURIComponent(data.properties.nickname)
            : "")
      );
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "로그인 오류" });
  }
};
