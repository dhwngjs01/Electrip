const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const accessToken = req.header("Access-Token");

  if (accessToken == null) {
    return res.status(403).json({
      message: "로그인이 필요한 서비스입니다.",
      redirect: "/member/login",
    });
  }

  try {
    const tokenInfo = await new Promise((resolve, reject) => {
      jwt.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });

      req.tokenInfo = tokenInfo;
      next();
    });
  } catch (err) {
    console.log(err);
    res
      .status(403)
      .json({ message: "액세스 토큰 검증 실패", redirect: "/member/login" });
  }
};

exports.authMiddleware = authMiddleware;
