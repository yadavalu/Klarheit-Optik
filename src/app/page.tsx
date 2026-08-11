import Link from "next/link";
import {
  ArrowRight,
  Cpu,
  Zap,
  Camera,
  Filter,
  ShieldCheck,
  FileCheck,
  Globe,
} from "lucide-react";
import { getFeaturedProducts, getCategories } from "@/actions/product-actions";
import { HomeProductCard } from "@/components/HomeProductCard";

const categoryIcons: Record<string, React.ReactNode> = {
  Cpu: <Cpu className="w-7 h-7" />,
  Zap: <Zap className="w-7 h-7" />,
  Camera: <Camera className="w-7 h-7" />,
  Filter: <Filter className="w-7 h-7" />,
};

const features = [
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Export Compliance",
    description:
      "Full ITAR, EAR, and EU Dual-Use export compliance. Every shipment includes proper export documentation and end-use verification.",
  },
  {
    icon: <FileCheck className="w-6 h-6" />,
    title: "Certificate of Analysis",
    description:
      "All optical components ship with individual Certificates of Analysis (CoA) including measured performance data and traceability.",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Global Shipping",
    description:
      "Climate-controlled logistics to 90+ countries. Specialized packaging for sensitive optics with real-time tracking and insurance.",
  },
];

export default async function HomePage() {
  const [featuredProducts, categories] = await Promise.all([
    getFeaturedProducts(),
    getCategories(),
  ]);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-cream-100">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.12),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(147,197,253,0.06),transparent_60%)]" />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
          {/* Animated scan line */}
          <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-500/40 to-transparent" style={{ animation: "scan-line 8s linear infinite" }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <div className="max-w-3xl">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-600/10 border border-purple-600/20 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse" />
              <span className="text-xs font-medium text-purple-600 tracking-wider uppercase">
                Enterprise Optical Systems
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-hero text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="gradient-text">Precision Optics</span>
              <br />
              <span className="text-purple-950">
                for Science & Industry
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg text-purple-800 leading-relaxed mb-10 max-w-xl">
              From EUV lithography lenses to broadband photodetectors —
              engineered optical components with nanometer-class precision.
              B2B export quotes and direct purchase.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link href="/products" className="btn-primary flex items-center gap-2 text-base">
                Browse Industrial Optics
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/products?rfq=true"
                className="btn-secondary flex items-center gap-2 text-base"
              >
                Request Photonic Quote
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-16">
              {[
                { value: "90+", label: "Countries" },
                { value: "500+", label: "Products" },
                { value: "ISO 9001", label: "Certified" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-purple-950">{stat.value}</p>
                  <p className="text-xs text-purple-600 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-hero text-3xl font-bold text-purple-950 mb-3">
              Optical Categories
            </h2>
            <p className="text-purple-700 max-w-lg mx-auto">
              Explore our comprehensive range of precision optical systems and
              components
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categories.map((category, i) => (
              <Link
                key={category.id}
                href={`/products?category=${category.slug}`}
                className="group"
              >
                <div
                  className="glass-card p-6 h-full flex flex-col"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-purple-600/10 border border-purple-600/20 flex items-center justify-center text-purple-600 mb-4 group-hover:bg-purple-600/20 transition-colors">
                    {categoryIcons[category.icon || "Filter"]}
                  </div>
                  <h3 className="text-lg font-semibold text-purple-950 mb-2 group-hover:text-purple-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-purple-700 flex-1 line-clamp-3">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-cream-300/50">
                    <span className="text-xs text-purple-600">
                      {category._count.products} products
                    </span>
                    <ArrowRight className="w-4 h-4 text-purple-600 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-cream-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="font-hero text-3xl font-bold text-purple-950 mb-2">
                Featured Products
              </h2>
              <p className="text-purple-700">
                Top-selling optical components and systems
              </p>
            </div>
            <Link
              href="/products"
              className="btn-ghost flex items-center gap-1.5 text-sm"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <HomeProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-hero text-3xl font-bold text-purple-950 mb-3">
              Enterprise-Grade Service
            </h2>
            <p className="text-purple-700 max-w-lg mx-auto">
              Trusted by semiconductor fabs, research institutions, and optics
              integrators worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="glass-card p-6 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-600/10 border border-purple-600/20 flex items-center justify-center text-purple-600 mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-purple-950 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-purple-700 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cream-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-hero text-3xl font-bold text-purple-950 mb-4">
            Need Custom Optical Solutions?
          </h2>
          <p className="text-lg text-purple-800 mb-8 max-w-xl mx-auto">
            Our optical engineers can design and manufacture custom components to
            your exact specifications.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/products?rfq=true"
              className="btn-primary flex items-center gap-2"
            >
              Request a Quote
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/products" className="btn-secondary">
              Browse Catalog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
