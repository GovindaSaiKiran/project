import { motion } from "motion/react";
import { Quote, Star } from "lucide-react";
import { Testimonial } from "../types";

const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "test-1",
    quote: "Aryam is not merely a resort; it is a sacred sensory sanctuary. From the moment our private butler greeted us on the twilight deck of our villa to our candlelit dinner on the isolated sandbank, everything was poetry.",
    author: "Elena Rostova",
    role: "Aesthetic Connoisseur",
    location: "Monaco",
    rating: 5
  },
  {
    id: "test-2",
    quote: "Our Honeymoon Villa stay exceeded every standard of modern hospitality. The digital AI Concierge arranged bespoke coral diving sessions and directed premium vintage wine deliveries to our pool deck flawlessly in minutes.",
    author: "Marc & Clara Laurent",
    role: "Wellness Advocates",
    location: "Paris, France",
    rating: 5
  },
  {
    id: "test-3",
    quote: "An architectural masterpiece in the middle of untouched nature. The spatial layout, raw stone finishes, and floor-to-ceiling glass walls frame the azure depths beautifully. Visually breathtaking in every margin.",
    author: "Sir Alistair Thorne",
    role: "Architectural Designer",
    location: "London, UK",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-surface w-full py-24 px-6 md:px-12 relative z-30 border-t border-outline">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 max-w-2xl mx-auto">
          <span className="font-sans font-bold text-primary uppercase tracking-[0.3em] text-xs mb-3 block">
            Guest Chronicles
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-normal text-on-surface mb-6">
            Sanctuary Testimonials
          </h2>
          <div className="w-12 h-[1px] bg-primary/30 mb-6" />
        </div>

        {/* 3-Column Display Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((test, idx) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="bg-surface border border-outline rounded-none p-8 relative soft-shadow hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              {/* Decorative Quotation Pin */}
              <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/10 pointer-events-none" />

              <div>
                {/* Stars Indicator */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: test.rating }).map((_, rIdx) => (
                    <Star key={rIdx} className="w-4 h-4 text-[#c5a059] fill-[#c5a059]" />
                  ))}
                </div>

                <p className="font-serif italic text-on-surface text-sm sm:text-base leading-relaxed mb-6 font-normal">
                  "{test.quote}"
                </p>
              </div>

              {/* Author metadata */}
              <div className="border-t border-outline pt-4">
                <h4 className="font-sans font-bold text-xs text-[#1a1a1a] tracking-wider uppercase">
                  {test.author}
                </h4>
                <div className="flex items-center gap-1.5 text-2xs text-on-surface-variant font-sans mt-0.5">
                  <span className="font-medium">{test.role}</span>
                  <span className="w-1 h-1 rounded-full bg-primary/35"></span>
                  <span className="text-primary font-medium italic">{test.location}</span>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
