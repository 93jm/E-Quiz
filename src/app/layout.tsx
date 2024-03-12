import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "react-loading-skeleton/dist/skeleton.css";
import "./globals.css";
import { RecoilRootProvider } from "@/app/_component";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Quiz",
  description: "Simple and Eazy English Quiz",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <RecoilRootProvider>{children}</RecoilRootProvider>
      </body>
    </html>
  );
}
