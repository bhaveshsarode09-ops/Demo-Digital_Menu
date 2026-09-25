/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Showcase3D } from './components/Showcase3D';
import { ChefsSelection } from './components/ChefsSelection';
import { MenuSection } from './components/MenuSection';
import { DishDetailModal } from './components/DishDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { RestaurantInfoSection } from './components/RestaurantInfo';
import { Footer } from './components/Footer';
import { menuItems, restaurantInfo } from './data/menuData';
import { MenuItem, CartItem } from './types';
import { Check, ShoppingBag } from 'lucide-react';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inspectDish, setInspectDish] = useState<MenuItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Cart total count
  const cartCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  // Signature dishes for 2.5D showcase
  const signatureDishes = useMemo(() => {
    return menuItems.filter((item) => item.isSignature);
  }, []);

  // Show toast notification
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2400);
  };

  // Add to cart handler
  const handleAddToCart = (dish: MenuItem, quantity: number = 1, instructions?: string) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.dish.id === dish.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
          instructions: instructions || updated[existingIndex].instructions
        };
        return updated;
      }
      return [...prevCart, { dish, quantity, instructions }];
    });
    triggerToast(`Added ${quantity > 1 ? `${quantity}x ` : ''}${dish.name} to order`);
  };

  // Update quantity in cart
  const handleUpdateCartQuantity = (dishId: string, delta: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.dish.id === dishId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  // Remove single item
  const handleRemoveFromCart = (dishId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.dish.id !== dishId));
  };

  // Clear cart
  const handleClearCart = () => {
    setCart([]);
  };

  const isItemInCart = (dishId: string) => {
    return cart.some((item) => item.dish.id === dishId);
  };

  // Quick Direct WhatsApp order for a single dish from modal
  const handleOrderDirectWhatsApp = (dish: MenuItem, quantity: number, instructions?: string) => {
    const total = (dish.price * quantity).toFixed(2);
    let msg = `*INSTANT ORDER — ${restaurantInfo.name.toUpperCase()}*\n`;
    msg += `Dish: ${quantity}x ${dish.name} (${restaurantInfo.currencySymbol}${total})\n`;
    if (instructions?.trim()) {
      msg += `Note: ${instructions.trim()}\n`;
    }
    msg += `Please confirm preparation and delivery/table timing.\n`;
    msg += `_Sent via Saffron House Digital Menu_`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${restaurantInfo.whatsappNumber}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  // WhatsApp general link
  const handleWhatsAppGeneral = () => {
    const text = encodeURIComponent(`Hello ${restaurantInfo.name}, I would like to place an order from your digital menu.`);
    window.open(`https://wa.me/${restaurantInfo.whatsappNumber}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  // Scroll to menu
  const handleExploreMenu = () => {
    const el = document.getElementById('menu-catalog');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  // Open search
  const handleOpenSearch = () => {
    const el = document.getElementById('menu-catalog');
    el?.scrollIntoView({ behavior: 'smooth' });
    const searchInput = document.querySelector<HTMLInputElement>('input[placeholder*="Search"]');
    searchInput?.focus();
  };

  return (
    <div className="min-h-screen bg-[#0A0C0F] text-[#F6F2E9] selection:bg-[#E26421] selection:text-white">
      {/* Sticky Header with 3-Zone Contract */}
      <Header
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={handleOpenSearch}
        onSelectCategory={(catId) => {
          setSelectedCategory(catId);
          handleExploreMenu();
        }}
      />

      <main>
        {/* Full-Screen Hero */}
        <Hero
          onExploreMenu={handleExploreMenu}
          onOpenWhatsApp={handleWhatsAppGeneral}
          onInspectHeroDish={() => setInspectDish(signatureDishes[0])}
        />

        {/* 2.5D Product Launch Showcase */}
        <Showcase3D
          signatureDishes={signatureDishes}
          onAddToCart={(dish) => handleAddToCart(dish, 1)}
          onInspectDish={(dish) => setInspectDish(dish)}
          isItemInCart={isItemInCart}
        />

        {/* Chef's Selection Editorial Section */}
        <ChefsSelection
          dishes={signatureDishes}
          onAddToCart={(dish) => handleAddToCart(dish, 1)}
          onInspectDish={(dish) => setInspectDish(dish)}
          isItemInCart={isItemInCart}
        />

        {/* Complete Catalog Section */}
        <MenuSection
          items={menuItems}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onAddToCart={(dish) => handleAddToCart(dish, 1)}
          onInspectDish={(dish) => setInspectDish(dish)}
          isItemInCart={isItemInCart}
        />

        {/* Trust, Hours, Location & Reviews */}
        <RestaurantInfoSection />
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(catId) => {
          setSelectedCategory(catId);
          handleExploreMenu();
        }}
      />

      {/* Dish Detail Product Modal */}
      <DishDetailModal
        dish={inspectDish}
        onClose={() => setInspectDish(null)}
        onAddToCart={handleAddToCart}
        onOrderDirectWhatsApp={handleOrderDirectWhatsApp}
      />

      {/* Slide-over Cart & WhatsApp Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* Temporary Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 lg:bottom-8 right-4 sm:right-8 z-50 bg-[#12151B] border border-[#C29E65]/50 text-[#F6F2E9] px-4 py-3 rounded-lg shadow-2xl flex items-center gap-3 animate-[slideUp_0.2s_ease-out] backdrop-blur-md">
          <span className="w-6 h-6 rounded-full bg-[#E26421] text-white flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5" />
          </span>
          <p className="text-xs font-medium">{toastMessage}</p>
          <button
            onClick={() => setIsCartOpen(true)}
            className="ml-2 text-xs text-[#C29E65] underline hover:text-[#E26421] whitespace-nowrap cursor-pointer"
          >
            View Bag
          </button>
        </div>
      )}
    </div>
  );
}
