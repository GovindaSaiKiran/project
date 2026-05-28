import { motion } from "motion/react";
import { Sparkles, Heart, Activity, Compass } from "lucide-react";
import { Package } from "../types";

const PACKAGES_DATA: Package[] = [
  {
    id: "pkg-honeymoon",
    tag: "Romantic Escape",
    title: "Honeymoon Sanctuary Package",
    description: "The dream romantic escape. Consists of a three-night stay in our signature cliffside Ocean View Villa, private couples holistic spa, and champagne on arrival.",
    price: 5400,
    durationDays: 3,
    highlights: ["3 Nights Ocean View Villa", "Couples Sanctuary Massage", "Candlelit Beachfront Dining", "Private Sunset Yacht Cruise"],
    imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "pkg-wellness",
    tag: "Aesthetic Restoration",
    title: "Serenity Wellness Retreat",
    description: "A comprehensive five-night escape dedicated to physical and mental restoration. Focuses on daily customized mindfulness classes, specialized organic dietary programs.",
    price: 6000,
    durationDays: 5,
    highlights: ["5 Nights Personal Pool Cottage", "Daily Yoga & Meditation", "Personalized Organic Dining Menu", "Warm Volcanic Stone Scrub Baths"],
    imageUrl: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "pkg-adventure",
    tag: "Deep Exploration",
    title: "Oceanside Adventure Safari",
    description: "For explorers who desire visual wonders. Includes full day yacht charting, guided reef snorkeling tours, and private jet-ski safaris along private sand spits.",
    price: 7800,
    durationDays: 4,
    highlights: ["4 Nights Presidential Suite Stay", "Private Full-Day Yacht Charter", "Personal Coral Reef Snorkel Guide", "Twilight Oceanside Shore Walk"],
    imageUrl: "https://images.unsplash.com/photo-1506953823976-52e1fdc0135a?auto=format&fit=crop&w=1200&q=80"
  }
];

interface PackagesProps {
  onPkgSelect: (pkgName: string, price: number) => void;
}

export default function Packages({ onPkgSelect }: PackagesProps) {
  const getIcon = (tag: string) => {
    switch (tag.toLowerCase()) {
      case "romantic escape":
        return <Heart className="w-4 h-4 text-primary" />;
      case "aesthetic restoration":
        return <Activity className="w-4 h-4 text-primary" />;
      default:
        return <Compass className="w-4 h-4 text-primary" />;
    }
  };

  return (
    <section id="packages" className="bg-surface w-full py-24 px-6 md:px-12 relative z-30 border-t border-outline">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 max-w-2xl mx-auto">
          <span className="font-sans font-bold text-primary uppercase tracking-[0.3em] text-xs mb-3 block">
            Crafted Escapes
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-normal text-on-surface mb-6">
            Bespoke Packages
          </h2>
          <div className="w-12 h-[1px] bg-primary/30 mb-6" />
          <p className="font-sans text-on-surface-variant text-sm sm:text-base leading-relaxed text-balance">
            To make your transition into serenity seamless, our escape master has pre-packaged our legendary sanctuaries and experiences for unmatched harmony.
          </p>
        </div>

        {/* 3-Column Display Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PACKAGES_DATA.map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, scale: 0.98, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-surface border border-outline rounded-none overflow-hidden soft-shadow group flex flex-col justify-between"
            >
              
              {/* Media Block */}
              <div>
                <div className="relative aspect-[16/11] overflow-hidden">
                  <img
                    src={pkg.imageUrl}
                    alt={pkg.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-101"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                  
                  {/* Floating Tag */}
                  <div className="absolute bottom-4 left-6 flex items-center gap-1.5 p-1.5 px-3 rounded-none bg-white/95 backdrop-blur-md border border-outline text-[9px] uppercase tracking-[0.2em] text-[#1a1a1a] font-sans font-bold">
                    {getIcon(pkg.tag)}
                    <span>{pkg.tag}</span>
                  </div>

                  {/* Float Duration Indicator */}
                  <div className="absolute top-4 right-4 bg-secondary text-white p-2 px-3.5 rounded-none text-2xs uppercase tracking-[0.2em] font-sans font-bold border border-white/10">
                    {pkg.durationDays} Nights Stay
                  </div>
                </div>

                {/* Info Text */}
                <div className="p-8 pb-4">
                  <h3 className="font-serif text-xl md:text-2xl text-on-surface mb-3 tracking-tight font-normal group-hover:text-primary transition-colors">
                    {pkg.title}
                  </h3>
                  <p className="font-sans text-on-surface-variant text-xs md:text-sm leading-relaxed mb-6 font-light">
                    {pkg.description}
                  </p>

                  <h4 className="font-sans font-bold text-[10px] text-on-surface-variant uppercase tracking-[0.2em] mb-4 flex items-center gap-1.5 border-b border-outline pb-2">
                    <Sparkles className="w-3.5 h-3.5 text-primary" /> Package Inclusions:
                  </h4>
                  
                  {/* Highlights Bullet Ledger */}
                  <div className="flex flex-col gap-2.5 mb-6">
                    {pkg.highlights.map((high, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-[11px] font-sans text-on-surface-variant font-medium">
                        <CheckIcon />
                        <span className="leading-tight">{high}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Book Actions Column */}
              <div className="p-8 pt-0 mt-2 border-t border-outline">
                <div className="flex items-center justify-between mb-4 pt-4">
                  <span className="font-sans text-[10px] uppercase font-bold text-on-surface-variant tracking-[0.2em]">
                    Total Package price:
                  </span>
                  <span className="font-serif text-xl font-semibold text-primary">
                    ${pkg.price}
                  </span>
                </div>
                
                <button
                  onClick={() => onPkgSelect(pkg.title, pkg.price)}
                  className="w-full bg-secondary text-white py-4 rounded-none hover:bg-primary transition-all duration-300 font-sans font-bold text-xs uppercase tracking-[0.2em] cursor-pointer text-center"
                >
                  Configure Retreat Stay
                </button>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2.5}
      stroke="currentColor"
      className="w-3.5 h-3.5 text-[#c5a059] shrink-0 mt-0.5"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}
