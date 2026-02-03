'use client';

export default function FrostedTopOverlay() {
  return (
    <div
      className="fixed top-0 left-0 right-0 h-40 pointer-events-none z-40"
      style={{
        backdropFilter: 'blur(1.5rem) saturate(1.5) brightness(0.85)',
        WebkitBackdropFilter: 'blur(1.5rem) saturate(1.5) brightness(0.85)',
        background: 'linear-gradient(to bottom, rgba(10, 11, 13, 0.6) 0%, rgba(10, 11, 13, 0.4) 40%, rgba(10, 11, 13, 0) 100%)',
        maskImage: 'linear-gradient(to bottom, black 0%, black 40%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 40%, transparent 100%)',
      }}
    />
  );
}
