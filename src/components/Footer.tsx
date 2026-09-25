import React from 'react';
import { restaurantInfo } from '../data/menuData';

interface FooterProps {
  onSelectCategory: (categoryId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  return (
    <footer className="bg-[#07090C] border-t border-[#1C212B] text-[#7B8798] py-16 pb-28 lg:pb-16 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-[#171B22]">
          {/* Brand */}
          <div>
            <span className="font-serif text-2xl tracking-[0.18em] uppercase text-[#F6F2E9] font-medium block">
              {restaurantInfo.name}
            </span>
            <p className="text-[#8A95A5] mt-1 text-xs">
              {restaurantInfo.tagline}
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap items-center gap-6 uppercase tracking-wider text-[11px]">
            <button
              onClick={() => {
                onSelectCategory('signature');
                document.getElementById('showcase-3d')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-[#F6F2E9] transition-colors cursor-pointer"
            >
              Signature Dishes
            </button>
            <button
              onClick={() => {
                onSelectCategory('all');
                document.getElementById('menu-catalog')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-[#F6F2E9] transition-colors cursor-pointer"
            >
              Full Menu
            </button>
            <button
              onClick={() => {
                document.getElementById('restaurant-info')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-[#F6F2E9] transition-colors cursor-pointer"
            >
              Location & Hours
            </button>
            <a
              href={`https://wa.me/${restaurantInfo.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#25D366] hover:underline"
            >
              WhatsApp Concierge
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#5A6577] text-[11px]">
          <p>© {new Date().getFullYear()} {restaurantInfo.name}. All culinary creations reserved.</p>
          <p className="flex items-center gap-2">
            <span>{restaurantInfo.location}</span>
            <span>·</span>
            <span>Digital Gastronomic Experience</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
