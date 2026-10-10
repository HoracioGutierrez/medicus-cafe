"use client";

import { sodas, CAROUSEL_ORIGIN } from "@/lib/sodas";
import { useSodaShelfScene } from "./use-soda-shelf-scene";
import { SkipLink } from "./skip-link";
import { BootScreen } from "./boot-screen";
import { SiteHeader } from "./site-header";
import { CarouselControls } from "./carousel-controls";
import { ScrollProgress } from "./scroll-progress";
import { SiteFooter } from "./site-footer";
import { IntroSection } from "./sections/intro-section";
import { FocusSection } from "./sections/focus-section";
import { BurstSection } from "./sections/burst-section";
import { FinaleSection } from "./sections/finale-section";

export function SodaShelf() {
  useSodaShelfScene(sodas);

  return (
    <>
      <SkipLink />
      <BootScreen />
      <canvas className="webgl" />
      <SiteHeader />
      <CarouselControls initialSoda={sodas[CAROUSEL_ORIGIN]} />

      <main id="main-content">
        <IntroSection />
        <FocusSection />
        <BurstSection />
        <FinaleSection />
      </main>

      <ScrollProgress />
      <SiteFooter />
    </>
  );
}
