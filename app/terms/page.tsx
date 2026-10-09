import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms — Medicus Café",
  description: "Reservation and visit terms for Medicus Café.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-32">
      <Link href="/" className="text-sm text-foreground-muted hover:text-foreground">
        ← Back home
      </Link>
      <h1 className="mt-6 text-3xl font-semibold text-foreground">Terms</h1>
      <div className="mt-6 space-y-4 text-sm leading-6 text-foreground-muted">
        <p>
          Reservations are held for fifteen minutes past the booked time.
          After that, the table may be released to walk-ins.
        </p>
        <p>
          Private room bookings require a deposit, refundable up to
          forty-eight hours before the event.
        </p>
      </div>
    </main>
  );
}
