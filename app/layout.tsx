import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Medicus — The Shelf",
  description:
    "An old corner bar where the wall of cans tells sixty years of regulars' stories.",
  openGraph: {
    title: "Medicus — The Shelf",
    description:
      "An old corner bar where the wall of cans tells sixty years of regulars' stories.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
