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
    "select * from car where zone_no = $1 and car_no not in (select car_no from reserve where reserve_start_date < $2 and reserve_end_date > $3) and car_active = true",
    [zoneNo, endDate, startDate]
  );

  res.status(200).json(result.rows);
};
