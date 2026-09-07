import type { RootStackParamList } from "@/navigation/RootNavigator";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect } from "react";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import MenuItemCard from "@/components/MenuItemCard";
import { useMenuStore } from "@/store/menuStore";

import EmptyState from "@/components/EmptyState";
import ErrorState from "@/components/ErrorState";
import LoadingState from "@/components/LoadingState";
import SearchInput from "@/components/SearchInput";
import StatusFilter from "@/components/StatusFilter";
import { filterMenuItems } from "@/lib/menuFilters";

type StockListNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "StockList"
>;

export default function StockListScreen() {
  const items = useMenuStore((state) => state.items);
  const isLoading = useMenuStore((state) => state.isLoading);
  const loadError = useMenuStore((state) => state.loadError);
  const loadItems = useMenuStore((state) => state.loadItems);

  const debouncedSearchQuery = useMenuStore((state) => state.debouncedSearchQuery);
  const statusFilter = useMenuStore((state) => state.statusFilter);

  const filteredItems = filterMenuItems(items, debouncedSearchQuery, statusFilter);
  const isEmptyResult = filteredItems.length === 0;

  const navigation = useNavigation<StockListNavigationProp>();

  useEffect(() => {
    void loadItems();
  }, [loadItems]);

  if (isLoading) {
    return <LoadingState />;
  }

  if (loadError) {
    return <ErrorState message={loadError} onRetry={() => void loadItems()} />;
  }

  return (
    <KeyboardAvoidingView className="flex-1" behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 bg-[#F6F3EE] px-4">
          <SafeAreaView edges={["top"]} className="bg-[#F6F3EE]">
            <View className="border-b border-[#DDD8D0] px-4 pb-4 pt-2">
              <Text className="text-3xl font-bold text-[#171512]">
                Стоп-лист
              </Text>

              <Text className="mt-1 text-sm text-[#6F6A63]">
                Управление остатками
              </Text>
            </View>
          </SafeAreaView>

          <SearchInput />

          <StatusFilter />

          <Text className="mb-3 text-sm text-[#6F6A63]">
            Найдено: {filteredItems.length}
          </Text>

          {isEmptyResult ? (
            <EmptyState
              title="Ничего не найдено"
              description="Попробуйте изменить поисковый запрос"
            />
          ) : (
            <FlatList
              data={filteredItems}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => (
                <MenuItemCard
                  item={item}
                  index={index}
                  onPress={() => {
                    navigation.navigate("StockListEdit", {
                      itemId: item.id,
                    });
                  }}
                />
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 16 }}
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode="on-drag"
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
