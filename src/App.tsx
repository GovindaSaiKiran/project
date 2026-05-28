import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Experiences from "./components/Experiences";
import Accommodations from "./components/Accommodations";
import Dining from "./components/Dining";
import AIConcierge from "./components/AIConcierge";
import Packages from "./components/Packages";
import Testimonials from "./components/Testimonials";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import { OrderState } from "./types";
import { ToastContainer } from "./components/ToastContainer";

export default function App() {
  const [bookings, setBookings] = useState<{ room: string; guests: number; price: number; nights: number }[]>([]);
  const [activeOrders, setActiveOrders] = useState<OrderState[]>([]);
  const [toasts, setToasts] = useState<{ id: string; message: string; type: "success" | "info" }[]>([]);

  const addToast = (message: string, type: "success" | "info" = "success") => {
    const id = `tst-${Date.now()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const handleNewBookingHold = (booking: { room: string; guests: number; price: number; nights: number }) => {
    setBookings((prev) => [booking, ...prev]);
    addToast(`Sanctuary hold registered for ${booking.room} (${booking.nights} nights)!`, "success");
    
    // Auto Scroll to resort dashboard to see it reflected immediately
    setTimeout(() => {
      const element = document.getElementById("dashboard");
      element?.scrollIntoView({ behavior: "smooth" });
    }, 1800);
  };

  const handleNewDiningOrder = (order: OrderState) => {
    setActiveOrders((prev) => [order, ...prev]);
    addToast(`Savoury order of "${order.item.split(",")[0]}" registered successfully!`, "success");
  };

  const handleUpdateDiningOrder = (id: string, nextStatus: "ordered" | "preparing" | "en-route" | "delivered") => {
    setActiveOrders((prev) =>
      prev.map((order) => {
        if (order.id === id) {
          if (order.status !== nextStatus) {
            // Trigger beautiful informational toasts when order pipeline status steps forward!
            let msg = `Order ${id} status advanced to ${nextStatus}.`;
            if (nextStatus === "preparing") msg = `Aryam chefs are now preparing your order for ${order.guestRoom}.`;
            if (nextStatus === "en-route") msg = `Your room service is en-route to your personal villa deck!`;
            if (nextStatus === "delivered") msg = `Your culinary masterworks have been delivered. Enjoy your repast!`;
            addToast(msg, nextStatus === "delivered" ? "success" : "info");
          }
          return { ...order, status: nextStatus };
        }
        return order;
      })
    );
  };

  const handleHeroSearch = (data: { destination: string; checkIn: string; checkOut: string; guests: string }) => {
    addToast(`Refined check search in progress for ${data.destination}!`, "info");
    
    // Auto-scroll to accommodations where users inspect sanctuaries
    setTimeout(() => {
      const element = document.getElementById("accommodations");
      element?.scrollIntoView({ behavior: "smooth" });
    }, 1500);
  };

  const handlePackageSelect = (pkgName: string, price: number) => {
    handleNewBookingHold({
      room: pkgName,
      guests: 2,
      price: price,
      nights: 3, // default package stays
    });
  };

  const handleNavbarReserve = () => {
    const element = document.getElementById("accommodations");
    element?.scrollIntoView({ behavior: "smooth" });
    addToast("Scroll to accommodations to configure your sanctuary stay.", "info");
  };

  return (
    <div className="bg-[#fcf9f8] min-h-screen relative overflow-hidden font-sans selection:bg-primary-container selection:text-white antialiased">
      {/* Premium Toast Overlays Pin */}
      <ToastContainer toasts={toasts} onClose={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))} />

      {/* Luxury Sticky Nav */}
      <Navbar onReserveClick={handleNavbarReserve} />

      {/* Interactive Cinematic Hero Slider */}
      <Hero onSearch={handleHeroSearch} />

      {/* Curated Experiences Category Column */}
      <Experiences />

      {/* Luxury Sanctuaries & Accommodations Cards */}
      <Accommodations onBookSuccess={handleNewBookingHold} />

      {/* In-Room Private Dining Catalogue */}
      <Dining
        onNewOrder={handleNewDiningOrder}
        activeOrders={activeOrders}
        onUpdateOrder={handleUpdateDiningOrder}
      />

      {/* Intelligent AI Concierge Container */}
      <AIConcierge />

      {/* Bespoke Resort Packages Grid */}
      <Packages onPkgSelect={handlePackageSelect} />

      {/* Guest Chronicles testimonials */}
      <Testimonials />

      {/* Resort Intelligence dashboard widget block */}
      <Dashboard activeOrders={activeOrders} bookings={bookings} />

      {/* Elegant Editorial Branding Footer */}
      <Footer />
    </div>
  );
}
