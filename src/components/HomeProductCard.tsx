"use client";

import { ProductCard } from "./ProductCard";

interface HomeProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    sku: string;
    priceEUR: number;
    stock: number;
    isRFQOnly: boolean;
    images: string;
    description: string;
    category: { name: string; slug: string };
  };
}

export function HomeProductCard({ product }: HomeProductCardProps) {
  return <ProductCard product={product} />;
}
