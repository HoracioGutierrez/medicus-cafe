import { Reveal } from "@/components/reveal";

const TESTIMONIALS = [
  {
    name: "Marisol Etcheverry",
    detail: "Regular since 2009",
    quote:
      "I've sat at the same table under the Napoli pennant for fifteen years. The owner still brings my coffee before I ask.",
    initials: "ME",
    color: "#b23a2e",
  },
  {
    name: "Diego Oyarzábal",
    detail: "Brought a can back from Seoul",
    quote:
      "I added a can from a trip to Korea in 2018. It's still up there, third shelf, next to a Fanta from somewhere in Brazil.",
    initials: "DO",
    color: "#d97736",
  },
  {
    name: "Lucía Fernández Pardo",
    detail: "Hosts her book club here monthly",
    quote:
      "Nobody blinks when six of us take over a table for three hours with one round of coffee between us.",
    initials: "LF",
    color: "#5a3a26",
  },
];

export function Proof() {
  return (
    <section id="proof" className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <h2 className="max-w-[680px] text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Told by the regulars
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 0.08}>
              <figure className="flex h-full flex-col rounded-2xl border border-border bg-background-raised p-6">
                <blockquote className="flex-1 text-sm leading-6 text-foreground-muted">
                  "{testimonial.quote}"
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span
                    aria-hidden
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-foreground"
                    style={{ backgroundColor: testimonial.color }}
                  >
                    {testimonial.initials}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-foreground">
                      {testimonial.name}
                    </span>
                    <span className="block text-xs text-foreground-faint">{testimonial.detail}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
