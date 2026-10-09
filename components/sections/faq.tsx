import { Reveal } from "@/components/reveal";

const GROUPS = [
  {
    label: "Hours & tables",
    items: [
      {
        question: "Do you take reservations?",
        answer:
          "For parties of five or more, yes, call ahead or use the reserve link. Smaller groups are first come, first seated, usually within ten minutes even on a Friday.",
      },
      {
        question: "Is it kid friendly?",
        answer:
          "Afternoons, very. We get strollers between the tables until about seven, when the counter fills up with regulars watching whatever match is on.",
      },
      {
        question: "What are your hours?",
        answer:
          "Seven in the morning to half past midnight, Tuesday through Sunday. Closed Mondays, same as it's been since the eighties.",
      },
      {
        question: "Is there parking nearby?",
        answer:
          "Street parking on Av. Corrientes runs free after eight, or there's a lot two doors down that charges by the half hour.",
      },
    ],
  },
  {
    label: "The shelf",
    items: [
      {
        question: "Can I bring a can to add to the shelf?",
        answer:
          "Always. Hand it to whoever's behind the counter and tell them where it's from. We've added eleven this year, each with a story written on the back of a receipt.",
      },
      {
        question: "Do you show football matches?",
        answer:
          "River and the local club's matches go on the back wall TV. We don't take sides on the scarves, but we do turn the volume up.",
      },
    ],
  },
  {
    label: "Events & payment",
    items: [
      {
        question: "Can I book the back room for a private event?",
        answer:
          "Yes, it seats up to eighteen. We've hosted birthdays, a few retirement lunches, and one very loud trivia night.",
      },
      {
        question: "Cards or cash only?",
        answer:
          "Both, plus the usual mobile wallets. The till still rings like 1962, but the card reader works fine.",
      },
    ],
  },
];

export function Faq() {
  return (
    <section id="faq" className="px-4 py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <h2 className="max-w-[560px] text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            Questions before you come by
          </h2>
        </Reveal>

        <div className="mt-16 flex flex-col gap-16">
          {GROUPS.map((group, groupIndex) => (
            <Reveal key={group.label} delay={groupIndex * 0.08}>
              <div className="border-t border-border pt-6">
                <span className="font-serif text-lg text-gold italic">{group.label}</span>
                <div className="mt-6 grid grid-cols-1 gap-x-16 gap-y-10 md:grid-cols-2">
                  {group.items.map((item) => (
                    <div key={item.question}>
                      <h3 className="text-base font-medium text-foreground">
                        {item.question}
                      </h3>
                      <p className="mt-2 max-w-[48ch] text-sm leading-6 text-foreground-muted">
                        {item.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
