"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Loading() {
  let session = useSession();
  let router = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/");

      console.log(session.status);
    }
  }, [session.status]);
}
