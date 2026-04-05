'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '../lib/utils';

const navItems = [
  { label: 'Dashboard', href: '/' },
  { label: 'Requirement Intake', href: '/intake' },
  { label: 'Story Generator', href: '/stories' },
  { label: 'Test Cases', href: '/tests' },
  { label: 'Readiness', href: '/readiness' },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-zinc-200 bg-white p-4">
      <div className="mb-8">
        <h1 className="text-xl font-semibold tracking-tight">Launch Copilot</h1>
        <p className="mt-1 text-sm text-zinc-500">MVP Demo</p>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'block rounded-xl px-3 py-2 text-sm font-medium transition',
              pathname === item.href
                ? 'bg-zinc-900 text-white'
                : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}