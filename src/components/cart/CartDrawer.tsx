'use client';

import { useCartStore } from '@/store/useCartStore';
import { formatPrice, getCartWhatsAppUrl } from '@/lib/whatsapp';
import Image from 'next/image';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartDrawer() {
	const {
		items,
		isOpen,
		closeCart,
		updateQuantity,
		removeItem,
		clearCart,
		getTotalItems,
		getTotalPrice,
	} = useCartStore();

	const totalItems = getTotalItems();
	const totalPrice = getTotalPrice();
	const whatsappUrl = getCartWhatsAppUrl(items, totalPrice);

	return (
		<AnimatePresence>
			{isOpen && (
				<div className="fixed inset-0 z-50 overflow-hidden">
					{/* Backdrop */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={closeCart}
						className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
					/>
					<div className="fixed inset-y-0 right-0 flex w-full sm:w-auto sm:pl-10">
						<motion.div
							initial={{ x: '100%' }}
							animate={{ x: 0 }}
							exit={{ x: '100%' }}
							transition={{ type: 'spring', damping: 25, stiffness: 200 }}
							className="w-screen max-w-md bg-gray-200 border-l border-slate-800 shadow-2xl text-white flex flex-col justify-between z-10"
						>
							{/* Header */}
							<div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-blue-950">
								<div className="flex items-center gap-2">
									<div className="w-9 h-9 rounded-xl bg-blue-950 border border-white flex items-center justify-center text-white">
										<ShoppingBag className="w-5 h-5" />
									</div>
									<div>
										<h3 className="text-lg font-black text-white">
											Your Shopping Cart
										</h3>
										<p className="text-xs text-slate-400">
											{totalItems} {totalItems === 1 ? 'item' : 'items'}{' '}
											selected
										</p>
									</div>
								</div>

								<button
									onClick={closeCart}
									className="p-2 rounded-xl text-slate-300 hover:text-white hover:scale-110 transition-colors"
								>
									<X className="w-5 h-5" />
								</button>
							</div>

							{/* Items List */}
							<div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
								{items.length > 0 ? (
									items.map((item) => (
										<motion.div
											key={item.product.id}
											layout
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, x: -50 }}
											className="flex items-center gap-3 p-3 rounded-2xl bg-gray-300 border border-gray-400 shadow-lg transition-all"
										>
											<img
												src={item.product.image}
												alt={item.product.name}
												className="w-20 h-20 rounded-xl object-cover bg-slate-900 border border-slate-800"
											/>

											<div className="flex-1 min-w-0">
												<span className="text-[10px] uppercase font-bold text-blue-950 tracking-wider">
													{item.product.brand}
												</span>
												<h4 className="text-xs font-bold text-black truncate">
													{item.product.name}
												</h4>
												<div className="text-sm font-black text-yellow-600 mt-0.5">
													{formatPrice(item.product.price * item.quantity)}
												</div>

												{/* Quantity Controls */}
												<div className="flex items-center gap-2 mt-2">
													<div className="flex items-center bg-blue-950 border border-slate-800 rounded-lg p-0.5">
														<button
															onClick={() =>
																updateQuantity(
																	item.product.id,
																	item.quantity - 1,
																)
															}
															className="p-1 text-slate-300 hover:text-white hover:bg-slate-800 rounded"
														>
															<Minus className="w-3 h-3" />
														</button>
														<span className="w-6 text-center text-xs font-bold">
															{item.quantity}
														</span>
														<button
															onClick={() =>
																updateQuantity(
																	item.product.id,
																	item.quantity + 1,
																)
															}
															className="p-1 text-slate-300 hover:text-white hover:bg-slate-800 rounded"
														>
															<Plus className="w-4 h-4" />
														</button>
													</div>

													<button
														onClick={() => removeItem(item.product.id)}
														className="p-1.5 text-red-600 rounded-lg transition-colors ml-auto"
														title="Remove item"
													>
														<Trash2 className="w-3.5 h-3.5" />
													</button>
												</div>
											</div>
										</motion.div>
									))
								) : (
									<div className="py-16 text-center space-y-3">
										<div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-slate-500">
											<ShoppingBag className="w-8 h-8" />
										</div>
										<h4 className="text-base font-bold text-blue-950">
											Your cart is empty
										</h4>
										<p className="text-xs text-slate-600 max-w-xs mx-auto">
											Explore our gadgets and add items to your cart to order
											via WhatsApp!
										</p>
										<button
											onClick={closeCart}
											className="mt-2 inline-flex items-center gap-1.5 bg-emerald-500 text-slate-950 px-4 py-2 rounded-xl text-xs font-bold shadow-md hover:scale-105 transition-transform"
										>
											Browse Gadgets
										</button>
									</div>
								)}
							</div>

							{/* Footer Summary & WhatsApp Action */}
							{items.length > 0 && (
								<div className="p-4 border-t border-blue-800 bg-blue-950 space-y-4">
									<div className="space-y-2 text-xs text-slate-300">
										<div className="flex justify-between">
											<span>Total Items:</span>
											<span className="font-bold text-white">{totalItems}</span>
										</div>
										<div className="flex justify-between">
											<span>Subtotal:</span>
											<span className="font-bold text-white">
												{formatPrice(totalPrice)}
											</span>
										</div>
										<div className="flex justify-between pt-2 border-t border-slate-800 text-sm font-extrabold text-white">
											<span>Grand Total:</span>
											<span className="text-emerald-400 text-base">
												{formatPrice(totalPrice)}
											</span>
										</div>
									</div>

									<div className="space-y-2">
										<a
											href={whatsappUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 py-3.5 px-4 rounded-xl font-black text-sm shadow-lg shadow-emerald-500/20 transition-all hover:scale-102"
										>
											<Image
												src="/logo/whatsapp.png"
												alt="WhatsApp"
												width={22}
												height={22}
											/>
											<span>Continue to WhatsApp Order</span>
											<ArrowRight className="w-4 h-4" />
										</a>

										<div className="flex items-center justify-between gap-2 pt-2">
											<button
												onClick={closeCart}
												className="w-1/2 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
											>
												Continue Shopping
											</button>
											<button
												onClick={clearCart}
												className="w-1/2 py-2 text-xs font-semibold text-red-400 hover:text-red-300 transition-colors text-right"
											>
												Clear Cart
											</button>
										</div>
									</div>
								</div>
							)}
						</motion.div>
					</div>
				</div>
			)}
		</AnimatePresence>
	);
}
