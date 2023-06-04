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
  let month_popular_cars;

  // 1. 이번달 매출
  let sql = `SELECT SUM(reserve_total_price) AS month_sales FROM reserve WHERE DATE_PART('month', reserve_start_date) = DATE_PART('month', NOW())`;
  var result = await db.query(sql);
  summary_data.month_sales.data = result.rows[0].month_sales;

  // 2. 올해 매출
  sql = `SELECT SUM(reserve_total_price) AS year_sales FROM reserve WHERE DATE_PART('year', reserve_start_date) = DATE_PART('year', NOW())`;
  var result = await db.query(sql);
  summary_data.year_sales.data = result.rows[0].year_sales;

  // 3. 보류 중인 차량
  sql = `SELECT COUNT(*) AS pending_cars FROM car WHERE car_is_active = false`;
  var result = await db.query(sql);
  summary_data.pending_cars.data = result.rows[0].pending_cars;

  // 4. 현재 회원 수
  sql = `SELECT COUNT(*) AS user_count FROM users`;
  var result = await db.query(sql);
  summary_data.user_count.data = result.rows[0].user_count;

  // 5. 일일 차량 대여 건 수
  sql = `SELECT COUNT(*) AS reserve_count FROM reserve WHERE reserve_status = '대여종료' AND DATE_PART('day', reserve_start_date) = DATE_PART('day', NOW())`;
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

  res.status(200).json({ summary_data, month_sales_list, month_popular_cars });
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
  // car_no, car_image, car_name, car_plate, car_class, reserve_status, reserve_start_date, reserve_end_date, car_created_at
  // 차량 상태는 예약 테이블에서 현재 시간을 기준으로 예약중인 차량인지 아닌지 확인해서 보내줘야됨
  // 예약 테이블에서 예약 상태가 '예약중'이고 대여 시작 시간과 대여 반납 시간 사이에 현재 시간이 있으면 대여중인 차량이고
  // 예약 테이블에서 예약 상태가 '예약중'이고 대여 시작 시간이 현재 시간보다 크면 예약중인 차량이고
  // 예약 테이블에서 예약 상태가 '대여종료'이면 대여가 완료된 차량이고
  // 차량 테이블에서 활성화가 false 이면 보류중인 차량이다.

  let sql = `SELECT car.car_no, car.car_image, car.car_name, car.car_plate, car.car_class, reserve.reserve_status, reserve.reserve_start_date, reserve.reserve_end_date, car.car_is_active, car.car_created_at
        FROM car
        LEFT JOIN reserve
        ON car.car_no = reserve.car_no
        ORDER BY car.car_created_at DESC`;

  var result = await db.query(sql);
  res.status(200).json(result.rows);
};

exports.carStateControl = async (req, res) => {
  let sql = `UPDATE car SET car_is_active = NOT car_is_active WHERE car_no = $1`;
  var result = await db.query(sql, [req.params.car_no]);

  res.status(200).json({ success: true });
};

exports.getCarInfo = async (req, res) => {
  // 차량 정보 가져오기
  const result = await db.query(`SELECT * FROM car WHERE car_no = $1`, [
    req.params.car_no,
  ]);

  res.status(200).json(result.rows[0]);
};
