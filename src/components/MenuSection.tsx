import React, { useState, useMemo } from 'react';
import { Plus, Check, Eye, Flame, Search, X, Sparkles } from 'lucide-react';
import { MenuItem } from '../types';
import { restaurantInfo, menuCategories } from '../data/menuData';

interface MenuSectionProps {
  items: MenuItem[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddToCart: (dish: MenuItem) => void;
  onInspectDish: (dish: MenuItem) => void;
  isItemInCart: (dishId: string) => boolean;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  items,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onAddToCart,
  onInspectDish,
  isItemInCart
}) => {
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'gluten-free' | 'signature'>('all');

  // Filtered dishes
  const filteredItems = useMemo(() => {
    return items.filter((dish) => {
      // Category filter
      if (selectedCategory !== 'all' && dish.category !== selectedCategory) {
        return false;
      }

      // Dietary filter
      if (dietaryFilter === 'veg' && !dish.isVegetarian) return false;
      if (dietaryFilter === 'gluten-free' && !dish.isGlutenFree) return false;
      if (dietaryFilter === 'signature' && !dish.isSignature) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = dish.name.toLowerCase().includes(q);
        const matchesHindi = dish.hindiName?.toLowerCase().includes(q);
        const matchesDesc = dish.description.toLowerCase().includes(q);
        const matchesIngredients = dish.ingredients.some(ing => ing.toLowerCase().includes(q));
        if (!matchesName && !matchesHindi && !matchesDesc && !matchesIngredients) return false;
      }

      return true;
    });
  }, [items, selectedCategory, dietaryFilter, searchQuery]);

  return (
    <section id="menu-catalog" className="py-20 lg:py-28 bg-[#0D0F13] text-[#F6F2E9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C29E65] font-semibold mb-3">
            <span>The Catalog</span>
            <span aria-hidden="true">·</span>
            <span>Handcrafted Daily</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#F6F2E9] tracking-tight mb-4">
            Curated Culinary Catalog
          </h2>
          <p className="text-sm sm:text-base text-[#8A95A5]">
            Each recipe is prepared to order using slow-extraction techniques and heritage spices. Tap any dish for ingredients and instant WhatsApp dispatch.
          </p>
        </div>

        {/* Category Horizontal Navigation Rail */}
        <div className="sticky top-[60px] sm:top-[70px] z-30 bg-[#0D0F13]/95 backdrop-blur-md py-4 border-b border-[#1C212B] mb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {menuCategories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`px-4 py-2 text-xs uppercase tracking-wider font-medium rounded-full transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-[#F6F2E9] text-[#0A0C0F] shadow-md font-semibold'
                      : 'bg-[#14171D] text-[#8A95A5] hover:text-[#F6F2E9] hover:bg-[#1B2028]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Sub-Filters: Search input & Dietary toggles */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4 pt-3 border-t border-[#171B22]">
            {/* Dietary filter segmented buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="text-[11px] uppercase tracking-wider text-[#6B7788] mr-1 hidden sm:inline">
                Filter:
              </span>
              {[
                { id: 'all', label: 'All' },
                { id: 'veg', label: 'Vegetarian Only' },
                { id: 'gluten-free', label: 'Gluten-Free' },
                { id: 'signature', label: 'Signatures' },
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setDietaryFilter(btn.id as any)}
                  className={`px-2.5 py-1 text-[11px] rounded transition-colors whitespace-nowrap cursor-pointer ${
                    dietaryFilter === btn.id
                      ? 'bg-[#C29E65]/20 text-[#C29E65] border border-[#C29E65]/40 font-medium'
                      : 'text-[#8A95A5] hover:text-[#F6F2E9]'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            {/* Quick Search Bar */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search dish or ingredient..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-[#14171D] border border-[#232934] rounded-lg pl-8 pr-8 py-1.5 text-xs text-[#F6F2E9] placeholder-[#5A6577] focus:outline-none focus:border-[#C29E65] transition-colors"
              />
              <Search className="w-3.5 h-3.5 text-[#5A6577] absolute left-2.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#5A6577] hover:text-[#F6F2E9]"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-[#1C212B] rounded-xl">
            <p className="text-base text-[#8A95A5] mb-3">No creations found matching your filter.</p>
            <button
              onClick={() => {
                onSelectCategory('all');
                setDietaryFilter('all');
                onSearchChange('');
              }}
              className="px-4 py-2 bg-[#171B22] text-xs uppercase tracking-wider text-[#C29E65] rounded-md hover:bg-[#232934]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((dish) => {
              const inCart = isItemInCart(dish.id);

              return (
                <div
                  key={dish.id}
                  className="group bg-[#12151B] border border-[#1C212B] hover:border-[#C29E65]/40 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/60 active:scale-[0.99] flex flex-col justify-between"
                >
                  {/* Top Image Container */}
                  <div
                    className="relative aspect-square w-full bg-[#080A0D] overflow-hidden cursor-pointer"
                    onClick={() => onInspectDish(dish)}
                  >
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Gradient Scrim for Contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#12151B] via-transparent to-transparent pointer-events-none" />

                    {/* Dietary indicator dot at top-left */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-[#0A0C0F]/90 backdrop-blur-md px-2 py-1 rounded text-[11px] font-medium border border-[#1C212B]">
                      {dish.isVegetarian ? (
                        <>
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                          <span className="text-emerald-300">Veg</span>
                        </>
                      ) : (
                        <>
                          <span className="w-2 h-2 rounded-full bg-rose-400" />
                          <span className="text-rose-300">Non-Veg</span>
                        </>
                      )}
                    </div>

                    {/* Signature Badge */}
                    {dish.isSignature && (
                      <div className="absolute top-3 right-3 bg-[#E26421]/90 text-white px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider">
                        Signature
                      </div>
                    )}

                    {/* Hover Quick Inspect Affordance */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                      <span className="px-3 py-1.5 bg-[#0A0C0F]/90 text-xs text-[#F6F2E9] border border-[#C29E65]/60 rounded-full font-medium shadow-lg flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Category & Spice */}
                      <div className="flex items-center justify-between text-[11px] text-[#7B8798] mb-1.5">
                        <span className="uppercase tracking-widest">{dish.category}</span>
                        {dish.spiceLevel > 0 && (
                          <div className="flex items-center gap-0.5 text-[#E26421]">
                            {Array.from({ length: dish.spiceLevel }).map((_, i) => (
                              <Flame key={i} className="w-3 h-3 fill-[#E26421]" />
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Dish Name */}
                      <h3
                        onClick={() => onInspectDish(dish)}
                        className="font-serif text-lg text-[#F6F2E9] group-hover:text-[#C29E65] transition-colors cursor-pointer line-clamp-1 mb-1 font-medium"
                      >
                        {dish.name}
                      </h3>

                      {/* Short Description */}
                      <p className="text-xs text-[#8A95A5] line-clamp-2 leading-relaxed mb-4">
                        {dish.description}
                      </p>
                    </div>

                    {/* Price and Add Button */}
                    <div className="pt-3 border-t border-[#1C212B] flex items-center justify-between">
                      <div className="font-serif text-lg font-semibold text-[#F6F2E9] tabular-nums">
                        {restaurantInfo.currencySymbol}{dish.price.toFixed(2)}
                      </div>

                      <button
                        onClick={() => onAddToCart(dish)}
                        className={`px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center gap-1 cursor-pointer active:scale-95 ${
                          inCart
                            ? 'bg-[#1E3A2F] text-emerald-300 border border-emerald-500/40'
                            : 'bg-[#E26421] hover:bg-[#C75214] text-white shadow-md'
                        }`}
                        aria-label={`Add ${dish.name} to order`}
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
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
