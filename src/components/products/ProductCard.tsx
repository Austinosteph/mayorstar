"use client";

import { useState } from "react";
import Link from "next/link";
import { Product } from "@/types/product";
import { formatPrice, getSingleProductWhatsAppUrl } from "@/lib/whatsapp";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useFilterStore } from "@/store/useFilterStore";
import {
  Heart,
  Eye,
  ShoppingBag,
  MessageCircle,
  Star,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const { setQuickViewProduct } = useFilterStore();
  const [addedToast, setAddedToast] = useState(false);

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);

    // Trigger subtle celebratory confetti effect
    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#10b981", "#14b8a6", "#3b82f6"]
    });

    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(product.id);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const whatsappUrl = getSingleProductWhatsAppUrl(product, 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-emerald-950/20"
    >
      <div>
        {/* Image Container */}
        <div className="relative aspect-square bg-slate-950 overflow-hidden cursor-pointer">
          <Link href={`/product/${product.slug}`}>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-500"
            />
          </Link>

          {/* Top Badges */}
          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-10">
            <div className="flex flex-col gap-1">
              {product.discountPercent && (
                <span className="bg-red-500 text-white font-black text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md shadow-md">
                  -{product.discountPercent}% OFF
                </span>
              )}
              {product.newArrival && (
                <span className="bg-emerald-500 text-slate-950 font-extrabold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md shadow-md">
                  NEW
                </span>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={handleWishlistToggle}
              className="pointer-events-auto p-2 rounded-full bg-slate-950/70 backdrop-blur-md border border-slate-700/60 text-slate-300 hover:text-pink-400 transition-all hover:scale-110 cursor-pointer"
              aria-label="Add to Wishlist"
            >
              <Heart
                className={`w-4 h-4 ${
                  isWishlisted ? "fill-pink-500 text-pink-500" : ""
                }`}
              />
            </button>
          </div>

          {/* Overlay Quick View Button */}
          <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
            <button
              onClick={handleQuickView}
              className="pointer-events-auto flex items-center gap-1.5 bg-slate-900/90 text-white px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-700 hover:bg-emerald-500 hover:text-slate-950 hover:border-emerald-500 transition-all shadow-lg transform -translate-y-2 group-hover:translate-y-0"
            >
              <Eye className="w-4 h-4" />
              <span>Quick View</span>
            </button>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 space-y-2.5">
          {/* Brand & Stock */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-emerald-400 font-bold uppercase tracking-wider text-[11px]">
              {product.brand}
            </span>

            {product.stock > 0 ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                <CheckCircle2 className="w-3 h-3" /> In Stock ({product.stock})
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-400">
                <AlertCircle className="w-3 h-3" /> Low Stock
              </span>
            )}
          </div>

          {/* Title */}
          <Link href={`/product/${product.slug}`} className="block">
            <h3 className="text-sm font-bold text-slate-100 group-hover:text-emerald-400 transition-colors line-clamp-2 min-h-[40px]">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1 text-xs">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="ml-1 font-bold text-slate-200">{product.rating}</span>
            </div>
            <span className="text-slate-500">({product.reviewCount})</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-base sm:text-lg font-extrabold text-white">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-slate-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Actions */}
      <div className="p-4 pt-0 grid grid-cols-2 gap-2 mt-auto">
        <button
          onClick={handleAddToCart}
          className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            addedToast
              ? "bg-emerald-500 text-slate-950"
              : "bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white"
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>{addedToast ? "Added!" : "Add Cart"}</span>
        </button>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 py-2 px-2 rounded-xl text-xs font-extrabold shadow-sm transition-all hover:scale-102"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-slate-950 text-emerald-600" />
          <span>WhatsApp</span>
        </a>
      </div>
    </motion.div>
  );
}
