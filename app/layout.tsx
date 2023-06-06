import NavBar from "@/components/nav_bar";
import "./globals.css";
import { Inter } from "next/font/google";
import Player from "@/components/player";
import Join from "@/components/join";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Soundly",
  description: "Music Sharing Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gray-900 m-auto max-w-[1184px] p-8 tablet:p-4 phone:p-3 leading-[150%] relative`}
      >
        <Join>
          <NavBar />
          <Player>{children}</Player>
        </Join>
        <Analytics />
      </body>
    </html>
  );
}
