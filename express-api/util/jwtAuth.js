const jwt = require("jsonwebtoken");
const db = require("./db");

if (!process.env.API_JWT_SECRET || process.env.API_JWT_SECRET.length < 32) {
  throw new Error("API_JWT_SECRET은 32자 이상의 값으로 설정해야 합니다.");
}

const getAccessToken = (req) => {
  const authorization = req.header("Authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return null;
  }

  return authorization.slice("Bearer ".length);
};

const createAuthMiddleware = (database) => {
  return async (req, res, next) => {
    const accessToken = getAccessToken(req);

    if (!accessToken) {
      return res.status(401).json({
        message: "로그인이 필요한 서비스입니다.",
        redirect: "/member/login",
      });
    }

    let tokenInfo;

    try {
      tokenInfo = jwt.verify(accessToken, process.env.API_JWT_SECRET, {
        algorithms: ["HS256"],
        issuer: "electrip-nextjs",
        audience: "electrip-api",
      });
    } catch {
      return res.status(401).json({
        message: "액세스 토큰 검증 실패",
        redirect: "/member/login",
      });
    }

    const now = Math.floor(Date.now() / 1000);
    const clockSkewSeconds = 5;

    if (
      !Number.isSafeInteger(tokenInfo.userNo) ||
      !Number.isInteger(tokenInfo.iat) ||
      !Number.isInteger(tokenInfo.exp) ||
      tokenInfo.exp <= tokenInfo.iat ||
      tokenInfo.exp - tokenInfo.iat > 60 * 60 ||
      tokenInfo.iat > now + clockSkewSeconds ||
      tokenInfo.exp > now + 60 * 60 + clockSkewSeconds ||
      tokenInfo.sub !== String(tokenInfo.userNo)
    ) {
      return res.status(401).json({
        message: "액세스 토큰 형식이 올바르지 않습니다.",
        redirect: "/member/login",
      });
    }

    try {
      const user = await database.query(
        "SELECT id, is_staff FROM users WHERE id = $1 AND is_active = true",
        [tokenInfo.userNo]
      );

      if (!user.rows[0]) {
        return res.status(401).json({
          message: "비활성화되었거나 존재하지 않는 사용자입니다.",
          redirect: "/member/login",
        });
      }

      req.tokenInfo = {
        ...tokenInfo,
        userNo: user.rows[0].id,
        isStaff: user.rows[0].is_staff === true,
      };
      return next();
    } catch (error) {
      return next(error);
    }
  };
};

const adminMiddleware = (req, res, next) => {
  if (req.tokenInfo?.isStaff !== true) {
    return res.status(403).json({ message: "관리자 권한이 필요합니다." });
  }

  return next();
};

exports.authMiddleware = createAuthMiddleware(db);
exports.adminMiddleware = adminMiddleware;
exports.createAuthMiddleware = createAuthMiddleware;
