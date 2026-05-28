import { useState, useEffect, MouseEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Diamond, Menu, X, ArrowRight } from "lucide-react";

interface NavbarProps {
  onReserveClick: () => void;
}

export default function Navbar({ onReserveClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Experiences", href: "#experiences" },
    { name: "Sanctuaries", href: "#accommodations" },
    { name: "In-Room Dining", href: "#dining" },
    { name: "AI Concierge", href: "#concierge" },
    { name: "Bespoke Packages", href: "#packages" },
    { name: "Intelligence Hub", href: "#dashboard" },
  ];

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 88; // height of floating navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out px-6 md:px-12 py-4 ${
          isScrolled
            ? "bg-surface/90 backdrop-blur-md shadow-sm border-b border-primary/10 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <Diamond className={`w-5 h-5 transition-transform duration-700 group-hover:rotate-45 ${
              isScrolled ? "text-primary" : "text-primary-container"
            }`} />
            <span
              className={`font-serif tracking-[0.25em] text-lg uppercase transition-colors duration-300 ${
                isScrolled ? "text-[#1c1b1b]" : "text-white"
              }`}
            >
              Aryam Resorts
            </span>
          </a>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`font-sans font-medium text-xs uppercase tracking-widest transition-colors duration-300 relative py-2 group cursor-pointer ${
                  isScrolled ? "text-on-surface-variant hover:text-primary" : "text-white/85 hover:text-white"
                }`}
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Reserve Button */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={onReserveClick}
              className={`font-sans font-bold text-[11px] uppercase tracking-[0.2em] px-8 py-3 rounded-none transition-all duration-300 active:scale-98 cursor-pointer ${
                isScrolled
                  ? "bg-secondary text-white hover:bg-primary"
                  : "bg-white text-secondary hover:bg-primary hover:text-white border border-white/25"
              }`}
            >
              Reserve Your Stay
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 transition-colors focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled || isMobileMenuOpen ? "text-on-surface" : "text-white"}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled ? "text-on-surface" : "text-white"}`} />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-surface z-40 pt-24 px-8 pb-10 flex flex-col justify-between"
          >
            <div className="flex flex-col gap-6">
              <span className="font-serif italic text-primary text-xl mb-4 text-center">
                Where nature meets luxury
              </span>
              <div className="h-[1px] bg-outline-variant/30 w-full mb-2"></div>
              <nav className="flex flex-col gap-5">
                {menuItems.map((item, idx) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="font-sans font-medium text-sm uppercase tracking-widest text-[#1c1b1b] hover:text-primary py-2 border-b border-outline-variant/10 flex items-center justify-between"
                  >
                    {item.name}
                    <ArrowRight className="w-4 h-4 text-primary/60" />
                  </motion.a>
                ))}
              </nav>
            </div>

            <div className="flex flex-col gap-4">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onReserveClick();
                }}
                className="w-full bg-primary text-white py-4 font-sans font-semibold text-xs uppercase tracking-widest rounded text-center active:scale-95"
              >
                Reserve Now
              </button>
              <p className="text-2xs text-center text-on-surface-variant font-sans tracking-wide">
                Aryam Resorts Sanctuary. Maldives • Bali • Seychelles
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
