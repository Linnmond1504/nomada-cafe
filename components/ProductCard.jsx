"use client";
import { motion } from "framer-motion";

const ICONS = {
  "Cafés": (
    <svg width="34" height="34" viewBox="0 0 48 48" fill="none">
      <path d="M10 18h24l-1.8 18.5c-.3 2.6-2.5 4.5-5.1 4.5h-10c-2.6 0-4.8-1.9-5.1-4.5L10 18z" stroke="#E8537A" strokeWidth="2.2" strokeLinejoin="round" fill="#FFE9EF"/>
      <path d="M34 21c4 0 7 2.5 7 6s-3 6-7 6" stroke="#E8537A" strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M16 11c0 1.5 2 1.5 2 3s-2 1.5-2 3" stroke="#FF6B8A" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M23 11c0 1.5 2 1.5 2 3s-2 1.5-2 3" stroke="#FF6B8A" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  "Especiales": (
    <svg width="34" height="34" viewBox="0 0 48 48" fill="none">
      <path d="M24 8l3 9 9 3-9 3-3 9-3-9-9-3 9-3 3-9z" fill="#FFE9EF" stroke="#E8537A" strokeWidth="2"/>
      <circle cx="36" cy="34" r="3" fill="#FFB088"/>
      <circle cx="12" cy="32" r="2" fill="#FF6B8A"/>
    </svg>
  ),
  "Para comer": (
    <svg width="34" height="34" viewBox="0 0 48 48" fill="none">
      <ellipse cx="24" cy="26" rx="16" ry="10" fill="#FFE8DA" stroke="#E8537A" strokeWidth="2.2"/>
      <path d="M14 20c2-5 6-8 10-8s8 3 10 8" stroke="#FF6B8A" strokeWidth="2" strokeLinecap="round" fill="none"/>
    </svg>
  ),
  "Dulce": (
    <svg width="34" height="34" viewBox="0 0 48 48" fill="none">
      <path d="M12 22c0-6.6 5.4-12 12-12s12 5.4 12 12" stroke="#E8537A" strokeWidth="2.2" fill="#FFE9EF" strokeLinejoin="round"/>
      <path d="M10 22h28l-2 6H12l-2-6z" fill="#FFB088" stroke="#E8537A" strokeWidth="2"/>
      <circle cx="24" cy="9" r="2" fill="#FF6B8A"/>
    </svg>
  ),
};

const DEFAULT_ICON = (
  <svg width="34" height="34" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="14" fill="#FFE9EF" stroke="#E8537A" strokeWidth="2.2"/>
  </svg>
);

export default function ProductCard({ product, index, onClick }) {
  const icon = ICONS[product.categoria] || DEFAULT_ICON;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.32, delay: index * 0.045, ease: [0.23, 1, 0.32, 1] }}
      layout
    >
      <div
        className="menu-card"
        onClick={() => onClick(product)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onClick(product)}
        aria-label={`Ver detalle de ${product.nombre}`}
      >
        {/* Foto o placeholder ilustrado */}
        <div className="relative" style={{ height: 150, overflow: "hidden" }}>
          {product.imagen_url ? (
            <img
              src={product.imagen_url}
              alt={product.nombre}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          ) : (
            <div
              className="img-placeholder"
              style={{ width: "100%", height: "100%" }}
            >
              {icon}
            </div>
          )}

          {/* Badge popular */}
          {product.destacado && (
            <div style={{ position: "absolute", top: 10, right: 10 }}>
              <span className="badge-hot">♡ Top</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div style={{ padding: "0.9rem 1rem 1rem" }}>
          {/* Categoría pill */}
          <div style={{ marginBottom: "0.5rem" }}>
            <span className="cat-pill">{product.categoria}</span>
          </div>

          {/* Nombre */}
          <h3
            className="font-display"
            style={{ fontSize: "1.05rem", fontWeight: 500, lineHeight: 1.25, color: "#1A1414", marginBottom: "0.35rem" }}
          >
            {product.nombre}
          </h3>

          {/* Descripción truncada */}
          <p
            style={{
              fontSize: "0.78rem",
              color: "#A89B94",
              lineHeight: 1.5,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              marginBottom: "0.85rem",
            }}
          >
            {product.descripcion}
          </p>

          {/* Footer precio + flecha */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span className="price" style={{ fontSize: "1.2rem" }}>
              ${product.precio.toLocaleString("es-AR")}
            </span>
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: "var(--pink-soft)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M2.5 10.5L10.5 2.5M10.5 2.5H5M10.5 2.5V8" stroke="#E8537A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
