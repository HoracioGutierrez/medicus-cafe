import { Reveal } from "@/components/reveal";

const STEPS = [
  {
    number: "01",
    title: "Grab a table by the window or the fridge wall",
    body: "The red fridge runs espresso cups and tonic, the blue one's for anything with a cap. Sit wherever the view suits you.",
  },
  {
    number: "02",
    title: "Order from the counter, remembered by your second visit",
    body: "No table service rush. Walk up, point at a can if you don't know the name yet, and we'll start a tab.",
  },
  {
    number: "03",
    title: "Stay as long as the conversation runs",
    body: "Nobody's turning the table. Some regulars have been at theirs since the ceiling fan was the only fan.",
  },
];

export function VisitSteps() {
  return (
    <section id="visit" className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <h2 className="max-w-[680px] text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            What a visit looks like
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {STEPS.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.1}>
              <div className="h-full rounded-2xl border border-border p-6">
                <span className="font-mono text-sm text-amber">{step.number}</span>
                <h3 className="mt-3 text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-foreground-muted">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
