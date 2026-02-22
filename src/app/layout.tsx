import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { VisitorTracker } from "@/components/common/VisitorTracker";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Insumatch - 보험전문 채용사이트",
  description:
    "보험전문 채용사이트 Insumatch에서 채용의 날개를 달아 드립니다. FC, TMR, 총무 등 다양한 보험 채용 정보 제공.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={inter.variable}>
      <body
        className={cn(
          "font-sans antialiased min-h-screen bg-white text-slate-900 flex flex-col"
        )}
      >
        <VisitorTracker />
        <Header />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
