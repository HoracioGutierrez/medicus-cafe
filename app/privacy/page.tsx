import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy policy — Medicus Café",
  description: "How Medicus Café handles reservation and contact information.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-32">
      <Link href="/" className="text-sm text-foreground-muted hover:text-foreground">
        ← Back home
      </Link>
      <h1 className="mt-6 text-3xl font-semibold text-foreground">Privacy policy</h1>
      <div className="mt-6 space-y-4 text-sm leading-6 text-foreground-muted">
        <p>
          Medicus Café collects the contact details you provide when you
          reserve a table, by email or phone, solely to confirm and manage
          that reservation. We do not sell or share this information with
          third parties.
        </p>
        <p>
          Reservation records are kept for ninety days and then deleted. To
          request removal sooner, email hola@medicuscafe.example.
        </p>
      </div>
    </main>
  );
}
