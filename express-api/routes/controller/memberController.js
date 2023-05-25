const db = require("../../util/db");

// 내 예약 리스트
exports.getMyReserveList = async (req, res) => {
  const { user_no } = req.query;

  const sql = `SELECT * FROM reserve NATURAL JOIN zone NATURAL JOIN car WHERE user_no = $1 ORDER BY reserve_no DESC;`;
  const myReserveList = await db.query(sql, [user_no]);

  res.status(200).json(myReserveList.rows);
};

// 예약 취소
exports.cancelMyReserve = async (req, res) => {
  if (req.method == "PUT") {
    const sql = `UPDATE reserve SET reserve_status = '예약취소' WHERE reserve_no = $1;`;
    const result = await db.query(sql, [req.body.reserve_no]);

    if (result.rowCount > 0) {
      res
        .status(200)
        .json({ success: true, message: "예약이 취소되었습니다." });
    } else {
      res
        .status(500)
        .json({ message: "예약을 취소하던 중 오류가 발생했습니다." });
    }
  }
};

// 대여 종료
exports.finishReserve = async (req, res) => {
  if (req.method == "PUT") {
    console.log(req.body);

    // const sql = `UPDATE reserve SET reserve_status = $1 WHERE reserve_no = $2;`;
    // const result = await db.query(sql, [
    //   req.body.reserve_status,
    //   req.body.reserve_no,
    // ]);

    // if (result.rowCount > 0) {
    //   res
    //     .status(200)
    //     .json({ success: true, message: "예약 상태가 변경되었습니다." });
    // } else {
    //   res
    //     .status(500)
    //     .json({ message: "예약 상태를 변경하던 중 오류가 발생했습니다." });
    // }
  }
};
