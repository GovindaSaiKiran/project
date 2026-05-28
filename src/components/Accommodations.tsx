import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { DoorOpen, Users, DollarSign, Waves, X, Check, CheckCircle2 } from "lucide-react";
import { Room } from "../types";

const ACCOMMODATIONS_DATA: Room[] = [
  {
    id: "ocean-view-villa",
    name: "Ocean View Villa",
    description: "A minimalist cliffside sanctuary of glass and water. Features a deep heated private infinity pool suspended above azure depths, floating master suite, and personalized modern comforts.",
    price: 1800,
    guests: 2,
    amenities: ["Deep Infinity Pool", "Sunset Deck", "Private Bath Spa", "24/7 Host Service"],
    features: ["Floor-to-ceiling Glass", "1,800 sq.ft Space", "Outdoor Floating Daybed"],
    imageUrl: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "presidential-suite",
    name: "Aryam Presidential Suite",
    description: "Our signature two-level masterpiece hosting curated fine arts, custom grand piano, private sunset boat slip, temperature-regulated wine vault, and dedicated, discreet personal butler.",
    price: 4500,
    guests: 4,
    amenities: ["Dedicated Butler", "Sunset Slipway", "Grand Piano Room", "In-Suite Wellness Cabin"],
    features: ["270° Ocean Vistas", "4,200 sq.ft Area", "Chef's Preparation Pantry"],
    imageUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "private-pool-cottage",
    name: "Private Pool Cottage",
    description: "An intimate, single-level seaside cottage nestled within dense tropical garden flora. Includes a private stone immersion bath pool and refreshing open-air tropical rainshower.",
    price: 1200,
    guests: 2,
    amenities: ["Plunge Bath Pool", "Garden Rainshower", "Private Cabana", "Organic Amenity Rituals"],
    features: ["Lush Secret Gardens", "1,100 sq.ft Space", "Direct Sandy Beach Gate"],
    imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "family-retreat-villa",
    name: "Family Retreat Oceanside Villa",
    description: "A grand three-suite residence framing majestic seascapes. Complete with an oversized private family pool, gourmet kitchen suite, and secluded outdoor shoreline dining gazebo.",
    price: 2600,
    guests: 6,
    amenities: ["3 En-Suite Chambers", "Gourmet Kitchen", "Private Sandy Pergola", "Personal House Chef"],
    features: ["Direct Beach Steps", "3,500 sq.ft Area", "Family Multimedia Parlor"],
    imageUrl: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80"
  }
];

interface AccommodationsProps {
  onBookSuccess: (booking: { room: string; guests: number; price: number; nights: number }) => void;
}

export default function Accommodations({ onBookSuccess }: AccommodationsProps) {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [nightsCount, setNightsCount] = useState(3);
  const [guestsCount, setGuestsCount] = useState(2);
  const [isBookedSuccess, setIsBookedSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "couple" | "grand">("all");

  const handleCreateInquiry = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedRoom) return;

    setIsBookedSuccess(true);
    setTimeout(() => {
      onBookSuccess({
        room: selectedRoom.name,
        guests: guestsCount,
        price: selectedRoom.price,
        nights: nightsCount,
      });
      setSelectedRoom(null);
      setIsBookedSuccess(false);
    }, 1500);
  };

  const filteredRooms = ACCOMMODATIONS_DATA.filter((room) => {
    if (activeTab === "couple") return room.guests <= 2;
    if (activeTab === "grand") return room.guests > 2;
    return true;
  });

  return (
    <section id="accommodations" className="bg-[#fcf9f8] w-full py-24 px-6 md:px-12 relative border-t border-primary/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <div className="max-w-xl">
            <span className="font-sans font-semibold text-primary uppercase tracking-[0.25em] text-xs mb-3 block">
              Sanctuaries of Repose
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-normal text-on-surface mb-4">
              Luxury Accommodations
            </h2>
            <p className="font-sans text-on-surface-variant text-sm sm:text-base leading-relaxed">
              Every room is a masterfully curated architectural haven of light, natural stone textures, and uninterrupted pristine ocean views.
            </p>
          </div>
          
          {/* Filtering tabs */}
          <div className="flex gap-4 border-b border-primary/10 pb-1 self-start md:self-auto shrink-0">
            <button
              onClick={() => setActiveTab("all")}
              className={`font-sans font-semibold text-2xs uppercase tracking-widest pb-3 relative transition-colors cursor-pointer ${
                activeTab === "all" ? "text-primary" : "text-on-surface-variant hover:text-[#1c1b1b]"
              }`}
            >
              All Sanctuaries
              {activeTab === "all" && <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-primary" />}
            </button>
            <button
              onClick={() => setActiveTab("couple")}
              className={`font-sans font-semibold text-2xs uppercase tracking-widest pb-3 relative transition-colors cursor-pointer ${
                activeTab === "couple" ? "text-primary" : "text-on-surface-variant hover:text-[#1c1b1b]"
              }`}
            >
              Couples & Retreats
              {activeTab === "couple" && <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-primary" />}
            </button>
            <button
              onClick={() => setActiveTab("grand")}
              className={`font-sans font-semibold text-2xs uppercase tracking-widest pb-3 relative transition-colors cursor-pointer ${
                activeTab === "grand" ? "text-primary" : "text-on-surface-variant hover:text-[#1c1b1b]"
              }`}
            >
              Grand Villas & Suites
              {activeTab === "grand" && <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-primary" />}
            </button>
          </div>
        </div>

        {/* Accommodations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              className="group bg-surface border border-outline rounded-none overflow-hidden soft-shadow transition-all duration-500 hover:shadow-xl hover:border-primary/50 flex flex-col"
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={room.imageUrl}
                  alt={room.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-101"
                />
                
                {/* Float Badge */}
                <div className="absolute top-5 right-5 p-2 px-3.5 bg-white/95 backdrop-blur-md rounded-none border border-[#e5e1d8] font-serif font-semibold text-[13px] text-primary flex items-center gap-0.5 shadow-sm">
                  <span>${room.price}</span>
                  <span className="font-sans font-medium text-[9px] uppercase tracking-wider text-on-surface-variant pl-1">
                    / Night
                  </span>
                </div>
              </div>

              {/* Specs & Data Column */}
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-xs font-sans font-bold uppercase tracking-wider text-on-surface-variant mb-4">
                    <span className="flex items-center gap-1">
                      <DoorOpen className="w-3.5 h-3.5 text-primary" /> Max {room.guests} Guests
                    </span>
                    <span className="w-1.5 h-1.5 bg-primary/40 rounded-full"></span>
                    <span className="flex items-center gap-1 text-primary">
                      <Waves className="w-3.5 h-3.5" /> Oceanfront Setup
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl md:text-3xl font-normal text-on-surface mb-3 group-hover:text-primary transition-colors duration-300">
                    {room.name}
                  </h3>

                  <p className="font-sans text-on-surface-variant text-xs md:text-sm leading-relaxed mb-6 font-light">
                    {room.description}
                  </p>

                  {/* Highlights Bullet-Lists */}
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {room.features.concat(room.amenities.slice(0, 1)).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-[11px] font-sans text-on-surface-variant">
                        <Check className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                        <span className="font-medium">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Inquiry Trigger */}
                <button
                  onClick={() => {
                    setSelectedRoom(room);
                    setGuestsCount(room.guests);
                  }}
                  className="w-full text-center py-4 bg-secondary text-white border border-transparent hover:bg-primary rounded-none font-sans font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 active:scale-98 cursor-pointer"
                >
                  Inquire Sanctuary
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Inquiry Drawer / Modal Overlays */}
      <AnimatePresence>
        {selectedRoom && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.4 }}
              className="bg-surface max-w-lg w-full rounded-none overflow-hidden shadow-2xl relative border border-outline"
            >
              
              {/* Close Button Pin */}
              <button
                onClick={() => setSelectedRoom(null)}
                className="absolute top-5 right-5 p-2 rounded-none hover:bg-on-surface-variant/10 text-on-surface transition-colors cursor-pointer border border-[#e5e1d8]"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-8">
                <span className="font-sans font-bold text-primary uppercase tracking-[0.25em] text-[10px] mb-2 block">
                  Aryam Luxury Inquiries
                </span>
                <h3 className="font-serif text-2xl md:text-3xl text-on-surface mb-2 font-normal">
                  Configure Your Villa Stay
                </h3>
                <p className="text-xs text-on-surface-variant font-sans mb-6 font-light">
                  Verify your escape particulars to register availability for your custom-designed stay at **{selectedRoom.name}**.
                </p>

                <form onSubmit={handleCreateInquiry} className="flex flex-col gap-5">
                  
                  {/* Total Nights Field */}
                  <div className="flex flex-col">
                    <label className="font-sans font-bold text-[10px] text-on-surface-variant uppercase tracking-widest mb-1.5">
                      Stay Duration (Nights)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="30"
                      required
                      value={nightsCount}
                      onChange={(e) => setNightsCount(parseInt(e.target.value) || 1)}
                      className="w-full bg-white border border-outline rounded-none p-3 text-xs font-sans text-on-surface focus:border-primary focus:ring-1 focus:ring-primary/20"
                    />
                  </div>

                  {/* Dynamic Guests Number Field */}
                  <div className="flex flex-col">
                    <label className="font-sans font-bold text-[10px] text-on-surface-variant uppercase tracking-widest mb-1.5">
                      Guest Capacity
                    </label>
                    <input
                      type="number"
                      min="1"
                      max={selectedRoom.guests + 2} // Allow small overrun for luxury rollaways
                      required
                      value={guestsCount}
                      onChange={(e) => setGuestsCount(parseInt(e.target.value) || 1)}
                      className="w-full bg-white border border-outline rounded-none p-3 text-xs font-sans text-on-surface focus:border-primary focus:ring-1 focus:ring-primary/20"
                    />
                  </div>

                  {/* Summary Pricing Ledger */}
                  <div className="bg-[#faf7f2] rounded-none p-5 border border-outline flex flex-col gap-3 my-2">
                    <div className="flex items-center justify-between font-sans text-2xs uppercase tracking-widest text-[#555555]">
                      <span>Daily Luxury Base:</span>
                      <span className="font-bold text-[#1a1a1a]">${selectedRoom.price}</span>
                    </div>
                    <div className="flex items-center justify-between font-sans text-2xs uppercase tracking-widest text-[#555555]">
                      <span>Nights count:</span>
                      <span className="font-bold text-[#1a1a1a]">{nightsCount} nights</span>
                    </div>
                    <div className="h-[1px] bg-outline w-full my-1" />
                    <div className="flex items-center justify-between font-serif text-base text-[#1a1a1a] font-normal">
                      <span>Total Estimated Value:</span>
                      <span className="text-primary font-bold">${selectedRoom.price * nightsCount}</span>
                    </div>
                  </div>

                  {/* Book CTA */}
                  <button
                    type="submit"
                    disabled={isBookedSuccess}
                    className="w-full p-4 bg-secondary text-white rounded-none font-sans font-bold text-xs uppercase tracking-[0.2em] hover:bg-primary transition-colors focus:ring-2 focus:ring-primary/20 flex items-center justify-center gap-2 cursor-pointer disabled:bg-emerald-700 disabled:opacity-90"
                  >
                    {isBookedSuccess ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-100" />
                        <span>Sanctuary Held Successfully</span>
                      </>
                    ) : (
                      <>
                        <DollarSign className="w-4 h-4" />
                        <span>Register Hold Booking</span>
                      </>
                    )}
                  </button>

                </form>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
