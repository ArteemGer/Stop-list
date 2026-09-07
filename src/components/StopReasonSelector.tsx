import { Pressable, Text, View } from "react-native";

import { stopReasons } from "@/lib/stopReasons";
import type { StopReason } from "@/types/menuItem";

interface StopReasonSelectorProps {
  value: StopReason | null;
  onChange: (reason: StopReason) => void;
}

export default function StopReasonSelector({
  value,
  onChange,
}: StopReasonSelectorProps) {
  return (
    <View className="mt-6">
      <Text className="text-base font-semibold text-[#171512]">
        Причина изменения
      </Text>

      <View className="mt-2">
        {stopReasons.map((stopReason) => {
          const isSelected = value === stopReason.value;

          return (
            <Pressable
              key={stopReason.value}
              onPress={() => onChange(stopReason.value)}
              className={`mb-2 rounded-xl border px-4 py-3 ${
                isSelected
                  ? "border-[#C6462F] bg-[#FBEDEA]"
                  : "border-[#D8D2C9] bg-white"
              }`}
            >
              <Text className="text-base text-[#171512]">
                {stopReason.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
