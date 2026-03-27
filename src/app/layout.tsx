import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProviders from "@/providers/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EcoSpark",
  description: "EcoSpark",
  icons: {
    icon: [
      { url: 'https://i.ibb.co.com/KHJvgRG/icon-A.png' },
      { url: 'https://i.ibb.co.com/KHJvgRG/icon-A.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/iconA.png',
    apple: '/iconA.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProviders>
          {children}
        </QueryProviders>
      </body>
    </html>
  );
}

