import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/reveal";

const FAQS = [
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
    question: "Can I bring a can to add to the shelf?",
    answer:
      "Always. Hand it to whoever's behind the counter and tell them where it's from. We've added eleven this year, each with a story written on the back of a receipt.",
  },
  {
    question: "Do you show football matches?",
    answer:
      "River and the local club's matches go on the back wall TV. We don't take sides on the scarves, but we do turn the volume up.",
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
];

export function Faq() {
  return (
    <section id="faq" className="px-4 py-28 sm:py-36">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <h2 className="max-w-[560px] text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            Questions before you come by
          </h2>
        </Reveal>

        <div className="mt-14 divide-y divide-border border-t border-border">
          {FAQS.map((faq, index) => (
            <Reveal key={faq.question} delay={Math.min(index * 0.04, 0.2)}>
              <details className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium text-foreground outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                  {faq.question}
                  <CaretDown
                    size={18}
                    className="shrink-0 text-foreground-faint transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-open:rotate-180"
                  />
                </summary>
                <p className="mt-3 max-w-[60ch] text-sm leading-6 text-foreground-muted">
                  {faq.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
