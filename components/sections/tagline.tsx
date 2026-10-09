import { WordReveal } from "@/components/word-reveal";

export function Tagline() {
  return (
    <section className="flex justify-center px-4 py-24 sm:py-32">
      <div className="max-w-[680px]">
        <WordReveal
          text="Nothing on these walls was bought for decoration. Every scarf, every can, every flag arrived with someone who meant to come back."
          className="text-center text-4xl leading-tight font-semibold tracking-tight text-foreground sm:text-5xl sm:leading-[1.15]"
        />
      </div>
    </section>
  );
}
