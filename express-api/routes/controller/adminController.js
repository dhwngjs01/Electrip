const db = require("../../util/db");

exports.getDashboard = async (req, res) => {
  // postgresql 로 해야돼
  // 매출(월) 가져와서 보내줘야되고
  // 매출(년) 가져와서 보내줘야되고
  // 보류 중인 차량 가져와서 보내줘야되고
  // 현재 회원 수 가져와서 보내줘야되고
  // 차량 대여 건수(일) 가져와서 보내줘야되고
  // 사고 건수(일) 몇건 인지 보내줘야되고

  let send_result = {
    month_sales: 0,
    year_sales: 0,
    pending_cars: 0,
    user_count: 0,
    reserve_count: 0,
    accident_count: 0,
    month_sales_array: [],
  };

  let sql = `SELECT SUM(reserve_total_price) AS month_sales FROM reserve WHERE DATE_PART('month', reserve_start_date) = DATE_PART('month', NOW())`;
  var result = await db.query(sql);
  send_result.month_sales = result.rows[0].month_sales;

  sql = `SELECT SUM(reserve_total_price) AS year_sales FROM reserve WHERE DATE_PART('year', reserve_start_date) = DATE_PART('year', NOW())`;
  var result = await db.query(sql);
  send_result.year_sales = result.rows[0].year_sales;

  sql = `SELECT COUNT(*) AS pending_cars FROM reserve WHERE reserve_status = 'pending'`;
  var result = await db.query(sql);
  send_result.pending_cars = result.rows[0].pending_cars;

  sql = `SELECT COUNT(*) AS user_count FROM users`;
  var result = await db.query(sql);
  send_result.user_count = result.rows[0].user_count;

  sql = `SELECT COUNT(*) AS reserve_count FROM reserve WHERE reserve_status = '대여종료'`;
  var result = await db.query(sql);
  send_result.reserve_count = result.rows[0].reserve_count;

  sql = `SELECT COUNT(*) AS accident_count FROM reserve WHERE reserve_status = '사고'`;
  var result = await db.query(sql);
  send_result.accident_count = result.rows[0].accident_count;

  // 5개월전부터의 오늘까지 월별 매출
  sql = `SELECT DATE_TRUNC('month', reserve_start_date) AS month, SUM(reserve_total_price) AS sales FROM reserve WHERE reserve_status = '대여종료' AND reserve_start_date >= NOW() - INTERVAL '5 months' GROUP BY month ORDER BY month`;
  var result = await db.query(sql);
  send_result.month_sales_array = result.rows;

  res.status(200).json(send_result);
};
