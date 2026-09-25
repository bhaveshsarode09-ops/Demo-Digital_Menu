import React from 'react';
import { ArrowDown, MessageSquare, ChevronRight, Sparkles } from 'lucide-react';
import { restaurantInfo } from '../data/menuData';
import heroDishImage from '../assets/images/dish_butter_chicken_1790362103037.jpg';

interface HeroProps {
  onExploreMenu: () => void;
  onOpenWhatsApp: () => void;
  onInspectHeroDish: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreMenu,
  onOpenWhatsApp,
  onInspectHeroDish
}) => {
  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-gradient-to-b from-[#0A0C0F] via-[#0E1116] to-[#0A0C0F]">
      {/* Subtle atmospheric ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[340px] sm:w-[600px] h-[340px] sm:h-[600px] bg-[#E26421]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[280px] h-[280px] bg-[#C29E65]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle architectural luxury grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#171B2215_1px,transparent_1px),linear-gradient(to_bottom,#171B2215_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-6 text-center lg:text-left z-10">
            {/* Quiet unboxed kicker */}
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C29E65] font-semibold mb-4">
              <span>{restaurantInfo.name}</span>
              <span aria-hidden="true">·</span>
              <span>{restaurantInfo.location}</span>
            </div>

            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-serif font-normal tracking-tight text-[#F6F2E9] leading-[1.08] mb-6 text-balance">
              A menu worth experiencing.
            </h1>

            <p className="text-base sm:text-lg text-[#9AA5B6] max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed mb-8">
              {restaurantInfo.tagline} Immerse yourself in refined modern Indian culinary craft. Browse our complete menu, inspect signature creations, and place your order directly via WhatsApp.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
              <button
                onClick={onExploreMenu}
                className="w-full sm:w-auto px-7 py-3.5 bg-[#E26421] hover:bg-[#C75214] text-white font-medium text-xs uppercase tracking-[0.2em] rounded-md transition-all duration-200 shadow-xl shadow-[#E26421]/20 flex items-center justify-center gap-3 cursor-pointer group"
              >
                <span>Explore the Menu</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onOpenWhatsApp}
                className="w-full sm:w-auto px-7 py-3.5 bg-[#171B22] hover:bg-[#232934] text-[#F6F2E9] border border-[#232934] hover:border-[#C29E65]/50 font-medium text-xs uppercase tracking-[0.2em] rounded-md transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>Order on WhatsApp</span>
              </button>
            </div>

            {/* Subtle editorial trust markers */}
            <div className="pt-6 border-t border-[#1C212B] flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-[#7B8798]">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C29E65]" />
                <span>Pampore Grade-A Saffron</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E26421]" />
                <span>480°C Charcoal Tandoor</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                <span>Instant WhatsApp Concierge</span>
              </div>
            </div>
          </div>

          {/* Right Column: 2.5D Product Launch Hero Visual */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            {/* Visual stage / pedestal effect */}
            <div className="relative w-full max-w-[420px] sm:max-w-[480px] aspect-square flex items-center justify-center">
              {/* Concentric subtle rings like a luxury watch display */}
              <div className="absolute inset-0 rounded-full border border-[#232934]/40 scale-100 animate-[spin_60s_linear_infinite]" />
              <div className="absolute inset-6 rounded-full border border-[#C29E65]/20 scale-100" />
              <div className="absolute inset-16 rounded-full border border-dashed border-[#1C212B] scale-100" />

              {/* Floating product image with soft lighting & realistic shadow */}
              <div className="relative z-10 w-4/5 aspect-square rounded-full p-2 group cursor-pointer" onClick={onInspectHeroDish}>
                {/* Deep diffused drop shadow */}
                <div className="absolute inset-4 rounded-full bg-black/80 blur-2xl translate-y-8 pointer-events-none" />

                {/* Hero Dish Image */}
                <div className="relative w-full h-full rounded-full overflow-hidden border border-[#C29E65]/40 shadow-2xl transition-transform duration-700 ease-out group-hover:scale-105">
                  <img
                    src={heroDishImage}
                    alt="Signature Butter Chicken at Saffron House"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                  {/* Subtle rim light overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10 pointer-events-none" />
                </div>

                {/* Floating Product Specification Card 1 */}
                <div className="absolute -top-3 -right-2 sm:right-2 bg-[#12151B]/95 border border-[#C29E65]/40 backdrop-blur-md px-3.5 py-2 rounded-lg shadow-xl text-left pointer-events-none animate-[bounce_4s_ease-in-out_infinite]">
                  <p className="text-[10px] uppercase tracking-wider text-[#C29E65] font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" />
                    <span>Chef's Choice</span>
                  </p>
                  <p className="text-xs font-serif text-[#F6F2E9] font-medium">Signature Butter Chicken</p>
                </div>

                {/* Floating Product Specification Card 2 */}
                <div className="absolute -bottom-2 -left-2 sm:left-2 bg-[#12151B]/95 border border-[#232934] backdrop-blur-md px-3.5 py-2 rounded-lg shadow-xl text-left pointer-events-none">
                  <p className="text-[10px] uppercase tracking-wider text-[#8A95A5] font-medium">Preparation</p>
                  <p className="text-xs text-[#E26421] font-semibold tabular-nums">48h Slow Reduction · £24.50</p>
                </div>

                {/* Interactive hint */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 rounded-full">
                  <span className="px-3 py-1.5 bg-[#0A0C0F]/90 text-xs text-[#F6F2E9] border border-[#C29E65]/60 rounded-full font-medium shadow-lg">
                    Click to Inspect
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Down Indicator */}
      <button
        onClick={onExploreMenu}
        aria-label="Scroll to menu"
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#7B8798] hover:text-[#C29E65] transition-colors cursor-pointer group"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] font-medium">Explore</span>
        <div className="w-5 h-8 rounded-full border border-[#2B3240] group-hover:border-[#C29E65] flex items-start justify-center p-1 transition-colors">
          <div className="w-1 h-2 bg-[#C29E65] rounded-full animate-bounce" />
        </div>
      </button>
    </section>
  );
};
