import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";

export default function FinishRentBtn({ reserve_no }) {
  const handlerFinishRent = () => {
    if (confirm("대여를 종료하시겠습니까?")) {
      axios
        .put(`${process.env.NEXT_PUBLIC_API_URL}/api/member/myReserve/finish`, {
          reserve_no: reserve_no,
        })
        .then((res) => {
          if (res.data.message) {
            alert(res.data.message);
          }

          if (res.data.success) {
            location.reload();
          }
        });
    }
  };

  return (
    <Button
      className="btn bg-electrip-active px-4 fs-5"
      onClick={handlerFinishRent}
    >
      대여종료
    </Button>
  );
}
