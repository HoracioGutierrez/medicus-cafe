import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "No está en la estantería — Medicus",
};

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="relative z-[3] flex min-h-dvh flex-col items-start justify-center px-[5vw] py-28 max-[760px]:p-5"
    >
      <p className="mb-4 font-mono text-[0.66rem] tracking-[0.08em] uppercase opacity-60">
        Error 404
      </p>
      <h1 className="display display--error">
        NO ESTÁ
        <br />
        EN <span className="text-glow">LA ESTANTERÍA</span>
      </h1>
      <p className="mt-6 mb-8 max-w-lg">
        Esta lata no está donde la dejamos. Puede que se haya movido de
        estante, o que nunca haya estado ahí.
      </p>
      <Link
        href="/"
        className="border-b border-clay pb-[0.2rem] font-mono text-[0.8rem] tracking-[0.08em] text-ink uppercase no-underline transition-colors duration-[220ms] ease-brand hover:text-clay hover:border-acid focus-visible:text-clay focus-visible:border-acid focus-visible:outline-none"
      >
        Volvé al mostrador
      </Link>
    </main>
  );
}
