import { ReactNode } from 'react';
import { SidebarNav } from './sidebar-nav';

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="flex min-h-screen">
        <SidebarNav />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
