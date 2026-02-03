'use client';

interface RollingTextProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function RollingText({
  children,
  className = '',
  style = {},
}: RollingTextProps) {
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}
