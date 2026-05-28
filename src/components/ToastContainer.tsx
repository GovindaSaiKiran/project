import { motion, AnimatePresence } from "motion/react";
import { Sparkles, CheckCircle, Bell, X } from "lucide-react";

interface Toast {
  id: string;
  message: string;
  type: "success" | "info";
}

interface ToastContainerProps {
  toasts: Toast[];
  onClose: (id: string) => void;
}

export function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  return (
    <div className="fixed bottom-6 right-6 z-55 flex flex-col gap-3.5 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: "spring", damping: 18, stiffness: 120 }}
            className="pointer-events-auto bg-surface/95 backdrop-blur-md rounded-xl p-4 shadow-xl border border-primary/20 flex items-start gap-3 relative overflow-hidden"
          >
            {/* Ambient luxury underglow accent bar */}
            <div className="absolute top-0 bottom-0 left-0 w-1 bg-primary" />

            <div className="shrink-0 mt-0.5">
              {t.type === "success" ? (
                <CheckCircle className="w-4 h-4 text-primary" />
              ) : (
                <Sparkles className="w-4 h-4 text-primary-container" />
              )}
            </div>

            <div className="flex-1 text-left">
              <span className="font-sans font-semibold text-[8px] uppercase tracking-[0.2em] text-[#775a19] block mb-0.5">
                {t.type === "success" ? "Confirmation Notice" : "Operational Signal"}
              </span>
              <p className="font-sans text-xs text-[#1c1b1b] leading-relaxed">
                {t.message}
              </p>
            </div>

            <button
              onClick={() => onClose(t.id)}
              className="p-1 rounded-full text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
