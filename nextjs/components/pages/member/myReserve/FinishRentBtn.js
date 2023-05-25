import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";

export default function FinishRentBtn({ reserve_no }) {
  const router = useRouter();

  const handlerFinishRent = () => {
    router.push(`/member/myReserve/finish/${reserve_no}`);
  };

  return (
    <Button className="btn bg-electrip-active" onClick={handlerFinishRent}>
      대여종료
    </Button>
  );
}
