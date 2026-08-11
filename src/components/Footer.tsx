import Link from "next/link";
import { Hexagon, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-cream-50 border-t border-cream-300/50 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Hexagon className="w-8 h-8 text-purple-600" strokeWidth={1.5} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-purple-950">KO</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-purple-950 tracking-wider">
                  KLARHEIT
                </span>
                <span className="text-[10px] text-purple-700 tracking-[0.3em] -mt-0.5">
                  OPTIK
                </span>
              </div>
            </div>
            <p className="text-sm text-purple-700 leading-relaxed">
              Precision optical systems and components for semiconductor,
              photonics, and imaging industries. ISO 9001 certified manufacturing
              and global export compliance.
            </p>
            <div className="flex items-center gap-3 text-purple-700">
              <span className="badge-info text-[10px]">ISO 9001</span>
              <span className="badge-info text-[10px]">ITAR Compliant</span>
              <span className="badge-info text-[10px]">CE Marked</span>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-sm font-semibold text-purple-950 mb-4 tracking-wider uppercase">
              Products
            </h4>
            <ul className="space-y-2.5">
              {[
                { href: "/products?category=lithography-equipment", label: "Lithography Equipment" },
                { href: "/products?category=photonic-sensors", label: "Photonic Sensors" },
                { href: "/products?category=photography-lenses", label: "Photography Lenses" },
                { href: "/products?category=optical-filters", label: "Optical Filters" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-purple-700 hover:text-purple-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-purple-950 mb-4 tracking-wider uppercase">
              Services
            </h4>
            <ul className="space-y-2.5">
              {[
                "B2B Export Quotes",
                "Certificate of Analysis (CoA)",
                "Custom Optical Coatings",
                "Technical Consultation",
                "Installation Support",
              ].map((item) => (
                <li key={item}>
                  <span className="text-sm text-purple-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-purple-950 mb-4 tracking-wider uppercase">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
                <span className="text-sm text-purple-700">
                  Optik-Zentrum 42<br />
                  07745 Jena, Germany
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-purple-600 shrink-0" />
                <span className="text-sm text-purple-700">+49 3641 555-0</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-purple-600 shrink-0" />
                <span className="text-sm text-purple-700">
                  sales@klarheit-optik.de
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-cream-300/50 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-purple-600">
            © {new Date().getFullYear()} Klarheit Optik GmbH. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-purple-600">
            <span>Export License DE-2024-OPT-00842</span>
            <span>•</span>
            <span>Tax ID: DE123456789</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
