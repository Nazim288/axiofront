import type { Metadata } from "next";
import localFont from "next/font/local";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";
import { UserProvider } from "@/contexts/UserContext";
import { GenderProvider } from "@/contexts/GenderContext";
import { UserDataLoader } from "@/components/UserDataLoader";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Axiogram",
  description: "Axiogram",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} antialiased`}
      >
        <UserProvider>
          <GenderProvider>
            <UserDataLoader />
            <Header />
            <main className="w-full px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10 max-w-6xl min-h-[calc(100vh-140px)] mx-auto">
              {children}
            </main>
            <Footer />
            <Toaster richColors position="top-center" />
          </GenderProvider>
        </UserProvider>
      </body>
    </html>
  );
}
