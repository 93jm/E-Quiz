import type { Metadata } from "next";
import "react-loading-skeleton/dist/skeleton.css";
import "./globals.css";
import { RecoilRootProvider } from "@/app/_component";

export const metadata: Metadata = {
  title: "E-Quiz",
  description: "Simple and Eazy English Quiz",
  openGraph: {
    title: "E-Quiz | English Quiz",
    description: "Let's solve a problem composed in English",
    images: [
      {
        url: "https://e-quiz-lake.vercel.app/ogImage.png",
        width: 600,
        height: 400,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <RecoilRootProvider>{children}</RecoilRootProvider>
      </body>
    </html>
  );
}
