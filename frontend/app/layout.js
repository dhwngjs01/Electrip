"use client";

import "./globals.scss";

import { usePathname } from "next/navigation";
import Script from "next/script";

import { Container, AppBar, Toolbar } from "@mui/material";

import Navigation from "/components/Navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  return (
    <html lang="ko">
      <head>
        <title>Electrip</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <div id="wrap" style={pathname === "/" ? { marginTop: "110px" } : null}>
          <AppBar
            id="nav"
            className={pathname === "/" ? "rootPage" : "notRootPage"}
          >
            <Container maxWidth="lg">
              <Toolbar disableGutters>
                <Navigation />
              </Toolbar>
            </Container>
          </AppBar>
          {children}
        </div>
        <Script
          type="text/javascript"
          src={
            "//dapi.kakao.com/v2/maps/sdk.js?appkey=" +
            process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY +
            "&libraries=services,clusterer,drawing&autoload=false"
          }
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
