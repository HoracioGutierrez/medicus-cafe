import Image from "next/image";
import { CanCarousel } from "@/components/three/can-carousel";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-45"
          style={{
            maskImage:
              "radial-gradient(ellipse 65% 60% at 28% 42%, black 0%, transparent 72%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 65% 60% at 28% 42%, black 0%, transparent 72%)",
          }}
        >
          <Image
            src="/images/can-wall-lamp.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-background/55" />
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:py-28">
        <div className="order-1 flex justify-center lg:justify-start">
          <CanCarousel />
        </div>

        <div className="order-2 flex flex-col items-start text-left">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-background-raised/60 px-3 py-1 font-mono text-xs font-medium text-foreground-muted">
            Chacarita, Buenos Aires · open since 1962
          </span>

          <h1
            className="text-5xl leading-[1.05] font-medium tracking-tight text-transparent sm:text-6xl lg:text-7xl"
            style={{
              backgroundImage: "linear-gradient(to right, #FFFFFF, #9B9B9B)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
            }}
          >
            Eighty years of cans, flags, and conversation.
          </h1>

          <p className="mt-6 max-w-[520px] text-lg leading-8 text-foreground-muted">
            Medicus Café has poured coffee and cold drinks from the same
            corner since 1962, under shelves stacked with a collection that
            keeps growing one can at a time.
          </p>

          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <a
              href="#reserve"
              className="rounded-full bg-ember px-5 py-3 text-base font-semibold text-foreground transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.03] hover:bg-ember-bright active:scale-[0.98]"
            >
              Reserve a table
            </a>
            <a
              href="#benefits"
              className="rounded-full border border-border px-5 py-3 text-base font-semibold text-foreground-muted transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-foreground-faint hover:text-foreground"
            >
              See the shelf
            </a>
          </div>

          <p className="mt-6 font-mono text-sm text-foreground-faint">
            4,312 cans on the shelf, added by regulars since 1962
          </p>
        </div>
      </div>
    </section>
  );
}
