import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/app/providers";
import CustomCursor from "@/components/CustomCursor";
import CanvasBackground from "@/components/CanvasBackground";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Priyanshu Chand | AI Engineer & Full Stack Developer",
  description: "Interactive portfolio of Priyanshu Chand. AI Engineer, Full Stack Developer, Machine Learning Enthusiast, and Data Analyst. Explore the digital workspace.",
  keywords: [
    "Priyanshu Chand",
    "AI Engineer",
    "Full Stack Developer",
    "Machine Learning",
    "Data Analyst",
    "Next.js Portfolio",
    "Interactive Resume"
  ],
  authors: [{ name: "Priyanshu Chand" }],
  openGraph: {
    title: "Priyanshu Chand | AI Engineer & Full Stack Developer",
    description: "Explore the digital workspace and portfolio of Priyanshu Chand.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Priyanshu Chand | AI Engineer & Full Stack Developer",
    description: "Explore the digital workspace and portfolio of Priyanshu Chand.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark`}
      style={{ colorScheme: "dark" }}
    >
      <body className="bg-[#050505] text-white antialiased overflow-x-hidden">
        <Providers>
          <CustomCursor />
          <CanvasBackground />
          <Navbar />
          <main className="relative z-10 w-full min-h-screen">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
