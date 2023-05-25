"use client";

import { setReserveList } from "@/redux/features/myReserveSlice";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

export default function CancelBtn({ reserve_no }) {
  const session = useSession();

  const myReserve = useSelector((state) => state.myReserveReducer);
  const dispatch = useDispatch();

  const handlerReserveCancel = async () => {
    if (confirm("예약을 정말 취소하시겠습니까?")) {
      try {
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/api/member/myReserve/cancel`,
          { reserve_no: reserve_no }
        );

        if (response.data.message) {
          alert(response.data.message);
        }

        if (response.data.success) {
          try {
            const reserveList = await axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}/api/member/myReserve?user_no=${session.data.user.user_no}`
            );

            dispatch(setReserveList([...reserveList.data]));
          } catch (error) {
            console.error(error);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Button
      className="btn btn-secondary text-white cursor-pointer px-4 fs-5"
      onClick={handlerReserveCancel}
    >
      예약취소
    </Button>
  );
}
