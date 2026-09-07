import { fetchMenuItems, updateMenuItem } from "@/api/menuApi";
import type {
  MenuItem,
  StockFilter,
  StockUpdatePayload,
} from "@/types/menuItem";
import { create } from "zustand";

interface MenuStore {
  items: MenuItem[];

  isLoading: boolean;
  loadError: string | null;

  isUpdating: boolean;
  updateError: string | null;

  searchQuery: string;
  debouncedSearchQuery: string;
  statusFilter: StockFilter;

  setSearchQuery: (query: string) => void;
  setStatusFilter: (filter: StockFilter) => void;

  loadItems: () => Promise<void>;
  updateItem: (payload: StockUpdatePayload) => Promise<boolean>;
}

let searchDebounceTimer: ReturnType<typeof setTimeout> | null = null;

export const useMenuStore = create<MenuStore>((set) => ({
  items: [],

  isLoading: false,
  loadError: null,

  isUpdating: false,
  updateError: null,

  searchQuery: "",
  debouncedSearchQuery: "",
  statusFilter: "all",

  loadItems: async () => {
    set({
      isLoading: true,
      loadError: null,
    });

    const result = await fetchMenuItems();

    if (result.ok) {
      set({
        items: result.data,
        isLoading: false,
      });

      return;
    }

    set({
      isLoading: false,
      loadError: result.error.message,
    });
  },

  updateItem: async (payload) => {
    set({
      isUpdating: true,
      updateError: null,
    });

    const result = await updateMenuItem(payload);

    if (!result.ok) {
      set({
        isUpdating: false,
        updateError: result.error.message,
      });

      return false;
    }

    set((state) => ({
      items: state.items.map((item) =>
        item.id === result.data.id ? result.data : item,
      ),
      isUpdating: false,
      updateError: null,
    }));

    return true;
  },

  setSearchQuery: (query) => {
    set({
      searchQuery: query,
    });

    if (searchDebounceTimer) {
      clearTimeout(searchDebounceTimer);
    }

    searchDebounceTimer = setTimeout(() => {
      set({
        debouncedSearchQuery: query,
      });
    }, 300);
  },

  setStatusFilter: (filter) => {
    set({
      statusFilter: filter,
    });
  },
}));
