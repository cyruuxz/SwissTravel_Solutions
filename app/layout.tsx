import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = localFont({
  src: [
    {
      path: "../public/fonts/Fraunces-VariableFont.ttf",
      style: "normal",
    },
    {
      path: "../public/fonts/Fraunces-Italic-VariableFont.ttf",
      style: "italic",
    },
  ],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "SwissTravel Solutions – Reisen, die zu Ihnen passen",
    template: "%s | SwissTravel Solutions",
  },
  description:
    "Persönlich geplante Reisen aus Lenzburg. Massgeschneidert für unsere Kunden weltweit. Schweizer Reiseexpertise seit 1987.",
  openGraph: {
    type: "website",
    locale: "de_CH",
    siteName: "SwissTravel Solutions",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">{children}</body>
    </html>
  );
}
