'use client';

import { useState, useEffect } from 'react';
import { useFilterStore } from '@/store/useFilterStore';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import { PRODUCTS } from '@/data/products';
import { formatPrice, getSingleProductWhatsAppUrl } from '@/lib/whatsapp';
import {
	X,
	Plus,
	Minus,
	ShoppingBag,
	MessageCircle,
	Heart,
	ExternalLink,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function QuickViewModal() {
	const { quickViewProduct, setQuickViewProduct } = useFilterStore();
	const { addItem } = useCartStore();
	const { toggleWishlist, isInWishlist } = useWishlistStore();

	const [selectedImage, setSelectedImage] = useState<string>('');
	const [quantity, setQuantity] = useState<number>(1);
	const [addedToast, setAddedToast] = useState<boolean>(false);

	const product = PRODUCTS.find((p) => p.id === quickViewProduct);

	useEffect(() => {
		if (product) {
			setSelectedImage(product.image);
			setQuantity(1);
		}
	}, [product]);

	if (!product) return null;

	const isWishlisted = isInWishlist(product.id);
	const allImages = [product.image, ...(product.additionalImages || [])];

	const handleAddToCart = () => {
		addItem(product, quantity);

		confetti({
			particleCount: 30,
			spread: 70,
			origin: { y: 0.7 },
		});

		setAddedToast(true);
		setTimeout(() => setAddedToast(false), 2000);
	};

	const whatsappUrl = getSingleProductWhatsAppUrl(product, quantity);

	return (
		<AnimatePresence>
			{quickViewProduct && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
					{/* Backdrop */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={() => setQuickViewProduct(null)}
						className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
					/>

					{/* Modal Card */}
					<motion.div
						initial={{ opacity: 0, scale: 0.95, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: 20 }}
						className="relative w-full max-w-5xl bg-slate-900 border border-blue-950 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 text-white"
					>
						{/* Close Button */}
						<button
							onClick={() => setQuickViewProduct(null)}
							className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
						>
							<X className="w-5 h-5" />
						</button>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8 max-h-[85vh] overflow-y-auto">
							{/* Product Gallery Left */}
							<div className="space-y-4">
								<div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
									<img
										src={selectedImage || product.image}
										alt={product.name}
										className="w-full h-full object-cover"
									/>
									{product.discountPercent && (
										<span className="absolute top-3 left-3 bg-red-500 text-white font-extrabold text-xs px-2.5 py-1 rounded-md shadow">
											-{product.discountPercent}% OFF
										</span>
									)}
								</div>

								{/* Thumbnails */}
								{allImages.length > 1 && (
									<div className="flex items-center gap-3 overflow-x-auto pb-2">
										{allImages.map((imgUrl, idx) => (
											<button
												key={idx}
												onClick={() => setSelectedImage(imgUrl)}
												className={`w-16 h-16 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
													selectedImage === imgUrl
														? 'border-emerald-400 scale-105'
														: 'border-slate-800 opacity-60 hover:opacity-100'
												}`}
											>
												<img
													src={imgUrl}
													alt=""
													className="w-full h-full object-cover"
												/>
											</button>
										))}
									</div>
								)}
							</div>

							{/* Product Details Right */}
							<div className="flex flex-col justify-between space-y-4">
								<div className="space-y-3">
									<div className="flex items-center justify-between">
										<span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
											{product.brand} • {product.category}
										</span>
									</div>

									<h2 className="text-lg sm:text-xl font-black text-white tracking-wide leading-snug">
										{product.name}
									</h2>

									{/* Pricing */}
									<div className="flex items-baseline gap-3 py-1">
										<span className="text-xl sm:text-2xl font-black text-yellow-500">
											{formatPrice(product.price * quantity)}
										</span>
										{product.originalPrice && (
											<span className="text-base text-slate-500 line-through">
												{formatPrice(product.originalPrice * quantity)}
											</span>
										)}
									</div>

									<p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
										{product.description}
									</p>

									{/* Specs Breakdown */}
									<div className="space-y-2 pt-2  border-slate-800">
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
											{Object.entries(product.specifications).map(
												([key, val]) => (
													<div
														key={key}
														className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80"
													>
														<span className="text-slate-400 block text-[10px]">
															{key}
														</span>
														<span className="font-semibold text-slate-200">
															{val}
														</span>
													</div>
												),
											)}
										</div>
									</div>
								</div>

								{/* Actions & Quantity */}
								<div className="space-y-4 pt-2 border-slate-800">
									<div className="flex items-center justify-between gap-4">
										<span className="text-xs font-bold text-slate-300 uppercase">
											Quantity:
										</span>
										<div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-1">
											<button
												onClick={() => setQuantity((q) => Math.max(1, q - 1))}
												className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-300 transition-colors"
											>
												<Minus className="w-4 h-4" />
											</button>
											<span className="w-10 text-center text-sm font-bold">
												{quantity}
											</span>
											<button
												onClick={() =>
													setQuantity((q) =>
														Math.min(product.stock || 99, q + 1),
													)
												}
												className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-300 transition-colors"
											>
												<Plus className="w-4 h-4" />
											</button>
										</div>

										<button
											onClick={() => toggleWishlist(product)}
											className={`p-2.5 rounded-xl border transition-all ${
												isWishlisted
													? 'bg-pink-950/60 border-pink-500/50 text-pink-400'
													: 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
											}`}
										>
											<Heart
												className={`w-5 h-5 ${isWishlisted ? 'fill-pink-500' : ''}`}
											/>
										</button>
									</div>

									<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
										<button
											onClick={handleAddToCart}
											className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all shadow-lg cursor-pointer ${
												addedToast
													? 'bg-emerald-500 text-slate-950'
													: 'bg-slate-800 hover:bg-slate-700 text-white'
											}`}
										>
											<ShoppingBag className="w-4 h-4" />
											<span>
												{addedToast ? 'Added to Cart!' : 'Add to Cart'}
											</span>
										</button>

										<a
											href={whatsappUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 py-3 px-4 rounded-xl text-sm font-extrabold shadow-lg shadow-emerald-500/20 transition-all hover:scale-102"
										>
											<MessageCircle className="w-4 h-4 fill-slate-950 text-emerald-500" />
											<span>Order via WhatsApp</span>
										</a>
									</div>

									<div className="text-center pt-1">
										<Link
											href={`/product/${product.slug}`}
											onClick={() => setQuickViewProduct(null)}
											className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:underline"
										>
											View Full Product Page & Reviews{' '}
											<ExternalLink className="w-3 h-3" />
										</Link>
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	);
}
