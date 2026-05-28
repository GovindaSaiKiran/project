import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Coffee, UtensilsCrossed, Moon, ShoppingBag, Plus, Minus, Trash2, Milestone, Heart } from "lucide-react";
import { DiningItem, OrderState } from "../types";

const DINING_MENU: DiningItem[] = [
  // Breakfast - Morning Rituals
  {
    id: "din-breakfast-1",
    name: "Sunrise Breakfast Platter",
    description: "Two farm-fresh poached eggs on buttered artisanal sourdough, served with slow-roasted cherry vine tomatoes, hass avocado crush, and wild organic mountain honey.",
    price: 45,
    category: "breakfast",
    isChefSpecial: true
  },
  {
    id: "din-breakfast-2",
    name: "Açaí Wild Berry Bowl",
    description: "Cold-pressed açaí berry whip topped with organic toasted almond granola, chia pods, goji berries, and organic dark forest honey drizzle.",
    price: 35,
    category: "breakfast"
  },
  // Lunch - Sunlit Repast
  {
    id: "din-lunch-1",
    name: "Mediterranean Burrata Salad",
    description: "Creamy fresh burrata matched with colorful heirloom cherry tomatoes, cold-milled virgin olive oil, sweet basil nodes, and dense aged black balsamic glaze.",
    price: 55,
    category: "lunch",
    isChefSpecial: true
  },
  {
    id: "din-lunch-2",
    name: "Wagyu Beef Brioche Burger",
    description: "Wood-fired premium Wagyu beef blend on a toasted artisan brioche bun, glazed with aged white cheddar melt, truffle aioli, and hand-cut sea salt fries.",
    price: 65,
    category: "lunch"
  },
  // Dinner - Evening Opulence
  {
    id: "din-dinner-1",
    name: "Dry-Aged Wagyu Tenderloin",
    description: "Prime dry-aged Wagyu beef cooked over volcanic stone coals, paired with velvet black truffle pomme purée, grilled baby asparagus, and rich Bordeaux red wine reduction sauce.",
    price: 125,
    category: "dinner",
    isChefSpecial: true
  },
  {
    id: "din-dinner-2",
    name: "Château Margaux 2015 (Per Glass)",
    description: "Affectionate Premier Grand Cru Classé. A harmonious, rich symphony of dark berry fruits, delicate floral notes, cedar undertones, and velvet tannins.",
    price: 75,
    category: "dinner"
  }
];

interface DiningProps {
  onNewOrder: (order: OrderState) => void;
  activeOrders: OrderState[];
  onUpdateOrder: (id: string, nextStatus: "ordered" | "preparing" | "en-route" | "delivered") => void;
}

export default function Dining({ onNewOrder, activeOrders, onUpdateOrder }: DiningProps) {
  const [activeCategory, setActiveCategory] = useState<"breakfast" | "lunch" | "dinner">("breakfast");
  const [cart, setCart] = useState<{ item: DiningItem; quantity: number }[]>([]);
  const [roomNumber, setRoomNumber] = useState("Sanctuary 302");
  const [isOrderedSuccessfully, setIsOrderedSuccessfully] = useState(false);

  // Auto-progress system for orders to create immediate luxury feedback loops
  useEffect(() => {
    const timer = setInterval(() => {
      activeOrders.forEach((order) => {
        if (order.status === "ordered") {
          onUpdateOrder(order.id, "preparing");
        } else if (order.status === "preparing") {
          onUpdateOrder(order.id, "en-route");
        } else if (order.status === "en-route") {
          onUpdateOrder(order.id, "delivered");
        }
      });
    }, 15000); // Progress steps every 15s for visual appeal in the demo
    return () => clearInterval(timer);
  }, [activeOrders, onUpdateOrder]);

  const itemsFiltered = DINING_MENU.filter((item) => item.category === activeCategory);

  const handleAddToCart = (item: DiningItem) => {
    setCart((prevCart) => {
      const idx = prevCart.findIndex((ci) => ci.item.id === item.id);
      if (idx > -1) {
        const next = [...prevCart];
        next[idx].quantity += 1;
        return next;
      }
      return [...prevCart, { item, quantity: 1 }];
    });
  };

  const handleAdjustQuantity = (itemId: string, diff: number) => {
    setCart((prevCart) => {
      const idx = prevCart.findIndex((ci) => ci.item.id === itemId);
      if (idx === -1) return prevCart;

      const next = [...prevCart];
      const nextQuantity = next[idx].quantity + diff;

      if (nextQuantity <= 0) {
        return next.filter((ci) => ci.item.id !== itemId);
      } else {
        next[idx].quantity = nextQuantity;
        return next;
      }
    });
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((ci) => ci.item.id !== itemId));
  };

  const handleCheckOutOrder = (e: FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const summaryItemNames = cart.map((c) => `${c.quantity}x ${c.item.name}`).join(", ");
    const nextOrder: OrderState = {
      id: `din-${Math.floor(1000 + Math.random() * 9000)}`,
      item: summaryItemNames,
      status: "ordered",
      guestRoom: roomNumber,
      timestamp: new Date().getTime(),
    };

    onNewOrder(nextOrder);
    setCart([]);
    setIsOrderedSuccessfully(true);
    setTimeout(() => {
      setIsOrderedSuccessfully(false);
    }, 4000);
  };

  const cartTotalVal = cart.reduce((sum, ci) => sum + ci.item.price * ci.quantity, 0);

  return (
    <section id="dining" className="bg-surface w-full py-24 px-6 md:px-12 relative z-30 border-t border-outline">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-16 max-w-2xl mx-auto">
          <span className="font-sans font-bold text-primary uppercase tracking-[0.3em] text-xs mb-3 block">
            Gastronomic Devotion
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-normal text-on-surface mb-6">
            In-Room Culinary Sanctuary
          </h2>
          <div className="w-12 h-[1px] bg-primary/30 mb-6" />
          <p className="font-sans text-on-surface-variant text-sm sm:text-base leading-relaxed text-balance">
            Savor Master culinary creations in the absolute sanctuary of your villa or private viewing deck. Fresh, local organic ingredients cooked to order, paired with elite vintages.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Menu & Catalog Tab Column */}
          <div className="lg:col-span-2">
            
            {/* Tab selections */}
            <div className="flex justify-start gap-4 mb-8 border-b border-outline pb-2">
              <button
                onClick={() => setActiveCategory("breakfast")}
                className={`flex items-center gap-2 pb-3 font-sans font-bold text-[11px] uppercase tracking-[0.2em] relative transition-colors cursor-pointer ${
                  activeCategory === "breakfast" ? "text-primary" : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                <Coffee className="w-4 h-4" />
                <span>Morning Rituals</span>
                {activeCategory === "breakfast" && <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-primary" />}
              </button>
              
              <button
                onClick={() => setActiveCategory("lunch")}
                className={`flex items-center gap-2 pb-3 font-sans font-bold text-[11px] uppercase tracking-[0.2em] relative transition-colors cursor-pointer ${
                  activeCategory === "lunch" ? "text-primary" : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                <UtensilsCrossed className="w-4 h-4" />
                <span>Sunlit Repast</span>
                {activeCategory === "lunch" && <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-primary" />}
              </button>

              <button
                onClick={() => setActiveCategory("dinner")}
                className={`flex items-center gap-2 pb-3 font-sans font-bold text-[11px] uppercase tracking-[0.2em] relative transition-colors cursor-pointer ${
                  activeCategory === "dinner" ? "text-primary" : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                <Moon className="w-4 h-4" />
                <span>Evening Opulence</span>
                {activeCategory === "dinner" && <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-primary" />}
              </button>
            </div>

            {/* Menu options display */}
            <div className="flex flex-col gap-6">
              {itemsFiltered.map((item) => (
                <div
                  key={item.id}
                  className="bg-surface border border-outline rounded-none p-6 transition-all duration-300 hover:border-primary/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      {item.isChefSpecial && (
                        <span className="bg-[#faf7f2] border border-outline p-1.5 px-2.5 rounded-none text-[8px] font-sans font-bold uppercase tracking-[0.2em] text-primary flex items-center gap-1">
                          <Heart className="w-2.5 h-2.5 text-primary fill-primary" /> Chef Special
                        </span>
                      )}
                      <h4 className="font-serif text-lg text-[#1a1a1a] font-normal">
                        {item.name}
                      </h4>
                    </div>
                    <p className="font-sans text-on-surface-variant text-xs md:text-sm leading-relaxed max-w-xl font-light">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-6 justify-between w-full md:w-auto shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-[#e5e1d8]">
                    <span className="font-serif font-semibold text-lg text-primary">
                      ${item.price}
                    </span>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="p-3 bg-secondary text-white rounded-none hover:bg-primary transition-all duration-300 active:scale-[0.98] flex items-center gap-1.5 font-sans font-bold text-[11px] uppercase tracking-[0.2em] cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> ADD
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Interactive Cart & Tracker Panel */}
          <div className="flex flex-col gap-8">
            
            {/* Cart Box */}
            <div className="bg-surface border border-outline rounded-none p-6 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-lg text-[#1a1a1a] border-b border-outline pb-3 mb-4 flex items-center gap-2 font-normal">
                  <ShoppingBag className="w-5 h-5 text-primary" /> Order Cart Selection
                </h3>

                {isOrderedSuccessfully && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-emerald-50 text-emerald-850 border border-emerald-250 rounded-none text-xs font-sans mb-4"
                  >
                    Your room service order has been custom registered! Check the order status tracking pipeline below.
                  </motion.div>
                )}

                {cart.length === 0 ? (
                  <div className="py-12 text-center text-on-surface-variant font-sans text-xs flex flex-col items-center gap-3">
                    <UtensilsCrossed className="w-8 h-8 text-primary/30" />
                    <p>Your sanctuary plate is clear. Choose culinary masterpieces to add them here.</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4 max-h-64 overflow-y-auto mb-6 pr-1">
                    {cart.map((ci) => (
                      <div key={ci.item.id} className="flex justify-between items-center gap-2 text-xs border-b border-[#e5e1d8] pb-3 animate-fade-in">
                        <div className="flex-1">
                          <h5 className="font-sans font-bold text-on-surface">{ci.item.name}</h5>
                          <span className="text-[10px] text-[#555555] font-sans font-medium">${ci.item.price} each</span>
                        </div>
                        
                        {/* Adjust qty buttons */}
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => handleAdjustQuantity(ci.item.id, -1)}
                            className="p-1 rounded-none bg-[#eceae6] text-on-surface hover:bg-[#d5d2cd] cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-sans font-bold w-4 text-center text-[#1a1a1a]">{ci.quantity}</span>
                          <button
                            onClick={() => handleAdjustQuantity(ci.item.id, 1)}
                            className="p-1 rounded-none bg-[#eceae6] text-on-surface hover:bg-[#d5d2cd] cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleRemoveFromCart(ci.item.id)}
                            className="p-1 text-red-700 hover:bg-red-50 rounded-none cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <form onSubmit={handleCheckOutOrder} className="border-t border-outline pt-4 flex flex-col gap-4">
                  <div className="flex justify-between items-center font-serif text-base text-on-surface">
                    <span>Subtotal Price:</span>
                    <span className="font-semibold text-primary">${cartTotalVal}</span>
                  </div>

                  <div className="flex flex-col gap-1.5 text-2xs uppercase tracking-[0.2em] font-sans font-bold">
                    <label className="text-on-surface-variant">Verify Delivery Sanctuary</label>
                    <select
                      value={roomNumber}
                      onChange={(e) => setRoomNumber(e.target.value)}
                      className="bg-white border border-outline rounded-none p-2.5 text-xs text-on-surface w-full focus:border-primary"
                    >
                      <option value="Sanctuary 102">Sanctuary 102 (Pool Cottage)</option>
                      <option value="Sanctuary 302">Sanctuary 302 (Ocean View)</option>
                      <option value="Sanctuary 401">Sanctuary 401 (Pres. Suite)</option>
                      <option value="Sanctuary 505">Sanctuary 505 (Family Villa)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-secondary text-white py-3.5 rounded-none font-sans font-bold text-xs uppercase tracking-[0.2em] hover:bg-primary transition-all focus:ring-2 focus:ring-primary/20 cursor-pointer text-center"
                  >
                    Place Sanctuary Order
                  </button>
                </form>
              )}
            </div>

            {/* Room Service Order Status Tracker Pipeline */}
            <div className="bg-surface border border-outline rounded-none p-6 shadow-sm flex-1">
              <h3 className="font-serif text-lg text-[#1a1a1a] border-b border-outline pb-3 mb-4 flex items-center gap-2 font-normal">
                <Milestone className="w-5 h-5 text-primary" /> Active Service Pipelines
              </h3>

              {activeOrders.length === 0 ? (
                <div className="py-6 text-center text-on-surface-variant font-sans text-xs leading-relaxed">
                  No active culinary or room service orders currently running. Place an order on the left to track actual luxury fulfillment steps.
                </div>
              ) : (
                <div className="flex flex-col gap-5 overflow-y-auto max-h-[380px]">
                  {activeOrders.map((order) => {
                    const statusSteps = ["ordered", "preparing", "en-route", "delivered"];
                    const currentStepIdx = statusSteps.indexOf(order.status);

                    return (
                      <div key={order.id} className="p-4 rounded-none bg-[#faf7f2] border border-outline flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs text-primary font-bold">ORDER {order.id}</span>
                          <span className="font-sans text-[10px] uppercase font-bold text-on-surface-variant bg-white border border-[#e5e1d8] p-1 px-2 rounded-none">
                            {order.guestRoom}
                          </span>
                        </div>
                        <p className="font-sans text-xs text-on-surface italic line-clamp-1">{order.item}</p>

                        {/* Stretched indicator node pipeline */}
                        <div className="flex justify-between items-center relative mt-2 px-1">
                          <div className="absolute left-0 right-0 h-[1.5px] bg-[#e5e1d8] top-2 z-0" />
                          <div
                            className="absolute left-0 h-[1.5px] bg-primary top-2 z-0 transition-all duration-700"
                            style={{ width: `${(currentStepIdx / (statusSteps.length - 1)) * 100}%` }}
                          />

                          {statusSteps.map((step, sIdx) => {
                            const isDone = sIdx <= currentStepIdx;
                            const isCurrent = sIdx === currentStepIdx;

                            return (
                              <div key={step} className="flex flex-col items-center z-10 relative">
                                <div
                                  className={`w-4 h-4 rounded-full border-2 transition-all duration-500 flex items-center justify-center ${
                                    isCurrent
                                      ? "bg-primary border-primary scale-110 shadow-sm"
                                      : isDone
                                      ? "bg-[#c5a059] border-[#c5a059]"
                                      : "bg-white border-[#e5e1d8]"
                                  }`}
                                >
                                  {isDone && !isCurrent && <div className="w-1 h-1 rounded-full bg-white" />}
                                  {isCurrent && <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />}
                                </div>
                                <span className="font-sans text-[8px] uppercase font-bold text-on-surface-variant tracking-[0.1em] mt-1.5">
                                  {step}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
