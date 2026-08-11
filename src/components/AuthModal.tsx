"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { loginAction, registerAction } from "@/actions/auth-actions";

export function AuthModal() {
  const { isAuthModalOpen, authModalTab, setAuthModalOpen } = useAuthStore();
  const [activeTab, setActiveTab] = useState<"login" | "register">(authModalTab);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuthStore();

  // Sync tab when modal opens
  if (isAuthModalOpen && activeTab !== authModalTab) {
    setActiveTab(authModalTab);
    setError("");
  }

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError("");
    try {
      const result =
        activeTab === "login"
          ? await loginAction(formData)
          : await registerAction(formData);

      if ("error" in result && result.error) {
        setError(result.error);
      } else if ("user" in result && result.user) {
        setUser(result.user as { id: string; email: string; role: string; name: string | null; companyName: string | null });
        setAuthModalOpen(false);
        setError("");
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence>
      {isAuthModalOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="overlay"
            onClick={() => setAuthModalOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-w-md glass-card p-0 overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-6 pb-4 border-b border-cream-300/50">
                <h2 className="text-lg font-semibold text-purple-950">
                  {activeTab === "login" ? "Welcome Back" : "Create Account"}
                </h2>
                <button
                  onClick={() => setAuthModalOpen(false)}
                  className="btn-ghost p-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-cream-300/50">
                {(["login", "register"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      setError("");
                    }}
                    className={`flex-1 px-4 py-3 text-sm font-medium transition-colors relative ${
                      activeTab === tab
                        ? "text-purple-600"
                        : "text-purple-700 hover:text-purple-950"
                    }`}
                  >
                    {tab === "login" ? "Sign In" : "Register"}
                    {activeTab === tab && (
                      <motion.div
                        layoutId="auth-tab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Form */}
              <form action={handleSubmit} className="p-6 space-y-4">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-sm text-red-400"
                  >
                    {error}
                  </motion.div>
                )}

                {activeTab === "register" && (
                  <div>
                    <label htmlFor="auth-name" className="input-label">
                      Full Name
                    </label>
                    <input
                      id="auth-name"
                      name="name"
                      type="text"
                      required
                      className="input"
                      placeholder="Dr. Jane Smith"
                    />
                  </div>
                )}

                <div>
                  <label htmlFor="auth-email" className="input-label">
                    Email Address
                  </label>
                  <input
                    id="auth-email"
                    name="email"
                    type="email"
                    required
                    className="input"
                    placeholder="you@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="auth-password" className="input-label">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="auth-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      className="input pr-10"
                      placeholder="••••••••"
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-600 hover:text-purple-950 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {activeTab === "register" && (
                  <div>
                    <label htmlFor="auth-company" className="input-label">
                      Company Name{" "}
                      <span className="text-purple-600">(optional)</span>
                    </label>
                    <input
                      id="auth-company"
                      name="companyName"
                      type="text"
                      className="input"
                      placeholder="Photonics Research GmbH"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : activeTab === "login" ? (
                    "Sign In"
                  ) : (
                    "Create Account"
                  )}
                </button>

                {activeTab === "login" && (
                  <div className="text-center">
                    <p className="text-xs text-purple-600">
                      Demo credentials: admin@klarheit-optik.de / admin123
                    </p>
                  </div>
                )}
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
