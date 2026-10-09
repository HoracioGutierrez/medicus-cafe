import { Reveal } from "@/components/reveal";

export function FinalCta() {
  return (
    <section id="reserve" className="px-4 py-32 sm:py-40">
      <Reveal>
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <p className="font-serif text-6xl leading-none text-foreground/10 italic sm:text-7xl">
            "
          </p>
          <h2 className="-mt-6 text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
            Come add your own can to the shelf
          </h2>
          <p className="mt-6 max-w-[48ch] text-lg leading-8 text-foreground-muted">
            Tables are first come most nights. Reserve ahead for a party of
            five or more, or just walk in and we'll find you a seat by the
            fridge wall.
          </p>
          <div className="mt-10 flex flex-col items-center gap-5 sm:flex-row">
            <a
              href="mailto:hola@medicuscafe.example?subject=Reserva%20de%20mesa"
              className="rounded-full bg-ember px-6 py-3 text-base font-semibold text-foreground transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.03] hover:bg-ember-bright active:scale-[0.98]"
            >
              Reserve a table
            </a>
            <a
              href="tel:+541147891928"
              className="text-base font-medium text-foreground-muted underline decoration-border underline-offset-4 transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-foreground hover:decoration-foreground-faint"
            >
              +54 11 4789 1928
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
