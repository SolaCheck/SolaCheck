import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
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
  title: "SolaCheck",
  description: "Understand any wallet in seconds. Powered by SolaCheck.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        {/* Tidio Chatbot Script */}
        <Script
          src="//code.tidio.co/mlf5ul569eb4lr4ni7btffeluwsbwes9.js"
          strategy="afterInteractive"
        />

        {children}

        {/* Footer global */}
        <footer className="w-full bg-black text-gray-400 py-6 px-4 mt-12 border-t border-gray-700 text-sm">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Logo + texto */}
            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="flex items-center gap-2 hover:opacity-80 transition"
              >
                <Image
                  src="/logoremovebg.png"
                  alt="SolaCheck Logo"
                  width={32}
                  height={32}
                />
                <span className="text-white font-semibold text-base">
                  SolaCheck
                </span>
              </Link>
              <p className="ml-2 text-center md:text-left text-sm">
                &copy; {new Date().getFullYear()} — Visibility & Privacy
              </p>
            </div>

            {/* Enlaces */}
            <div className="flex flex-wrap justify-center md:justify-end gap-4">
              <Link
                href="/whitepaper"
                className="hover:text-white underline transition"
              >
                Whitepaper
              </Link>
              <a
                href="mailto:solacheckorigin@gmail.com"
                className="hover:text-white underline transition"
              >
                Contact
              </a>
              <a
                href="https://x.com/SolaCheck"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white underline transition"
              >
                X (formerly Twitter)
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
