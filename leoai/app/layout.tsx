import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Cinzel } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

// Configure Cinzel for headings
const cinzel = Cinzel({ 
  subsets: ['latin'],
  weight: ['400', '600', '700'],  // Regular, SemiBold, Bold
  variable: '--font-cinzel',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Leo AI | Digital Health Startup Analyst",
  description:
    "The Leo HealthTech Analyst is an AI-powered strategic auditing tool designed to drastically reduce the high failure rate of digital health startups, which often fail due to flawed strategy and implementation rather than poor technology.",
  keywords: [
    "Kwadwo Ohene Darko",
    "",
    "Digital Health Startup",
    "AI",
    "AI Analyst",
    "Health Informatics",
    "Full Stack Developer",
    "Front-end Developer",
    "Web Developer",
    "Next.js Developer",
    "React Developer",
  ],
  authors: [{ name: "Kwadwo Ohene Darko" }],
  openGraph: {
    title: "Leo AI | Digital Health Startup Analyst",
    description:
      "The Leo HealthTech Analyst is an AI-powered strategic auditing tool designed to drastically reduce the high failure rate of digital health startups.",
    url: "https://leo-phi-olive.vercel.app/",
    siteName: "Leo AI",
    images: [
      {
        url: "https://leo-phi-olive.vercel.app/leologo.png", // create one with your name/photo
        width: 600,
        height: 600,
        alt: "Leo Digital Startup Analyst",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Leo AI | Digital Health Startup Analyst",
    description:
      "The Leo HealthTech Analyst is an AI-powered strategic auditing tool designed to drastically reduce the high failure rate of digital health startups.",
    creator: "@ohene_kwadwo", // optional
    images: ["https://leo-phi-olive.vercel.app/leologo.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL("https://leo-phi-olive.vercel.app"),
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${cinzel.variable} antialiased`}
      >
        {children}
        <Toaster />
        <Sonner />
      </body>
    </html>
  );
}
