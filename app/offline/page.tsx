import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Offline',
  description: 'Offline fallback for the OpenGrad mock PWA experience.',
};

export default function OfflinePage() {
  return (
    <main className="min-h-[100dvh] bg-[radial-gradient(circle_at_top,_rgba(10,190,98,0.18),_transparent_42%),linear-gradient(180deg,_#f8fffc_0%,_#eef6f6_100%)] px-4 py-[calc(1.5rem+var(--safe-top))]">
      <div className="mx-auto flex min-h-[calc(100dvh-var(--safe-top))] max-w-xl items-center justify-center pb-[calc(1.5rem+var(--safe-bottom))]">
        <section className="w-full rounded-[32px] border border-teal-100 bg-white/95 p-6 shadow-[0_28px_70px_-34px_rgba(3,72,82,0.42)] backdrop-blur sm:p-8">
          <div className="inline-flex rounded-full bg-teal-50 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-[#006d6c]">
            OpenGrad Mock PWA
          </div>
          <h1 className="mt-4 text-3xl font-bold text-slate-900">
            You&apos;re offline right now
          </h1>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            The app shell is still available so the installed experience does not
            feel broken, but this mock LMS needs a connection for the full route
            demo and role flows.
          </p>
          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
            Reconnect and refresh to continue browsing dashboards, course pages,
            quizzes, and other mock interactions.
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-[#034852] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#05606d]"
            >
              Return to Login
            </Link>
            <Link
              href="/student/dashboard"
              className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-teal-300 hover:text-teal-700"
            >
              Try a Cached Route
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
