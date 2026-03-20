import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
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
  title: {
    default: "FenerIndex - The Pulse of Fenerbahce Fans",
    template: "%s | FenerIndex",
  },
  description:
    "Fan-powered transfer intelligence for Fenerbahce. Vote on rumors, call cap on fake news, and see what the hive mind really thinks.",
  keywords: [
    "Fenerbahce",
    "transfer rumors",
    "fan voting",
    "Super Lig",
    "football",
    "soccer",
    "sentiment",
  ],
  openGraph: {
    title: "FenerIndex - The Pulse of Fenerbahce Fans",
    description:
      "Fan-powered transfer intelligence. Vote on rumors, expose fakes, shape the narrative.",
    type: "website",
    siteName: "FenerIndex",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "FenerIndex - The Pulse of Fenerbahce Fans",
    description:
      "Fan-powered transfer intelligence. Vote on rumors, expose fakes, shape the narrative.",
  },
  robots: {
    index: true,
    follow: true,
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
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
