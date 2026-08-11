import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import ThemeProvider from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { AuthModal } from "@/components/AuthModal";
import { AuthInitializer } from "@/components/AuthInitializer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Klarheit Optik — Precision Optical Systems & Components",
    template: "%s | Klarheit Optik",
  },
  description:
    "Enterprise-grade optical systems, lithography components, photonic sensors, and precision lenses. B2B & B2C global export platform for industrial and scientific optics.",
  keywords: [
    "optical systems",
    "lithography optics",
    "photonic sensors",
    "precision lenses",
    "optical filters",
    "EUV optics",
    "industrial optics",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${playfair.variable}`}>
      <body className="font-[family-name:var(--font-inter)]">
        <ThemeProvider>
          <AuthInitializer />
          <Navbar />
          <CartDrawer />
          <AuthModal />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
