import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import ChatBot from "@/components/ui/ChatBot";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "GSAA Global",
  description: "Entertainment Meets Rewards",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${inter.variable} antialiased bg-bg-dark text-text-white`}
      >
        <LoadingScreen />
        <SmoothScroll>
          <Navbar />
          {children}
        </SmoothScroll>
        <ChatBot />
      </body>
    </html>
  );
}
