'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useFilterStore } from '@/store/useFilterStore';
import { PRODUCTS } from '@/data/products';
import { formatPrice } from '@/lib/whatsapp';
import {
	Search,
	ShoppingBag,
	Heart,
	X,
	Menu,
	Phone,
	MessageCircle,
	ExternalLink,
	ChevronRight,
	MapPin,
	MessageSquare,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
	const { toggleCart, getTotalItems } = useCartStore();
	const { wishlist } = useWishlistStore();
	const {
		searchQuery,
		setSearchQuery,
		setSelectedCategory,
		setQuickViewProduct,
	} = useFilterStore();

	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isMounted, setIsMounted] = useState(false);
	const searchInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setIsMounted(true);
	}, []);

	const totalCartItems = isMounted ? getTotalItems() : 0;
	const totalWishlistItems = isMounted ? wishlist.length : 0;

	// Filter products live for search dropdown
	const searchResults =
		searchQuery.trim() === ''
			? []
			: PRODUCTS.filter(
					(p) =>
						p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
						p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
						p.category.toLowerCase().includes(searchQuery.toLowerCase()),
				).slice(0, 5);

	const handleSelectSearchResult = (productId: string) => {
		setQuickViewProduct(productId);
		setSearchQuery('');
		setIsSearchOpen(false);
	};

	return (
		<>
			{/* Top Banner Notice */}
			<div className="bg-blue-950 px-4 sm:px-12  text-white flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Phone className="w-4 h-4" />
					<p className="font-medium font-sans text-sm">+231 76 101 8122</p>
				</div>
				<div className="flex items-center gap-6">
					<div className="hidden sm:flex gap-6">
						<div className="flex items-center gap-1 hover:cursor-pointer hover:text-yellow-500">
							<MapPin className="w-4 h-4" />
							<p className="text-sm font-medium tracking-wider">
								Store Location
							</p>
						</div>
						<div className="flex items-center gap-1 hover:cursor-pointer hover:text-yellow-500">
							<MessageSquare className="w-4 h-4" />
							<p className="text-sm font-medium tracking-wider">Contact</p>
						</div>
					</div>
					<div className=" items-center gap-1 flex">
						<Image
							src="/logo/facebook.png"
							alt="Facebook"
							width={18}
							height={18}
						/>
						<Image src="/logo/tiktok.png" alt="TikTok" width={33} height={33} />
						<Image
							src="/logo/instagram.png"
							alt="Instagram"
							width={25}
							height={25}
						/>
					</div>
				</div>
			</div>
			<header className="sticky top-0 z-40 bg-gray-200 border-b border-gray-300 shadow-lg backdrop-blur-md transition-all">
				<div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12 py-2">
					<div className="flex items-center justify-between h-16 gap-4">
						{/* Logo */}
						<Link href="/" className="flex items-center gap-2 group shrink-0">
							<Image src="/logo.png" alt="logo" width={75} height={75} />
						</Link>

						{/* Desktop Search Bar */}
						<div className="hidden md:flex flex-1 max-w-lg relative">
							<div className="relative w-full">
								<input
									type="text"
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									placeholder="Search products, brands, categories (e.g. Sony, Earbuds, TV)..."
									className="w-full border border-gray-500 rounded-full py-2 pl-10 pr-10 text-sm text-black placeholder-black focus:outline-none focus:border-blue-950 focus:ring-1 focus:ring-blue-950 transition-all"
								/>

								<Search className="w-4 h-4 text-slate-600 absolute left-3.5 top-2.5" />
								{searchQuery && (
									<button
										onClick={() => setSearchQuery('')}
										className="absolute right-3 top-2.5 text-blue-950"
									>
										<X className="w-4 h-4" />
									</button>
								)}
							</div>

							{/* Live Search Results Dropdown */}
							<AnimatePresence>
								{searchQuery.trim().length > 0 && (
									<motion.div
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: 10 }}
										className="absolute top-full left-0 right-0 mt-2 bg-blue-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50"
									>
										{searchResults.length > 0 ? (
											<div className="divide-y divide-slate-800">
												{searchResults.map((prod) => (
													<div
														key={prod.id}
														onClick={() => handleSelectSearchResult(prod.id)}
														className="flex items-center gap-3 p-3 hover:bg-slate-800/60 cursor-pointer transition-colors"
													>
														<img
															src={prod.image}
															alt={prod.name}
															className="w-12 h-12 rounded-lg object-cover bg-slate-800"
														/>
														<div className="flex-1 min-w-0">
															<h4 className="text-sm font-semibold text-white truncate">
																{prod.name}
															</h4>
															<p className="text-xs text-slate-400">
																{prod.brand} •{' '}
																<span className="text-emerald-400 font-bold">
																	{formatPrice(prod.price)}
																</span>
															</p>
														</div>
														<ChevronRight className="w-4 h-4 text-slate-500" />
													</div>
												))}
											</div>
										) : (
											<div className="p-4 text-center text-sm text-slate-400">
												No gadgets found matching &quot;{searchQuery}&quot;
											</div>
										)}
									</motion.div>
								)}
							</AnimatePresence>
						</div>

						{/* Action Icons */}
						<div className="flex items-center gap-2 sm:gap-4">
							{/* Mobile Search Toggle */}
							<button
								onClick={() => setIsSearchOpen(!isSearchOpen)}
								className="p-2 text-slate-500 rounded-lg md:hidden"
								aria-label="Search"
							>
								<Search className="w-5 h-5" />
							</button>

							{/* Wishlist Button */}
							<Link
								href="#featured-products"
								onClick={() => setSelectedCategory('Featured')}
								className="p-2 text-slate-500 rounded-lg relative transition-colors"
								title="View Wishlist"
							>
								<Heart className="w-5 h-5" />
								{totalWishlistItems > 0 && (
									<span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
										{totalWishlistItems}
									</span>
								)}
							</Link>

							{/* Cart Drawer Trigger Button */}
							<button
								onClick={toggleCart}
								className="flex items-center gap-2 bg-blue-950 text-white px-3.5 py-2 rounded-xl text-sm font-semibold shadow-lg shadow-blue-950/20 transition-all hover:scale-105"
							>
								<div className="relative">
									<ShoppingBag className="w-5 h-5" />
									{totalCartItems > 0 && (
										<span className="absolute -top-2 -right-2 bg-amber-500 text-slate-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
											{totalCartItems}
										</span>
									)}
								</div>
								<span className="hidden sm:inline font-bold">Cart</span>
							</button>

							{/* WhatsApp Quick Link */}
							<a
								href="https://wa.me/2348123456789?text=Hello%20MayorStar%20Gadgets!%20I%20have%20an%20inquiry."
								target="_blank"
								rel="noopener noreferrer"
								className="hidden lg:flex items-center gap-1.5 bg-emerald-950/80 p-2 hover:scale-105 rounded-xl text-xs font-semibold transition-colors"
							>
								<Image
									src="/logo/whatsapp.png"
									alt="WhatsApp"
									width={20}
									height={20}
								/>
								<span>WhatsApp Support</span>
							</a>

							{/* Mobile Menu Button */}
							<button
								onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
								className="p-2 text-slate-500 hover:text-white rounded-lg hover:bg-blue-950 md:hidden"
							>
								{isMobileMenuOpen ? (
									<X className="w-6 h-6" />
								) : (
									<Menu className="w-6 h-6" />
								)}
							</button>
						</div>
					</div>

					{/* Mobile Expandable Search Bar */}
					<AnimatePresence>
						{isSearchOpen && (
							<motion.div
								initial={{ height: 0, opacity: 0 }}
								animate={{ height: 'auto', opacity: 1 }}
								exit={{ height: 0, opacity: 0 }}
								className="md:hidden pb-3 relative"
							>
								<input
									ref={searchInputRef}
									type="text"
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									placeholder="Search products, brands, categories..."
									className="w-full border-gray-500 rounded-xl py-2 pl-10 pr-10 text-sm text-black placeholder-slate-400 focus:outline-none focus:border-blue-950"
								/>
								<Search className="w-4 h-4 text-slate-600 absolute left-3 top-2.5" />
								{searchQuery && (
									<button
										onClick={() => setSearchQuery('')}
										className="absolute right-3 top-2.5 text-slate-600"
									>
										<X className="w-4 h-4" />
									</button>
								)}

								{/* Mobile Search Dropdown */}
								{searchResults.length > 0 && (
									<div className="mt-2 bg-blue-950 border border-slate-800 rounded-xl shadow-xl overflow-hidden divide-y divide-slate-800">
										{searchResults.map((prod) => (
											<div
												key={prod.id}
												onClick={() => handleSelectSearchResult(prod.id)}
												className="flex items-center gap-3 p-2.5 hover:bg-slate-800"
											>
												<img
													src={prod.image}
													alt={prod.name}
													className="w-10 h-10 rounded-lg object-cover"
												/>
												<div className="flex-1 min-w-0">
													<p className="text-xs font-semibold text-white truncate">
														{prod.name}
													</p>
													<p className="text-[10px] text-emerald-400">
														{formatPrice(prod.price)}
													</p>
												</div>
											</div>
										))}
									</div>
								)}
							</motion.div>
						)}
					</AnimatePresence>
				</div>

				{/* Mobile Drawer Menu */}
				<AnimatePresence>
					{isMobileMenuOpen && (
						<motion.div
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							className="md:hidden bg-slate-900 border-b border-slate-800 px-4 py-4 space-y-3"
						>
							<div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
								Quick Links
							</div>
							<a
								href="https://wa.me/2348123456789?text=Hello%20MayorStar!"
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center justify-between p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-sm font-semibold"
							>
								<div className="flex items-center gap-2">
									<MessageCircle className="w-5 h-5 text-emerald-400" />
									<span>Order via WhatsApp Direct</span>
								</div>
								<ExternalLink className="w-4 h-4" />
							</a>
							<div className="flex items-center gap-2 p-3 rounded-xl bg-slate-800/80 text-sm text-slate-300">
								<MapPin className="w-5 h-5 text-yellow-500" />
								<span>Store Location</span>
							</div>
							<div className="flex items-center gap-2 p-3 rounded-xl bg-slate-800/80 text-sm text-slate-300">
								<MessageSquare className="w-5 h-5 text-yellow-500" />
								<span>Contact</span>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</header>
		</>
	);
}
