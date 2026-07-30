"use client";

import { useFilterStore } from "@/store/useFilterStore";
import { PRODUCTS } from "@/data/products";
import ProductCard from "./ProductCard";
import { SlidersHorizontal, RotateCcw, PackageX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProductGridProps {
  sectionTitle?: string;
  sectionSubtitle?: string;
  limit?: number;
  filterType?: "featured" | "newArrival" | "bestSeller" | "all";
}

export default function ProductGrid({
  sectionTitle,
  sectionSubtitle,
  limit,
  filterType = "all"
}: ProductGridProps) {
  const { selectedCategory, searchQuery, selectedBrand, sortBy, setSortBy, resetFilters } = useFilterStore();

  // Filter logic
  let filteredProducts = PRODUCTS.filter((p) => {
    // Category Filter
    if (selectedCategory !== "All Products") {
      if (selectedCategory === "Featured" && !p.featured) return false;
      if (selectedCategory === "New Arrivals" && !p.newArrival) return false;
      if (
        selectedCategory !== "Featured" &&
        selectedCategory !== "New Arrivals" &&
        p.category !== selectedCategory
      ) {
        return false;
      }
    }

    // Explicit Filter Type Prop
    if (filterType === "featured" && !p.featured) return false;
    if (filterType === "newArrival" && !p.newArrival) return false;
    if (filterType === "bestSeller" && !p.bestSeller) return false;

    // Search Query Filter
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchBrand = p.brand.toLowerCase().includes(q);
      const matchCat = p.category.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      if (!matchName && !matchBrand && !matchCat && !matchDesc) return false;
    }

    // Brand Filter
    if (selectedBrand !== "All" && p.brand !== selectedBrand) return false;

    return true;
  });

  // Sorting logic
  filteredProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "newest") return (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0);
    return 0; // featured default order
  });

  if (limit) {
    filteredProducts = filteredProducts.slice(0, limit);
  }

  return (
    <section id="product-section" className="py-12 bg-slate-950 text-white border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              {selectedCategory !== "All Products" ? selectedCategory : "MayorStar Catalog"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
              {sectionTitle || (selectedCategory === "All Products" ? "Explore Tech & Gadgets" : `${selectedCategory} Collection`)}
            </h2>
            {sectionSubtitle && (
              <p className="text-slate-400 text-sm mt-1">{sectionSubtitle}</p>
            )}
          </div>

          {/* Controls Bar */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300">
              <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-semibold">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-emerald-400 font-bold focus:outline-none cursor-pointer"
              >
                <option value="featured" className="bg-slate-900 text-white">Featured</option>
                <option value="price-asc" className="bg-slate-900 text-white">Price: Low to High</option>
                <option value="price-desc" className="bg-slate-900 text-white">Price: High to Low</option>
                <option value="rating" className="bg-slate-900 text-white">Highest Rated</option>
                <option value="newest" className="bg-slate-900 text-white">Newest Arrivals</option>
              </select>
            </div>

            {(selectedCategory !== "All Products" || searchQuery !== "" || selectedBrand !== "All") && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                title="Reset Filters"
              >
                <RotateCcw className="w-3.5 h-3.5 text-pink-400" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Empty State */
          <div className="py-16 text-center bg-slate-900/40 border border-slate-800/80 rounded-3xl p-8 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-slate-800/80 flex items-center justify-center text-slate-400">
              <PackageX className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="text-lg font-bold text-white">No products found</h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              We couldn&apos;t find any gadget matching your selected category or search query. Try resetting your search filter.
            </p>
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 px-5 py-2.5 rounded-xl font-bold text-sm shadow-md hover:scale-105 transition-transform"
            >
              <RotateCcw className="w-4 h-4" />
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
