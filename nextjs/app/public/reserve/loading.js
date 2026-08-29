"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Loading() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "unauthenticated") {
      alert("로그인이 필요한 서비스입니다.");
      router.push("/member/login");
    }
  }, [router, session.status]);
}
