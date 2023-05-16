import pool from "@/util/database";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.body.method == "GET") {
    return res.status(405).json("허용되지 않는 접근입니다.");
  }

  for (let key in req.body) {
    req.body[key] = req.body[key].trim();
  }

  // 필수 입력사항
  const required_list = ["email", "password", "password2", "name", "phone"];

  // 필수 입력사항이 비어있는지 확인할 배열
  let empty_value_required_list = [];

  // 필수 입력사항이 비어있는지 확인
  required_list.forEach((required) => {
    if (req.body[required] == "") {
      empty_value_required_list.push(required);
    }
  });

  // 필수 입력사항이 비어있으면
  if (empty_value_required_list.length > 0) {
    return res.status(200).json({
      empty_value_required_list: empty_value_required_list,
      message: "필수 입력사항을 입력해주세요.",
    });
  }

  // 비밀번호와 비밀번호 확인이 다르면
  if (req.body.pw != req.body.pw2) {
    return res
      .status(200)
      .json({ message: "비밀번호를 서로 같게 입력해주세요." });
  }

  try {
    // 아이디 중복체크
    let overlap_email_check_sql = `select * from users where email = $1`;
    let user = await pool.query(overlap_email_check_sql, [req.body.email]);

    // 이미 존재하는 아이디면
    if (user.rows[0] && user.rows[0].email == req.body.email) {
      return res.status(200).json({ message: "이미 존재하는 이메일입니다." });
    }

    // 비밀번호 암호화
    req.body.password = await bcrypt.hash(req.body.password, 10);

    // 회원가입 실행
    let create_user = `insert into user_cred (email, password, name, phone, zipcode, address, detail_address) values ($1, $2, $3, $4, $5, $6, $7)`;
    let create_user_result = await pool.query(create_user, [
      req.body.email,
      req.body.password,
      req.body.name,
      req.body.phone,
      req.body.zipcode,
      req.body.address,
      req.body.detail_address,
    ]);

    // 회원가입 성공
    if (create_user_result.rowCount > 0) {
      return res.status(200).json({ success: true });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "회원가입에 실패하였습니다." });
  }
}
