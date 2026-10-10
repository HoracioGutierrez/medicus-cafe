import type { Metadata } from "next";
import "./globals.css";

const title = "Medicus — Un bar de siempre";
const description =
  "Un bar de barrio en Buenos Aires donde las bufandas y los banderines cuelgan del techo y la pared de latas cuenta sesenta años de historias de parroquianos.";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
