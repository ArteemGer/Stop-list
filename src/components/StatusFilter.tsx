import { Pressable, Text, View } from "react-native";

import { useMenuStore } from "@/store/menuStore";
import type { StockFilter } from "@/types/menuItem";

const filters: Array<{
  value: StockFilter;
  label: string;
}> = [
  {
    value: "all",
    label: "Все",
  },
  {
    value: "in_stock",
    label: "В продаже",
  },
  {
    value: "stopped",
    label: "Стоп",
  },
];

export default function StatusFilter() {
  const statusFilter = useMenuStore((state) => state.statusFilter);
  const setStatusFilter = useMenuStore((state) => state.setStatusFilter);

  return (
    <View className="mb-4 flex-row gap-2">
      {filters.map((filter) => {
        const isActive = statusFilter === filter.value;

        return (
          <Pressable
            key={filter.value}
            onPress={() => setStatusFilter(filter.value)}
            className={`rounded-full border px-4 py-2 ${
              isActive
                ? "border-[#C6462F] bg-[#C6462F]"
                : "border-[#D8D2C9] bg-white"
            }`}
          >
            <Text
              className={`font-medium ${
                isActive ? "text-white" : "text-[#171512]"
              }`}
            >
              {filter.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
