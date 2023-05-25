const db = require("../../util/db");

exports.getZoneList = async (req, res) => {
  // 모든 장소 목록 가져오기
  const result = await db.query("select * from zone");

  res.status(200).json(result.rows);
};

exports.getAllCarList = async (req, res) => {
  // 모든 차량 목록 가져오기
  const result = await db.query("select * from car");

  res.status(200).json(result.rows);
};

exports.getCarListFromZone = async (req, res) => {
  zoneNo = req.params.zoneNo;
  startDate = req.query.startDate;
  endDate = req.query.endDate;

  // 장소에 해당하고 날짜 범위 안에 포함하지 않는 차량 가져오기
  const result = await db.query(
    `SELECT * 
    from car 
    where zone_no = $1 AND 
    car_no not IN 
      (
        select car_no from reserve WHERE 
        ((reserve_start_date BETWEEN $2 AND $3) OR 
        (reserve_end_date BETWEEN $2 and $3) OR 
        ($2 BETWEEN reserve_start_date AND reserve_end_date) OR 
        ($3 BETWEEN reserve_start_date AND reserve_end_date)) AND 
        reserve_status = '예약중'
      ) AND 
    car_active = true`,
    [zoneNo, startDate, endDate]
  );

  res.status(200).json(result.rows);
};

exports.reserve = async (req, res) => {
  let user_no = req.body.user_no;
  let car_no = req.body.car_no;
  let reserve_total_price = req.body.reserve_total_price;
  let reserve_start_date = req.body.reserve_start_date;
  let reserve_end_date = req.body.reserve_end_date;

  // 예약하기
  const result = await db.query(
    `INSERT INTO reserve
    (user_no, car_no, reserve_total_price, reserve_start_date, reserve_end_date)
    VALUES ($1, $2, $3, $4, $5)`,
    [user_no, car_no, reserve_total_price, reserve_start_date, reserve_end_date]
  );

  if (result.rowCount == 1) {
    res.status(200).json({ message: "예약이 완료되었습니다." });
  } else {
    res.status(500).json({ message: "예약에 실패했습니다." });
  }
};
