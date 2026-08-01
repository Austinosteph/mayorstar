import CartDrawer from '@/components/cart/CartDrawer';
import HeroCarousel from '@/components/hero/HeroCarousel';
import ProductGrid from '@/components/products/ProductGrid';
import QuickViewModal from '@/components/products/QuickViewModal';

export default function Home() {
	return (
		<div className="flex flex-col items-center justify-center bg-zinc-50 font-sans">
			<HeroCarousel />
			<ProductGrid />
			<CartDrawer />
			<QuickViewModal />
		</div>
	);
}
