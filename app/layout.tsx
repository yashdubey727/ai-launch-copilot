import './globals.css';
import type { Metadata } from 'next';
import { AppShell } from '../components/app-shell';
import { AppProvider } from '../lib/app-context';

export const metadata: Metadata = {
  title: 'Launch Copilot',
  description: 'AI-powered implementation planning workspace',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <AppShell>{children}</AppShell>
        </AppProvider>
      </body>
    </html>
  );
}