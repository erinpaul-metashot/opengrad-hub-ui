'use client';

import PwaInstallPrompt from './PwaInstallPrompt';

export default function PwaShellPrompt() {
  return (
    <div className="px-3 pt-3 sm:px-4 md:hidden">
      <PwaInstallPrompt variant="compact" />
    </div>
  );
}
