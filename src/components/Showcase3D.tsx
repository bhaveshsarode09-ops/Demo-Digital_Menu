import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plus, Check, Eye, Flame, ShieldAlert, Sparkles } from 'lucide-react';
import { MenuItem } from '../types';
import { restaurantInfo } from '../data/menuData';

interface Showcase3DProps {
  signatureDishes: MenuItem[];
  onAddToCart: (dish: MenuItem) => void;
  onInspectDish: (dish: MenuItem) => void;
  isItemInCart: (dishId: string) => boolean;
}

export const Showcase3D: React.FC<Showcase3DProps> = ({
  signatureDishes,
  onAddToCart,
  onInspectDish,
  isItemInCart
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentDish = signatureDishes[currentIndex] || signatureDishes[0];

  // 2.5D tilt state
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, scale: 1 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Mouse move handler for 2.5D parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle tilt: max ±12 degrees
    const rotateY = ((x - centerX) / centerX) * 12;
    const rotateX = -((y - centerY) / centerY) * 12;

    setTilt({ rotateX, rotateY, scale: 1.02 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0, scale: 1 });
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % signatureDishes.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + signatureDishes.length) % signatureDishes.length);
  };

  const handleAdd = () => {
    onAddToCart(currentDish);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [signatureDishes.length]);

  return (
    <section id="showcase-3d" className="relative py-20 lg:py-28 bg-[#0E1116] border-t border-b border-[#1C212B] overflow-hidden">
      {/* Background radial gradient spotlight */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] lg:w-[800px] h-[500px] lg:h-[800px] rounded-full blur-[140px] pointer-events-none transition-colors duration-700"
        style={{
          backgroundColor: currentDish.accentHue ? `${currentDish.accentHue}12` : 'rgba(226, 100, 33, 0.08)'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C29E65] font-semibold mb-3">
              <span>Signature Showcase</span>
              <span aria-hidden="true">·</span>
              <span>2.5D Product View</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-[#F6F2E9] tracking-tight">
              Crafted like luxury horology.
            </h2>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest text-[#7B8798] tabular-nums">
              0{currentIndex + 1} / 0{signatureDishes.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-[#232934] hover:border-[#C29E65] bg-[#12151B] text-[#F6F2E9] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Previous signature dish"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-[#232934] hover:border-[#C29E65] bg-[#12151B] text-[#F6F2E9] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Next signature dish"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* 3D Showcase Stage */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative perspective-1500 py-6 sm:py-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Visual Stage (Dish in 2.5D Perspective) */}
            <div className="lg:col-span-7 flex items-center justify-center order-1 lg:order-1 relative">
              <div
                className="relative w-full max-w-[380px] sm:max-w-[480px] aspect-square flex items-center justify-center transition-transform duration-200 ease-out preserve-3d"
                style={{
                  transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.scale})`
                }}
              >
                {/* Dynamic multi-layered soft drop shadow under dish */}
                <div
                  className="absolute bottom-6 w-3/4 h-12 bg-black/70 blur-2xl rounded-full pointer-events-none transition-transform duration-200"
                  style={{
                    transform: `translate3d(${-tilt.rotateY * 3}px, ${tilt.rotateX * 2 + 10}px, -20px) scale(${1 + Math.abs(tilt.rotateX) * 0.02})`
                  }}
                />

                {/* Primary Isolated Dish Image Container */}
                <div
                  className="relative z-20 w-4/5 aspect-square rounded-full p-2 cursor-pointer group"
                  onClick={() => onInspectDish(currentDish)}
                >
                  <div className="relative w-full h-full rounded-full overflow-hidden border border-[#C29E65]/30 shadow-2xl bg-[#0A0C0F]">
                    <img
                      src={currentDish.image}
                      alt={currentDish.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-white/5 pointer-events-none" />
                  </div>

                  {/* Soft reflection beneath */}
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-4/5 h-16 opacity-20 blur-md pointer-events-none overflow-hidden scale-y-[-0.6] mask-[linear-gradient(to_bottom,white,transparent)]">
                    <img src={currentDish.image} alt="" className="w-full h-full object-cover" />
                  </div>
                </div>

                {/* Floating Spec Card 1 (Top Left) */}
                <div
                  className="absolute -top-4 left-0 sm:left-4 z-30 bg-[#12151B]/95 border border-[#232934] backdrop-blur-md px-3.5 py-2.5 rounded-lg shadow-xl text-left pointer-events-none transition-transform duration-300"
                  style={{
                    transform: `translate3d(${tilt.rotateY * 1.8}px, ${-tilt.rotateX * 1.8}px, 40px)`
                  }}
                >
                  <p className="text-[10px] uppercase tracking-wider text-[#C29E65] font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-[#E26421]" />
                    <span>{currentDish.floatingSpecs?.[0] || "Chef's Special"}</span>
                  </p>
                  <p className="text-xs text-[#D3DBE8] font-medium mt-0.5">{currentDish.serves}</p>
                </div>

                {/* Floating Spec Card 2 (Bottom Right) */}
                <div
                  className="absolute -bottom-4 right-0 sm:right-4 z-30 bg-[#12151B]/95 border border-[#232934] backdrop-blur-md px-3.5 py-2.5 rounded-lg shadow-xl text-left pointer-events-none transition-transform duration-300"
                  style={{
                    transform: `translate3d(${-tilt.rotateY * 1.8}px, ${tilt.rotateX * 1.8}px, 40px)`
                  }}
                >
                  <p className="text-[10px] uppercase tracking-wider text-[#8A95A5] font-semibold">
                    {currentDish.floatingSpecs?.[1] || "Freshly Prepared"}
                  </p>
                  <p className="text-xs text-[#F6F2E9] font-medium mt-0.5">
                    {currentDish.prepTime || "Slow Embers"}
                  </p>
                </div>
              </div>
            </div>

            {/* Product Specifications & Buy Panel */}
            <div className="lg:col-span-5 order-2 lg:order-2 space-y-6">
              {/* Category & Dietary Metadata */}
              <div className="flex items-center gap-3 text-xs">
                <span className="uppercase tracking-[0.2em] text-[#C29E65] font-semibold">
                  {currentDish.category}
                </span>
                <span className="text-[#3A4353]">·</span>
                {currentDish.isVegetarian ? (
                  <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Vegetarian</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-rose-400 font-medium">
                    <span className="w-2 h-2 rounded-full bg-rose-400" />
                    <span>Non-Vegetarian</span>
                  </span>
                )}
                {currentDish.isGlutenFree && (
                  <>
                    <span className="text-[#3A4353]">·</span>
                    <span className="text-[#9AA5B6]">Gluten-Free</span>
                  </>
                )}
              </div>

              {/* Title & Hindi Title */}
              <div>
                <h3 className="text-3xl sm:text-4xl font-serif text-[#F6F2E9] font-medium leading-tight">
                  {currentDish.name}
                </h3>
                {currentDish.hindiName && (
                  <p className="text-sm font-serif italic text-[#C29E65] mt-1 tracking-wide">
                    {currentDish.hindiName}
                  </p>
                )}
              </div>

              {/* Description */}
              <p className="text-[#9AA5B6] text-sm sm:text-base leading-relaxed">
                {currentDish.description}
              </p>

              {/* Product Specifications Grid */}
              <div className="grid grid-cols-3 gap-3 py-4 border-t border-b border-[#1C212B]">
                {/* Price */}
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[#7B8798] mb-1">Price</p>
                  <p className="text-xl font-serif text-[#F6F2E9] font-semibold tabular-nums">
                    {restaurantInfo.currencySymbol}{currentDish.price.toFixed(2)}
                  </p>
                </div>

                {/* Spice Level Gauge */}
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[#7B8798] mb-1">Spice Index</p>
                  <div className="flex items-center gap-1 text-[#E26421] h-6">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Flame
                        key={i}
                        className={`w-4 h-4 ${
                          i < currentDish.spiceLevel ? 'text-[#E26421] fill-[#E26421]' : 'text-[#2B3240]'
                        }`}
                      />
                    ))}
                    <span className="text-xs text-[#8A95A5] ml-1">
                      {currentDish.spiceLevel === 0 ? 'Mild' : currentDish.spiceLevel === 1 ? 'Balanced' : currentDish.spiceLevel === 2 ? 'Warm' : 'Fiery'}
                    </span>
                  </div>
                </div>

                {/* Calories / Portion */}
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[#7B8798] mb-1">Portion</p>
                  <p className="text-xs text-[#D3DBE8] font-medium mt-1">
                    {currentDish.serves}
                  </p>
                </div>
              </div>

              {/* Floating specs pill list */}
              {currentDish.floatingSpecs && (
                <div className="flex flex-wrap gap-2 text-xs text-[#9AA5B6]">
                  {currentDish.floatingSpecs.map((spec, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-[#171B22] border border-[#232934] rounded text-[11px] font-medium text-[#C29E65]"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleAdd}
                  className={`flex-1 py-3.5 px-6 rounded-md text-xs uppercase tracking-[0.2em] font-medium transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                    addedAnimation || isItemInCart(currentDish.id)
                      ? 'bg-[#1E3A2F] text-emerald-300 border border-emerald-500/40'
                      : 'bg-[#E26421] hover:bg-[#C75214] text-white shadow-lg shadow-[#E26421]/20'
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Order</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Add to Order · {restaurantInfo.currencySymbol}{currentDish.price.toFixed(2)}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onInspectDish(currentDish)}
                  className="py-3.5 px-4 bg-[#171B22] hover:bg-[#232934] text-[#A8B2C1] hover:text-[#F6F2E9] border border-[#232934] rounded-md transition-colors cursor-pointer"
                  aria-label="Inspect dish details"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Navigation Dots / Previews */}
        <div className="mt-12 flex items-center justify-center gap-3 overflow-x-auto py-2 no-scrollbar">
          {signatureDishes.map((dish, idx) => (
            <button
              key={dish.id}
              onClick={() => setCurrentIndex(idx)}
              className={`flex items-center gap-2.5 px-4 py-2 rounded-full border text-xs transition-all whitespace-nowrap cursor-pointer ${
                idx === currentIndex
                  ? 'border-[#C29E65] bg-[#C29E65]/10 text-[#F6F2E9] font-medium shadow-md'
                  : 'border-[#1C212B] bg-[#12151B] text-[#7B8798] hover:text-[#F6F2E9] hover:border-[#2E3646]'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: dish.accentHue || '#C29E65' }} />
              <span>{dish.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
