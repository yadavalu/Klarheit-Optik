"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  productId: string;
  name: string;
  slug: string;
  priceEUR: number;
  quantity: number;
  image: string;
  sku: string;
}

interface CartState {
  items: CartItem[];
  currency: string;
  isOpen: boolean;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setCurrency: (currency: string) => void;
  setIsOpen: (isOpen: boolean) => void;
  totalItems: () => number;
  totalEUR: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      currency: "EUR",
      isOpen: false,

      addItem: (item) => {
        const items = get().items;
        const existing = items.find((i) => i.productId === item.productId);
        if (existing) {
          set({
            items: items.map((i) =>
              i.productId === item.productId
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          });
        } else {
          set({ items: [...items, { ...item, quantity: 1 }] });
        }
      },

      removeItem: (productId) => {
        set({ items: get().items.filter((i) => i.productId !== productId) });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.productId === productId ? { ...i, quantity } : i
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      setCurrency: (currency) => set({ currency }),

      setIsOpen: (isOpen) => set({ isOpen }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      totalEUR: () =>
        get().items.reduce((sum, i) => sum + i.priceEUR * i.quantity, 0),
    }),
    {
      name: "klarheit-cart",
      partialize: (state) => ({
        items: state.items,
        currency: state.currency,
      }),
    }
  )
);
