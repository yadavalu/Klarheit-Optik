import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  ChevronRight,
  Hexagon,
} from "lucide-react";

const adminNav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders & RFQs", icon: ShoppingCart },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user || user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="pt-16 min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-cream-50 border-r border-cream-300/50 fixed left-0 top-16 bottom-0 hidden lg:block overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="relative">
              <Hexagon className="w-6 h-6 text-purple-600" strokeWidth={1.5} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[8px] font-bold text-purple-950">KO</span>
              </div>
            </div>
            <span className="text-sm font-semibold text-purple-950 tracking-wider">
              ADMIN PANEL
            </span>
          </div>

          <nav className="space-y-1">
            {adminNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-purple-700 hover:text-purple-950 hover:bg-white/80 transition-colors group"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
                <ChevronRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-cream-300/50">
          <div className="text-xs text-purple-600">
            <p>Logged in as</p>
            <p className="text-purple-800 font-medium truncate">{user.email}</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-6 lg:p-8">
        {/* Mobile nav */}
        <div className="lg:hidden flex gap-2 mb-6 overflow-x-auto pb-2">
          {adminNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="btn-ghost flex items-center gap-1.5 text-sm shrink-0"
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </div>
        {children}
      </main>
    </div>
  );
}
