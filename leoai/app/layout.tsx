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
  title: "Leo",
  description: "A rigorous digital health startup analyst",
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
