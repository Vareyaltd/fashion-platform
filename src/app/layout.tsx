import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import AuthProvider from "@/components/auth/AuthProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VAREYA | Digital Fashion Civilization",
  description: "A cinematic digital fashion universe where users can explore virtual fashion worlds, create AI-powered outfits, and discover exclusive drops.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${outfit.variable} antialiased font-sans`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
