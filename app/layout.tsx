import type { Metadata } from "next";
import { Barlow_Condensed, Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const display = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ulinkeun — Pergi sejenak, cerita selamanya",
  description:
    "Temukan sisi lain Indonesia bersama Ulinkeun. Jelajahi Bali, Bromo, Labuan Bajo, dan Raja Ampat; mulai cerita perjalananmu di sini.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${display.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
