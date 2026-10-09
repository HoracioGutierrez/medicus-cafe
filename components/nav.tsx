"use client";

import { useEffect, useState } from "react";
import { List, X } from "@phosphor-icons/react";

const LINKS = [
  { href: "#visit", label: "Visiting" },
  { href: "#proof", label: "Regulars" },
  { href: "#faq", label: "FAQ" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="relative z-50 border-b border-border/60">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-4 sm:px-6">
        <a href="#main-content" className="flex items-baseline gap-2 leading-none">
          <span className="font-script text-3xl text-gold">Medicus</span>
          <span className="text-xs font-medium tracking-[0.2em] text-foreground-faint uppercase">
            Café
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground-muted transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-foreground md:hidden"
          >
            <List
              size={20}
              weight="bold"
              className={`absolute transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                open ? "rotate-45 opacity-0" : "rotate-0 opacity-100"
              }`}
            />
            <X
              size={20}
              weight="bold"
              className={`absolute transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                open ? "rotate-0 opacity-100" : "-rotate-45 opacity-0"
              }`}
            />
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-black/80 backdrop-blur-3xl transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {LINKS.map((link, index) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            style={{ transitionDelay: open ? `${100 + index * 50}ms` : "0ms" }}
            className={`text-2xl font-semibold text-foreground transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
              open ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#reserve"
          onClick={() => setOpen(false)}
          style={{ transitionDelay: open ? `${100 + LINKS.length * 50}ms` : "0ms" }}
          className={`rounded-full bg-ember px-6 py-3 text-lg font-semibold text-foreground transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            open ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          Reserve a table
        </a>
      </div>
    </header>
  );
}
