import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { ThemeProvider } from "@/components/ThemeProvider";
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
  metadataBase: new URL("https://rueride.fr"),
  title: "VTC Ride - Your Paris Ride Awaits",
  description:
    "Simple, reliable rides across Paris. Calculate your fare and book your ride in seconds.",
  icons: {
    icon: "/logo-light.png",
    apple: "/logo-light.png",
  },
  openGraph: {
    title: "VTC Ride - Your Paris Ride Awaits",
    description:
      "Simple, reliable rides across Paris. Calculate your fare and book your ride in seconds.",
    images: ["/logo-light.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
