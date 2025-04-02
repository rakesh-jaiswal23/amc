process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "./redux/ReduxProvider";

import Footer from "./components/Footer";
import { ProvideTheme } from "@/app/config/muiconfig";
import FontAwesomeLoader from "./config/fontloader";
import Header from "./components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/app/logo192.png" />
        <link rel="preload" as="image" href="/images/alignmycareer.svg" />

        <FontAwesomeLoader />
      </head>
      <ReduxProvider>
          <body className={`${geistSans.variable} ${geistMono.variable}`}>
            {/* <div className="header-css">
              <Header />
              </div> */}
              <ProvideTheme>
            {children}
            <Footer />
        </ProvideTheme>
          </body>
      </ReduxProvider>
    </html>
  );
}
