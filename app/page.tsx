import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/sections/hero";
import { Tagline } from "@/components/sections/tagline";
import { Benefits } from "@/components/sections/benefits";
import { VisitSteps } from "@/components/sections/visit-steps";
import { Proof } from "@/components/sections/proof";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Nav />
      <main id="main-content" className="flex flex-1 flex-col">
        <Hero />
        <div className="relative isolate">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          >
            <div className="absolute top-[2%] left-[-12%] h-[560px] w-[560px] rounded-full bg-ember/10 blur-[130px]" />
            <div className="absolute top-[26%] right-[-14%] h-[640px] w-[640px] rounded-full bg-gold/[0.08] blur-[150px]" />
            <div className="absolute top-[52%] left-[-8%] h-[600px] w-[600px] rounded-full bg-umber/[0.18] blur-[140px]" />
            <div className="absolute top-[76%] right-[-10%] h-[520px] w-[520px] rounded-full bg-amber/[0.09] blur-[130px]" />
            <div className="absolute top-[95%] left-[20%] h-[500px] w-[500px] rounded-full bg-ember/[0.07] blur-[140px]" />
          </div>

          <Tagline />
          <Benefits />
          <VisitSteps />
          <Proof />
          <Faq />
          <FinalCta />
        </div>
      </main>
      <Footer />
    </div>
  );
}
