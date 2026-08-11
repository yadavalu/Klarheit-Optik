"use server";

import { prisma } from "@/lib/db";

export async function getProducts(params?: {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  rfqOnly?: boolean;
  inStock?: boolean;
  featured?: boolean;
  page?: number;
  limit?: number;
}) {
  const {
    category,
    search,
    minPrice,
    maxPrice,
    rfqOnly,
    inStock,
    featured,
    page = 1,
    limit = 12,
  } = params || {};

  const where: Record<string, unknown> = {};

  if (category) {
    where.category = { slug: category };
  }
  if (search) {
    where.OR = [
      { name: { contains: search } },
      { description: { contains: search } },
      { sku: { contains: search } },
    ];
  }
  if (minPrice !== undefined) {
    where.priceEUR = { ...((where.priceEUR as Record<string, unknown>) || {}), gte: minPrice };
  }
  if (maxPrice !== undefined) {
    where.priceEUR = { ...((where.priceEUR as Record<string, unknown>) || {}), lte: maxPrice };
  }
  if (rfqOnly !== undefined) {
    where.isRFQOnly = rfqOnly;
  }
  if (inStock) {
    where.stock = { gt: 0 };
  }
  if (featured) {
    where.featured = true;
  }

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { category: true },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.product.count({ where }),
  ]);

  return {
    products,
    total,
    pages: Math.ceil(total / limit),
    page,
  };
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });
}

export async function getCategories() {
  return prisma.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { name: "asc" },
  });
}

export async function getFeaturedProducts() {
  return prisma.product.findMany({
    where: { featured: true },
    include: { category: true },
    take: 6,
  });
}

export async function getRelatedProducts(categoryId: string, excludeId: string) {
  return prisma.product.findMany({
    where: {
      categoryId,
      id: { not: excludeId },
    },
    include: { category: true },
    take: 4,
  });
}

export async function createProduct(data: {
  name: string;
  slug: string;
  sku: string;
  categoryId: string;
  priceEUR: number;
  stock: number;
  isRFQOnly: boolean;
  description: string;
  technicalSpecs: string;
  images: string;
  featured: boolean;
}) {
  return prisma.product.create({ data });
}

export async function updateProduct(
  id: string,
  data: Partial<{
    name: string;
    slug: string;
    sku: string;
    categoryId: string;
    priceEUR: number;
    stock: number;
    isRFQOnly: boolean;
    description: string;
    technicalSpecs: string;
    images: string;
    featured: boolean;
  }>
) {
  return prisma.product.update({ where: { id }, data });
}

export async function deleteProduct(id: string) {
  return prisma.product.delete({ where: { id } });
}
