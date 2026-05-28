import { Diamond, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYr = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-outline w-full py-16 px-6 md:px-12 relative z-30">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        
        {/* Left Column: Brand & Logo */}
        <div className="max-w-sm flex flex-col items-start text-left">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2 mb-6 group cursor-pointer"
          >
            <Diamond className="w-5 h-5 text-primary transition-transform duration-700 group-hover:rotate-45" />
            <span className="font-serif tracking-[0.3em] text-lg uppercase text-[#1a1a1a] font-normal">
              Aryam Resorts
            </span>
          </a>
          <p className="font-sans text-on-surface-variant text-xs md:text-sm leading-relaxed mb-6 font-light">
            A collection of ultra-luxury sanctuaries nested gracefully inside the pristine waters of the Maldives, Bali, and Seychelles.
          </p>
          <div className="h-[1px] bg-primary/20 w-12 mb-6" />
          <p className="font-sans text-[10px] uppercase text-[#555555] tracking-[0.2em] font-bold leading-relaxed">
            Maldives • Bali • Seychelles
          </p>
        </div>

        {/* Right Column List Groups */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16">
          
          <div className="flex flex-col items-start text-left">
            <h4 className="font-sans font-bold text-[10px] uppercase text-[#1a1a1a] tracking-[0.25em] mb-4">
              Sanctuaries
            </h4>
            <ul className="flex flex-col gap-2.5 font-sans text-xs text-on-surface-variant font-medium">
              <li><a href="#accommodations" className="hover:text-primary transition-colors">Ocean View Villa</a></li>
              <li><a href="#accommodations" className="hover:text-primary transition-colors">Presidential Suite</a></li>
              <li><a href="#accommodations" className="hover:text-primary transition-colors">Private Pool Cottage</a></li>
              <li><a href="#accommodations" className="hover:text-primary transition-colors">Family Retreat Villa</a></li>
            </ul>
          </div>

          <div className="flex flex-col items-start text-left">
            <h4 className="font-sans font-bold text-[10px] uppercase text-[#1a1a1a] tracking-[0.25em] mb-4">
              Immersions
            </h4>
            <ul className="flex flex-col gap-2.5 font-sans text-xs text-[#555555] font-medium">
              <li><a href="#experiences" className="hover:text-primary transition-colors">Yacht Excursions</a></li>
              <li><a href="#experiences" className="hover:text-primary transition-colors">Beachfront Dining</a></li>
              <li><a href="#experiences" className="hover:text-primary transition-colors">Sanctuary Spa</a></li>
              <li><a href="#packages" className="hover:text-primary transition-colors">Bespoke Vacations</a></li>
            </ul>
          </div>

          <div className="flex flex-col items-start text-left col-span-2 md:col-span-1">
            <h4 className="font-sans font-bold text-[10px] uppercase text-[#1a1a1a] tracking-[0.25em] mb-4">
              Connect
            </h4>
            <ul className="flex flex-col gap-3 font-sans text-xs text-on-surface-variant font-medium">
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-primary/70 shrink-0" />
                <span>retreats@aryamresorts.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-primary/70 shrink-0" />
                <span>+1 (800) 900-ARYAM</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-primary/70 shrink-0" />
                <span className="leading-tight">Atoll Sanctuary Hub, Maldives</span>
              </li>
            </ul>
          </div>

        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-outline mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-2xs uppercase tracking-[0.2em] font-sans font-bold text-on-surface-variant">
        <span>&copy; {currentYr} Aryam Resorts Collection. All Rights Reserved.</span>
        <div className="flex gap-4">
          <a href="#" className="hover:text-primary transition-colors">Privacy</a>
          <span>•</span>
          <a href="#" className="hover:text-primary transition-colors">Terms of Escape</a>
        </div>
      </div>
    </footer>
  );
}
