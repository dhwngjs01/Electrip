const test = require("node:test");
const assert = require("node:assert/strict");
const jwt = require("jsonwebtoken");

process.env.API_JWT_SECRET = "test-api-secret-with-sufficient-entropy";

const { createAuthMiddleware, adminMiddleware } = require("./jwtAuth");

function createResponse() {
  return {
    statusCode: 200,
    body: undefined,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
  };
}

test("authMiddleware accepts a valid HS256 bearer token for an active user", async () => {
  const token = jwt.sign({ userNo: 7 }, process.env.API_JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: "1h",
    issuer: "electrip-nextjs",
    audience: "electrip-api",
    subject: "7",
  });
  const req = {
    header(name) {
      return name === "Authorization" ? `Bearer ${token}` : undefined;
    },
  };
  const res = createResponse();
  const authMiddleware = createAuthMiddleware({
    async query() {
      return { rows: [{ id: 7, is_staff: false }] };
    },
  });
  let called = false;

  await authMiddleware(req, res, () => {
    called = true;
  });

  assert.equal(called, true);
  assert.equal(req.tokenInfo.userNo, 7);
});

test("authMiddleware rejects missing and invalid tokens", async () => {
  const authMiddleware = createAuthMiddleware({
    async query() {
      assert.fail("database must not be queried");
    },
  });

  for (const authorization of [undefined, "Bearer invalid-token"]) {
    const req = {
      header(name) {
        return name === "Authorization" ? authorization : undefined;
      },
    };
    const res = createResponse();

    await authMiddleware(req, res, () => assert.fail("next must not be called"));

    assert.equal(res.statusCode, 401);
  }
});

test("authMiddleware rejects users revoked after token issuance", async () => {
  const token = jwt.sign({ userNo: 7 }, process.env.API_JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: "1h",
    issuer: "electrip-nextjs",
    audience: "electrip-api",
    subject: "7",
  });
  const req = {
    header(name) {
      return name === "Authorization" ? `Bearer ${token}` : undefined;
    },
  };
  const res = createResponse();
  const authMiddleware = createAuthMiddleware({
    async query() {
      return { rows: [] };
    },
  });

  await authMiddleware(req, res, () => assert.fail("next must not be called"));

  assert.equal(res.statusCode, 401);
});

test("authMiddleware rejects tokens outside the one-hour API contract", async () => {
  const token = jwt.sign({ userNo: 7 }, process.env.API_JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: "2h",
    issuer: "electrip-nextjs",
    audience: "electrip-api",
    subject: "7",
  });
  const req = {
    header(name) {
      return name === "Authorization" ? `Bearer ${token}` : undefined;
    },
  };
  const res = createResponse();
  const authMiddleware = createAuthMiddleware({
    async query() {
      assert.fail("database must not be queried");
    },
  });

  await authMiddleware(req, res, () => assert.fail("next must not be called"));

  assert.equal(res.statusCode, 401);
});

test("authMiddleware rejects future-dated tokens", async () => {
  const futureIssuedAt = Math.floor(Date.now() / 1000) + 24 * 60 * 60;
  const token = jwt.sign(
    { userNo: 7, iat: futureIssuedAt },
    process.env.API_JWT_SECRET,
    {
      algorithm: "HS256",
      expiresIn: "1h",
      issuer: "electrip-nextjs",
      audience: "electrip-api",
      subject: "7",
    }
  );
  const req = {
    header(name) {
      return name === "Authorization" ? `Bearer ${token}` : undefined;
    },
  };
  const res = createResponse();
  const authMiddleware = createAuthMiddleware({
    async query() {
      assert.fail("database must not be queried");
    },
  });

  await authMiddleware(req, res, () => assert.fail("next must not be called"));

  assert.equal(res.statusCode, 401);
});

test("adminMiddleware requires an explicit staff claim", () => {
  const deniedResponse = createResponse();
  adminMiddleware(
    { tokenInfo: { userNo: 7, isStaff: false } },
    deniedResponse,
    () => assert.fail("next must not be called")
  );
  assert.equal(deniedResponse.statusCode, 403);

  let called = false;
  adminMiddleware({ tokenInfo: { userNo: 1, isStaff: true } }, createResponse(), () => {
    called = true;
  });
  assert.equal(called, true);
});
