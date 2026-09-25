import React from 'react';
import { MapPin, Clock, Phone, MessageSquare, Instagram, ExternalLink, Quote, Sparkles, ShieldCheck } from 'lucide-react';
import { restaurantInfo } from '../data/menuData';

export const RestaurantInfoSection: React.FC = () => {
  return (
    <section id="restaurant-info" className="py-24 bg-[#0A0C0F] text-[#F6F2E9] border-t border-[#1C212B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Quality Pillars */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C29E65] font-semibold mb-3">
              <span>Culinary Philosophy</span>
              <span aria-hidden="true">·</span>
              <span>Purity & Technique</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-[#F6F2E9] tracking-tight">
              Crafted without compromise.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {restaurantInfo.qualityPillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-6 bg-[#0E1116] border border-[#1C212B] rounded-xl hover:border-[#C29E65]/40 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#171B22] border border-[#232934] flex items-center justify-center text-[#C29E65] mb-4">
                  <Sparkles className="w-4 h-4 text-[#E26421]" />
                </div>
                <h3 className="text-base font-serif text-[#F6F2E9] mb-2 font-medium">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#8A95A5] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Editorial Reviews / Accolades */}
        <div className="mb-24 pt-12 border-t border-[#1C212B]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {restaurantInfo.reviews.map((rev, idx) => (
              <div
                key={idx}
                className="bg-[#0E1116] p-8 rounded-xl border border-[#1C212B] relative flex flex-col justify-between"
              >
                <div>
                  <Quote className="w-6 h-6 text-[#C29E65]/40 mb-4" />
                  <p className="font-serif text-lg text-[#D3DBE8] italic leading-snug mb-6">
                    "{rev.quote}"
                  </p>
                </div>
                <div className="pt-4 border-t border-[#171B22] flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-[#F6F2E9] block">{rev.publication}</span>
                    <span className="text-[#7B8798]">{rev.author}</span>
                  </div>
                  {rev.rating && (
                    <span className="px-2 py-1 bg-[#171B22] text-[#C29E65] font-serif rounded text-[11px]">
                      {rev.rating}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visit & Connect Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-12 border-t border-[#1C212B]">
          {/* Location & Maps */}
          <div className="lg:col-span-6 bg-[#0E1116] border border-[#1C212B] rounded-xl p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C29E65] font-semibold mb-3">
                <MapPin className="w-4 h-4 text-[#E26421]" />
                <span>Our Address</span>
              </div>
              <h3 className="text-2xl font-serif text-[#F6F2E9] mb-2">
                {restaurantInfo.name}
              </h3>
              <p className="text-sm text-[#9AA5B6] mb-4">
                {restaurantInfo.fullAddress}
              </p>
              <p className="text-xs text-[#7B8798] mb-6">
                Located moments from Berkeley Square in Mayfair. Valet parking available during evening dinner services.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#171B22]">
              <a
                href={restaurantInfo.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#171B22] hover:bg-[#232934] text-[#F6F2E9] border border-[#232934] rounded-md text-xs uppercase tracking-wider font-medium transition-colors"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={`tel:${restaurantInfo.phone}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#171B22] hover:bg-[#232934] text-[#F6F2E9] border border-[#232934] rounded-md text-xs uppercase tracking-wider font-medium transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{restaurantInfo.displayPhone}</span>
              </a>
            </div>
          </div>

          {/* Opening Hours & WhatsApp Concierge */}
          <div className="lg:col-span-6 bg-[#0E1116] border border-[#1C212B] rounded-xl p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C29E65] font-semibold mb-3">
                <Clock className="w-4 h-4 text-[#E26421]" />
                <span>Opening Hours</span>
              </div>
              <h3 className="text-2xl font-serif text-[#F6F2E9] mb-4">
                Service Timings
              </h3>

              <div className="space-y-3 text-sm text-[#9AA5B6] mb-6">
                <div className="flex justify-between py-1.5 border-b border-[#171B22]">
                  <span className="text-[#F6F2E9]">Lunch Service</span>
                  <span className="tabular-nums font-medium">{restaurantInfo.lunchHours}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#171B22]">
                  <span className="text-[#F6F2E9]">Dinner Service</span>
                  <span className="tabular-nums font-medium">{restaurantInfo.dinnerHours}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-[#F6F2E9]">Operating Days</span>
                  <span>{restaurantInfo.daysOpen}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#171B22]">
              <a
                href={`https://wa.me/${restaurantInfo.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#25D366] hover:bg-[#20BA5A] text-[#0A0C0F] rounded-md text-xs uppercase tracking-wider font-bold transition-all shadow-md"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-current" />
                <span>{restaurantInfo.displayWhatsApp}</span>
              </a>

              <a
                href={restaurantInfo.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#171B22] hover:bg-[#232934] text-[#F6F2E9] border border-[#232934] rounded-md text-xs uppercase tracking-wider font-medium transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>{restaurantInfo.instagramHandle}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
