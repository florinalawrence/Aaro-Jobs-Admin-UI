import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aaro Jobs Admin Panel",
  description: "Aaro Jobs platform administration dashboard",
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
