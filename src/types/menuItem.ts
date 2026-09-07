export type StockStatus = "in_stock" | "low" | "stopped";

export type StopReason = "sold_out" | "no_supply" | "quality" | "other";

export interface MenuItem {
  id: string;
  title: string;
  category: "Кухня" | "Бар" | "Десерты";
  stock: number; //0–999
}

export interface StockUpdatePayload {
  id: string;
  stock: number;
  reason: StopReason;
}

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: { code: "network" | "unknown"; message: string } };

export type StockFilter = "all" | "in_stock" | "stopped";
