import pool from "@/util/database";
import bcrypt from "bcryptjs";
import {
  consumeRateLimit,
  getClientAddress,
} from "@/util/rateLimit";

const isValidEmail = (value) => {
  if (value.length > 254) {
    return false;
  }

  for (const character of value) {
    if (character.trim() === "") {
      return false;
    }
  }

  const atIndex = value.indexOf("@");
  const domain = value.slice(atIndex + 1);
  const dotIndex = domain.lastIndexOf(".");

  return (
    atIndex > 0 &&
    atIndex === value.lastIndexOf("@") &&
    dotIndex > 0 &&
    dotIndex < domain.length - 1
  );
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json("허용되지 않는 접근입니다.");
  }

  const requiredFields = ["email", "password", "password2", "name", "mobile"];
  const emptyRequiredFields = requiredFields.filter(
    (field) =>
      typeof req.body[field] !== "string" || req.body[field].trim() === ""
  );

  if (emptyRequiredFields.length > 0) {
    return res.status(400).json({
      empty_value_required_list: emptyRequiredFields,
      message: "필수 입력사항을 입력해주세요.",
    });
  }

  const email = req.body.email.trim().toLowerCase();
  const name = req.body.name.trim();
  const mobile = req.body.mobile.trim();

  if (!isValidEmail(email)) {
    return res.status(400).json({
      empty_value_required_list: ["email"],
      message: "이메일 주소를 확인해주세요.",
    });
  }

  if (!/^\d{3}-\d{4}-\d{4}$/.test(mobile)) {
    return res.status(400).json({
      empty_value_required_list: ["mobile"],
      message: "휴대폰 번호를 확인해주세요.",
    });
  }

  if (req.body.password !== req.body.password2) {
    return res
      .status(400)
      .json({ message: "비밀번호를 서로 같게 입력해주세요." });
  }

  if (req.body.password.length < 12) {
    return res.status(400).json({
      message: "비밀번호는 12자 이상이어야 합니다.",
    });
  }

  if (bcrypt.truncates(req.body.password)) {
    return res.status(400).json({
      message: "비밀번호는 UTF-8 기준 72바이트 이하여야 합니다.",
    });
  }

  try {
    const clientAddress = getClientAddress(req);

    if (!clientAddress) {
      return res.status(503).json({
        message: "요청 출처를 확인할 수 없습니다.",
      });
    }

    const signupAllowed = await consumeRateLimit(pool, {
      namespace: "signup-client",
      identity: clientAddress,
      limit: 20,
      windowSeconds: 60 * 60,
    });

    if (!signupAllowed) {
      res.setHeader("Retry-After", "3600");
      return res.status(429).json({
        message: "회원가입 요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.",
      });
    }

    const zipcode =
      req.body.zipcode == null || req.body.zipcode === ""
        ? null
        : Number.parseInt(req.body.zipcode, 10);
    const address = req.body.address?.trim() || null;
    const detailAddress = req.body.detail_address?.trim() || null;
    const passwordHash = await bcrypt.hash(req.body.password, 12);
    const createUserSql = `INSERT INTO users
      (email, password, name, mobile, zipcode, address, detail_address)
      VALUES ($1, $2, $3, $4, $5, $6, $7)`;
    const result = await pool.query(createUserSql, [
      email,
      passwordHash,
      name,
      mobile,
      Number.isSafeInteger(zipcode) ? zipcode : null,
      address,
      detailAddress,
    ]);

    if (result.rowCount > 0) {
      return res.status(200).json({ success: true });
    }
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({ message: "이미 존재하는 이메일입니다." });
    }

    console.error(error);
    return res.status(500).json({ message: "회원가입에 실패하였습니다." });
  }
}
