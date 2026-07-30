'use client';

import { useFilterStore } from '@/store/useFilterStore';
import { CATEGORIES } from '@/data/categories';
import { CategoryName } from '@/types/product';
import { useRef, useState, useEffect } from 'react';
import {
	Grid,
	Sparkles,
	Zap,
	Headphones,
	Volume2,
	Disc,
	Watch,
	BatteryCharging,
	PlugZap,
	Tv,
	Fan,
	UtensilsCrossed,
	Coffee,
	Shirt,
	Home,
	Package,
	LucideIcon,
	ChevronLeft,
	ChevronRight,
} from 'lucide-react';
import { motion } from 'framer-motion';

const ICON_MAP: Record<string, LucideIcon> = {
	Grid,
	Sparkles,
	Zap,
	Headphones,
	Volume2,
	Disc,
	Watch,
	BatteryCharging,
	PlugZap,
	Tv,
	Fan,
	UtensilsCrossed,
	Coffee,
	Shirt,
	Home,
	Package,
};

export default function CategoryBar() {
	const { selectedCategory, setSelectedCategory, setSearchQuery } =
		useFilterStore();

	// State and Refs for custom scroll behavior
	const scrollRef = useRef<HTMLDivElement>(null);
	const [showLeftArrow, setShowLeftArrow] = useState(false);
	const [showRightArrow, setShowRightArrow] = useState(false);

	const checkScroll = () => {
		if (scrollRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
			setShowLeftArrow(scrollLeft > 2);
			setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 2);
		}
	};

	useEffect(() => {
		const scrollContainer = scrollRef.current;
		if (scrollContainer) {
			checkScroll();
			scrollContainer.addEventListener('scroll', checkScroll);
			window.addEventListener('resize', checkScroll);
		}
		return () => {
			if (scrollContainer) {
				scrollContainer.removeEventListener('scroll', checkScroll);
			}
			window.removeEventListener('resize', checkScroll);
		};
	}, []);

	const scroll = (direction: 'left' | 'right') => {
		if (scrollRef.current) {
			const { clientWidth } = scrollRef.current;
			const scrollAmount =
				direction === 'left' ? -clientWidth * 0.5 : clientWidth * 0.5;
			scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
		}
	};

	const handleCategoryClick = (categoryName: CategoryName) => {
		setSelectedCategory(categoryName);
		setSearchQuery('');

		const section = document.getElementById('product-section');
		if (section) {
			section.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<div className="bg-gray-200 border-b border-gray-300 sticky top-16  z-30 shadow-md backdrop-blur-md">
			<div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Parent container to capture absolute elements */}
				<div className="relative w-full group">
					{/* Left Arrow Button Indicator */}
					{showLeftArrow && (
						<div className="absolute left-0 top-0 bottom-0 w-16 z-20 flex items-center bg-linear-to-r from-gray-200 via-gray-200/80 to-transparent pointer-events-none">
							<button
								onClick={() => scroll('left')}
								className="pointer-events-auto p-1.5 rounded-full bg-gray-100 text-gray-800 shadow-md hover:bg-gray-50 border border-gray-300 transition-all"
							>
								<ChevronLeft className="w-4 h-4" />
							</button>
						</div>
					)}

					{/* Core Scroll Box */}
					<div
						ref={scrollRef}
						className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-none [&::-webkit-scrollbar]:hidden scroll-smooth"
					>
						{CATEGORIES.map((cat) => {
							const IconComponent = ICON_MAP[cat.iconName] || Package;
							const isActive = selectedCategory === cat.name;

							return (
								<button
									key={cat.id}
									onClick={() => handleCategoryClick(cat.name)}
									className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 shrink-0 cursor-pointer ${
										isActive
											? 'text-gray-100 font-bold shadow-lg shadow-yellow-200'
											: 'text-gray-900 hover:scale-105'
									}`}
								>
									{isActive && (
										<motion.div
											layoutId="activeCategoryPill"
											className="absolute inset-0 bg-yellow-500 rounded-xl z-0"
											transition={{
												type: 'spring',
												stiffness: 400,
												damping: 30,
											}}
										/>
									)}
									<span className="relative z-10 flex items-center gap-1.5">
										<IconComponent
											className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-emerald-400'}`}
										/>
										{cat.name}
									</span>
								</button>
							);
						})}
					</div>

					{/* Right Arrow Button Indicator */}
					{showRightArrow && (
						<div className="absolute right-0 top-0 bottom-0 w-16 z-20 flex items-center justify-end bg-linear-to-l from-gray-200 via-gray-200/80 to-transparent pointer-events-none">
							<button
								onClick={() => scroll('right')}
								className="pointer-events-auto p-1.5 rounded-full bg-gray-100 text-gray-800 shadow-md hover:bg-gray-50 border border-gray-300 transition-all"
							>
								<ChevronRight className="w-4 h-4" />
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
