import { Text, TextInput, View } from "react-native";

interface StockInputProps {
  value: string;
  error: string | null;
  onChangeText: (value: string) => void;
}

export default function StockInput({
  value,
  error,
  onChangeText,
}: StockInputProps) {
  return (
    <View className="mt-6">
      <Text className="text-base font-semibold text-[#171512]">
        Новый остаток
      </Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        keyboardType="number-pad"
        placeholder="Введите количество"
        placeholderTextColor="#8A847C"
        textAlignVertical="center"
        className="mt-2 h-12 rounded-xl border border-[#D8D2C9] bg-white px-4 py-0 text-base leading-5 text-[#171512]"
      />

      {error && <Text className="mt-2 text-sm text-[#C6462F]">{error}</Text>}
    </View>
  );
}
