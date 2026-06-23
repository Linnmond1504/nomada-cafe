"use client";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const CAT_ICONS = {
  "Todos":       "🌿",
  "Cafés":       "☕",
  "Especiales":  "✨",
  "Para comer":  "🍳",
  "Dulce":       "🍰",
};

export default function CategoryFilter({ categories, active, onSelect }) {
  const all = ["Todos", ...categories];
  const scrollRef = useRef(null);
  const [showRight, setShowRight] = useState(false);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowRight(scrollLeft + clientWidth < scrollWidth - 8);
  };

  useEffect(() => {
    checkScroll();
    scrollRef.current?.addEventListener("scroll", checkScroll);
    return () => scrollRef.current?.removeEventListener("scroll", checkScroll);
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <div
        ref={scrollRef}
        className="no-scrollbar"
        style={{ display: "flex", gap: "0.5rem", overflowX: "auto", paddingBottom: "2px" }}
      >
        {all.map((cat) => {
          const isActive = cat === active;
          const icon = CAT_ICONS[cat] || "•";
          return (
            <motion.button
              key={cat}
              className={`filter-tab ${isActive ? "active" : ""}`}
              onClick={() => onSelect(cat)}
              whileTap={{ scale: 0.95 }}
              style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}
            >
              <span style={{ fontSize: "0.85rem" }}>{icon}</span>
              {cat}
            </motion.button>
          );
        })}
      </div>
      {/* fade right */}
      <div
        style={{
          position: "absolute", right: 0, top: 0, bottom: 0, width: 40, pointerEvents: "none",
          background: "linear-gradient(to right, transparent, rgba(255,252,250,0.95))",
          opacity: showRight ? 1 : 0, transition: "opacity 0.2s",
        }}
      />
    </div>
  );
}
