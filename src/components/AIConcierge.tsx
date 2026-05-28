import { useState, useRef, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Sparkles, PhoneCall, HelpCircle, Heart, Compass } from "lucide-react";
import { Message } from "../types";

export default function AIConcierge() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-msg",
      text: "Warmest greetings from Aryam. I am your personal digital concierge, here to orchestrate every detail of your sanctuary escape. Whether you desire to charter our private twilight yacht, customize an essential oil massage, or order a premier grand cru, your wishes are my sole focus. How may I serve you today?",
      sender: "bot",
      timestamp: "12:00 PM"
    }
  ]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      text: userInput,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    setUserInput("");
    setIsTyping(true);

    try {
      // call our backend express endpoint
      const response = await fetch("/api/concierge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: messages.concat(userMsg).map((m) => ({ text: m.text, sender: m.sender })),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setIsTyping(false);

      if (data.text) {
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            text: data.text,
            sender: "bot",
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          }
        ]);
      } else {
        throw new Error("Failed payload extraction");
      }
    } catch (err) {
      // fallback safety block
      setTimeout(() => {
        setIsTyping(false);
        const lowerInput = userMsg.text.toLowerCase();
        let fallbackText = "I would be absolutely delighted to orchestrate that for you. Allow me to query our retreat planners to verify availability. Shall we schedule this custom experience for your stay?";
        
        if (lowerInput.includes("honeymoon") || lowerInput.includes("stay") || lowerInput.includes("view")) {
          fallbackText = "I would be absolutely delighted to arrange that for you. Based on your desire for serene wellness and romantic ocean vistas, I recommend our **Honeymoon Sanctuary Package** in the private **Ocean View Villa** ($1,800/night), paired with our holistic customized treatments in the **Sanctuary Spa**. Under whispering palms, we can arrange an intimate beachfront candlelit dinner at twilight. Shall I proceed to hold this sanctuary for your ideal dates?";
        } else if (lowerInput.includes("dining") || lowerInput.includes("food") || lowerInput.includes("dinner")) {
          fallbackText = "Savoring gastronomy at Aryam is a sacred art. I recommend enjoying our signature **Wagyu Tenderloin with Truffle Pomme Purée** ($125) on your pool terrace, paired with a glass of **Château Margaux 2015**. Would you like me to coordinate this dining delivery for your ideal hour tonight?";
        }

        setMessages((prev) => [
          ...prev,
          {
            id: `bot-fb-${Date.now()}`,
            text: fallbackText,
            sender: "bot",
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          }
        ]);
      }, 1000);
    }
  };

  const prepopulatedQueries = [
    "Plan a Honeymoon Suite package stay",
    "Arrange a twilight yacht excursion",
    "What wine pairings go with Wagyu Beef?"
  ];

  return (
    <section id="concierge" className="bg-surface w-full py-24 px-6 md:px-12 relative z-30 border-t border-outline">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Ambient glowing orb display */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            <span className="font-sans font-bold text-primary uppercase tracking-[0.3em] text-xs mb-3 block">
              Intuitive Hospitality
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-normal text-on-surface mb-6 leading-tight">
              Personal AI Concierge
            </h2>
            <p className="font-sans text-on-surface-variant text-sm sm:text-base leading-relaxed mb-8 font-light">
              Experience seamless luxury with our living intelligence agent. From arranging bespoke diving tours to positioning private beachfront tables, your perfect stay is a conversation away.
            </p>

            {/* Glowing Orb Animation Container */}
            <div className="relative w-full aspect-[16/10] bg-zinc-950 rounded-none overflow-hidden shadow-xl flex flex-col items-center justify-center p-6 border border-outline">
              {/* Star-like dots background */}
              <div className="absolute inset-0 z-0 opacity-15 bg-[radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] bg-[size:24px_24px]" />
              
              {/* Golden pulsing core orb */}
              <div className="relative z-10 flex flex-col items-center gap-1.5 focus:outline-none">
                <motion.div
                  animate={{
                    scale: isTyping ? [1, 1.15, 1] : [1, 1.05, 1],
                    boxShadow: isTyping
                      ? [
                          "0 0 35px rgba(197, 160, 89, 0.45)",
                          "0 0 75px rgba(197, 160, 89, 0.75)",
                          "0 0 35px rgba(197, 160, 89, 0.45)",
                        ]
                      : [
                          "0 0 25px rgba(197, 160, 89, 0.3)",
                          "0 0 45px rgba(197, 160, 89, 0.5)",
                          "0 0 25px rgba(197, 160, 89, 0.3)",
                        ],
                  }}
                  transition={{
                    duration: isTyping ? 1.5 : 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#775a19] via-[#c5a059] to-[#faedd0] flex items-center justify-center border border-white/20 select-none pointer-events-none"
                >
                  <Sparkles className="w-8 h-8 text-white/90 animate-pulse" />
                </motion.div>
                <span className="font-sans font-bold text-[10px] uppercase tracking-[0.3em] text-[#faedd0]/80 mt-4 font-mono">
                  {isTyping ? "Orchestrating..." : "INTELLIGENCE READY"}
                </span>
              </div>

              {/* Utility signals */}
              <div className="absolute bottom-4 left-6 right-6 flex justify-between items-center text-[10px] uppercase tracking-[0.15em] font-mono text-white/40 border-t border-white/5 pt-3">
                <span className="flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-primary" /> Model: 2.0-Pro
                </span>
                <span className="flex items-center gap-1.5 animate-pulse">
                  <PhoneCall className="w-3 h-3 text-emerald-400" /> Host Connection: Active
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Beautiful Chat Dialogue and history selection */}
          <div className="lg:col-span-7 bg-surface border border-outline p-6 md:p-8 rounded-none shadow-none h-[500px] flex flex-col justify-between">
            
            {/* Scrollable conversation history */}
            <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-4 mb-4">
              <AnimatePresence>
                {messages.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className={`flex flex-col max-w-[85%] ${m.sender === "user" ? "self-end items-end" : "self-start items-start"}`}
                  >
                    <div
                      className={`p-4 rounded-none text-xs md:text-sm leading-relaxed border ${
                        m.sender === "user"
                          ? "bg-secondary text-white border-secondary"
                          : "bg-[#faf7f2] text-[#1a1a1a] border-outline"
                      }`}
                    >
                      {m.text}
                    </div>
                    <span className="font-mono text-[9px] text-[#555555] uppercase tracking-wider mt-1.5 mr-1 ml-1 scale-90">
                      {m.timestamp}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <div className="self-start flex flex-col items-start max-w-[80%]">
                  <div className="p-4 rounded-none bg-[#faf7f2] text-xs md:text-sm leading-relaxed border border-outline flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/80 animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                </div>
              )}
              
              <div ref={scrollRef} />
            </div>

            {/* Quick-Prompt suggestions */}
            <div className="flex flex-wrap gap-2 mb-4">
              {prepopulatedQueries.map((query) => (
                <button
                  key={query}
                  onClick={() => setUserInput(query)}
                  className="bg-white hover:bg-[#faf7f2] hover:border-primary border border-outline text-[10px] text-on-surface-variant rounded-none py-1.5 px-3.5 font-sans font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  {query}
                </button>
              ))}
            </div>

            {/* Input area */}
            <form onSubmit={handleSendMessage} className="flex gap-3 border-t border-outline pt-4 shrink-0">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Inquire about twilight yacht cruises, room service..."
                className="flex-1 bg-white border border-outline rounded-none p-3.5 text-xs md:text-sm font-sans text-on-surface placeholder:text-on-surface-variant/40 focus:border-primary focus:ring-0"
              />
              <button
                type="submit"
                className="p-3.5 bg-secondary text-white rounded-none hover:bg-primary transition-colors flex items-center justify-center cursor-pointer shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>

        </div>

      </div>
    </section>
  );
}
