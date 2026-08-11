"use client";

import { create } from "zustand";

interface User {
  id: string;
  email: string;
  role: string;
  name: string | null;
  companyName: string | null;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthModalOpen: boolean;
  authModalTab: "login" | "register";
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setAuthModalOpen: (open: boolean, tab?: "login" | "register") => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  isLoading: true,
  isAuthModalOpen: false,
  authModalTab: "login",

  setUser: (user) => set({ user, isLoading: false }),
  setLoading: (isLoading) => set({ isLoading }),
  setAuthModalOpen: (isAuthModalOpen, authModalTab) =>
    set({
      isAuthModalOpen,
      ...(authModalTab ? { authModalTab } : {}),
    }),
  logout: () => set({ user: null }),
}));
