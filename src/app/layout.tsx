import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AL ABABIL - Professional Document Clearing Services in UAE",
  description: "Expert document clearing, visa processing, business setup, and PRO services across all Emirates. Fast, reliable, and professional assistance for all your UAE government paperwork needs.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  keywords: "document clearing UAE, visa services Dubai, business setup UAE, PRO services, trade license UAE, company formation Dubai",
  authors: [{ name: "AL ABABIL Documents Clearing Co." }],
  robots: "index, follow",
  openGraph: {
    title: "AL ABABIL - Professional Document Clearing Services in UAE",
    description: "Expert document clearing, visa processing, business setup, and PRO services across all Emirates.",
    type: "website",
    locale: "en_AE",
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="facebook-domain-verification" content="7jfxb32nkbn25138xkfjyh7uu36sar" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="website icon" type="png" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
