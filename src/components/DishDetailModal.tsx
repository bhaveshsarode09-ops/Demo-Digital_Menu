import React, { useState } from 'react';
import { X, Plus, Minus, MessageSquare, ShoppingBag, Flame, Sparkles, AlertCircle, Check } from 'lucide-react';
import { MenuItem } from '../types';
import { restaurantInfo } from '../data/menuData';

interface DishDetailModalProps {
  dish: MenuItem | null;
  onClose: () => void;
  onAddToCart: (dish: MenuItem, quantity: number, instructions?: string) => void;
  onOrderDirectWhatsApp: (dish: MenuItem, quantity: number, instructions?: string) => void;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  dish,
  onClose,
  onAddToCart,
  onOrderDirectWhatsApp
}) => {
  const [quantity, setQuantity] = useState(1);
  const [instructions, setInstructions] = useState('');
  const [justAdded, setJustAdded] = useState(false);

  if (!dish) return null;

  const totalPrice = dish.price * quantity;

  const handleAdd = () => {
    onAddToCart(dish, quantity, instructions);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      onClose();
    }, 600);
  };

  const handleDirectWhatsApp = () => {
    onOrderDirectWhatsApp(dish, quantity, instructions);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-[fadeIn_0.2s_ease-out]">
      {/* Click backdrop to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-[#0E1116] border border-[#232934] rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#0A0C0F]/80 text-[#8A95A5] hover:text-[#F6F2E9] hover:bg-[#1A1E26] flex items-center justify-center transition-colors cursor-pointer border border-[#232934]"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: Isolated Product Image */}
            <div className="relative aspect-square md:aspect-auto md:min-h-full bg-[#080A0D] flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-[#1C212B]">
              <div className="relative w-full max-w-[320px] aspect-square rounded-full overflow-hidden border border-[#C29E65]/30 shadow-2xl">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating Spec Badges */}
              {dish.floatingSpecs && dish.floatingSpecs.length > 0 && (
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-1.5 justify-center">
                  {dish.floatingSpecs.slice(0, 3).map((spec, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-[#12151B]/90 backdrop-blur-md border border-[#232934] text-[10px] uppercase tracking-wider text-[#C29E65] rounded"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Specification Details */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                {/* Category & Dietary */}
                <div className="flex items-center gap-2 text-xs mb-2">
                  <span className="uppercase tracking-[0.2em] text-[#C29E65] font-semibold">
                    {dish.category}
                  </span>
                  <span className="text-[#3A4353]">·</span>
                  {dish.isVegetarian ? (
                    <span className="text-emerald-400 font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>Vegetarian</span>
                    </span>
                  ) : (
                    <span className="text-rose-400 font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                      <span>Non-Vegetarian</span>
                    </span>
                  )}
                  {dish.isGlutenFree && (
                    <>
                      <span className="text-[#3A4353]">·</span>
                      <span className="text-[#8A95A5]">Gluten-Free</span>
                    </>
                  )}
                </div>

                {/* Name */}
                <h3 className="text-2xl sm:text-3xl font-serif text-[#F6F2E9] font-medium leading-tight">
                  {dish.name}
                </h3>
                {dish.hindiName && (
                  <p className="text-sm font-serif italic text-[#C29E65] mt-1">
                    {dish.hindiName}
                  </p>
                )}

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#9AA5B6] mt-3 leading-relaxed">
                  {dish.description}
                </p>

                {/* Editorial story if present */}
                {dish.editorialStory && (
                  <p className="text-xs text-[#7B8798] mt-2 italic border-l-2 border-[#C29E65]/40 pl-3 leading-relaxed">
                    {dish.editorialStory}
                  </p>
                )}

                {/* Specification Table */}
                <div className="grid grid-cols-3 gap-2 py-4 my-4 border-t border-b border-[#1C212B] text-xs">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#6B7788] block">Portion</span>
                    <span className="font-medium text-[#D3DBE8] mt-0.5 block">{dish.serves}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#6B7788] block">Spice Level</span>
                    <div className="flex items-center gap-0.5 mt-1 text-[#E26421]">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <Flame
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < dish.spiceLevel ? 'fill-[#E26421]' : 'text-[#2B3240]'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#6B7788] block">Preparation</span>
                    <span className="font-medium text-[#D3DBE8] mt-0.5 block">{dish.prepTime || 'Freshly made'}</span>
                  </div>
                </div>

                {/* Ingredients Breakdown */}
                {dish.ingredients && dish.ingredients.length > 0 && (
                  <div className="mb-4">
                    <p className="text-[10px] uppercase tracking-wider text-[#8A95A5] font-semibold mb-1.5">
                      Key Botanical Ingredients:
                    </p>
                    <p className="text-xs text-[#9AA5B6] leading-relaxed">
                      {dish.ingredients.join(' · ')}
                    </p>
                  </div>
                )}

                {/* Allergens Notification */}
                {dish.allergens && dish.allergens.length > 0 && (
                  <div className="flex items-start gap-2 p-2.5 bg-[#171B22] border border-[#232934] rounded text-xs text-[#A8B2C1]">
                    <AlertCircle className="w-3.5 h-3.5 text-[#C29E65] shrink-0 mt-0.5" />
                    <span>Allergens: {dish.allergens.join(', ')}</span>
                  </div>
                )}

                {/* Optional Instructions */}
                <div className="mt-4">
                  <label className="text-[10px] uppercase tracking-wider text-[#8A95A5] block mb-1">
                    Special Preparation Notes (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Extra mild, no cilantro..."
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    className="w-full bg-[#14171D] border border-[#232934] rounded px-3 py-1.5 text-xs text-[#F6F2E9] placeholder-[#5A6577] focus:outline-none focus:border-[#C29E65]"
                  />
                </div>
              </div>

              {/* Purchase Module: Quantity + Actions */}
              <div className="pt-4 border-t border-[#1C212B] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-[#8A95A5]">Quantity</span>
                  <div className="flex items-center gap-3 bg-[#14171D] border border-[#232934] rounded-lg px-2 py-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-1 text-[#8A95A5] hover:text-[#F6F2E9] cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-sm font-semibold tabular-nums text-[#F6F2E9] min-w-4 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-1 text-[#8A95A5] hover:text-[#F6F2E9] cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={handleAdd}
                    className={`w-full py-3 px-4 rounded-md text-xs uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      justAdded
                        ? 'bg-[#1E3A2F] text-emerald-300'
                        : 'bg-[#E26421] hover:bg-[#C75214] text-white shadow-lg'
                    }`}
                  >
                    {justAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add · {restaurantInfo.currencySymbol}{totalPrice.toFixed(2)}</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleDirectWhatsApp}
                    className="w-full py-3 px-4 rounded-md text-xs uppercase tracking-wider font-semibold bg-[#171B22] hover:bg-[#232934] text-[#F6F2E9] border border-[#25D366]/40 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 text-[#25D366]" />
                    <span>WhatsApp Order</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
