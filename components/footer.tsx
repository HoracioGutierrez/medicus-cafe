import { InstagramLogo } from "@phosphor-icons/react/dist/ssr";

export function Footer() {
  return (
    <footer className="border-t border-border px-4 py-12">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:justify-between sm:text-left">
        <div>
          <p className="font-script text-2xl leading-none text-gold">Medicus</p>
          <p className="mt-2 text-sm text-foreground-faint">
            Av. Corrientes 4821, Chacarita, Buenos Aires
          </p>
          <p className="mt-1 text-sm text-foreground-faint">
            Tue–Sun, 7:00 to 00:30 · Closed Mondays
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 sm:items-end">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Medicus Café on Instagram"
            className="flex items-center gap-2 text-sm text-foreground-muted transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-foreground"
          >
            <InstagramLogo size={18} />
            @medicuscafe
          </a>
          <div className="flex gap-4 text-xs text-foreground-faint">
            <a href="/privacy" className="hover:text-foreground-muted">
              Privacy policy
            </a>
            <a href="/terms" className="hover:text-foreground-muted">
              Terms
            </a>
          </div>
          <p className="text-xs text-foreground-faint">© 1962–2026 Medicus Café</p>
        </div>
      </div>
    </footer>
  );
}
