"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
  LogOut,
  LayoutDashboard,
  Hexagon,
} from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useAuthStore } from "@/store/auth-store";
import { logoutAction } from "@/actions/auth-actions";

const navLinks = [
  { href: "/products", label: "Products" },
  { href: "/products?category=lithography-equipment", label: "Lithography" },
  { href: "/products?category=photonic-sensors", label: "Photonics" },
  { href: "/products?category=photography-lenses", label: "Photography" },
  { href: "/products?category=optical-filters", label: "Filters" },
];

const currencies = ["EUR", "USD"];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { items, currency, setCurrency, setIsOpen: setCartOpen } = useCartStore();
  const { user, setAuthModalOpen, setUser } = useAuthStore();

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  async function handleLogout() {
    await logoutAction();
    setUser(null);
    setUserMenuOpen(false);
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-cream-300/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Hexagon
                className="w-8 h-8 text-purple-600 transition-transform duration-300 group-hover:rotate-90"
                strokeWidth={1.5}
              />
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
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="btn-ghost text-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center gap-2">
            {/* Currency Switcher */}
            <div className="flex items-center bg-white rounded-lg border border-cream-300 overflow-hidden">
              {currencies.map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                    currency === c
                      ? "bg-purple-600 text-purple-950"
                      : "text-purple-700 hover:text-purple-950"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Cart Button */}
            <button
              onClick={() => setCartOpen(true)}
              className="btn-ghost relative"
              id="cart-button"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-purple-600 rounded-full text-[10px] font-bold flex items-center justify-center text-purple-950"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="btn-ghost flex items-center gap-1.5"
                  id="user-menu-button"
                >
                  <div className="w-7 h-7 rounded-full bg-purple-600/20 border border-purple-600/40 flex items-center justify-center">
                    <span className="text-xs font-bold text-purple-600">
                      {user.name?.charAt(0) || user.email.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-purple-700" />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="absolute right-0 mt-2 w-56 glass-card p-2"
                    >
                      <div className="px-3 py-2 border-b border-cream-300 mb-1">
                        <p className="text-sm font-medium text-purple-950 truncate">
                          {user.name || user.email}
                        </p>
                        <p className="text-xs text-purple-700 truncate">
                          {user.email}
                        </p>
                      </div>
                      {user.role === "ADMIN" && (
                        <Link
                          href="/admin"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-purple-800 hover:text-purple-950 hover:bg-cream-200/60 rounded-lg transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-purple-800 hover:text-red-400 hover:bg-cream-200/60 rounded-lg transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                onClick={() => setAuthModalOpen(true, "login")}
                className="btn-ghost flex items-center gap-1.5"
                id="login-button"
              >
                <User className="w-5 h-5" />
                <span className="text-sm">Login</span>
              </button>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button onClick={() => setCartOpen(true)} className="btn-ghost relative">
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-purple-600 rounded-full text-[10px] font-bold flex items-center justify-center text-purple-950">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="btn-ghost"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden glass border-t border-cream-300/50"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 text-sm text-purple-800 hover:text-purple-950 hover:bg-cream-200/60 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-cream-300/50 pt-2 mt-2">
                <div className="flex items-center gap-2 px-3 py-2">
                  <span className="text-xs text-purple-700">Currency:</span>
                  {currencies.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCurrency(c)}
                      className={`px-3 py-1 text-xs font-medium rounded ${
                        currency === c
                          ? "bg-purple-600 text-purple-950"
                          : "text-purple-700 bg-cream-200"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-purple-800 hover:text-red-400"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout ({user.email})
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      setAuthModalOpen(true, "login");
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-purple-800 hover:text-purple-950"
                  >
                    <User className="w-4 h-4" />
                    Login / Register
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
