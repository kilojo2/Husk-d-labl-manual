import type { ReactNode } from 'react';

export default function BongaCamsSimulatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {children}
    </div>
  );
}
