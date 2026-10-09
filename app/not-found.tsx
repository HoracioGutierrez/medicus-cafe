import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-32 text-center">
      <span className="font-mono text-sm text-gold">404</span>
      <h1 className="mt-4 max-w-md text-3xl font-semibold text-foreground sm:text-4xl">
        This shelf is empty.
      </h1>
      <p className="mt-3 max-w-sm text-foreground-muted">
        Whatever you were looking for isn't on this wall. Head back and try
        another table.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-ember px-5 py-3 text-base font-semibold text-foreground transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.03] hover:bg-ember-bright active:scale-[0.98]"
      >
        Back to Medicus Café
      </Link>
    </main>
  );
}
