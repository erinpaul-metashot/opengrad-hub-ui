import type { Metadata, Viewport } from 'next';
import PwaBootstrap from '@/components/PwaBootstrap';
import './globals.css';

export const metadata: Metadata = {
  applicationName: 'OpenGrad LMS',
  title: {
    default: 'OpenGrad LMS',
    template: '%s | OpenGrad LMS',
  },
  description: 'OpenGrad Learning Management System mock UI',
  appleWebApp: {
    capable: true,
    title: 'OpenGrad LMS',
    statusBarStyle: 'black-translucent',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    shortcut: ['/favicon.ico'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#034852',
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-slate-50">
        <PwaBootstrap>{children}</PwaBootstrap>
      </body>
    </html>
  );
}
