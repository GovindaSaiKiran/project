import { motion } from "motion/react";
import { Anchor, Sparkles, HeartHandshake, Eye } from "lucide-react";
import { Experience } from "../types";

const EXPERIENCES_DATA: Experience[] = [
  {
    id: "exp-yacht",
    tag: "Adventure",
    title: "Private Yacht Excursions",
    description: "Sail custom crafted cruisers through turquoise islands at sunrise, complete with custom diving master guidance and vintage champagne picnics.",
    imageUrl: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "exp-dining",
    tag: "Gastronomy",
    title: "Beachfront Dining Under Stars",
    description: "An intimate culinary sanctuary set on a isolated ocean spit directory in the soft sand. Savor customized dishes crafted by Michelin-rated masters.",
    imageUrl: "https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "exp-spa",
    tag: "Wellness",
    title: "Sanctuary Spa Treatments",
    description: "A restorative temple of stone hot baths and organic aromatherapy scrubs looking out into dense lush canopies, bringing back pure holistic balance.",
    imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80"
  }
];

export default function Experiences() {
  const getIcon = (tag: string) => {
    switch (tag.toLowerCase()) {
      case "adventure":
        return <Anchor className="w-4 h-4 text-primary-fixed" />;
      case "gastronomy":
        return <Sparkles className="w-4 h-4 text-primary-fixed" />;
      default:
        return <HeartHandshake className="w-4 h-4 text-primary-fixed" />;
    }
  };

  const cardOffsets = [
    "", // No offset
    "lg:mt-12", // Medium offset
    "lg:mt-24", // Max offset
  ];

  return (
    <section id="experiences" className="bg-surface w-full py-24 px-6 md:px-12 relative z-30 border-t border-outline">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 max-w-2xl mx-auto">
          <span className="font-sans font-bold text-primary uppercase tracking-[0.3em] text-xs mb-3 block">
            Curated Immersions
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-normal text-on-surface mb-6">
            Bespoke Experiences
          </h2>
          <div className="w-12 h-[1px] bg-primary/30 mb-6" />
          <p className="font-sans text-on-surface-variant text-sm sm:text-base leading-relaxed text-balance">
            Allow our local masters to orchestrate unforgettable moments designed to move you from typical travel into absolute visual and physical serenity.
          </p>
        </div>

        {/* 3-Column Staggered Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {EXPERIENCES_DATA.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative rounded-none overflow-hidden aspect-[4/5] cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-700 ${cardOffsets[idx]} border border-outline/35`}
            >
              {/* Cover Image with continuous hover scale */}
              <img
                src={exp.imageUrl}
                alt={exp.title}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-102"
              />
              
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-300 group-hover:via-black/40" />

              {/* Reveal Actions / Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                <div className="flex items-center gap-1.5 mb-2.5">
                  <span className="p-1.5 px-3 rounded-none bg-white/10 backdrop-blur-md border border-white/15 text-[9px] uppercase tracking-[0.2em] text-[#c5a059] font-sans font-bold flex items-center gap-1">
                    {getIcon(exp.tag)}
                    <span>{exp.tag}</span>
                  </span>
                </div>

                <h3 className="font-serif text-white font-normal text-xl md:text-2xl tracking-normal mb-1.5 group-hover:text-primary transition-colors duration-300">
                  {exp.title}
                </h3>

                {/* Stretched detail animation on hovering */}
                <div className="max-h-0 overflow-hidden opacity-0 group-hover:max-h-28 group-hover:opacity-100 group-hover:mt-3 transition-all duration-500 ease-out">
                  <p className="font-sans text-white/75 text-xs md:text-sm leading-relaxed">
                    {exp.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-primary font-sans font-bold text-[10px] uppercase tracking-[0.2em]">
                    <span>Inquire Experience</span>
                    <Eye className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
