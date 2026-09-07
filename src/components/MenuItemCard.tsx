import { Pressable, Text, View } from "react-native";

import { getStockStatus } from "@/lib/stockRules";
import type { MenuItem } from "@/types/menuItem";

interface MenuItemCardProps {
  item: MenuItem;
  onPress: () => void;
}

const statusConfig = {
  in_stock: {
    label: "В наличии",
    className: "border-[#A7C7A0] bg-[#EDF5EB]",
    textClassName: "text-[#47733F]",
  },
  low: {
    label: "Мало",
    className: "border-[#D6B875] bg-[#FBF4DF]",
    textClassName: "text-[#8A691D]",
  },
  stopped: {
    label: "Стоп",
    className: "border-[#D99A8F] bg-[#FBEDEA]",
    textClassName: "text-[#C6462F]",
  },
} as const;

export default function MenuItemCard({ item, onPress }: MenuItemCardProps) {
  const status = getStockStatus(item.stock);
  const statusStyle = statusConfig[status];

  return (
    <Pressable
      onPress={onPress}
      className="mb-3 rounded-2xl border border-[#DDD8D0] bg-white p-4 active:opacity-70"
    >
      <View className="flex-row items-start justify-between">
        <View className="flex-1 pr-4">
          <Text className="text-lg font-semibold text-[#171512]">
            {item.title}
          </Text>

          <Text className="mt-1 text-sm text-[#6F6A63]">{item.category}</Text>
        </View>

        <View className="items-end">
          <Text className="text-lg font-semibold text-[#171512]">
            {item.stock}
          </Text>

          <Text className="text-xs text-[#6F6A63]">шт.</Text>
        </View>
      </View>

      <View className="mt-4 flex-row">
        <View
          className={`rounded-full border px-3 py-1 ${statusStyle.className}`}
        >
          <Text className={`text-sm font-medium ${statusStyle.textClassName}`}>
            {statusStyle.label}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
