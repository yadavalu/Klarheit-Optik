export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

const EXCHANGE_RATES: Record<string, number> = {
  EUR: 1,
  USD: 1.09,
  SGD: 1.46,
};

export function formatCurrency(
  amountEUR: number,
  currency: string = "EUR"
): string {
  const rate = EXCHANGE_RATES[currency] || 1;
  const converted = amountEUR * rate;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(converted);
}

export function convertCurrency(amountEUR: number, currency: string): number {
  const rate = EXCHANGE_RATES[currency] || 1;
  return amountEUR * rate;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function parseJsonField<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
}
