import { Reveal } from "@/components/reveal";

const BENEFITS = [
  {
    tag: "History",
    title: "A genuine wall of history",
    body: "Over four thousand cans and bottles collected from regulars and travelers since the seventies. No two shelves are alike, and nothing gets thrown out.",
    span: "lg:col-span-7",
    offset: "",
  },
  {
    tag: "Football",
    title: "Football without the noise",
    body: "Scarves and pennants from clubs across six leagues, hung by the patrons who brought them. We just kept finding more wall.",
    span: "lg:col-span-5",
    offset: "lg:mt-16",
  },
  {
    tag: "Counter",
    title: "Coffee and a cold one, same counter",
    body: "Espresso in the morning, a Cerveza del Barrio by six, and nobody rushes you out either way.",
    span: "lg:col-span-5",
    offset: "",
  },
  {
    tag: "Table",
    title: "A table that's been warm for decades",
    body: "Worn wood tables seat regulars and first timers side by side, the way they have since 1962.",
    span: "lg:col-span-7",
    offset: "lg:mt-16",
  },
];

export function Benefits() {
  return (
    <section id="benefits" className="px-4 py-28 sm:py-36">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <h2 className="max-w-[560px] text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            What's actually on the shelf
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-x-12 gap-y-14 lg:grid-cols-12">
          {BENEFITS.map((benefit, index) => (
            <Reveal
              key={benefit.title}
              delay={index * 0.08}
              className={`${benefit.span} ${benefit.offset}`}
            >
              <div className="border-t border-border pt-6">
                <span className="font-serif text-lg text-gold italic">{benefit.tag}</span>
                <h3 className="mt-3 text-xl font-medium text-foreground">{benefit.title}</h3>
                <p className="mt-3 max-w-[48ch] text-base leading-7 text-foreground-muted">
                  {benefit.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
