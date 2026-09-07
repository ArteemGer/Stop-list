import { Pressable, Text, View } from "react-native";

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <View className="flex-1 items-center justify-center bg-[#F6F3EE] px-6">
      <View className="w-full max-w-sm items-center rounded-2xl border border-[#D99A8F] bg-white px-6 py-7">
        <View className="mb-4 h-12 w-12 items-center justify-center rounded-full bg-[#FBEDEA]">
          <Text className="text-xl font-bold text-[#C6462F]">!</Text>
        </View>

        <Text className="text-center text-lg font-semibold text-[#171512]">
          Не удалось загрузить меню
        </Text>

        <Text className="mt-2 text-center text-sm leading-5 text-[#6F6A63]">
          {message}
        </Text>

        <Pressable
          onPress={onRetry}
          className="mt-5 w-full items-center rounded-xl bg-[#C6462F] px-4 py-3 active:opacity-70"
        >
          <Text className="font-semibold text-white">Повторить</Text>
        </Pressable>
      </View>
    </View>
  );
}
