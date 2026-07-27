import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story",
  description: "A romantic story for someone special",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}