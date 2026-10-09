"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { AnimatePresence, motion } from "framer-motion";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import * as THREE from "three";
import { CanScene } from "./can-scene";
import { cans, CAN_CENTER_INDEX } from "@/lib/cans-data";

const EASE = [0.32, 0.72, 0, 1] as const;
const PIXELS_PER_INDEX = 150;
const AUTOPLAY_DELAY = 4200;
const CLICK_THRESHOLD = 6;
const MOMENTUM_PROJECTION_MS = 140;
const MAX_VELOCITY = 2.2;

type DragState = {
  startX: number;
  startOffset: number;
  lastX: number;
  lastTime: number;
  velocity: number;
};

export function CanCarousel() {
  const [focusIndex, setFocusIndex] = useState(CAN_CENTER_INDEX);
  const offsetRef = useRef(CAN_CENTER_INDEX);
  const isDraggingRef = useRef(false);
  const dragState = useRef<DragState | null>(null);
  const autoplayTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((index: number) => {
    setFocusIndex(Math.max(0, Math.min(cans.length - 1, index)));
  }, []);

  const scheduleAutoplay = useCallback(() => {
    if (autoplayTimer.current) clearTimeout(autoplayTimer.current);
    autoplayTimer.current = setTimeout(() => {
      setFocusIndex((i) => (i >= cans.length - 1 ? 0 : i + 1));
    }, AUTOPLAY_DELAY);
  }, []);

  useEffect(() => {
    scheduleAutoplay();
    return () => {
      if (autoplayTimer.current) clearTimeout(autoplayTimer.current);
    };
  }, [focusIndex, scheduleAutoplay]);

  const handlePointerDown = useCallback((event: React.PointerEvent) => {
    if (autoplayTimer.current) clearTimeout(autoplayTimer.current);
    isDraggingRef.current = true;
    dragState.current = {
      startX: event.clientX,
      startOffset: offsetRef.current,
      lastX: event.clientX,
      lastTime: performance.now(),
      velocity: 0,
    };
    (event.target as Element).setPointerCapture?.(event.pointerId);
  }, []);

  const handlePointerMove = useCallback((event: React.PointerEvent) => {
    const drag = dragState.current;
    if (!drag || !isDraggingRef.current) return;

    const now = performance.now();
    const dt = Math.max(now - drag.lastTime, 1);
    drag.velocity = (event.clientX - drag.lastX) / dt;
    drag.lastX = event.clientX;
    drag.lastTime = now;

    const totalDeltaX = event.clientX - drag.startX;
    const liveOffset = drag.startOffset - totalDeltaX / PIXELS_PER_INDEX;
    offsetRef.current = THREE.MathUtils.clamp(liveOffset, 0, cans.length - 1);
  }, []);

  const handlePointerUp = useCallback(
    (event: React.PointerEvent) => {
      const drag = dragState.current;
      dragState.current = null;
      if (!drag) return;

      const totalDeltaX = event.clientX - drag.startX;

      if (Math.abs(totalDeltaX) < CLICK_THRESHOLD) {
        isDraggingRef.current = false;
        scheduleAutoplay();
        return;
      }

      const clampedVelocity = THREE.MathUtils.clamp(drag.velocity, -MAX_VELOCITY, MAX_VELOCITY);
      const projected =
        offsetRef.current - (clampedVelocity * MOMENTUM_PROJECTION_MS) / PIXELS_PER_INDEX;
      const nearest = Math.round(
        THREE.MathUtils.clamp(projected, 0, cans.length - 1),
      );

      isDraggingRef.current = false;
      goTo(nearest);
    },
    [goTo, scheduleAutoplay],
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
        className="relative h-[420px] w-full cursor-grab touch-pan-y select-none outline-none active:cursor-grabbing sm:h-[500px] lg:h-[580px]"
      >
        <Canvas
          camera={{ position: [0, 0.15, 7.8], fov: 40 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <CanScene
            focusIndex={focusIndex}
            offsetRef={offsetRef}
            isDraggingRef={isDraggingRef}
            onSelect={goTo}
          />
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
