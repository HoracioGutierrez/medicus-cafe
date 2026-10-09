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
        <Tagline />
        <Benefits />
        <VisitSteps />
        <Proof />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
