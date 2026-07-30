export interface Product {
	id: string;
	name: string;
	slug: string;
	brand: string;
	category: string; // One of the 16 category names
	price: number;
	originalPrice?: number;
	discountPercent?: number;
	image: string;
	additionalImages?: string[];
	description: string;
	specifications: Record<string, string>;
	rating: number;
	reviewCount: number;
	stock: number;
	featured: boolean;
	newArrival: boolean;
	bestSeller: boolean;
	tags?: string[];
}

export interface CartItem {
	product: Product;
	quantity: number;
}

export interface Review {
	id: string;
	name: string;
	rating: number;
	date: string;
	comment: string;
	avatar?: string;
	verified: boolean;
}

export type CategoryName =
	| 'All Products'
	| 'Featured'
	| 'New Arrivals'
	| 'Speakers'
	| 'Earbuds'
	| 'Smart Watches'
	| 'Power Banks'
	| 'TVs'
	| 'Fans'
	| 'Lights'
	| 'Home Appliances'
	| 'Accessories';

export interface CategoryInfo {
	id: string;
	name: CategoryName;
	slug: string;
	iconName: string;
	count?: number;
}
