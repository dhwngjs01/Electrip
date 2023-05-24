import dayjs from "dayjs";
import "dayjs/locale/ko";

export default function ReserveStatus({
  reserve_status,
  reserve_start_date,
  reserve_end_date,
}) {
  let status;
  let className = "text-white fs-6 px-3 py-2 rounded-pill ";
  const now = dayjs().format("YYYY-MM-DD HH:mm");
  const start = dayjs(reserve_start_date).format("YYYY-MM-DD HH:mm");
  const end = dayjs(reserve_end_date).format("YYYY-MM-DD HH:mm");

  switch (reserve_status) {
    case "예약중":
      console.log(now, start, dayjs(now).isAfter(start));
      if (dayjs(now).isAfter(start) && dayjs(now).isAfter(end)) {
        status = "대여기간 초과";
      } else if (dayjs(now).isAfter(start)) {
        status = "대여중";
      } else if (dayjs(now).isBefore(start)) {
        status = "예약중";
      }
      break;
    default:
      status = reserve_status;
      break;
  }

  switch (status) {
    case "대여기간 초과":
      className += "bg-danger";
      break;
    case "예약중":
      className += "bg-electrip";
      break;
    case "대여중":
      className += "bg-electrip-active";
      break;
    case "대여종료":
      className += "bg-secondary";
      break;
    case "예약취소":
      className += "bg-dark";
      break;
  }

  return <span className={className}>{status}</span>;
}
