import { motion } from "motion/react";
import { LayoutDashboard, Users, ThermometerSun, Heart, FileClock, Percent, Eye, Compass, TrendingUp } from "lucide-react";
import { OrderState, DashboardStats } from "../types";

interface DashboardProps {
  activeOrders: OrderState[];
  bookings: { room: string; guests: number; price: number; nights: number }[];
}

export default function Dashboard({ activeOrders, bookings }: DashboardProps) {
  // Computed Stats
  const activeBookingsCount = bookings.length;
  const occupancyPercentage = 82 + activeBookingsCount * 2;
  const activeGuestsCount = 112 + bookings.reduce((sum, b) => sum + b.guests, 0);

  return (
    <section id="dashboard" className="bg-surface w-full py-24 px-6 md:px-12 relative z-30 border-t border-outline">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-16 max-w-2xl mx-auto">
          <span className="font-sans font-bold text-primary uppercase tracking-[0.3em] text-xs mb-3 block">
            Operational Excellence
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-normal text-on-surface mb-6">
            Resort Intelligence Hub
          </h2>
          <div className="w-12 h-[1px] bg-primary/30 mb-6" />
          <p className="font-sans text-on-surface-variant text-sm sm:text-base leading-relaxed text-balance font-light">
            Track operational metrics of Aryam in real-time. This live visual cockpit displays villa check-ins, dining pipelines, guest sentiment evaluations, and automated climate stats.
          </p>
        </div>

        {/* Dashboard Panels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Stats Widgets Left Block (8 columns) */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Widget 1: Occupancy Dial */}
            <div className="bg-surface border border-outline rounded-none p-6 shadow-sm flex flex-col items-center text-center justify-between min-h-64">
              <div className="w-full flex items-center justify-between font-sans text-2xs uppercase tracking-[0.2em] text-[#555555] font-bold mb-4">
                <span>Property Occupancy</span>
                <Percent className="w-4 h-4 text-primary" />
              </div>

              {/* Animated Circular Gauge */}
              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="56"
                    cy="56"
                    r="48"
                    className="stroke-[#e5e1d8] stroke-2 fill-none"
                  />
                  <motion.circle
                    cx="56"
                    cy="56"
                    r="48"
                    className="stroke-[#c5a059] stroke-3 fill-none"
                    initial={{ strokeDasharray: "301 301", strokeDashoffset: 301 }}
                    whileInView={{ strokeDashoffset: 301 - (301 * occupancyPercentage) / 100 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="font-serif text-2xl font-bold text-on-surface">{occupancyPercentage}%</span>
                  <span className="font-sans text-[8px] uppercase tracking-wider text-on-surface-variant font-bold">Optimal Capacity</span>
                </div>
              </div>

              <span className="font-sans text-[10px] text-on-surface-variant mt-4 leading-normal font-medium">
                {activeBookingsCount} new registered stays added
              </span>
            </div>

            {/* Widget 2: Active Guest Cohort */}
            <div className="bg-surface border border-outline rounded-none p-6 shadow-sm flex flex-col justify-between min-h-64">
              <div className="w-full flex items-center justify-between font-sans text-2xs uppercase tracking-[0.2em] text-[#555555] font-bold mb-4">
                <span>Active Guests</span>
                <Users className="w-4 h-4 text-primary" />
              </div>

              <div className="my-auto flex flex-col items-start text-left">
                <span className="font-serif text-4xl font-normal text-[#1a1a1a] mb-1.5 leading-none">
                  {activeGuestsCount}
                </span>
                <span className="font-sans text-2xs uppercase text-[#c5a059] tracking-[0.15em] font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald-600 rounded-none"></span> Live Sanctuary Stays
                </span>
              </div>

              <div className="border-t border-outline pt-3 mt-4 text-left">
                <p className="font-sans text-[10px] text-on-surface-variant leading-relaxed">
                  Couples accounts dominate oceanward villas currently, followed by family suites.
                </p>
              </div>
            </div>

            {/* Widget 3: Live Climate Gauge */}
            <div className="bg-surface border border-outline rounded-none p-6 shadow-sm flex flex-col justify-between min-h-64">
              <div className="w-full flex items-center justify-between font-sans text-2xs uppercase tracking-[0.2em] text-[#555555] font-bold mb-4">
                <span>Ambient Climate</span>
                <ThermometerSun className="w-4 h-4 text-primary" />
              </div>

              <div className="my-auto flex flex-col items-start text-left">
                <span className="font-serif text-4xl font-normal text-[#1a1a1a] mb-1.5 leading-none">
                  26.4°C
                </span>
                <span className="font-sans text-2xs uppercase text-primary tracking-[0.15em] font-bold flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-primary" /> Sunset Breeze (Warm)
                </span>
              </div>

              <div className="border-t border-outline pt-3 mt-4 text-left">
                <p className="font-sans text-[10px] text-on-surface-variant leading-relaxed">
                  Water conditions: 24.2°C • Dew point: 18°C. Calm seas with mild eastern wind.
                </p>
              </div>
            </div>

            {/* Lower Statistics Chart row */}
            <div className="md:col-span-3 bg-surface border border-outline rounded-none p-6 shadow-sm text-left">
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-serif text-base text-on-surface font-normal">
                  Private Concierge Operations Traffic
                </h4>
                <div className="flex gap-2 text-[8px] font-sans font-bold uppercase tracking-[0.2em] text-on-surface-variant">
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-[#c5a059] rounded-none"></span> Queries Handled</span>
                </div>
              </div>

              {/* Bar charts using pure HTML/CSS */}
              <div className="flex flex-col gap-4">
                {[
                  { label: "08:00 - 11:30 (Morning Activities)", score: 92, count: 154 },
                  { label: "12:00 - 17:00 (Yacht & Dining reservations)", score: 74, count: 121 },
                  { label: "18:00 - 23:30 (Late Spa & Wine Pairing Inquiries)", score: 98, count: 184 },
                ].map((bar, bIdx) => (
                  <div key={bIdx} className="flex flex-col gap-1.5">
                    <div className="flex justify-between text-2xs font-sans text-[#555555] tracking-[0.15em] uppercase font-bold">
                      <span>{bar.label}</span>
                      <span>{bar.count} requests</span>
                    </div>
                    <div className="w-full h-2 bg-[#faf7f2] border border-outline rounded-none overflow-hidden">
                      <motion.div
                        className="bg-[#c5a059] h-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${bar.score}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: bIdx * 0.15 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column Monitor (4 columns) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Live Booking Registration Ledger */}
            <div className="bg-surface border border-outline rounded-none p-6 shadow-sm text-left min-h-64 flex flex-col justify-between">
              <div>
                <div className="w-full flex items-center justify-between font-sans text-2xs uppercase tracking-[0.2em] text-[#555555] font-bold border-b border-outline pb-3 mb-4">
                  <span>Inquiry Ledger Holds</span>
                  <FileClock className="w-4 h-4 text-primary" />
                </div>

                {bookings.length === 0 ? (
                  <div className="py-8 text-center font-sans text-xs text-on-surface-variant leading-relaxed">
                    No active booking registrations yet. Complete "Inquire Sanctuary" or "Bespoke Packages" selections above to view them populate this ledger instantly.
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 max-h-48 overflow-y-auto mb-4 pr-1">
                    {bookings.map((book, bIdx) => (
                      <div key={bIdx} className="p-3 bg-white border border-outline rounded-none flex justify-between items-center text-xs gap-3 font-sans">
                        <div className="flex-1">
                          <h5 className="font-bold text-on-surface leading-tight">{book.room}</h5>
                          <span className="text-[10px] text-on-surface-variant">{book.nights} nights • {book.guests} guests</span>
                        </div>
                        <span className="font-serif font-bold text-[#c5a059] shrink-0">${book.price * book.nights}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-t border-outline pt-3 mt-2 text-center">
                <p className="font-sans text-[10px] text-on-surface-variant">
                  Register-checked counts contribute live statistics coordinates.
                </p>
              </div>
            </div>

            {/* Quick Guest Sentiment Panel */}
            <div className="bg-surface border border-outline rounded-none p-6 shadow-sm text-left">
              <div className="w-full flex items-center justify-between font-sans text-2xs uppercase tracking-[0.2em] text-[#555555] font-bold border-b border-outline pb-3 mb-4">
                <span>AI Guest Sentiment</span>
                <Heart className="w-4 h-4 text-primary fill-primary/10" />
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-none bg-[#faf7f2] border border-outline flex items-center justify-center font-serif text-lg text-[#1a1a1a] font-bold">
                    A
                  </div>
                  <div>
                    <h5 className="font-sans font-bold text-xs text-on-surface tracking-wide">98.4% Exceptional Feedback</h5>
                    <p className="font-sans text-[10px] text-on-surface-variant leading-tight mt-0.5">Sentiment metrics analyzed from checkout reviews</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-2 text-[10px] font-sans text-[#555555] font-bold uppercase tracking-wider">
                  <span className="flex items-center gap-1.5 text-primary">
                    <span className="w-2 h-2 rounded-none bg-emerald-600"></span> Service Response Average: 4.8m
                  </span>
                  <span className="flex items-center gap-1.5 text-primary">
                    <span className="w-2 h-2 rounded-none bg-emerald-600"></span> Housekeeping Performance Indicator: 100%
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
