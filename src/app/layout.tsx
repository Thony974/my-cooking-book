import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="layoutHeader">
          <Link href="/" className="layoutHeader">
            My cooking book
          </Link>
        </div>
        {children}
        <div className="layoutFooter">
          <span>@Thony974</span>
        </div>
      </body>
    </html>
  );
}
