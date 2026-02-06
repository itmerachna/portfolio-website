import localFont from "next/font/local";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Archivo, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import GradientWrapper from "./components/gradient-wrapper";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const trimMono = localFont({
  src: [
    {
      path: "../public/fonts/trim-mono/TrimMono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rachna Ravi",
  description: "Designer, Illustrator & Code-tinkerer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TRSEZ6SLHB"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TRSEZ6SLHB');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${archivo.variable} ${trimMono.variable} antialiased`}
      >
        <GradientWrapper>{children}</GradientWrapper>
        <Analytics />
      </body>
    </html>
  );
}
