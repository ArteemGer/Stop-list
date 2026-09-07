import { ActivityIndicator, Text, View } from "react-native";

export default function LoadingState() {
  return (
    <View className="flex-1 bg-[#F6F3EE] px-4">
      <Text className="mb-4 mt-4 text-3xl font-bold text-[#171512]">
        Стоп-лист
      </Text>

      <View className="items-center py-8">
        <ActivityIndicator size="large" color="#C6462F" />

        <Text className="mt-4 text-base font-semibold text-[#171512]">
          Загружаем меню
        </Text>

        <Text className="mt-1 text-center text-sm text-[#6F6A63]">
          Получаем актуальный список позиций...
        </Text>
      </View>

      <View className="gap-3">
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
      </View>
    </View>
  );
}

function LoadingCard() {
  return (
    <View className="rounded-2xl border border-[#DDD8D0] bg-white p-4">
      <View className="h-5 w-2/3 rounded bg-[#E8E3DC]" />

      <View className="mt-2 h-4 w-1/4 rounded bg-[#E8E3DC]" />

      <View className="mt-4 h-7 w-24 rounded-full bg-[#E8E3DC]" />
    </View>
  );
}
