"use client";

import { useEffect, useRef } from "react";

export function WordReveal({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const words = Array.from(container.querySelectorAll<HTMLSpanElement>("[data-word]"));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100");
            entry.target.classList.remove("opacity-30");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -40% 0px", threshold: 0 },
    );

    words.forEach((word) => observer.observe(word));
    return () => observer.disconnect();
  }, []);

  return (
    <p ref={containerRef} className={className}>
      {text.split(" ").map((word, index) => (
        <span
          key={`${word}-${index}`}
          data-word
          className="inline-block opacity-30 transition-opacity duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
          style={{ transitionDelay: `${(index % 6) * 40}ms` }}
        >
          {word}
          {index < text.split(" ").length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
