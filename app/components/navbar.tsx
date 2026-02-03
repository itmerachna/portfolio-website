'use client';

import Link from 'next/link';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Side Quests', href: '/side-quests' },
  { label: 'Wordboard', href: '/wordboard' },
  { label: 'Shop', href: '/shop' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

interface NavbarProps {
  solid?: boolean;
}

export default function Navbar({ solid = false }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50">
      {/* Background with multiply blend mode */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: solid ? 'rgb(10, 11, 13)' : 'rgba(10, 11, 13, 0.5)',
          mixBlendMode: solid ? 'normal' : 'multiply',
        }}
      />
      <div className="relative flex items-center justify-center h-16">
        <div className="flex items-center">
          {navItems.map((item, index) => (
            <div key={item.label} className="flex items-center">
              <Link
                href={item.href}
                className="px-4 text-sm text-white/80 hover:text-white transition-colors"
                style={{
                  fontFamily: 'var(--font-archivo), sans-serif',
                  fontWeight: 300,
                }}
              >
                {item.label}
              </Link>
              {index < navItems.length - 1 && (
                <div
                  className="bg-white"
                  style={{ height: '0.65em', width: '0.5px' }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
