'use client';

import { usePathname } from 'next/navigation';
import { GradientProvider } from '../context/gradient-context';
import LiquidGradient from './liquid-gradient';

export default function GradientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Hide gradient on individual project pages (e.g., /projects/base-india)
  // but show it on the main /projects page
  const isIndividualProjectPage = pathname?.startsWith('/projects/') && pathname !== '/projects';

  return (
    <GradientProvider>
      {/* Only render gradient on non-project detail pages */}
      {!isIndividualProjectPage && <LiquidGradient className="fixed inset-0 z-0 pointer-events-none" />}
      {children}
    </GradientProvider>
  );
}
