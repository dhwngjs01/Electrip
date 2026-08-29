const test = require("node:test");
const assert = require("node:assert/strict");

process.env.FRONTEND_ORIGINS = "https://app.example.com";
process.env.NODE_ENV = "test";
process.env.API_JWT_SECRET = "test-api-secret-with-sufficient-entropy";
const app = require("./app");

async function withServer(run) {
  const server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  const { port } = server.address();

  try {
    await run(`http://127.0.0.1:${port}`);
  } finally {
    await new Promise((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve()))
    );
  }
}

test("CORS allows only configured browser origins", async () => {
  await withServer(async (baseUrl) => {
    const allowed = await fetch(`${baseUrl}/api/reserve/zone`, {
      method: "OPTIONS",
      headers: {
        Origin: "https://app.example.com",
        "Access-Control-Request-Method": "GET",
      },
    });
    assert.equal(
      allowed.headers.get("access-control-allow-origin"),
      "https://app.example.com"
    );
    assert.equal(allowed.headers.get("access-control-allow-credentials"), "true");

    const denied = await fetch(`${baseUrl}/api/reserve/zone`, {
      method: "OPTIONS",
      headers: {
        Origin: "https://attacker.example",
        "Access-Control-Request-Method": "GET",
      },
    });
    assert.equal(denied.headers.get("access-control-allow-origin"), null);
    assert.equal(denied.status, 403);
  });
});

test("API rate limiter rejects requests above the configured limit", async () => {
  await withServer(async (baseUrl) => {
    let response;

    for (let index = 0; index <= 100; index += 1) {
      response = await fetch(`${baseUrl}/api/member/myReserve`);
    }

    assert.equal(response.status, 429);
    assert.ok(response.headers.has("ratelimit"));
  });
});
