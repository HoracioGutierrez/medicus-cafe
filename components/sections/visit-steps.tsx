"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "@/components/reveal";

const EASE = [0.32, 0.72, 0, 1] as const;

const STEPS = [
  {
    number: "01",
    title: "Grab a table by the window or the fridge wall",
    body: "The red fridge runs espresso cups and tonic, the blue one's for anything with a cap. Sit wherever the view suits you.",
    image: "/images/visit-corner.jpg",
    rotate: -3,
    x: -14,
    y: 10,
  },
  {
    number: "02",
    title: "Order from the counter, remembered by your second visit",
    body: "No table service rush. Walk up, point at a can if you don't know the name yet, and we'll start a tab.",
    image: "/images/medicus-interior.jpg",
    rotate: 2,
    x: 18,
    y: -8,
  },
  {
    number: "03",
    title: "Stay as long as the conversation runs",
    body: "Nobody's turning the table. Some regulars have been at theirs since the ceiling fan was the only fan.",
    image: "/images/visit-room.jpg",
    rotate: -5,
    x: -8,
    y: 20,
  },
];

export function VisitSteps() {
  const [active, setActive] = useState(0);

  return (
    <section id="visit" className="px-4 py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <h2 className="max-w-[560px] text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            What a visit looks like
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="divide-y divide-border lg:col-span-6">
            {STEPS.map((step, index) => (
              <Reveal key={step.number} delay={index * 0.08}>
                <div
                  tabIndex={0}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  className="flex cursor-default flex-col gap-3 rounded-sm py-10 outline-none sm:flex-row sm:items-start sm:gap-10 focus-visible:ring-2 focus-visible:ring-gold/50"
                >
                  <span
                    className={`font-serif text-6xl leading-none italic transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] sm:text-7xl ${
                      active === index ? "text-ember/50" : "text-foreground/10"
                    }`}
                  >
                    {step.number}
                  </span>
                  <div className="sm:pt-2">
                    <h3
                      className={`text-xl font-medium transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                        active === index ? "text-foreground" : "text-foreground/70"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-[54ch] text-base leading-7 text-foreground-muted">
                      {step.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="lg:col-span-6">
            <div className="relative h-[420px] sm:h-[480px] lg:h-[560px]">
              {STEPS.map((step, index) => {
                const isActive = active === index;
                return (
                  <motion.div
                    key={step.image}
                    className="absolute inset-8 overflow-hidden shadow-[0_30px_60px_-25px_rgba(0,0,0,0.6)]"
                    initial={false}
                    animate={{
                      rotate: isActive ? 0 : step.rotate,
                      x: isActive ? 0 : step.x,
                      y: isActive ? 0 : step.y,
                      scale: isActive ? 1 : 0.92,
                      opacity: isActive ? 1 : 0.4,
                    }}
                    style={{ zIndex: isActive ? 30 : 10 + index }}
                    transition={{ duration: 0.8, ease: EASE }}
                  >
                    <Image
                      src={step.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 40vw, 90vw"
                      className="object-cover"
                    />
                  </motion.div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
