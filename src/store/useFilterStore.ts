import { create } from "zustand";
import { CategoryName } from "@/types/product";

export type SortOption = "featured" | "price-asc" | "price-desc" | "rating" | "newest";

interface FilterState {
  selectedCategory: CategoryName;
  searchQuery: string;
  selectedBrand: string;
  sortBy: SortOption;
  quickViewProduct: string | null; // product slug/id for quick view modal

  setSelectedCategory: (category: CategoryName) => void;
  setSearchQuery: (query: string) => void;
  setSelectedBrand: (brand: string) => void;
  setSortBy: (sort: SortOption) => void;
  setQuickViewProduct: (productId: string | null) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  selectedCategory: "All Products",
  searchQuery: "",
  selectedBrand: "All",
  sortBy: "featured",
  quickViewProduct: null,

  setSelectedCategory: (category: CategoryName) =>
    set({ selectedCategory: category }),

  setSearchQuery: (query: string) => set({ searchQuery: query }),
  setSelectedBrand: (brand: string) => set({ selectedBrand: brand }),
  setSortBy: (sort: SortOption) => set({ sortBy: sort }),
  setQuickViewProduct: (productId: string | null) =>
    set({ quickViewProduct: productId }),

  resetFilters: () =>
    set({
      selectedCategory: "All Products",
      searchQuery: "",
      selectedBrand: "All",
      sortBy: "featured",
    }),
}));
