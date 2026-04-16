import type { Metadata } from "next";

import { SiteSidebar } from "@/components/site-sidebar";

import "./globals.css";

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
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <SiteSidebar />
        <div className="min-h-screen pt-14 lg:pl-[300px] lg:pt-0">{children}</div>
      </body>
    </html>
  );
}
