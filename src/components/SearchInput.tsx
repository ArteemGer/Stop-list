import { TextInput } from "react-native";

import { useMenuStore } from "@/store/menuStore";

export default function SearchInput() {
  const searchQuery = useMenuStore((state) => state.searchQuery);
  const setSearchQuery = useMenuStore((state) => state.setSearchQuery);

  return (
    <TextInput
      value={searchQuery}
      onChangeText={setSearchQuery}
      placeholder="Поиск по названию"
      placeholderTextColor="#8A847C"
      className="mb-3 mt-4 h-12 rounded-xl border border-[#D8D2C9] bg-white px-4 py-0 text-base leading-5 text-[#171512]"
    />
  );
}
