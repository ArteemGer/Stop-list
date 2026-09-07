import StockInput from "@/components/StockInput";
import StopReasonSelector from "@/components/StopReasonSelector";
import { validateStock } from "@/lib/stockRules";
import type { RootStackParamList } from "@/navigation/RootNavigator";
import { useEditStore } from "@/store/editStore";
import { useMenuStore } from "@/store/menuStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = NativeStackScreenProps<RootStackParamList, "StockListEdit">;

export default function StockListEditScreen({ route, navigation }: Props) {
  const { itemId } = route.params;

  const item = useMenuStore((state) =>
    state.items.find((item) => item.id === itemId),
  );
  const reset = useEditStore((state) => state.reset);
  const stockInput = useEditStore((state) => state.stockInput);
  const setStockInput = useEditStore((state) => state.setStockInput);

  const stockError = validateStock(stockInput);

  const reason = useEditStore((state) => state.reason);
  const setReason = useEditStore((state) => state.setReason);

  const isUpdating = useMenuStore((state) => state.isUpdating);
  const updateError = useMenuStore((state) => state.updateError);
  const updateItem = useMenuStore((state) => state.updateItem);

  useEffect(() => {
    if (item) {
      reset(item.stock);
    }
  }, [item, reset]);

  const canSubmit = stockError === null && reason !== null && !isUpdating;

  const handleSubmit = async () => {
    if (!canSubmit || reason === null) {
      return;
    }

    const stock = Number(stockInput.trim());

    const success = await updateItem({
      id: itemId,
      stock,
      reason,
    });

    if (success) {
      navigation.goBack();
    }
  };

  if (!item) {
    return (
      <View className="flex-1 items-center justify-center bg-[#F6F3EE] px-6">
        <Text className="text-center text-lg font-semibold text-[#171512]">
          Позиция не найдена
        </Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView className="flex-1" behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView className="flex-1 bg-[#F6F3EE] px-4 pt-4">
          <SafeAreaView edges={["top"]} className="bg-[#F6F3EE]">
            <View className="flex-row items-center border-b border-[#DDD8D0] pb-4 pt-2">
              <Pressable
                onPress={() => navigation.goBack()}
                className="mr-3 h-10 w-10 items-center justify-center rounded-full active:bg-[#E8E3DC]"
              >
                <Text className="text-3xl leading-8 text-[#171512]">
                  <Ionicons name="chevron-back" size={24} color="black" />
                </Text>
              </Pressable>

              <Text className="text-2xl font-bold text-[#171512]">
                Изменение остатка
              </Text>
            </View>
          </SafeAreaView>

          <Text className="text-2xl mt-4 font-bold text-[#171512]">
            {item?.title}
          </Text>

          <Text className="mt-1 text-sm text-[#6F6A63]">{item?.category}</Text>

          <StockInput
            value={stockInput}
            error={stockError}
            onChangeText={setStockInput}
          />

          <ScrollView className="mt-2">
            <StopReasonSelector value={reason} onChange={setReason} />

            <Pressable
              onPress={handleSubmit}
              disabled={!canSubmit}
              className={`mt-4 rounded-xl px-4 py-4 ${
                canSubmit ? "bg-[#C6462F]" : "bg-[#D8D2C9]"
              }`}
            >
              {isUpdating ? (
                <View className="flex flex-row items-center justify-center">
                  <ActivityIndicator size="small" color="#FFFFFF" />
                  <Text className="ml-2 text-base text-center font-semibold text-white">
                    Сохранение...
                  </Text>
                </View>
              ) : (
                <Text className="text-base text-center font-semibold text-white">
                  Сохранить
                </Text>
              )}
            </Pressable>

            {updateError && (
              <Text className="mt-3 text-center text-sm text-[#C6462F]">
                {updateError}
              </Text>
            )}
          </ScrollView>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
