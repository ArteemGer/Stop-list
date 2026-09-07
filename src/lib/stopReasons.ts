import type { StopReason } from "@/types/menuItem";

export const stopReasons: {
  value: StopReason;
  label: string;
}[] = [
  {
    value: "sold_out",
    label: "Товар закончился",
  },
  {
    value: "no_supply",
    label: "Нет поставки",
  },
  {
    value: "quality",
    label: "Проблемы с качеством",
  },
  {
    value: "other",
    label: "Другая причина",
  },
];
