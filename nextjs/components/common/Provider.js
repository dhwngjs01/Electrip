"use client";

import axios from "axios";
import { getSession, SessionProvider } from "next-auth/react";

axios.interceptors.request.use(async (config) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (apiUrl && config.url) {
    const apiBase = new URL(apiUrl);
    const target = new URL(axios.getUri(config), window.location.origin);
    const basePath = apiBase.pathname.replace(/\/$/, "");
    const matchesBasePath =
      target.pathname === basePath ||
      target.pathname.startsWith(`${basePath || ""}/`);

    if (target.origin !== apiBase.origin || !matchesBasePath) {
      return config;
    }

    if (
      process.env.NODE_ENV === "production" &&
      apiBase.protocol !== "https:"
    ) {
      throw new Error("운영 API는 HTTPS URL을 사용해야 합니다.");
    }

    const session = await getSession();

    if (session?.apiAccessToken) {
      config.headers.Authorization = `Bearer ${session.apiAccessToken}`;
    }
  }

  return config;
});

export function NextAuthProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
