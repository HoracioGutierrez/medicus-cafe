"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { AnimatePresence, motion } from "framer-motion";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { CanScene } from "./can-scene";
import { cans, CAN_CENTER_INDEX } from "@/lib/cans-data";

const EASE = [0.32, 0.72, 0, 1] as const;

export function CanCarousel() {
  const [focusIndex, setFocusIndex] = useState(CAN_CENTER_INDEX);
  const offsetRef = useRef(CAN_CENTER_INDEX);
  const dragState = useRef<{ startX: number; dragging: boolean } | null>(null);

  const goTo = useCallback((index: number) => {
    setFocusIndex(Math.max(0, Math.min(cans.length - 1, index)));
  }, []);

  const handlePointerDown = useCallback((event: React.PointerEvent) => {
    dragState.current = { startX: event.clientX, dragging: true };
    (event.target as Element).setPointerCapture?.(event.pointerId);
  }, []);

  const handlePointerMove = useCallback(() => {
    // Live visual feedback is handled by the damped spring in CanScene;
    // precise index change happens on release for predictable snapping.
  }, []);

  const handlePointerUp = useCallback(
    (event: React.PointerEvent) => {
      const drag = dragState.current;
      if (!drag) return;
      const deltaX = event.clientX - drag.startX;
      dragState.current = null;
      if (Math.abs(deltaX) < 40) return;
      goTo(focusIndex + (deltaX < 0 ? 1 : -1));
    },
    [focusIndex, goTo],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "ArrowRight") goTo(focusIndex + 1);
      if (event.key === "ArrowLeft") goTo(focusIndex - 1);
    },
    [focusIndex, goTo],
  );

  const current = useMemo(() => cans[focusIndex], [focusIndex]);

  return (
    <div className="flex w-full flex-col items-center">
      <div
        role="group"
        aria-label="Can collection carousel"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="relative h-[360px] w-full cursor-grab touch-pan-y select-none outline-none active:cursor-grabbing sm:h-[440px] lg:h-[480px]"
      >
        <Canvas
          camera={{ position: [0, 0.15, 7.2], fov: 40 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <CanScene focusIndex={focusIndex} offsetRef={offsetRef} onSelect={goTo} />
        </Canvas>

        <button
          type="button"
          onClick={() => goTo(focusIndex - 1)}
          disabled={focusIndex === 0}
          aria-label="Previous can"
          className="absolute top-1/2 left-0 -translate-y-1/2 rounded-full p-2 text-foreground-faint/70 opacity-60 backdrop-blur-sm transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-background-raised/50 hover:text-foreground hover:opacity-100 active:scale-90 disabled:opacity-0"
        >
          <CaretLeft size={18} weight="regular" />
        </button>
        <button
          type="button"
          onClick={() => goTo(focusIndex + 1)}
          disabled={focusIndex === cans.length - 1}
          aria-label="Next can"
          className="absolute top-1/2 right-0 -translate-y-1/2 rounded-full p-2 text-foreground-faint/70 opacity-60 backdrop-blur-sm transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-background-raised/50 hover:text-foreground hover:opacity-100 active:scale-90 disabled:opacity-0"
        >
          <CaretRight size={18} weight="regular" />
        </button>
      </div>

      <div className="mt-2 flex items-center gap-1.5">
        {cans.map((can, index) => (
          <button
            key={can.id}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Go to ${can.name}`}
            aria-current={index === focusIndex}
            className={`h-1.5 rounded-full transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
              index === focusIndex ? "w-6 bg-ember-bright" : "w-1.5 bg-border hover:bg-foreground-faint"
            }`}
          />
        ))}
      </div>

      <div className="mt-6 h-[108px] w-full max-w-md px-4 text-center sm:h-[92px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <p className="font-serif text-xl font-medium text-foreground">
              {current.name}{" "}
              <span className="font-mono text-sm font-normal text-gold">{current.era}</span>
            </p>
            <p className="mt-1.5 text-sm leading-6 text-foreground-muted">
              {current.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
