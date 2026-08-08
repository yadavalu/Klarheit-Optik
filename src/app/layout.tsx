import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Klarheit Optik | Premium Deutsche Linsen",
  description: "Entdecken Sie handgefertigte Präzisions-Kamera- und Kino-Linsen aus Deutschland. Ausgestattet mit modernsten Vergütungen und deutscher Ingenieurskunst.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--fg-primary)' }}>
        <CartProvider>
          <div className="layout-container">
            {/* Ambient Background Lights */}
            <div className="ambient-glows">
              <div className="glow-top-right"></div>
              <div className="glow-bottom-left"></div>
            </div>

            <Navbar />
            
            <main style={{ flex: 1, zIndex: 10, position: 'relative' }}>
              {children}
            </main>

            <CartDrawer />

            {/* Custom Footer */}
            <footer className="glass-panel" style={{
              marginTop: '80px',
              padding: '40px 24px',
              borderRadius: '24px 24px 0 0',
              borderBottom: 'none',
              borderLeft: 'none',
              borderRight: 'none'
            }}>
              <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '40px'
              }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '16px', fontFamily: 'var(--font-display)' }}>
                    KLARHEIT OPTIK
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--fg-secondary)', lineHeight: '1.5', marginBottom: '20px' }}>
                    Seit Generationen stehen deutsche Linsen für Perfektion in der optischen Industrie. Klarheit bringt diese Technologie direkt zu Ihnen.
                  </p>
                  <div className="eng-seal">
                    Hergestellt in Deutschland
                  </div>
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', color: '#ffffff', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Standorte
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.85rem', color: 'var(--fg-secondary)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li>Wetzlar Werk: Kamera-Präzisionsoptiken</li>
                    <li>Oberkochen Werk: Astro- & Spezialbeschichtungen</li>
                    <li>München Werk: Cine-Anamorphoten</li>
                  </ul>
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', color: '#ffffff', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Kundenservice
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.85rem', color: 'var(--fg-secondary)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li>Kostenloser DHL Express Versand</li>
                    <li>5 Jahre deutsche Herstellergarantie</li>
                    <li>24/7 Technischer Support</li>
                    <li>Umsatzsteuerfreie EU-Lieferungen</li>
                  </ul>
                </div>
              </div>

              <div style={{
                maxWidth: '1200px',
                margin: '40px auto 0 auto',
                paddingTop: '20px',
                borderTop: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.75rem',
                color: 'var(--fg-secondary)',
                flexWrap: 'wrap',
                gap: '16px'
              }}>
                <p>&copy; {new Date().getFullYear()} Klarheit Optik GmbH. Alle Rechte vorbehalten.</p>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <a href="#">Impressum</a>
                  <a href="#">Datenschutz</a>
                  <a href="#">AGB</a>
                </div>
              </div>
            </footer>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
