"use client";
import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CategoryFilter from "./CategoryFilter";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";

export default function MenuClient({ items }) {
  const [active, setActive] = useState("Todos");
  const [selected, setSelected] = useState(null);

  const categories = useMemo(() => {
    const seen = new Set();
    return items.map((i) => i.categoria).filter((c) => { if (seen.has(c)) return false; seen.add(c); return true; });
  }, [items]);

  const filtered = useMemo(
    () => (active === "Todos" ? items : items.filter((i) => i.categoria === active)),
    [items, active]
  );

  return (
    <div style={{ minHeight: "100vh", background: "var(--white)" }}>

      {/* ── HERO ─────────────────────────────────────────── */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          background: "linear-gradient(160deg, #FFFCFA 0%, #FFF3F0 45%, #FFE9EF 100%)",
          padding: "3.2rem 1.5rem 2.6rem",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* decorative blobs */}
        <div style={{
          position: "absolute", top: -70, right: -50, width: 240, height: 240,
          borderRadius: "50%", background: "rgba(255,107,138,0.10)", pointerEvents: "none"
        }} />
        <div style={{
          position: "absolute", bottom: -50, left: -40, width: 180, height: 180,
          borderRadius: "50%", background: "rgba(255,176,136,0.12)", pointerEvents: "none"
        }} />
        {/* floating sparkle */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1, rotate: [0, 12, -8, 0] }}
          transition={{ delay: 0.5, duration: 1.2, rotate: { repeat: Infinity, duration: 4, ease: "easeInOut" } }}
          style={{ position: "absolute", top: "18%", left: "10%", fontSize: "1.3rem" }}
        >
          ✦
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1, rotate: [0, -10, 10, 0] }}
          transition={{ delay: 0.7, duration: 1.2, rotate: { repeat: Infinity, duration: 5, ease: "easeInOut" } }}
          style={{ position: "absolute", top: "55%", right: "12%", fontSize: "1rem", color: "var(--pink)" }}
        >
          ✦
        </motion.div>

        {/* Cup icon — hand drawn signature */}
        <motion.div
          initial={{ opacity: 0, y: -10, rotate: -8 }}
          animate={{ opacity: 1, y: 0, rotate: -6 }}
          transition={{ delay: 0.05, duration: 0.5, ease: [0.23,1,0.32,1] }}
          style={{ display: "inline-block", marginBottom: "0.9rem" }}
        >
          <svg width="46" height="46" viewBox="0 0 48 48" fill="none">
            <path d="M10 18h24l-1.8 18.5c-.3 2.6-2.5 4.5-5.1 4.5h-10c-2.6 0-4.8-1.9-5.1-4.5L10 18z"
              stroke="#E8537A" strokeWidth="2.2" strokeLinejoin="round" fill="#FFE9EF"/>
            <path d="M34 21c4 0 7 2.5 7 6s-3 6-7 6" stroke="#E8537A" strokeWidth="2.2" strokeLinecap="round"/>
            <path d="M16 11c0 1.5 2 1.5 2 3s-2 1.5-2 3" stroke="#FF6B8A" strokeWidth="1.8" strokeLinecap="round"/>
            <path d="M23 11c0 1.5 2 1.5 2 3s-2 1.5-2 3" stroke="#FF6B8A" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </motion.div>

        {/* Tag line */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          style={{
            display: "block", marginBottom: "0.9rem",
          }}
        >
          <span style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--pink-deep)" }}>
            ⋆ Hecho con cariño todos los días ⋆
          </span>
        </motion.div>

        {/* Nombre */}
        <motion.h1
          className="font-display"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.23,1,0.32,1] }}
          style={{ fontSize: "clamp(2.6rem, 9vw, 3.8rem)", fontWeight: 400, lineHeight: 1.08, color: "#1A1414", marginBottom: "0.6rem" }}
        >
          Buenos días,<br/>
          <span style={{ position: "relative", display: "inline-block" }}>
            <em style={{ color: "var(--pink-deep)", fontStyle: "italic", fontWeight: 500 }}>cafecito?</em>
            <svg style={{ position: "absolute", left: 0, bottom: -6, width: "100%", height: 10 }} viewBox="0 0 200 10" preserveAspectRatio="none">
              <path d="M2 7 Q 50 2, 100 6 T 198 5" stroke="#FFB088" strokeWidth="4" fill="none" strokeLinecap="round"/>
            </svg>
          </span>
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ fontSize: "0.92rem", color: "var(--gray-mid)", letterSpacing: "0.01em", maxWidth: 280, margin: "0 auto" }}
        >
          Nómada Café · grano de especialidad, recetas propias y mucha buena onda
        </motion.p>

        {/* Nota horario */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{
            display: "inline-flex", alignItems: "center", gap: "0.45rem",
            marginTop: "1.5rem", background: "#fff", borderRadius: 99,
            padding: "0.5rem 1.1rem", boxShadow: "0 4px 18px rgba(255,107,138,0.15)",
            border: "1px solid #FFE9EF",
          }}
        >
          <motion.span
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            style={{ fontSize: "0.7rem", color: "#34C759" }}
          >●</motion.span>
          <span style={{ fontSize: "0.8rem", color: "var(--gray-dark)", fontWeight: 500 }}>Abierto ahora · 8 a 20 h</span>
        </motion.div>
      </motion.header>

      {/* ── FILTROS sticky ───────────────────────────────── */}
      <div
        className="filter-bar"
        style={{
          position: "sticky", top: 0, zIndex: 30,
          padding: "0.9rem 1.25rem",
          borderBottom: "1px solid #FBE8EC",
        }}
      >
        <CategoryFilter categories={categories} active={active} onSelect={setActive} />
      </div>

      {/* ── GRID ─────────────────────────────────────────── */}
      <main style={{ maxWidth: 680, margin: "0 auto", padding: "1.6rem 1.1rem 5rem" }}>

        {/* Counter */}
        <motion.p
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ fontSize: "0.78rem", color: "#C9B8B0", marginBottom: "1.1rem", fontWeight: 600, letterSpacing: "0.03em" }}
        >
          {active === "Todos" ? "✦ Toda la carta" : `✦ ${active}`} · {filtered.length} {filtered.length === 1 ? "opción" : "opciones"}
        </motion.p>

        <motion.div
          layout
          style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.9rem" }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <ProductCard
                key={`${item.categoria}-${item.nombre}`}
                product={item}
                index={i}
                onClick={setSelected}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "4rem 0", color: "#E0D5CE" }}>
            <p className="font-display" style={{ fontSize: "1.4rem", fontStyle: "italic" }}>Nada por aquí todavía…</p>
          </div>
        )}
      </main>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer style={{ textAlign: "center", padding: "2.2rem 1rem 3rem", borderTop: "1px solid #FBE8EC" }}>
        <p className="font-display" style={{ fontSize: "1.1rem", fontStyle: "italic", color: "var(--pink-deep)", marginBottom: "0.4rem" }}>
          gracias por venir ♡
        </p>
        <p style={{ fontSize: "0.72rem", color: "#D8CCC5", letterSpacing: "0.05em" }}>
          NÓMADA CAFÉ · precios en ARS · IVA incluido
        </p>
        <p style={{ fontSize: "0.68rem", color: "#E8DFDA", marginTop: "0.5rem" }}>
          Menú digital por Pyrion Agency
        </p>
      </footer>

      {/* ── MODAL ────────────────────────────────────────── */}
      <AnimatePresence>
        {selected && (
          <ProductModal product={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
