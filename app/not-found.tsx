import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "No está en la estantería — Medicus",
};

export default function NotFound() {
  return (
    <main id="main-content" className="error-page">
      <p className="error-page__eyebrow">Error 404</p>
      <h1 className="display display--error">
        NO ESTÁ
        <br />
        EN <span className="text-clay">LA ESTANTERÍA</span>
      </h1>
      <p className="error-page__copy">
        Esta lata no está donde la dejamos. Puede que se haya movido de
        estante, o que nunca haya estado ahí.
      </p>
      <Link href="/" className="error-page__cta">
        Volvé al mostrador
      </Link>
    </main>
  );
}
