import type { Metadata } from "next";
import { Playfair_Display, Manrope, Geist_Mono, Pinyon_Script } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pinyonScript = Pinyon_Script({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Medicus Café — Classic Buenos Aires Bar & Coffee Shop Since 1962",
  description:
    "An old corner bar in Chacarita where football pennants cover the ceiling and a wall of cans tells sixty years of regulars' stories. Coffee by morning, cold drinks by night.",
  openGraph: {
    title: "Medicus Café — Classic Buenos Aires Bar & Coffee Shop Since 1962",
    description:
      "An old corner bar in Chacarita where football pennants cover the ceiling and a wall of cans tells sixty years of regulars' stories.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${manrope.variable} ${geistMono.variable} ${pinyonScript.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-ember focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-foreground"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
