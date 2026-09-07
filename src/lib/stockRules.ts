import { StockStatus } from "@/types/menuItem";

export function parseStock(raw: string): number | null {
  const cleaned = raw.trim().replace(/\s/g, "");

  if (!/^\d{1,3}$/.test(cleaned)) {
    return null;
  }

  return Number(cleaned);
}

export function getStockStatus(stock: number): StockStatus {
  if (stock === 0) {
    return "stopped";
  }

  if (stock <= 5) {
    return "low";
  }

  return "in_stock";
}

export function validateStock(value: string): string | null {
  const stock = parseStock(value);

  if (stock === null) {
    return "Только целое число от 0 до 999";
  }

  return null;
}
