import { Archive, SoccerBall, Coffee, PictureInPicture } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/reveal";

const BENEFITS = [
  {
    icon: Archive,
    title: "A genuine wall of history",
    body: "Over four thousand cans and bottles collected from regulars and travelers since the seventies. No two shelves are alike, and nothing gets thrown out.",
  },
  {
    icon: SoccerBall,
    title: "Football without the noise",
    body: "Scarves and pennants from clubs across six leagues, hung by the patrons who brought them. We just kept finding more wall.",
  },
  {
    icon: Coffee,
    title: "Coffee and a cold one, same counter",
    body: "Espresso in the morning, a Cerveza del Barrio by six, and nobody rushes you out either way.",
  },
  {
    icon: PictureInPicture,
    title: "A table that's been warm for decades",
    body: "Worn wood tables seat regulars and first timers side by side, the way they have since 1962.",
  },
];

export function Benefits() {
  return (
    <section id="benefits" className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <h2 className="max-w-[680px] text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            What's actually on the shelf
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {BENEFITS.map((benefit, index) => (
            <Reveal key={benefit.title} delay={index * 0.08}>
              <div className="h-full rounded-2xl border border-border bg-background-raised p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-umber-deep text-gold">
                  <benefit.icon size={22} weight="duotone" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-6 text-foreground-muted">{benefit.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
