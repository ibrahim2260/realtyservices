import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: "variable",
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://schneiderrealty.com"),
  title: {
    default: "Schneider Realty Services | Staten Island Commercial Investment",
    template: "%s | Schneider Realty Services",
  },
  description:
    "Staten Island's exclusive commercial investment specialist. 27 years, 1,000+ properties, $400M+ in career sales. Investment land, multifamily, retail, office, industrial — Michael Schneider.",
  keywords: [
    "Staten Island commercial real estate",
    "commercial investment broker",
    "Staten Island investment property",
    "Michael Schneider broker",
    "Staten Island multifamily",
    "commercial property Staten Island",
    "investment sales Staten Island",
    "1031 exchange Staten Island",
  ],
  authors: [{ name: "Schneider Realty Services" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://schneiderrealty.com",
    siteName: "Schneider Realty Services",
    title: "Schneider Realty Services | Staten Island Commercial Investment",
    description:
      "Staten Island's exclusive commercial investment specialist. 27 years, 1,000+ properties, $400M+.",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Schneider Realty Services — Staten Island Commercial Investment",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@SRSstatenisland",
    creator: "@SRSstatenisland",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
      className={`${fraunces.variable} ${inter.variable} ${ibmPlexMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
