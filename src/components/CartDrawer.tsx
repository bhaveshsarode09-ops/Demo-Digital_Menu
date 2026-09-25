import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, MessageSquare, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';
import { restaurantInfo } from '../data/menuData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (dishId: string, delta: number) => void;
  onRemoveItem: (dishId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [orderType, setOrderType] = useState<'dine-in' | 'takeaway'>('dine-in');
  const [tableNumber, setTableNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.dish.price * item.quantity, 0);
  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleSendWhatsAppOrder = () => {
    if (items.length === 0) return;

    // Build the formatted order slip
    let msg = `*NEW ORDER — ${restaurantInfo.name.toUpperCase()}*\n`;
    msg += `Service: ${orderType === 'dine-in' ? '🍽️ Dine-In' : '🥡 Takeaway'}\n`;
    if (orderType === 'dine-in' && tableNumber.trim()) {
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
    msg += `*Estimated Subtotal:* ${restaurantInfo.currencySymbol}${subtotal.toFixed(2)}\n`;

    if (specialInstructions.trim()) {
      msg += `────────────────────────────\n`;
      msg += `*General Notes:* ${specialInstructions.trim()}\n`;
    }

    msg += `────────────────────────────\n`;
    msg += `_Sent via ${restaurantInfo.name} Digital Menu_`;

    const encoded = encodeURIComponent(msg);
    const url = `https://wa.me/${restaurantInfo.whatsappNumber}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
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
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
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
                {/* Order Type Toggle */}
                <div>
                  <div className="flex items-center justify-between text-xs text-[#8A95A5] mb-2 font-medium">
                    <span>Dining Preference</span>
                    <button
                      onClick={onClearCart}
                      className="text-[11px] text-[#E26421] hover:underline"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2 p-1 bg-[#14171D] rounded-lg border border-[#232934]">
                    <button
                      onClick={() => setOrderType('dine-in')}
                      className={`py-2 text-xs font-medium rounded-md transition-all cursor-pointer ${
                        orderType === 'dine-in'
                          ? 'bg-[#E26421] text-white shadow'
                          : 'text-[#8A95A5] hover:text-[#F6F2E9]'
                      }`}
                    >
                      Dine-In Table
                    </button>
                    <button
                      onClick={() => setOrderType('takeaway')}
                      className={`py-2 text-xs font-medium rounded-md transition-all cursor-pointer ${
                        orderType === 'takeaway'
                          ? 'bg-[#E26421] text-white shadow'
                          : 'text-[#8A95A5] hover:text-[#F6F2E9]'
                      }`}
                    >
                      Express Takeaway
                    </button>
                  </div>

                  {/* Context Inputs */}
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    {orderType === 'dine-in' ? (
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
                    ) : (
                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-[#7B8798] block mb-1">
                          Pickup Time
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. In 30 mins"
                          value={tableNumber}
                          onChange={(e) => setTableNumber(e.target.value)}
                          className="w-full bg-[#14171D] border border-[#232934] rounded px-3 py-1.5 text-xs text-[#F6F2E9] placeholder-[#5A6577] focus:outline-none focus:border-[#C29E65]"
                        />
                      </div>
                    )}
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-[#7B8798] block mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Arthur"
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
                            className="p-1 text-[#8A95A5] hover:text-[#F6F2E9]"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-medium px-1.5 tabular-nums text-[#F6F2E9]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.dish.id, 1)}
                            className="p-1 text-[#8A95A5] hover:text-[#F6F2E9]"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.dish.id)}
                          className="p-1.5 text-[#6B7788] hover:text-rose-400 transition-colors"
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
            <div className="p-6 border-t border-[#1C212B] bg-[#0A0C0F] space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#8A95A5]">
                  <span>Subtotal</span>
                  <span className="font-semibold tabular-nums text-[#F6F2E9]">
                    {restaurantInfo.currencySymbol}{subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-[#8A95A5]">
                  <span>Service & Packaging</span>
                  <span className="text-emerald-400">Included</span>
                </div>
                <div className="flex justify-between text-sm font-serif font-bold text-[#F6F2E9] pt-2 border-t border-[#1C212B]">
                  <span>Estimated Total</span>
                  <span className="text-[#E26421] tabular-nums">
                    {restaurantInfo.currencySymbol}{subtotal.toFixed(2)}
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
                No prepayment required. Our team will immediately confirm your order via WhatsApp.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
