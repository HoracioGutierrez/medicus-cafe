import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/sections/hero";
import { Tagline } from "@/components/sections/tagline";
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
            <div className="mix-blend-screen absolute top-[0%] left-[-14%] h-[640px] w-[640px] rounded-full bg-ember/35 blur-[110px]" />
            <div className="mix-blend-screen absolute top-[24%] right-[-16%] h-[720px] w-[720px] rounded-full bg-gold/30 blur-[130px]" />
            <div className="mix-blend-screen absolute top-[50%] left-[-10%] h-[680px] w-[680px] rounded-full bg-amber/35 blur-[120px]" />
            <div className="mix-blend-screen absolute top-[74%] right-[-12%] h-[600px] w-[600px] rounded-full bg-ember/30 blur-[115px]" />
            <div className="mix-blend-screen absolute top-[96%] left-[12%] h-[560px] w-[560px] rounded-full bg-gold/25 blur-[120px]" />
          </div>

          <Tagline />
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
