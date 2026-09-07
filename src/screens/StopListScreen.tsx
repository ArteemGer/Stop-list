import { useEffect } from "react";
import { FlatList, Text, View } from "react-native";

import MenuItemCard from "@/components/MenuItemCard";
import { useMenuStore } from "@/store/menuStore";

import EmptyState from "@/components/EmptyState";
import ErrorState from "@/components/ErrorState";
import LoadingState from "@/components/LoadingState";
import SearchInput from "@/components/SearchInput";
import StatusFilter from "@/components/StatusFilter";
import { filterMenuItems } from "@/lib/menuFilters";

export default function StockListScreen() {
  const items = useMenuStore((state) => state.items);
  const isLoading = useMenuStore((state) => state.isLoading);
  const loadError = useMenuStore((state) => state.loadError);
  const loadItems = useMenuStore((state) => state.loadItems);

  const searchQuery = useMenuStore((state) => state.debouncedSearchQuery);
  const statusFilter = useMenuStore((state) => state.statusFilter);

  const filteredItems = filterMenuItems(items, searchQuery, statusFilter);
  const isEmptyResult = filteredItems.length === 0;

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
    <View className="flex-1 bg-[#F6F3EE] px-4">
      <Text className="mb-4 mt-4 text-3xl font-bold text-[#171512]">
        Стоп-лист
      </Text>

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
          renderItem={({ item }) => (
            <MenuItemCard
              item={item}
              onPress={() => {
                console.log("Нажали:", item.id);
              }}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 16 }}
          keyboardShouldPersistTaps="handled"
        />
      )}
    </View>
  );
}
