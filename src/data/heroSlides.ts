export interface HeroSlide {
  id: string;
  badge: string;
  heading: string;
  highlightText: string;
  description: string;
  primaryButtonText: string;
  whatsappMessage: string;
  image: string;
  accentColor: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "slide-1",
    badge: "🔥 New Flagship Release",
    heading: "Experience Supreme Audio",
    highlightText: "Sony WH-1000XM5",
    description: "Industry-leading noise cancellation & immersive spatial sound engineered for audiophiles.",
    primaryButtonText: "Shop Audio Collection",
    whatsappMessage: "Hello MayorStar Gadgets! I am interested in buying the Sony WH-1000XM5 Headphones. Please share current price & delivery details.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&auto=format&fit=crop&q=80",
    accentColor: "from-blue-600 to-indigo-600"
  },
  {
    id: "slide-2",
    badge: "⚡ Power On The Go",
    heading: "Monster 140W Fast Charge",
    highlightText: "Anker 737 24,000mAh",
    description: "Charge laptops, tablets, and smartphones simultaneously at ultra-fast speeds.",
    primaryButtonText: "Explore Power Banks",
    whatsappMessage: "Hello MayorStar! I'm interested in ordering the Anker 737 140W Power Bank. Is it available for store pickup?",
    image: "https://images.unsplash.com/photo-1609592424074-984405391a0c?w=1000&auto=format&fit=crop&q=80",
    accentColor: "from-emerald-600 to-teal-600"
  },
  {
    id: "slide-3",
    badge: "⌚ Smart Living Tech",
    heading: "Next-Gen Health & Fitness",
    highlightText: "Apple Watch Series 9",
    description: "Brighter Retina display, Double Tap gesture control, and advanced biometric tracking.",
    primaryButtonText: "Shop Smart Watches",
    whatsappMessage: "Hello MayorStar! Please send me specs & ordering details for Apple Watch Series 9.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1000&auto=format&fit=crop&q=80",
    accentColor: "from-purple-600 to-pink-600"
  },
  {
    id: "slide-4",
    badge: "🍳 Smart Kitchen Tech",
    heading: "Oil-Free Digital Cooking",
    highlightText: "Ninja Foodi MAX 9.5L",
    description: "Dual-Zone digital air fryer to crisp and roast two meals simultaneously in record time.",
    primaryButtonText: "View Appliances",
    whatsappMessage: "Hi MayorStar! I'd like to order the Ninja Foodi MAX Air Fryer. Can you confirm stock status?",
    image: "https://images.unsplash.com/photo-1626078436894-3729d3c52a9a?w=1000&auto=format&fit=crop&q=80",
    accentColor: "from-amber-500 to-orange-600"
  }
];

export const SOCIAL_LINKS = [
  { name: "WhatsApp", url: "https://wa.me/2348000000000", icon: "MessageCircle", color: "hover:bg-emerald-500 hover:text-white" },
  { name: "Facebook", url: "https://facebook.com", icon: "Facebook", color: "hover:bg-blue-600 hover:text-white" },
  { name: "Instagram", url: "https://instagram.com", icon: "Instagram", color: "hover:bg-pink-600 hover:text-white" },
  { name: "TikTok", url: "https://tiktok.com", icon: "Video", color: "hover:bg-black hover:text-white" }
];
