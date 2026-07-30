'use client';

import { useState, useEffect, useCallback } from 'react';
import { HERO_SLIDES } from '@/data/heroSlides';
import { useFilterStore } from '@/store/useFilterStore';
import {
	ChevronLeft,
	ChevronRight,
	ShoppingBag,
	Sparkles,
	ArrowRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HeroCarousel() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isHovered, setIsHovered] = useState(false);
	const { setSelectedCategory } = useFilterStore();

	const handleNext = useCallback(() => {
		setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
	}, []);

	const handlePrev = useCallback(() => {
		setCurrentIndex(
			(prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length,
		);
	}, []);

	// Auto slide every 5.5s unless hovered
	useEffect(() => {
		if (isHovered) return;
		const interval = setInterval(() => {
			handleNext();
		}, 5500);
		return () => clearInterval(interval);
	}, [handleNext, isHovered]);

	const currentSlide = HERO_SLIDES[currentIndex];

	const handleShopNow = () => {
		setSelectedCategory('All Products');
		const section = document.getElementById('product-section');
		if (section) {
			section.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<section
			className="relative border-b border-slate-800/80 overflow-hidden py-3 sm:py-5 lg:py-8"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{/* Background Decorative Glow */}
			<div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
			<div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

			<div className="max-w-9xl px-3 sm:px-5 lg:px-8 relative">
				<div className="relative rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl p-3 sm:p-10 lg:p-12 shadow-2xl min-h-80 lg:min-h-115 flex items-center">
					<AnimatePresence mode="wait">
						<motion.div
							key={currentSlide.id}
							initial={{ opacity: 0, x: 50 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -50 }}
							transition={{ duration: 0.4, ease: 'easeInOut' }}
							className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full"
						>
							{/* Slide Content Left */}
							<div className="lg:col-span-6 space-y-3 text-left">
								<span className=" items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 hidden sm:inline-flex">
									<Sparkles className="w-3.5 h-3.5" />
									{currentSlide.badge}
								</span>

								<h1 className="text-2xl sm:text-5xl font-black text-white tracking-tight leading-tight">
									{currentSlide.heading}{' '}
									<span className="block text-transparent bg-clip-text bg-linear-to-r from-emerald-400 via-teal-300 to-cyan-400">
										{currentSlide.highlightText}
									</span>
								</h1>

								<p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed hidden sm:block">
									{currentSlide.description}
								</p>

								{/* CTAs */}
								<div className="flex flex-wrap items-center gap-3 pt-2">
									<button
										onClick={handleShopNow}
										className="flex items-center gap-2 bg-linear-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 px-6 py-3 rounded-2xl text-sm font-extrabold shadow-lg shadow-emerald-500/25 transition-all hover:scale-105 cursor-pointer"
									>
										<ShoppingBag className="w-4 h-4" />
										<span>{currentSlide.primaryButtonText}</span>
										<ArrowRight className="w-4 h-4" />
									</button>
								</div>
							</div>

							{/* Slide Image Right */}
							<div className="lg:col-span-5 relative flex items-center justify-center">
								<div className="relative w-full aspect-4/3 max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl border border-slate-700/60 group">
									<img
										src={currentSlide.image}
										alt={currentSlide.heading}
										className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />
								</div>
							</div>
						</motion.div>
					</AnimatePresence>

					{/* Navigation Arrows */}
					<button
						onClick={handlePrev}
						className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 border border-slate-700 text-slate-200 hover:text-white hover:bg-slate-800 transition-all shadow-lg cursor-pointer"
						aria-label="Previous Slide"
					>
						<ChevronLeft className="w-5 h-5" />
					</button>
					<button
						onClick={handleNext}
						className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 border border-slate-700 text-slate-200 hover:text-white hover:bg-slate-800 transition-all shadow-lg cursor-pointer"
						aria-label="Next Slide"
					>
						<ChevronRight className="w-5 h-5" />
					</button>

					{/* Pagination Indicators */}
					<div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
						{HERO_SLIDES.map((slide, idx) => (
							<button
								key={slide.id}
								onClick={() => setCurrentIndex(idx)}
								className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
									currentIndex === idx
										? 'w-8 bg-emerald-400 shadow-md shadow-emerald-500/50'
										: 'w-2 bg-slate-700 hover:bg-slate-500'
								}`}
								aria-label={`Go to slide ${idx + 1}`}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
