import type { Metadata } from "next";
import { Poppins, Raleway } from "next/font/google";

import { SiteSidebar } from "@/components/site-sidebar";

import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-raleway",
});

export const metadata: Metadata = {
  title: "My portfolio — Personal portfolio",
  description:
    "One-page personal portfolio inspired by the iPortfolio Bootstrap template, built with Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${raleway.variable}`}>
      <body className="min-h-screen bg-background text-foreground">
        <SiteSidebar />
        <div className="min-h-screen pt-14 lg:pl-[300px] lg:pt-0">{children}</div>
      </body>
    </html>
  );
}
