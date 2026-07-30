"use client";

import { MessageCircle, Zap, ArrowRight, ShieldAlert, Sparkles } from "lucide-react";
import { formatPrice } from "@/lib/whatsapp";
import { motion } from "framer-motion";

export default function PromotionalBanner() {
  const whatsappDealUrl = `https://wa.me/2348123456789?text=${encodeURIComponent(
    "Hello MayorStar! I would like to claim the Special Limited-Time Tech Deal: Anker 737 140W Power Bank + UGREEN Fast Cable Bundle. Please reserve one for me."
  )}`;

  return (
    <section className="py-12 bg-slate-950 text-white relative overflow-hidden border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-cyan-950 border border-emerald-500/30 p-8 sm:p-12 shadow-2xl overflow-hidden">
          {/* Decorative Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Deal Text */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>LIMITED TIME FLASH SALE</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                Ultimate Power Bundle:{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                  Anker 140W + 2M Braided Cable
                </span>
              </h2>

              <p className="text-slate-300 text-sm sm:text-base max-w-xl">
                Get the Anker 737 24,000mAh 140W Power Bank bundled with UGREEN 100W Fast Cable at an exclusive 20% discount. Perfect for power outages and travel!
              </p>

              <div className="flex items-baseline gap-3 pt-2">
                <span className="text-3xl font-black text-emerald-400">
                  {formatPrice(140000)}
                </span>
                <span className="text-lg text-slate-500 line-through">
                  {formatPrice(175000)}
                </span>
                <span className="bg-red-500 text-white font-extrabold text-xs px-2 py-0.5 rounded-md">
                  SAVE {formatPrice(35000)}
                </span>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href={whatsappDealUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 px-6 py-3 rounded-2xl text-sm font-extrabold shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
                >
                  <MessageCircle className="w-4 h-4 fill-slate-950 text-emerald-500" />
                  <span>Claim Bundle via WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>Free Store Pickup Available Today</span>
                </div>
              </div>
            </div>

            {/* Deal Image */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-sm aspect-square rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1609592424074-984405391a0c?w=800&auto=format&fit=crop&q=80"
                  alt="Anker 737 Power Bank Deal"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-3 left-3 right-3 bg-slate-950/80 backdrop-blur-md p-2.5 rounded-xl border border-slate-800 text-center">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    ⚡ Only 8 Bundles Remaining
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
