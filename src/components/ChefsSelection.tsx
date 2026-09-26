import React from 'react';
import { Quote, Plus, Check } from 'lucide-react';
import { MenuItem } from '../types';
import { restaurantInfo } from '../data/menuData';

interface ChefsSelectionProps {
  dishes: MenuItem[];
  onAddToCart: (dish: MenuItem) => void;
  onInspectDish: (dish: MenuItem) => void;
  isItemInCart: (dishId: string) => boolean;
}

export const ChefsSelection: React.FC<ChefsSelectionProps> = ({
  dishes,
  onAddToCart,
  onInspectDish,
  isItemInCart
}) => {
  // Take up to 3 chef selection dishes
  const chefDishes = dishes.slice(0, 3);

  return (
    <section className="py-24 bg-[#0A0C0F] border-b border-[#1C212B] text-[#F6F2E9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C29E65] font-semibold mb-3">
            <span>Curated Edition</span>
            <span aria-hidden="true">·</span>
            <span>Chef's Private Selection</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-[#F6F2E9] leading-tight mb-4">
            "Three dishes that define our culinary philosophy."
          </h2>
          <p className="text-sm sm:text-base text-[#8A95A5] leading-relaxed">
            By <span className="text-[#F6F2E9] font-medium">{restaurantInfo.chefName}</span>, {restaurantInfo.chefTitle}. Each dish represents an obsessive study in smoke, time, and single-origin botanical spices.
          </p>
        </div>

        {/* 3 Editorial Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {chefDishes.map((dish, index) => {
            const inCart = isItemInCart(dish.id);

            return (
              <div
                key={dish.id}
                className="group relative bg-[#0E1116] border border-[#1C212B] hover:border-[#C29E65]/40 rounded-xl p-6 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Subtle index number */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-2xl text-[#C29E65]/80 italic">0{index + 1}</span>
                    <span className="text-[11px] uppercase tracking-wider text-[#7B8798]">
                      {dish.category}
                    </span>
                  </div>

                  {/* High Quality Dish Image with circular product presentation */}
                  <div
                    className="relative aspect-square w-full rounded-lg overflow-hidden mb-6 bg-[#080A0D] cursor-pointer group-hover:scale-[1.02] transition-transform duration-500"
                    onClick={() => onInspectDish(dish)}
                  >
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                    {/* Price Tag overlay */}
                    <div className="absolute bottom-3 right-3 bg-[#0A0C0F] px-3 py-1 rounded border border-[#232934] text-xs font-semibold tabular-nums text-[#F6F2E9] shadow-md">
                      {restaurantInfo.currencySymbol}{dish.price.toFixed(2)}
                    </div>
                  </div>

                  {/* Dish Title */}
                  <h3
                    onClick={() => onInspectDish(dish)}
                    className="text-2xl font-serif text-[#F6F2E9] group-hover:text-[#C29E65] transition-colors cursor-pointer mb-2"
                  >
                    {dish.name}
                  </h3>

                  {/* Chef's personal note */}
                  <div className="relative pl-4 border-l-2 border-[#C29E65]/60 my-4 text-xs text-[#A8B2C1] italic leading-relaxed">
                    <Quote className="w-3 h-3 text-[#C29E65] inline mr-1 -mt-1" />
                    <span>{dish.chefQuote || dish.description}</span>
                  </div>
                </div>

                {/* Card footer CTA */}
                <div className="pt-6 border-t border-[#1C212B] flex items-center justify-between gap-3 mt-4">
                  <button
                    onClick={() => onInspectDish(dish)}
                    className="text-xs uppercase tracking-wider text-[#8A95A5] hover:text-[#F6F2E9] transition-colors cursor-pointer"
                  >
                    View Specs
                  </button>

                  <button
                    onClick={() => onAddToCart(dish)}
                    className={`px-4 py-2 rounded-md text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                      inCart
                        ? 'bg-[#1E3A2F] text-emerald-300 border border-emerald-500/40'
                        : 'bg-[#E26421] hover:bg-[#C75214] text-white shadow-md'
                    }`}
                  >
                    {inCart ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
