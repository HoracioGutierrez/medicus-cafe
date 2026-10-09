import Image from "next/image";
import { Reveal } from "@/components/reveal";

export function FinalCta() {
  return (
    <section id="reserve" className="relative overflow-hidden px-4 py-32 sm:py-40">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.1]"
          style={{
            maskImage:
              "radial-gradient(ellipse 75% 70% at 50% 45%, black 0%, transparent 78%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 75% 70% at 50% 45%, black 0%, transparent 78%)",
          }}
        >
          <Image
            src="/images/can-wall-closeup.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 gap-12 lg:grid-cols-12 lg:items-end lg:gap-16">
        <Reveal className="lg:col-span-7">
          <h2 className="max-w-[560px] text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
            Come add your own can to the shelf
          </h2>
          <p className="mt-6 max-w-[48ch] text-lg leading-8 text-foreground-muted">
            Tables are first come most nights. Reserve ahead for a party of
            five or more, or just walk in and we'll find you a seat by the
            fridge wall.
          </p>
          <a
            href="mailto:hola@medicuscafe.example?subject=Reserva%20de%20mesa"
            className="mt-8 inline-block rounded-full bg-ember px-6 py-3 text-base font-semibold text-foreground transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.03] hover:bg-ember-bright active:scale-[0.98]"
          >
            Reserve a table
          </a>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-5">
          <div className="border-t border-border pt-6">
            <span className="font-serif text-lg text-gold italic">Reservations</span>
            <p className="mt-4 max-w-[36ch] text-base leading-7 text-foreground-muted">
              Call ahead for parties of five or more. Smaller groups are
              always welcome to walk in.
            </p>
            <div className="mt-5 flex flex-col gap-1.5">
              <a
                href="tel:+541147891928"
                className="text-base font-medium text-foreground transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-foreground-muted"
              >
                +54 11 4789 1928
              </a>
              <a
                href="mailto:hola@medicuscafe.example"
                className="text-base font-medium text-foreground transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-foreground-muted"
              >
                hola@medicuscafe.example
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
