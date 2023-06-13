const db = require("../../util/db");

exports.getDashboard = async (req, res) => {
  // postgresql 로 해야돼
  // 매출(월) 가져와서 보내줘야되고
  // 매출(년) 가져와서 보내줘야되고
  // 보류 중인 차량 가져와서 보내줘야되고
  // 현재 회원 수 가져와서 보내줘야되고
  // 차량 대여 건수(일) 가져와서 보내줘야되고
  // 사고 건수(일) 몇건 인지 보내줘야되고

  let summary_data = {
    month_sales: { title: "이번달 매출", data: 0 },
    year_sales: { title: "올해 매출", data: 0 },
    pending_cars: { title: "보류 중인 차량 수", data: 0 },
    user_count: { title: "현재 회원 수", data: 0 },
    reserve_count: { title: "일일 차량 대여 건 수", data: 0 },
    have_car_count: { title: "보유 중인 차량 수", data: 0 },
  };

  let month_sales_list;
  let year_sales_list;
  let month_popular_cars;
  let all_popular_cars;

  // 1. 이번달 매출
  let sql = `SELECT SUM(reserve_total_price) AS month_sales 
            FROM reserve 
            WHERE reserve_status = '대여종료' 
            AND DATE_PART('month', reserve_start_date) = DATE_PART('month', NOW())`;
  var result = await db.query(sql);
  summary_data.month_sales.data = result.rows[0].month_sales;

  // 2. 올해 매출
  sql = `SELECT SUM(reserve_total_price) AS year_sales 
        FROM reserve 
        WHERE reserve_status = '대여종료' 
        AND DATE_PART('year', reserve_start_date) >= DATE_PART('year', NOW())`;
  var result = await db.query(sql);
  summary_data.year_sales.data = result.rows[0].year_sales;

  // 3. 보류 중인 차량
  sql = `SELECT COUNT(*) AS pending_cars 
        FROM car 
        WHERE car_is_active = false`;
  var result = await db.query(sql);
  summary_data.pending_cars.data = result.rows[0].pending_cars;

  // 4. 현재 회원 수
  sql = `SELECT COUNT(*) AS user_count FROM users`;
  var result = await db.query(sql);
  summary_data.user_count.data = result.rows[0].user_count;

  // 5. 일일 차량 대여 건 수
  sql = `SELECT COUNT(*) AS reserve_count 
        FROM reserve 
        WHERE reserve_status = '대여종료' 
        AND DATE_PART('day', reserve_start_date) = DATE_PART('day', NOW())`;
  var result = await db.query(sql);
  summary_data.reserve_count.data = result.rows[0].reserve_count;

  // 6. 보유 중인 차량 수
  sql = `SELECT COUNT(*) AS have_car_count FROM car`;
  var result = await db.query(sql);
  summary_data.have_car_count.data = result.rows[0].have_car_count;

  // 5개월전부터의 오늘까지 월별 매출
  sql = `SELECT DATE_TRUNC('month', reserve_start_date) AS month, SUM(reserve_total_price) AS sales
        FROM reserve
        WHERE reserve_status = '대여종료'
        AND reserve_start_date >= DATE_TRUNC('month', NOW()) - INTERVAL '4 months'
        GROUP BY month
        ORDER BY month`;
  var result = await db.query(sql);
  month_sales_list = result.rows;

  // 5년 전부터의 올해까지 년별 매출
  sql = `SELECT DATE_TRUNC('year', reserve_start_date) AS year, SUM(reserve_total_price) AS sales
        FROM reserve
        WHERE reserve_status = '대여종료'
        AND reserve_start_date >= DATE_TRUNC('year', NOW()) - INTERVAL '4 years'
        GROUP BY year
        ORDER BY year`;
  var result = await db.query(sql);
  year_sales_list = result.rows;

  // 차량 인기 현황 (월)
  sql = `SELECT car.car_name, COUNT(reserve.car_no) AS reserve_count
        FROM car
        LEFT JOIN reserve
        ON car.car_no = reserve.car_no
        WHERE reserve.reserve_status = '대여종료'
        AND reserve.reserve_start_date >= DATE_TRUNC('month', NOW()) - INTERVAL '4 months'
        GROUP BY car.car_no
        ORDER BY reserve_count DESC
        LIMIT 5`;
  var result = await db.query(sql);
  month_popular_cars = result.rows;

  // 차량 인기 현황 (전체)
  sql = `SELECT car.car_name, COUNT(reserve.car_no) AS reserve_count
        FROM car
        LEFT JOIN reserve
        ON car.car_no = reserve.car_no
        WHERE reserve.reserve_status = '대여종료'
        GROUP BY car.car_no
        ORDER BY reserve_count DESC
        LIMIT 5`;
  var result = await db.query(sql);
  all_popular_cars = result.rows;

  res.status(200).json({
    summary_data,
    month_sales_list,
    year_sales_list,
    month_popular_cars,
    all_popular_cars,
  });
};

exports.getAllUsers = async (req, res) => {
  let sql = `SELECT * FROM users order by id desc`;
  var result = await db.query(sql);
  res.status(200).json(result.rows);
};

exports.userStateControl = async (req, res) => {
  let sql = `UPDATE users SET is_active = NOT is_active WHERE id = $1`;
  var result = await db.query(sql, [req.params.id]);

  res.status(200).json({ success: true });
};

exports.getAllCars = async (req, res) => {
  let data = {};

  let sql = `SELECT car.car_no, car.car_image, car.car_name, car.car_plate, car.car_class, car.car_is_active, car.car_created_at
            FROM car
            ORDER BY car.car_no DESC`;

  let result = await db.query(sql);

  res.status(200).json(result.rows);
};

exports.getCarInfo = async (req, res) => {
  // 차량 정보 가져오기
  const result = await db.query(`SELECT * FROM car WHERE car_no = $1`, [
    req.params.car_no,
  ]);

  res.status(200).json(result.rows[0]);
};

exports.getCarReservations = async (req, res) => {
  const result = await db.query(
    `SELECT
      reserve_no,
      reserve_start_date,
      reserve_end_date,
      reserve_status
    FROM reserve
    WHERE reserve.car_no = $1
    ORDER BY reserve.reserve_start_date desc, reserve.reserve_end_date desc`,
    [req.params.car_no]
  );

  res.status(200).json(result.rows);
};

exports.carStateControl = async (req, res) => {
  let sql = `UPDATE car SET car_is_active = NOT car_is_active WHERE car_no = $1`;
  var result = await db.query(sql, [req.params.car_no]);

  res.status(200).json({ success: true });
};

exports.addCar = async (req, res) => {
  // 차량 추가
  const {
    car_name,
    car_brand,
    car_class,
    car_seat,
    car_plate,
    car_odo,
    car_price,
    zoneNo,
  } = req.body;

  console.log(req.files);

  if (req.files === undefined) {
    res
      .status(400)
      .json({ success: false, message: "차량 이미지를 등록해주세요." });
    return;
  }

  if (zoneNo === "") {
    res.status(400).json({ success: false, message: "장소를 선택해주세요." });
    return;
  }

  // 차량 이미지
  const car_image = req.files[0];

  // 차량 이미지 파일명
  const car_image_name = car_image.filename;

  // 차량 추가
  const result = await db.query(
    `INSERT INTO car (car_name, car_brand, car_class, car_seat, car_plate, car_odo, car_price, car_image, zone_no) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
    [
      car_name,
      car_brand,
      car_class,
      car_seat,
      car_plate,
      car_odo,
      car_price,
      car_image_name,
      zoneNo,
    ]
  );

  res.status(200).json({ success: true });
};

exports.editCar = async (req, res) => {
  // 차량 수정
  const {
    car_name,
    car_brand,
    car_class,
    car_seat,
    car_plate,
    car_odo,
    car_price,
    zoneNo,
  } = req.body;

  if (zoneNo === "") {
    res.status(400).json({ success: false, message: "장소를 선택해주세요." });
    return;
  }

  if (req.files.length === 0) {
    // 이미지 변경 안함
    // 차량 수정
    const result = await db.query(
      `UPDATE car SET car_name = $1, car_brand = $2, car_class = $3, car_seat = $4, car_plate = $5, car_odo = $6, car_price = $7, zone_no = $8 WHERE car_no = $9`,
      [
        car_name,
        car_brand,
        car_class,
        car_seat,
        car_plate,
        car_odo,
        car_price,
        zoneNo,
        req.params.car_no,
      ]
    );
  } else {
    // 이미지 변경
    // 차량 이미지
    const car_image = req.files[0];

    // 차량 이미지 파일명
    const car_image_name = car_image.filename;

    // 차량 수정
    const result = await db.query(
      `UPDATE car SET car_name = $1, car_brand = $2, car_class = $3, car_seat = $4, car_plate = $5, car_odo = $6, car_price = $7, car_image = $8, zone_no = $9 WHERE car_no = $10`,
      [
        car_name,
        car_brand,
        car_class,
        car_seat,
        car_plate,
        car_odo,
        car_price,
        car_image_name,
        zoneNo,
        req.params.car_no,
      ]
    );
  }
  res
    .status(200)
    .json({ success: true, message: "차량 수정이 완료되었습니다." });
};

exports.deleteCar = async (req, res) => {
  // 차량 삭제
  const result = await db.query(`DELETE FROM car WHERE car_no = $1`, [
    req.params.car_no,
  ]);

  res.status(200).json({ success: true });
};

exports.getAllZones = async (req, res) => {
  // 모든 장소 목록 가져오기
  // 차량 개수도 가져오기
  const result = await db.query(`SELECT zone.*, COUNT(car.car_no) AS car_count
  FROM zone
  LEFT JOIN car ON zone.zone_no = car.zone_no
  GROUP BY zone.zone_no
  ORDER BY zone.zone_no desc;`);

  res.status(200).json(result.rows);
};

exports.addZone = async (req, res) => {
  // 장소 추가
  const {
    zone_zipcode,
    zone_address,
    zone_detail_address,
    zone_lat,
    zone_lng,
  } = req.body;

  if (zone_lat === "" || zone_lng === "") {
    res.status(400).json({ message: "주소를 검색해주세요." });
    return;
  }

  const result = await db.query(
    `INSERT INTO zone (zone_zipcode, zone_address, zone_detail_address, zone_lat, zone_lng) VALUES ($1, $2, $3, $4, $5)`,
    [zone_zipcode, zone_address, zone_detail_address, zone_lat, zone_lng]
  );

  res.status(200).json({ success: true, message: "장소가 등록되었습니다." });
};

exports.zoneStateControl = async (req, res) => {
  // 장소 상태 변경
  const result = await db.query(
    `UPDATE zone SET zone_is_active = NOT zone_is_active WHERE zone_no = $1`,
    [req.params.zone_no]
  );

  res.status(200).json({ success: true });
};

exports.getZoneInfo = async (req, res) => {
  // 장소 정보 가져오기
  const result = await db.query(`SELECT * FROM zone WHERE zone_no = $1`, [
    req.params.zone_no,
  ]);

  res.status(200).json(result.rows[0]);
};

exports.editZone = async (req, res) => {
  // 장소 수정
  const {
    zone_zipcode,
    zone_address,
    zone_detail_address,
    zone_lat,
    zone_lng,
  } = req.body;

  if (zone_lat === "" || zone_lng === "") {
    res.status(400).json({ message: "주소를 검색해주세요." });
    return;
  }

  const result = await db.query(
    `UPDATE zone SET zone_zipcode = $1, zone_address = $2, zone_detail_address = $3, zone_lat = $4, zone_lng = $5 WHERE zone_no = $6`,
    [
      zone_zipcode,
      zone_address,
      zone_detail_address,
      zone_lat,
      zone_lng,
      req.params.zone_no,
    ]
  );

  res.status(200).json({ success: true, message: "장소가 수정되었습니다." });
};

exports.deleteZone = async (req, res) => {
  // 장소 삭제
  const result = await db.query(`DELETE FROM zone WHERE zone_no = $1`, [
    req.params.zone_no,
  ]);

  res.status(200).json({ success: true });
};

exports.getAllReservations = async (req, res) => {
  // 모든 예약 목록 가져오기
  // 차량 개수도 가져오기
  const result = await db.query(
    `SELECT 
      reserve.reserve_no, 
      car.car_image, 
      car.car_name, 
      car.car_plate, 
      reserve.reserve_start_date, 
      reserve.reserve_end_date, 
      users.name as user_name,
      reserve.reserve_status
    FROM reserve
    LEFT JOIN car ON reserve.car_no = car.car_no
    LEFT JOIN users ON reserve.user_no = users.id
    ORDER BY reserve.reserve_start_date desc, reserve.reserve_end_date desc;`
  );

  res.status(200).json(result.rows);
};

exports.getReserveInfo = async (req, res) => {
  const result = await db.query(
    `SELECT 
      car.car_image, 
      car.car_name, 
      car.car_plate, 
      reserve.reserve_start_date, 
      reserve.reserve_end_date, 
      reserve.reserve_real_end_date, 
      reserve.reserve_status, 
      reserve.reserve_total_price, 
      reserve.reserve_status, 
      zone.zone_address, 
      zone.zone_detail_address, 
      zone.zone_lat, 
      zone.zone_lng, 
      users.email as user_email, 
      users.name as user_name, 
      users.mobile as user_mobile
    FROM reserve
    LEFT JOIN car ON reserve.car_no = car.car_no
    LEFT JOIN users ON reserve.user_no = users.id
    LEFT JOIN zone ON car.zone_no = zone.zone_no
    WHERE reserve.reserve_no = $1`,
    [req.params.reserve_no]
  );

  res.status(200).json(result.rows[0]);
};
