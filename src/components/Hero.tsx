import { useState, FormEvent } from "react";
import { motion } from "motion/react";
import { Calendar, Users, MapPin, Search } from "lucide-react";

interface HeroProps {
  onSearch: (data: { destination: string; checkIn: string; checkOut: string; guests: string }) => void;
}

export default function Hero({ onSearch }: HeroProps) {
  const [destination, setDestination] = useState("Aryam Maldives");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2 Adults");
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      onSearch({ destination, checkIn, checkOut, guests });
    }, 1200);
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden px-6 md:px-12 pt-32 pb-24">
      {/* Background Image Layer with Parallax-like transition */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-[4000ms] ease-out-sine"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1920&q=80')`,
        }}
      />

      {/* Radial and Linear Cinematic Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-[#fcf9f8] z-0" />
      <div className="absolute inset-0 bg-radial-glow opacity-60 z-0" />

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 mt-8 lg:mt-0">
        
        {/* Editorial Text Column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start text-left max-w-2xl relative"
        >
          {/* Majestic background letter symbol 'A' */}
          <div className="absolute -top-16 -left-10 opacity-5 text-[180px] md:text-[240px] font-serif leading-none select-none pointer-events-none italic text-white">A</div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 1 }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-none bg-white/10 backdrop-blur-md border border-white/15 mb-6 z-10"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            <span className="font-sans font-bold text-[10px] uppercase tracking-[0.3em] text-white">
              Private Sanctuary Collection
            </span>
          </motion.div>

          <h1 className="font-serif text-5xl sm:text-6xl md:text-[80px] leading-[0.95] text-white mb-6 font-normal tracking-tight z-10">
            The Art of <br />
            <span className="italic font-light text-primary">Quiet Luxury</span>
          </h1>
          
          <p className="font-sans text-white/85 text-xs sm:text-sm md:text-base max-w-lg leading-relaxed mb-10 z-10 font-light">
            Immerse yourself in a sanctuary where heritage architecture meets avant-garde wellness. A curated tapestry of experiences designed for the modern connoisseur.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 z-10">
            <button
              onClick={() => {
                const element = document.querySelector("#accommodations");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-primary hover:bg-white hover:text-secondary text-white font-sans font-bold text-[11px] py-4 px-8 rounded-none uppercase tracking-[0.2em] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
            >
              Explore Collections
            </button>
            <button
              onClick={() => {
                const element = document.querySelector("#experiences");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group text-white border-b border-white/20 px-4 py-4 font-sans font-bold text-[11px] uppercase tracking-[0.2em] hover:border-white hover:text-primary transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              Refined Experiences
            </button>
          </div>
        </motion.div>

        {/* Float Booking Form Widget */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-auto mt-6 lg:mt-0 z-10"
        >
          <div className="bg-black/45 border border-white/20 p-8 w-full md:w-96 shadow-2xl relative overflow-hidden backdrop-blur-md rounded-none">
            {/* Custom overlay glows */}
            <div className="absolute -right-12 -top-12 w-32 h-32 rounded-full bg-primary/10 blur-2xl pointer-events-none"></div>
            
            <h3 className="font-serif text-white font-normal text-xl mb-6 border-b border-white/10 pb-4 tracking-wide">
              Reserve Your Sanctuary
            </h3>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              
              {/* Destination Selector */}
              <div className="flex flex-col relative group">
                <label className="font-sans font-bold text-[9px] text-white/55 mb-1 uppercase tracking-widest flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-primary" /> Destination
                </label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="bg-transparent border-0 border-b border-white/20 focus:border-primary px-0 py-2.5 text-white font-sans text-sm focus:ring-0 cursor-pointer transition-colors duration-300 w-full"
                >
                  <option value="Aryam Maldives" className="bg-[#1a1a1a] text-white">Aryam Maldives</option>
                  <option value="Aryam Bali" className="bg-[#1a1a1a] text-white">Aryam Bali</option>
                  <option value="Aryam Seychelles" className="bg-[#1a1a1a] text-white">Aryam Seychelles</option>
                </select>
              </div>

              {/* Dates Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col relative group">
                  <label className="font-sans font-bold text-[9px] text-white/55 mb-1 uppercase tracking-widest flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-primary" /> Check-in
                  </label>
                  <input
                    type="date"
                    required
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="bg-transparent border-0 border-b border-white/20 focus:border-primary px-0 py-2 text-white font-sans text-xs focus:ring-0 cursor-pointer transition-colors duration-300"
                  />
                </div>
                <div className="flex flex-col relative group">
                  <label className="font-sans font-bold text-[9px] text-white/55 mb-1 uppercase tracking-widest flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-primary" /> Check-out
                  </label>
                  <input
                    type="date"
                    required
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="bg-transparent border-0 border-b border-white/20 focus:border-primary px-0 py-2 text-white font-sans text-xs focus:ring-0 cursor-pointer transition-colors duration-300"
                  />
                </div>
              </div>

              {/* Guests Count Selector */}
              <div className="flex flex-col relative group">
                <label className="font-sans font-bold text-[9px] text-white/55 mb-1 uppercase tracking-widest flex items-center gap-1.5">
                  <span className="text-primary">&bull;</span> Guests
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="bg-transparent border-0 border-b border-white/20 focus:border-primary px-0 py-2.5 text-white font-sans text-sm focus:ring-0 cursor-pointer transition-colors duration-300 w-full"
                >
                  <option value="1 Adult" className="bg-[#1a1a1a] text-white">1 Adult</option>
                  <option value="2 Adults" className="bg-[#1a1a1a] text-white">2 Adults</option>
                  <option value="2 Adults, 1 Child" className="bg-[#1a1a1a] text-white">2 Adults & 1 Child</option>
                  <option value="4 Adults" className="bg-[#1a1a1a] text-white">4 Adults</option>
                  <option value="6 Guests" className="bg-[#1a1a1a] text-white">6 Guests Group</option>
                </select>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSearching}
                className="bg-primary text-white w-full py-4 mt-3 rounded-none font-sans font-bold text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black hover:border-white transition-all duration-300 shadow-lg flex items-center justify-center gap-2 border border-primary/25 cursor-pointer disabled:opacity-50"
              >
                {isSearching ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                    <span>Hold on...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 text-white" />
                    <span>Search Availability</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Mouse Scrolling Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity"
        onClick={() => {
          document.getElementById("experiences")?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-xl relative flex justify-center before:content-[''] before:absolute before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-white/80 before:animate-bounce" />
        <span className="font-sans font-semibold text-[9px] text-white/50 uppercase tracking-[0.25em] mt-3">
          Scroll Discover
        </span>
      </motion.div>
    </section>
  );
}
