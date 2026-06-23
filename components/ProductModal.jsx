"use client";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ICONS = {
  "Cafés": (
    <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
      <path d="M10 18h24l-1.8 18.5c-.3 2.6-2.5 4.5-5.1 4.5h-10c-2.6 0-4.8-1.9-5.1-4.5L10 18z" stroke="#E8537A" strokeWidth="2" strokeLinejoin="round" fill="#fff"/>
      <path d="M34 21c4 0 7 2.5 7 6s-3 6-7 6" stroke="#E8537A" strokeWidth="2" strokeLinecap="round"/>
      <path d="M16 11c0 1.5 2 1.5 2 3s-2 1.5-2 3" stroke="#FF6B8A" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M23 11c0 1.5 2 1.5 2 3s-2 1.5-2 3" stroke="#FF6B8A" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  "Especiales": (
    <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
      <path d="M24 8l3 9 9 3-9 3-3 9-3-9-9-3 9-3 3-9z" fill="#fff" stroke="#E8537A" strokeWidth="2"/>
      <circle cx="36" cy="34" r="3" fill="#FFB088"/>
      <circle cx="12" cy="32" r="2" fill="#FF6B8A"/>
    </svg>
  ),
  "Para comer": (
    <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
      <ellipse cx="24" cy="26" rx="16" ry="10" fill="#fff" stroke="#E8537A" strokeWidth="2"/>
      <path d="M14 20c2-5 6-8 10-8s8 3 10 8" stroke="#FF6B8A" strokeWidth="2" strokeLinecap="round" fill="none"/>
    </svg>
  ),
  "Dulce": (
    <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
      <path d="M12 22c0-6.6 5.4-12 12-12s12 5.4 12 12" stroke="#E8537A" strokeWidth="2" fill="#fff" strokeLinejoin="round"/>
      <path d="M10 22h28l-2 6H12l-2-6z" fill="#FFB088" stroke="#E8537A" strokeWidth="2"/>
      <circle cx="24" cy="9" r="2" fill="#FF6B8A"/>
    </svg>
  ),
};

const DEFAULT_ICON = (
  <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="14" fill="#fff" stroke="#E8537A" strokeWidth="2"/>
  </svg>
);

export default function ProductModal({ product, onClose }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  if (!product) return null;
  const icon = ICONS[product.categoria] || DEFAULT_ICON;

  return (
    <AnimatePresence>
      <motion.div
        ref={overlayRef}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 modal-bg"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Sheet */}
        <motion.div
          className="relative z-10 w-full sm:max-w-md sm:mx-4 sm:rounded-3xl overflow-hidden"
          style={{
            background: "#fff",
            borderRadius: "28px 28px 0 0",
            boxShadow: "0 -4px 40px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)",
          }}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 32, stiffness: 380, mass: 0.9 }}
        >
          {/* Handle bar */}
          <div className="flex justify-center pt-3 pb-1">
            <div style={{ width: 36, height: 4, borderRadius: 99, background: "#F0E6E6" }} />
          </div>

          {/* Imagen o placeholder ilustrado */}
          <div className="relative mx-4 mt-2 rounded-2xl overflow-hidden img-placeholder" style={{ height: 200 }}>
            {product.imagen_url ? (
              <img
                src={product.imagen_url}
                alt={product.nombre}
                className="w-full h-full object-cover"
                style={{ position: "absolute", inset: 0 }}
              />
            ) : (
              icon
            )}
            {/* Category pill over image */}
            <div className="absolute top-3 left-3">
              <span className="cat-pill" style={{ background: "rgba(255,255,255,0.9)" }}>{product.categoria}</span>
            </div>
            {product.destacado && (
              <div className="absolute top-3 right-3">
                <span className="badge-hot">♡ Top</span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="px-5 pt-5 pb-8">
            <h2
              className="font-display"
              style={{ fontSize: "1.8rem", fontWeight: 500, lineHeight: 1.15, color: "#1A1414", marginBottom: "0.6rem" }}
            >
              {product.nombre}
            </h2>

            <p
              style={{ fontSize: "0.93rem", lineHeight: 1.65, color: "#8A8580", marginBottom: "1.5rem" }}
            >
              {product.descripcion}
            </p>

            {/* Footer: precio + botón */}
            <div className="flex items-center justify-between gap-4">
              <div>
                <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#D8CCC5", marginBottom: "0.2rem" }}>
                  Precio
                </p>
                <p className="price" style={{ fontSize: "2rem", lineHeight: 1 }}>
                  ${product.precio.toLocaleString("es-AR")}
                </p>
              </div>

              <button
                onClick={onClose}
                className="btn-squish"
                style={{
                  background: "linear-gradient(135deg, #FF6B8A, #E8537A)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 99,
                  padding: "0.85rem 2rem",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  fontFamily: "inherit",
                  cursor: "pointer",
                  boxShadow: "0 6px 18px rgba(255,107,138,0.4)",
                  flexShrink: 0,
                }}
              >
                ¡Me encanta! ♡
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
