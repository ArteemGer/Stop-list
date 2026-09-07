import type { MenuItem, StockFilter } from "@/types/menuItem";
import { getStockStatus } from "./stockRules";

export function filterMenuItems(
  items: MenuItem[],
  searchQuery: string,
  statusFilter: StockFilter,
): MenuItem[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return items.filter((item) => {
    const matchesSearch =
      normalizedQuery === "" ||
      item.title.toLowerCase().includes(normalizedQuery);

    const status = getStockStatus(item.stock);

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "in_stock" && status !== "stopped") ||
      (statusFilter === "stopped" && status === "stopped");

    return matchesSearch && matchesStatus;
  });
}
