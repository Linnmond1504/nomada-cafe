import "./globals.css";

export const metadata = {
  title: "Nómada Café",
  description: "Menú digital — café de especialidad, repostería y más.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
