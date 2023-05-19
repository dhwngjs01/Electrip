import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.scss";

import { NextAuthProvider } from "@/components/common/Provider";
import Navigation from "@/components/common/Navigation";
import Script from "next/script";
import { Providers } from "@/redux/provider";

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <title>Electrip</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Providers>
          <NextAuthProvider>
            <div id="wrap">
              <Navigation />
              {children}
            </div>
          </NextAuthProvider>
        </Providers>
      </body>
    </html>
  );
}
