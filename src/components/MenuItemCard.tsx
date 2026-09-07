import { Pressable, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import { usePressAnimation } from "@/hooks/usePressAnimation";
import { getStockStatus } from "@/lib/stockRules";
import type { MenuItem } from "@/types/menuItem";

interface MenuItemCardProps {
  item: MenuItem;
  onPress: () => void;
  index?: number;
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

export default function MenuItemCard({
  item,
  onPress,
  index,
}: MenuItemCardProps) {
  const status = getStockStatus(item.stock);
  const statusStyle = statusConfig[status];

  const { animatedStyle, handlePressIn, handlePressOut } = usePressAnimation();

  const delay = Math.min(index ?? 0, 6) * 40;

  return (
    <Animated.View entering={FadeInDown.delay(delay).duration(250)}>
      <Animated.View style={animatedStyle}>
        <Pressable
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          className="mb-3 rounded-2xl border border-[#DDD8D0] bg-white p-4"
        >
          <View className="flex-row items-start justify-between">
            <View className="mr-3 flex-1">
              <Text className="text-base font-semibold text-[#171512]">
                {item.title}
              </Text>

              <Text className="mt-1 text-sm text-[#8A847C]">
                {item.category}
              </Text>
            </View>

            <View
              className={`rounded-lg border px-2.5 py-1 ${statusStyle.className}`}
            >
              <Text
                className={`text-xs font-medium ${statusStyle.textClassName}`}
              >
                {statusStyle.label}
              </Text>
            </View>
          </View>

          <View className="mt-4 flex-row items-baseline">
            <Text className="text-2xl font-bold text-[#171512]">
              {item.stock}
            </Text>

            <Text className="ml-1 text-sm text-[#8A847C]">шт.</Text>
          </View>
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
}
