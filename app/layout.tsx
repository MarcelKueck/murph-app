// app/layout.tsx
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/core/Header";
import Footer from "@/components/core/Footer";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import NextAuthProvider from '@/components/core/NextAuthProvider';

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Murph – Medizinische Erklärungen",
  description: "Erhalten Sie verständliche medizinische Erklärungen von verifizierten Medizinstudenten. Sicher und vertraulich.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col",
          fontSans.variable
        )}
      >
        <NextAuthProvider>
          <Header />
           {/* --- Removed container classes from main --- */}
          <main className="flex-grow">
          {/* --- Now children pages/layouts control their own width/padding --- */}
            {children}
          </main>
          <Footer />
          <SonnerToaster richColors position="top-right" />
        </NextAuthProvider>
      </body>
    </html>
  );
}