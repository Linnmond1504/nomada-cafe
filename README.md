# ☕ Nómada Café — Menú Digital

Menú digital dinámico para cafeterías modernas. Construido con **Next.js 14**, **Tailwind CSS**, **Framer Motion** y **Google Sheets** como CMS.

---

## 🚀 Setup en 5 pasos

### 1. Instalar dependencias
```bash
npm install
```

### 2. Preparar Google Sheets

Creá una hoja con estas columnas **en este orden exacto**:

| categoria | nombre | descripcion | precio | disponible | imagen_url | destacado |
|-----------|--------|-------------|--------|------------|------------|-----------|
| Cafés | Espresso | Descripción... | 1800 | si | (url o vacío) | no |
| Tostados | Club | Descripción... | 3500 | si | | si |

**Publicar como CSV:** Archivo → Compartir → Publicar en la web → CSV

### 3. Variables de entorno
```bash
cp .env.example .env.local
# Editá .env.local con el ID de tu Sheet
```

### 4. Desarrollo
```bash
npm run dev
```

### 5. Deploy en Vercel
```bash
vercel
vercel env add GOOGLE_SHEET_ID
```

---

## 📋 Columnas de Google Sheets

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `categoria` | Texto | Ej: Cafés, Tostados, Postres |
| `nombre` | Texto | Nombre del producto |
| `descripcion` | Texto | Aparece en el modal al tocar la card |
| `precio` | Número | Sin $, sin puntos (ej: 1800) |
| `disponible` | si/no | "no" lo oculta del menú |
| `imagen_url` | URL | Puede quedar vacío |
| `destacado` | si/no | Muestra badge "Top" en la card |

---

## 🎨 Stack

- **Next.js 14** · App Router + ISR (revalidate cada 60s)
- **Tailwind CSS** · design tokens oscuros
- **Framer Motion** · animaciones de cards y modal
- **Google Sheets** · CMS via CSV público
- **Vercel** · deploy

---

Construido por **Pyrion Agency**
