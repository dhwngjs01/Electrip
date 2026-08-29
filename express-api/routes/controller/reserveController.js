const db = require("../../util/db");
const reservationTimeZone =
  process.env.RESERVATION_TIME_ZONE || "Asia/Seoul";

const isValidLocalDateTime = (value) => {
  if (typeof value !== "string") {
    return false;
  }

  const match =
    /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})$/.exec(value);

  if (!match) {
    return false;
  }

  const [, year, month, day, hour, minute] = match.map(Number);
  const parsed = new Date(Date.UTC(year, month - 1, day, hour, minute));

  return (
    parsed.getUTCFullYear() === year &&
    parsed.getUTCMonth() === month - 1 &&
    parsed.getUTCDate() === day &&
    parsed.getUTCHours() === hour &&
    parsed.getUTCMinutes() === minute
  );
};

exports.getZoneList = async (req, res) => {
  // 모든 장소 목록 가져오기
  // 차량 개수도 가져오기
  const result = await db.query(`SELECT zone.*, COUNT(car.car_no) AS car_count
  FROM zone
  LEFT JOIN car ON zone.zone_no = car.zone_no
  WHERE zone.zone_is_active = true
  GROUP BY zone.zone_no
  ORDER BY zone.zone_no desc;`);

  res.status(200).json(result.rows);
};

exports.getAllCarList = async (req, res) => {
  // 모든 차량 목록 가져오기
  const result = await db.query("select * from car");

  res.status(200).json(result.rows);
};

exports.getZoneInfo = async (req, res) => {
  zoneNo = req.params.zoneNo;

  // 장소 정보 가져오기
  const result = await db.query(
    `SELECT zone.*, COUNT(car.car_no) AS car_count
    FROM zone
    LEFT JOIN car ON zone.zone_no = car.zone_no
    WHERE zone.zone_no = $1
    GROUP BY zone.zone_no;`,
    [zoneNo]
  );

  res.status(200).json(result.rows[0]);
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
    car_is_active = true`,
    [zoneNo, startDate, endDate]
  );

  res.status(200).json(result.rows);
};

exports.reserve = async (req, res) => {
  const userNo = req.tokenInfo.userNo;
  const { car_no: carNo, reserve_start_date: startDate, reserve_end_date: endDate } =
    req.body;
  const parsedCarNo = Number(carNo);

  if (
    !Number.isSafeInteger(parsedCarNo) ||
    parsedCarNo <= 0 ||
    !isValidLocalDateTime(startDate) ||
    !isValidLocalDateTime(endDate) ||
    endDate <= startDate
  ) {
    return res.status(400).json({ message: "예약 정보를 확인해 주세요." });
  }

  const client = await db.connect();

  try {
    await client.query("BEGIN");
    await client.query("SELECT pg_advisory_xact_lock($1)", [parsedCarNo]);

    const result = await client.query(
      `INSERT INTO reserve
        (user_no, car_no, reserve_total_price, reserve_start_date, reserve_end_date)
      SELECT
        $1,
        car.car_no,
        CEIL(
          (car.car_price / 1440.0)
          * (EXTRACT(EPOCH FROM ($4::timestamp - $3::timestamp)) / 60)
          / 100
        ) * 100,
        $3::timestamp,
        $4::timestamp
      FROM car
      WHERE car.car_no = $2
        AND car.car_is_active = true
        AND $3::timestamp >= NOW() AT TIME ZONE $5
        AND $4::timestamp > $3::timestamp
        AND NOT EXISTS (
          SELECT 1
          FROM reserve
          WHERE reserve.car_no = $2
            AND reserve.reserve_status = '예약중'
            AND reserve.reserve_start_date < $4::timestamp
            AND reserve.reserve_end_date > $3::timestamp
        )`,
      [userNo, parsedCarNo, startDate, endDate, reservationTimeZone]
    );

    await client.query("COMMIT");

    if (result.rowCount === 1) {
      return res.status(200).json({ message: "예약이 완료되었습니다." });
    }

    return res
      .status(409)
      .json({ message: "예약할 수 없는 차량 또는 시간대입니다." });
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};
