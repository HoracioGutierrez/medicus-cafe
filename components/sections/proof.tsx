import { Reveal } from "@/components/reveal";

const FEATURED = {
  quote:
    "I added a can from a trip to Korea in 2018. It's still up there, third shelf, next to a Fanta from Brazil.",
  name: "Diego Oyarzábal",
  detail: "Brought a can back from Seoul",
};

const OTHERS = [
  {
    quote:
      "I've sat at the same table under the Napoli pennant for fifteen years. The owner still brings my coffee before I ask.",
    name: "Marisol Etcheverry",
    detail: "Regular since 2009",
  },
  {
    quote:
      "Nobody blinks when six of us take over a table for three hours with one round of coffee between us.",
    name: "Lucía Fernández Pardo",
    detail: "Hosts her book club here monthly",
  },
];

export function Proof() {
  return (
    <section id="proof" className="px-4 py-28 sm:py-36">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <h2 className="max-w-[560px] text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            Told by the regulars
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <div className="border-l-2 border-ember pl-6 sm:pl-8">
              <p className="font-serif text-2xl leading-snug text-foreground italic sm:text-3xl">
                "{FEATURED.quote}"
              </p>
              <p className="mt-6 text-sm font-medium text-foreground">
                {FEATURED.name}
                <span className="ml-2 font-sans font-normal text-foreground-faint">
                  {FEATURED.detail}
                </span>
              </p>
            </div>
          </Reveal>

          <div className="flex flex-col gap-10 lg:col-span-5">
            {OTHERS.map((testimonial, index) => (
              <Reveal key={testimonial.name} delay={0.1 + index * 0.08}>
                <div className="border-t border-border pt-6">
                  <p className="text-base leading-7 text-foreground-muted">
                    "{testimonial.quote}"
                  </p>
                  <p className="mt-4 text-sm font-medium text-foreground">
                    {testimonial.name}
                    <span className="ml-2 font-normal text-foreground-faint">
                      {testimonial.detail}
                    </span>
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
