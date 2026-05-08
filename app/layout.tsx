import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "UTM Tracker — campaign URL builder with click tracking",
  description:
    "Build properly-tagged UTM URLs, attach campaign hypotheses, share short links, and track clicks — all in one open-source tool.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans">
        <header className="border-b border-ink-100 bg-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-xs font-bold text-white">U</span>
              <span className="font-semibold text-ink-900">UTM Tracker</span>
            </Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/" className="text-ink-700 hover:text-accent">Dashboard</Link>
              <Link
                href="/campaigns/new"
                className="rounded-md bg-ink-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-ink-700"
              >
                New campaign
              </Link>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
