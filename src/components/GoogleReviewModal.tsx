import React, { useState } from 'react';
import { X, Star, ExternalLink, Sparkles, Heart } from 'lucide-react';
import { restaurantInfo } from '../data/menuData';

interface GoogleReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoogleReviewModal: React.FC<GoogleReviewModalProps> = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(5);

  if (!isOpen) return null;

  const handleOpenGoogleReview = () => {
    // Open Google Review / Maps URL
    window.open(restaurantInfo.googleReviewUrl || restaurantInfo.googleMapsUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 animate-[fadeIn_0.2s_ease-out]">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-[#0E1116] border border-[#C29E65]/50 rounded-2xl shadow-2xl p-6 sm:p-8 z-10 text-center overflow-hidden">
        {/* Ambient Warm Golden Glow */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-[radial-gradient(circle,rgba(194,158,101,0.15)_0%,transparent_70%)] pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#14171D] text-[#8A95A5] hover:text-[#F6F2E9] flex items-center justify-center transition-colors cursor-pointer border border-[#232934]"
          aria-label="Close review dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand Monogram */}
        <div className="relative mx-auto w-14 h-14 rounded-full border border-[#C29E65] bg-[#14171D] flex items-center justify-center text-[#C29E65] font-serif text-lg tracking-widest font-semibold mb-4 shadow-lg shadow-[#C29E65]/10">
          {restaurantInfo.monogram}
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#E26421] text-white flex items-center justify-center text-[10px]">
            <Heart className="w-3 h-3 fill-current" />
          </div>
        </div>

        {/* Title */}
        <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.25em] text-[#C29E65] font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#E26421]" />
          <span>Before You Leave Our Menu</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-serif text-[#F6F2E9] font-medium leading-tight mb-3">
          How was your experience today?
        </h3>

        <p className="text-xs sm:text-sm text-[#9AA5B6] max-w-sm mx-auto leading-relaxed mb-6">
          Your feedback means the world to our culinary team and helps other guests discover refined modern Indian gastronomy.
        </p>

        {/* Interactive Star Rating */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {[1, 2, 3, 4, 5].map((star) => {
            const isFilled = (hoveredRating || rating) >= star;
            return (
              <button
                key={star}
                type="button"
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(rating)}
                onClick={() => setRating(star)}
                className="p-1 text-[#C29E65] transition-transform hover:scale-125 focus:outline-none cursor-pointer"
                aria-label={`Rate ${star} stars`}
              >
                <Star
                  className={`w-7 h-7 sm:w-8 sm:h-8 ${
                    isFilled ? 'fill-[#C29E65] text-[#C29E65]' : 'text-[#2B3240]'
                  }`}
                />
              </button>
            );
          })}
        </div>

        <p className="text-[11px] uppercase tracking-wider text-[#C29E65] font-semibold mb-6">
          {rating === 5 ? 'Exceptional · 5 Stars' : `${rating} Stars Selected`}
        </p>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          <button
            onClick={handleOpenGoogleReview}
            className="w-full py-3.5 px-6 bg-[#C29E65] hover:bg-[#D8B781] text-[#0A0C0F] font-bold text-xs uppercase tracking-[0.2em] rounded-md transition-all flex items-center justify-center gap-2 shadow-xl shadow-[#C29E65]/20 cursor-pointer"
          >
            <span>Write a Google Review</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onClose}
            className="w-full py-2.5 text-xs text-[#7B8798] hover:text-[#F6F2E9] uppercase tracking-wider transition-colors cursor-pointer"
          >
            Maybe Later
          </button>
        </div>

        <div className="mt-4 pt-4 border-t border-[#1C212B] text-[10px] text-[#6B7788]">
          {restaurantInfo.name} · {restaurantInfo.location} · Google Verified Restaurant
        </div>
      </div>
    </div>
  );
};
