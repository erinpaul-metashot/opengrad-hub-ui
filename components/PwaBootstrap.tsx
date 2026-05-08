'use client';

import React, {
  useCallback,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const PWA_INSTALL_DISMISS_KEY = 'pwaInstallPromptDismissed';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
};

interface PwaContextValue {
  canInstall: boolean;
  isIOS: boolean;
  isStandalone: boolean;
  isSupported: boolean;
  showInstallUI: boolean;
  dismissPrompt: () => void;
  promptInstall: () => Promise<void>;
}

const PwaContext = createContext<PwaContextValue | null>(null);

function detectStandalone() {
  if (typeof window === 'undefined') {
    return false;
  }

  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    Boolean((navigator as Navigator & { standalone?: boolean }).standalone)
  );
}

function detectIOSInstallable() {
  if (typeof navigator === 'undefined') {
    return false;
  }

  const userAgent = navigator.userAgent;
  const vendor = navigator.vendor ?? '';
  const hasTouchMac = /Macintosh/.test(userAgent) && navigator.maxTouchPoints > 1;
  const isAppleDevice = /iPad|iPhone|iPod/.test(userAgent) || hasTouchMac;
  const isSafariLike =
    /Safari/.test(userAgent) &&
    !/CriOS|FxiOS|EdgiOS|OPiOS/.test(userAgent) &&
    /Apple/.test(vendor);

  return isAppleDevice && isSafariLike;
}

export default function PwaBootstrap({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isDismissed, setIsDismissed] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return localStorage.getItem(PWA_INSTALL_DISMISS_KEY) === 'true';
  });
  const [isIOS] = useState(() => detectIOSInstallable());
  const [isStandalone, setIsStandalone] = useState(() => detectStandalone());
  const [isSupported] = useState(
    () => typeof navigator !== 'undefined' && 'serviceWorker' in navigator
  );

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(display-mode: standalone)');

    if (isSupported) {
      navigator.serviceWorker
        .register('/sw.js', {
          scope: '/',
          updateViaCache: 'none',
        })
        .catch((error) => {
          console.error('Service worker registration failed', error);
        });
    }

    const handleDisplayModeChange = () => {
      setIsStandalone(detectStandalone());
    };

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
      setIsDismissed(false);
      localStorage.removeItem(PWA_INSTALL_DISMISS_KEY);
    };

    const handleAppInstalled = () => {
      setIsStandalone(true);
      setDeferredPrompt(null);
      setIsDismissed(false);
      localStorage.removeItem(PWA_INSTALL_DISMISS_KEY);
    };

    mediaQuery.addEventListener('change', handleDisplayModeChange);
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      mediaQuery.removeEventListener('change', handleDisplayModeChange);
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      );
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [isSupported]);

  const dismissPrompt = useCallback(() => {
    setIsDismissed(true);
    localStorage.setItem(PWA_INSTALL_DISMISS_KEY, 'true');
  }, []);

  const promptInstall = useCallback(async () => {
    if (!deferredPrompt) {
      return;
    }

    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
  }, [deferredPrompt]);

  const value = useMemo<PwaContextValue>(
    () => ({
      canInstall: Boolean(deferredPrompt),
      isIOS,
      isStandalone,
      isSupported,
      showInstallUI:
        isSupported &&
        !isStandalone &&
        !isDismissed &&
        (Boolean(deferredPrompt) || isIOS),
      dismissPrompt,
      promptInstall,
    }),
    [
      deferredPrompt,
      dismissPrompt,
      isDismissed,
      isIOS,
      isStandalone,
      isSupported,
      promptInstall,
    ]
  );

  return <PwaContext.Provider value={value}>{children}</PwaContext.Provider>;
}

export function usePwaInstall() {
  const context = useContext(PwaContext);

  if (!context) {
    throw new Error('usePwaInstall must be used within PwaBootstrap');
  }

  return context;
}
