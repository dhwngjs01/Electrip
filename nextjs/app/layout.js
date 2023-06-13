import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.scss";

import { NextAuthProvider } from "@/components/common/Provider";
import Navigation from "@/components/common/Navigation";
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
            <script
              type="text/javascript"
              src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY}&libraries=services,clusterer,drawing`}
              strategy="beforeInteractive"
            />
          </NextAuthProvider>
        </Providers>
      </body>
    </html>
  );
}
