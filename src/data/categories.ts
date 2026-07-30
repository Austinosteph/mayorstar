import { CategoryInfo } from '@/types/product';

export const CATEGORIES: CategoryInfo[] = [
	{ id: 'all', name: 'All Products', slug: 'all', iconName: 'Grid' },
	{ id: 'featured', name: 'Featured', slug: 'featured', iconName: 'Sparkles' },
	{
		id: 'new-arrivals',
		name: 'New Arrivals',
		slug: 'new-arrivals',
		iconName: 'Zap',
	},

	{ id: 'speakers', name: 'Speakers', slug: 'speakers', iconName: 'Volume2' },
	{ id: 'earbuds', name: 'Earbuds', slug: 'earbuds', iconName: 'Disc' },
	{
		id: 'smart-watches',
		name: 'Smart Watches',
		slug: 'smart-watches',
		iconName: 'Watch',
	},
	{
		id: 'power-banks',
		name: 'Power Banks',
		slug: 'power-banks',
		iconName: 'BatteryCharging',
	},
	{ id: 'tvs', name: 'TVs', slug: 'tvs', iconName: 'Tv' },
	{ id: 'fans', name: 'Fans', slug: 'fans', iconName: 'Fan' },
	{ id: 'lights', name: 'Lights', slug: 'lights', iconName: 'Lightbulb' },
	{
		id: 'home-appliances',
		name: 'Home Appliances',
		slug: 'home-appliances',
		iconName: 'Home',
	},
	{
		id: 'accessories',
		name: 'Accessories',
		slug: 'accessories',
		iconName: 'Package',
	},
];
