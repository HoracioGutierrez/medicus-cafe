import { Reveal } from "@/components/reveal";

export function FinalCta() {
  return (
    <section id="reserve" className="px-4 py-20 sm:py-28">
      <Reveal>
        <div className="bg-grain relative mx-auto flex max-w-4xl flex-col items-center overflow-hidden rounded-2xl border border-border bg-background-raised px-6 py-16 text-center sm:px-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(232,182,74,0.14), transparent 70%)",
            }}
          />
          <h2 className="relative max-w-[680px] text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Come add your own can to the shelf
          </h2>
          <p className="relative mt-4 max-w-[680px] text-lg leading-8 text-foreground-muted">
            Tables are first come most nights. Reserve ahead for a party of
            five or more, or just walk in and we'll find you a seat by the
            fridge wall.
          </p>
          <div className="relative mt-8 flex flex-col items-center gap-4 sm:flex-row">
            <a
              href="mailto:hola@medicuscafe.example?subject=Reserva%20de%20mesa"
              className="rounded-full bg-ember px-5 py-3 text-base font-semibold text-foreground transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.03] hover:bg-ember-bright active:scale-[0.98]"
            >
              Reserve a table
            </a>
            <a
              href="tel:+541147891928"
              className="rounded-full border border-border px-5 py-3 text-base font-semibold text-foreground-muted transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-foreground-faint hover:text-foreground"
            >
              +54 11 4789 1928
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
