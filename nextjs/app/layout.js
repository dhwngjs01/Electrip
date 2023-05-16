import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.scss";
import Navigation from "/components/Navigation";
import { NextAuthProvider } from "@/components/Provider";

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <title>Electrip</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <NextAuthProvider>
          <div id="wrap">
            <Navigation />
            {children}
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}
