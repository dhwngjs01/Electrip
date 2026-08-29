const db = require("../../util/db");
const reservationTimeZone =
  process.env.RESERVATION_TIME_ZONE || "Asia/Seoul";

// 내 예약 리스트
exports.getMyReserveList = async (req, res) => {
  const sql = `SELECT * FROM reserve NATURAL JOIN zone NATURAL JOIN car WHERE user_no = $1 ORDER BY reserve_no DESC;`;
  const myReserveList = await db.query(sql, [req.tokenInfo.userNo]);

  res.status(200).json(myReserveList.rows);
};

// 예약 취소
exports.cancelMyReserve = async (req, res) => {
  if (req.method == "PUT") {
    const sql = `UPDATE reserve
      SET reserve_status = '예약취소'
      WHERE reserve_no = $1
        AND user_no = $2
        AND reserve_status = '예약중'
        AND reserve_start_date > NOW() AT TIME ZONE $3;`;
    const result = await db.query(sql, [
      req.body.reserve_no,
      req.tokenInfo.userNo,
      reservationTimeZone,
    ]);

    if (result.rowCount > 0) {
      res
        .status(200)
        .json({ success: true, message: "예약이 취소되었습니다." });
    } else {
      res
        .status(404)
        .json({ message: "취소 가능한 예약을 찾을 수 없습니다." });
    }
  }
};

// 대여 종료
exports.finishMyReserve = async (req, res) => {
  if (req.method == "PUT") {
    const sql = `UPDATE reserve
      SET reserve_status = '대여종료', reserve_real_end_date = NOW()
      WHERE reserve_no = $1
        AND user_no = $2
        AND reserve_status = '예약중'
        AND reserve_start_date <= NOW() AT TIME ZONE $3;`;
    const result = await db.query(sql, [
      req.body.reserve_no,
      req.tokenInfo.userNo,
      reservationTimeZone,
    ]);

    if (result.rowCount > 0) {
      res
        .status(200)
        .json({ success: true, message: "예약 상태가 변경되었습니다." });
    } else {
      res
        .status(404)
        .json({ message: "종료 가능한 예약을 찾을 수 없습니다." });
    }
  }
};
