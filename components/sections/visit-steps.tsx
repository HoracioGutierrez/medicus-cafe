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
    <section id="visit" className="px-4 py-28 sm:py-36">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <h2 className="max-w-[560px] text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            What a visit looks like
          </h2>
        </Reveal>

        <div className="mt-16 divide-y divide-border">
          {STEPS.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.08}>
              <div className="flex flex-col gap-3 py-10 sm:flex-row sm:items-start sm:gap-10">
                <span className="font-serif text-6xl leading-none text-foreground/10 italic sm:text-7xl">
                  {step.number}
                </span>
                <div className="sm:pt-2">
                  <h3 className="text-xl font-medium text-foreground">{step.title}</h3>
                  <p className="mt-2 max-w-[54ch] text-base leading-7 text-foreground-muted">
                    {step.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
