import crypto from "node:crypto";
import { isIP } from "node:net";

export function getClientAddress(req) {
  const trustedHeader = process.env.RATE_LIMIT_CLIENT_IP_HEADER?.toLowerCase();

  if (trustedHeader) {
    const headerValue = req.headers?.[trustedHeader];

    if (
      typeof headerValue === "string" &&
      !headerValue.includes(",") &&
      isIP(headerValue.trim())
    ) {
      return headerValue.trim();
    }

    return null;
  }

  const remoteAddress = req.socket?.remoteAddress?.replace(/^::ffff:/, "");
  return remoteAddress && isIP(remoteAddress) ? remoteAddress : null;
}

export async function consumeRateLimit(
  pool,
  { namespace, identity, limit, windowSeconds }
) {
  const key = crypto
    .createHash("sha256")
    .update(`${namespace}:${identity}`)
    .digest("hex");
  const result = await pool.query(
    `INSERT INTO auth_rate_limit (key, window_started_at, request_count)
     VALUES ($1, NOW(), 1)
     ON CONFLICT (key) DO UPDATE SET
       request_count = CASE
         WHEN auth_rate_limit.window_started_at <= NOW() - make_interval(secs => $2)
           THEN 1
         ELSE auth_rate_limit.request_count + 1
       END,
       window_started_at = CASE
         WHEN auth_rate_limit.window_started_at <= NOW() - make_interval(secs => $2)
           THEN NOW()
         ELSE auth_rate_limit.window_started_at
       END
     RETURNING request_count`,
    [key, windowSeconds]
  );

  return result.rows[0].request_count <= limit;
}
