import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Medicus — Un bar de siempre",
  description:
    "Un bar de barrio en Buenos Aires donde las bufandas y los banderines cuelgan del techo y la pared de latas cuenta sesenta años de historias de parroquianos.",
  openGraph: {
    title: "Medicus — Un bar de siempre",
    description:
      "Un bar de barrio en Buenos Aires donde las bufandas y los banderines cuelgan del techo y la pared de latas cuenta sesenta años de historias de parroquianos.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
