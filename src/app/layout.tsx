import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AstraDAT — Tokenized Transparency",
  description:
    "AstraDAT unites Wall Street trust with blockchain clarity as the first tokenized treasury on Nasdaq.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased bg-[var(--surface)] text-[var(--text-primary)]`}
      >
        {children}
      </body>
    </html>
  );
}
