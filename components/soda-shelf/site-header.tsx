import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header" data-slot="site-header">
      <Link href="/" className="wordmark">
        MEDICUS<span>.</span>
      </Link>
    </header>
  );
}
