import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.scss";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Millionaire Game",
  description: "Who Wants to Be a Millionaire",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang="en" className={inter.variable}>
    <body className={inter.className}>{children}</body>
  </html>
);

export default RootLayout;
