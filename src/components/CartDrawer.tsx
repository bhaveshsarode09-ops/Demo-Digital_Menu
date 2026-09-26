import React, { useState, useEffect } from 'react';
import { X, Trash2, Plus, Minus, MessageSquare, ShoppingBag, Instagram, Check, Sparkles, ArrowRight, ExternalLink } from 'lucide-react';
import { CartItem } from '../types';
import { restaurantInfo } from '../data/menuData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (dishId: string, delta: number) => void;
  onRemoveItem: (dishId: string) => void;
  onClearCart: () => void;
  isInstagramFollower: boolean;
  onToggleInstagramFollower: (val: boolean) => void;
  instagramHandle: string;
  onUpdateInstagramHandle: (handle: string) => void;
  onOrderCompleted?: () => void;
  onRedirectToMenu?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  isInstagramFollower,
  onToggleInstagramFollower,
  instagramHandle,
  onUpdateInstagramHandle,
  onOrderCompleted,
  onRedirectToMenu
}) => {
  const [tableNumber, setTableNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [showRedirectNotice, setShowRedirectNotice] = useState(false);

  useEffect(() => {
    // If handle is empty, default or prefill to @1210.bhavesh follower
    if (!instagramHandle) {
      onUpdateInstagramHandle('1210.bhavesh');
    }
  }, [instagramHandle, onUpdateInstagramHandle]);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.dish.price * item.quantity, 0);
  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // 10% Discount calculation
  const discountAmount = isInstagramFollower ? subtotal * 0.10 : 0;
  const finalTotal = Math.max(0, subtotal - discountAmount);

  // Handle clicking the Follow button:
  // 1. Opens instagram.com/1210.bhavesh
  // 2. Automatically applies the 10% discount
  // 3. Closes bag and redirects back to the menu with applied discount and handle!
  const handleFollowAndRedirectToMenu = () => {
    // Open Instagram profile
    window.open(restaurantInfo.instagramUrl, '_blank', 'noopener,noreferrer');

    // Apply the discount
    onToggleInstagramFollower(true);

    // Show feedback and redirect to menu
    setShowRedirectNotice(true);
    setTimeout(() => {
      setShowRedirectNotice(false);
      onClose();
      if (onRedirectToMenu) {
        onRedirectToMenu();
      } else {
        const el = document.getElementById('menu-catalog');
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1200);
  };

  const handleAlreadyFollow = () => {
    onToggleInstagramFollower(!isInstagramFollower);
  };

  const handleSendWhatsAppOrder = () => {
    if (items.length === 0) return;

    // Build the formatted order slip
    let msg = `*NEW ORDER — ${restaurantInfo.name.toUpperCase()}*\n`;
    if (tableNumber.trim()) {
      msg += `Table Number: Table ${tableNumber.trim()}\n`;
    }
    if (customerName.trim()) {
      msg += `Guest Name: ${customerName.trim()}\n`;
    }
    msg += `────────────────────────────\n`;
    msg += `*SELECTED DISHES:*\n`;

    items.forEach((item, idx) => {
      const lineTotal = (item.dish.price * item.quantity).toFixed(2);
      msg += `${idx + 1}. ${item.quantity}x ${item.dish.name} (${restaurantInfo.currencySymbol}${lineTotal})\n`;
      if (item.instructions?.trim()) {
        msg += `   _Note: ${item.instructions.trim()}_\n`;
      }
    });

    msg += `────────────────────────────\n`;
    msg += `*Total Items:* ${totalItemsCount}\n`;
    msg += `*Item Subtotal:* ${restaurantInfo.currencySymbol}${subtotal.toFixed(2)}\n`;

    if (isInstagramFollower) {
      msg += `*Instagram Follower Privilege (10% OFF):* -${restaurantInfo.currencySymbol}${discountAmount.toFixed(2)}\n`;
      if (instagramHandle.trim()) {
        const h = instagramHandle.startsWith('@') ? instagramHandle : `@${instagramHandle}`;
        msg += `*Instagram Profile:* ${h} (Following ${restaurantInfo.instagramHandle})\n`;
      } else {
        msg += `*Instagram Status:* Follower of ${restaurantInfo.instagramHandle}\n`;
      }
    }

    msg += `*Final Payable Total:* ${restaurantInfo.currencySymbol}${finalTotal.toFixed(2)}\n`;

    if (specialInstructions.trim()) {
      msg += `────────────────────────────\n`;
      msg += `*Kitchen Notes:* ${specialInstructions.trim()}\n`;
    }

    msg += `────────────────────────────\n`;
    msg += `_Sent via ${restaurantInfo.name} Digital Menu_`;

    const encoded = encodeURIComponent(msg);
    const url = `https://wa.me/${restaurantInfo.whatsappNumber}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');

    if (onOrderCompleted) {
      onOrderCompleted();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-black/80 transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-[#0E1116] border-l border-[#232934] shadow-2xl flex flex-col z-10 text-[#F6F2E9]">
          {/* Drawer Header */}
          <div className="p-6 border-b border-[#1C212B] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#E26421]" />
              <h2 className="text-xl font-serif tracking-tight font-medium">Your Order Bag</h2>
              <span className="text-xs text-[#8A95A5] tabular-nums">({totalItemsCount})</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#8A95A5] hover:text-[#F6F2E9] rounded-lg transition-colors cursor-pointer"
              aria-label="Close order bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
            {items.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#14171D] border border-[#232934] flex items-center justify-center mx-auto text-[#7B8798]">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-base font-medium text-[#D3DBE8]">Your bag is empty</p>
                  <p className="text-xs text-[#7B8798] mt-1">
                    Explore our culinary creations and add your favorites to place a WhatsApp order.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-[#E26421] hover:bg-[#C75214] text-white text-xs uppercase tracking-wider font-semibold rounded-md transition-colors"
                >
                  Explore Menu
                </button>
              </div>
            ) : (
              <>
                {/* ✦ INSTAGRAM FOLLOWER 10% DISCOUNT CARD WITH DIRECT REDIRECT ✦ */}
                <div className="relative overflow-hidden rounded-xl border border-[#C29E65]/40 bg-gradient-to-br from-[#1C1610] via-[#14171D] to-[#0E1116] p-4 shadow-xl">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle,rgba(225,48,108,0.15)_0%,transparent_70%)] pointer-events-none" />

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#833AB4] flex items-center justify-center text-white shrink-0 shadow-md">
                      <Instagram className="w-5 h-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-[#C29E65] flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-[#E26421]" />
                          <span>Guest Privilege</span>
                        </span>
                        <span className="text-[10px] bg-[#E26421] text-white font-bold px-1.5 py-0.2 rounded">
                          10% OFF
                        </span>
                      </div>
                      <h4 className="text-sm font-serif font-medium text-[#F6F2E9] mt-0.5">
                        Follow {restaurantInfo.instagramHandle}
                      </h4>
                      <p className="text-[11px] text-[#A8B2C1] mt-0.5 leading-snug">
                        Tap below to follow our Instagram page. We'll automatically apply a <strong>10% discount</strong> and return you to the menu!
                      </p>
                    </div>
                  </div>

                  {/* Prewritten Handle Input */}
                  <div className="mt-3 pt-3 border-t border-[#232934]">
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[10px] uppercase tracking-wider text-[#C29E65] font-semibold">
                        Your Instagram Username
                      </label>
                      <span className="text-[10px] text-[#7B8798]">Pre-verified for discount</span>
                    </div>
                    <div className="relative">
                      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#7B8798] text-xs">@</span>
                      <input
                        type="text"
                        placeholder="your_handle"
                        value={instagramHandle.replace(/^@/, '')}
                        onChange={(e) => onUpdateInstagramHandle(e.target.value)}
                        className="w-full bg-[#0A0C0F] border border-[#343D4D] rounded pl-6 pr-3 py-1.5 text-xs text-[#F6F2E9] placeholder-[#5A6577] focus:outline-none focus:border-[#C29E65]"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-3 pt-2.5 flex flex-col gap-2">
                    {/* Primary Button: Redirects to Instagram & Returns with 10% Discount */}
                    <button
                      onClick={handleFollowAndRedirectToMenu}
                      className="w-full py-2.5 px-3 bg-gradient-to-r from-[#E1306C] via-[#FD1D1D] to-[#E26421] hover:opacity-95 text-white font-bold text-xs uppercase tracking-wider rounded-md transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#E1306C]/25 cursor-pointer"
                    >
                      <Instagram className="w-4 h-4" />
                      <span>Follow {restaurantInfo.instagramHandle} &amp; Apply 10%</span>
                      <ExternalLink className="w-3.5 h-3.5 ml-auto" />
                    </button>

                    {/* Secondary Button: Already Follows */}
                    <button
                      onClick={handleAlreadyFollow}
                      className={`w-full py-1.5 px-3 rounded text-[11px] font-semibold tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer border ${
                        isInstagramFollower
                          ? 'bg-[#1E3A2F] text-emerald-300 border-emerald-500/50'
                          : 'bg-[#14171D] text-[#A8B2C1] hover:text-[#F6F2E9] border-[#232934]'
                      }`}
                    >
                      {isInstagramFollower ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Already Following {restaurantInfo.instagramHandle} (10% Active)</span>
                        </>
                      ) : (
                        <span>Already follow {restaurantInfo.instagramHandle}? Tap to Apply 10%</span>
                      )}
                    </button>
                  </div>

                  {/* Feedback Notification Banner */}
                  {showRedirectNotice && (
                    <div className="mt-3 p-2.5 bg-emerald-950/80 border border-emerald-500/50 rounded-lg text-center animate-fade-in">
                      <p className="text-xs font-semibold text-emerald-300 flex items-center justify-center gap-1.5">
                        <Check className="w-4 h-4" />
                        <span>10% Discount Applied! Returning to Menu...</span>
                      </p>
                    </div>
                  )}
                </div>

                {/* Table & Guest Details */}
                <div>
                  <div className="flex items-center justify-between text-xs text-[#8A95A5] mb-2 font-medium">
                    <span>Order Details</span>
                    <button
                      onClick={onClearCart}
                      className="text-[11px] text-[#E26421] hover:underline cursor-pointer"
                    >
                      Clear All
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-[#7B8798] block mb-1">
                        Table No. (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 14"
                        value={tableNumber}
                        onChange={(e) => setTableNumber(e.target.value)}
                        className="w-full bg-[#14171D] border border-[#232934] rounded px-3 py-1.5 text-xs text-[#F6F2E9] placeholder-[#5A6577] focus:outline-none focus:border-[#C29E65]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-[#7B8798] block mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Guest"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full bg-[#14171D] border border-[#232934] rounded px-3 py-1.5 text-xs text-[#F6F2E9] placeholder-[#5A6577] focus:outline-none focus:border-[#C29E65]"
                      />
                    </div>
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-3 pt-2">
                  <p className="text-[10px] uppercase tracking-widest text-[#7B8798] font-semibold">
                    Order Items ({totalItemsCount})
                  </p>

                  {items.map((item) => (
                    <div
                      key={item.dish.id}
                      className="p-3 bg-[#12151B] border border-[#1C212B] rounded-lg flex items-center justify-between gap-3"
                    >
                      <img
                        src={item.dish.image}
                        alt={item.dish.name}
                        className="w-14 h-14 rounded-md object-cover border border-[#232934] shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-serif font-medium text-[#F6F2E9] truncate">
                          {item.dish.name}
                        </h4>
                        <p className="text-xs text-[#C29E65] font-semibold tabular-nums mt-0.5">
                          {restaurantInfo.currencySymbol}{(item.dish.price * item.quantity).toFixed(2)}
                        </p>
                        {item.instructions && (
                          <p className="text-[10px] text-[#7B8798] truncate italic mt-0.5">
                            Note: {item.instructions}
                          </p>
                        )}
                      </div>

                      {/* Quantity Stepper & Remove */}
                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center bg-[#171B22] border border-[#232934] rounded">
                          <button
                            onClick={() => onUpdateQuantity(item.dish.id, -1)}
                            className="p-1 text-[#8A95A5] hover:text-[#F6F2E9] cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-medium px-1.5 tabular-nums text-[#F6F2E9]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.dish.id, 1)}
                            className="p-1 text-[#8A95A5] hover:text-[#F6F2E9] cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.dish.id)}
                          className="p-1.5 text-[#6B7788] hover:text-rose-400 transition-colors cursor-pointer"
                          aria-label={`Remove ${item.dish.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#7B8798] block mb-1">
                    Special Kitchen Instructions
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Allergies, spice preference, or dietary requests..."
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    className="w-full bg-[#14171D] border border-[#232934] rounded px-3 py-2 text-xs text-[#F6F2E9] placeholder-[#5A6577] focus:outline-none focus:border-[#C29E65] resize-none"
                  />
                </div>
              </>
            )}
          </div>

          {/* Drawer Footer with WhatsApp Action */}
          {items.length > 0 && (
            <div className="p-5 sm:p-6 border-t border-[#1C212B] bg-[#0A0C0F] space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#8A95A5]">
                  <span>Subtotal</span>
                  <span className="font-semibold tabular-nums text-[#F6F2E9]">
                    {restaurantInfo.currencySymbol}{subtotal.toFixed(2)}
                  </span>
                </div>

                {/* 10% Discount Line */}
                {isInstagramFollower && (
                  <div className="flex justify-between text-emerald-400 font-medium">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>Instagram Privilege (10% Off)</span>
                    </span>
                    <span className="tabular-nums font-semibold">
                      -{restaurantInfo.currencySymbol}{discountAmount.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-[#8A95A5]">
                  <span>Service & Packaging</span>
                  <span className="text-emerald-400">Included</span>
                </div>

                <div className="flex justify-between text-base font-serif font-bold text-[#F6F2E9] pt-2 border-t border-[#1C212B]">
                  <span>Total Due</span>
                  <span className="text-[#E26421] tabular-nums text-lg">
                    {restaurantInfo.currencySymbol}{finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleSendWhatsAppOrder}
                className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#20BA5A] text-[#0A0C0F] font-bold text-xs uppercase tracking-wider rounded-md transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Send Order on WhatsApp</span>
              </button>

              <p className="text-[11px] text-center text-[#7B8798]">
                {isInstagramFollower ? (
                  <span className="text-emerald-400 font-medium">
                    ✦ 10% discount verified for @{instagramHandle.replace(/^@/, '') || '1210.bhavesh'}
                  </span>
                ) : (
                  <span>
                    Follow <strong>{restaurantInfo.instagramHandle}</strong> to get 10% off your entire bill.
                  </span>
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
