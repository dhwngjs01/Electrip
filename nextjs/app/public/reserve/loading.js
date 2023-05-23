"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Loading() {
  let session = useSession();
  let router = useRouter();

  useEffect(() => {
    if (session.status === "unauthenticated") {
      alert("로그인이 필요한 서비스입니다.");
      router.push("/member/login");
    }
  }, [session.status]);
}
