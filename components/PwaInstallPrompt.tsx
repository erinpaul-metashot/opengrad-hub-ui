'use client';

import { Download, Share2, Smartphone, X } from 'lucide-react';
import { usePwaInstall } from './PwaBootstrap';

interface PwaInstallPromptProps {
  className?: string;
  variant?: 'hero' | 'compact';
}

export default function PwaInstallPrompt({
  className = '',
  variant = 'hero',
}: PwaInstallPromptProps) {
  const { canInstall, dismissPrompt, isIOS, promptInstall, showInstallUI } =
    usePwaInstall();

  if (!showInstallUI) {
    return null;
  }

  const isHero = variant === 'hero';
  const containerClassName = isHero
    ? 'rounded-[28px] border border-teal-200/80 bg-white/95 p-5 shadow-[0_20px_50px_-28px_rgba(3,72,82,0.48)] backdrop-blur'
    : 'rounded-2xl border border-teal-200/80 bg-white/95 p-4 shadow-[0_16px_32px_-26px_rgba(3,72,82,0.6)] backdrop-blur';

  const title = isIOS
    ? 'Add OpenGrad to your Home Screen'
    : 'Install OpenGrad for faster mobile access';

  const description = isIOS
    ? 'Use Safari’s share sheet to pin this mock LMS to your home screen and open it in a cleaner, app-style view.'
    : 'Install this mock LMS for quicker relaunches, standalone full-screen use, and a steadier mobile shell.';

  return (
    <section className={`${containerClassName} ${className}`.trim()}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#034852] text-white shadow-sm">
            {isIOS ? <Share2 size={20} /> : <Smartphone size={20} />}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#006d6c]">
              OpenGrad PWA
            </p>
            <h2
              className={`mt-1 text-slate-900 ${
                isHero ? 'text-xl font-bold' : 'text-sm font-semibold'
              }`}
            >
              {title}
            </h2>
            <p
              className={`mt-2 text-slate-600 ${
                isHero ? 'text-sm leading-6' : 'text-xs leading-5'
              }`}
            >
              {description}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={dismissPrompt}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          aria-label="Dismiss install prompt"
        >
          <X size={18} />
        </button>
      </div>

      {isIOS ? (
        <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
          <span className="rounded-full bg-teal-50 px-3 py-2 text-teal-800">
            1. Tap Share
          </span>
          <span className="rounded-full bg-teal-50 px-3 py-2 text-teal-800">
            2. Choose Add to Home Screen
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-2 text-slate-700">
            3. Launch it like an app
          </span>
        </div>
      ) : (
        <div
          className={`mt-4 flex ${
            isHero ? 'flex-col gap-3 sm:flex-row sm:items-center' : 'flex-col gap-2'
          }`}
        >
          <button
            type="button"
            onClick={() => {
              void promptInstall();
            }}
            disabled={!canInstall}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-[#034852] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#05606d] disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            <Download size={18} />
            Install OpenGrad
          </button>

          <p className="text-xs leading-5 text-slate-500">
            Chrome and other Chromium browsers can open the native install sheet
            from here.
          </p>
        </div>
      )}
    </section>
  );
}
