import pool from "@/util/database";

export default async function handler(req, res) {
  if (req.method == "GET") {
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

  // 휴대폰 번호 정규식
  const RegExp = /[0-9]{3}-[0-9]{4}-[0-9]{4}/g;
  if (!RegExp.test(req.body.user_phone)) {
    empty_value_required_list.push("user_phone");
    return res.status(200).json({
      empty_value_required_list: empty_value_required_list,
      message: "휴대폰 번호를 확인해주세요.",
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
    var sql = `select * from user_cred where user_id = $1`;
    let overlap_user_id_check = await pool.query(sql, [req.body.user_id]);

    // 이미 존재하는 아이디면
    if (
      overlap_user_id_check.rows[0] &&
      overlap_user_id_check.rows[0].user_id == req.body.user_id
    ) {
      return res.status(200).json({ message: "이미 존재하는 이메일입니다." });
    }

    // 입력값이 없으면 null로 변경
    req.body.user_zipcode =
      req.body.user_zipcode == "" ? null : parseInt(req.body.user_zipcode);
    req.body.user_address =
      req.body.user_address == "" ? null : req.body.user_address;
    req.body.user_detail_address =
      req.body.user_detail_address == "" ? null : req.body.user_detail_address;

    // 회원가입 실행
    let create_user = `insert into user_cred (user_id, user_pw, user_name, user_phone, user_zipcode, user_address, user_detail_address) values ($1, $2, $3, $4, $5, $6, $7)`;
    let create_user_result = await pool.query(create_user, [
      req.body.user_id,
      req.body.user_pw,
      req.body.user_name,
      req.body.user_phone,
      req.body.user_zipcode,
      req.body.user_address,
      req.body.user_detail_address,
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
