'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

type Direction = 'TOP' | 'LEFT' | 'BOTTOM' | 'RIGHT';

interface LiquidMetalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  containerClassName?: string;
  duration?: number;
  clockwise?: boolean;
  borderRadius?: number;
  href?: string;
  target?: string;
  rel?: string;
}

export default function LiquidMetalButton({
  children,
  containerClassName,
  className = '',
  duration = 1,
  clockwise = true,
  borderRadius = 16,
  style,
  href,
  target,
  rel,
  ...buttonProps
}: LiquidMetalButtonProps) {
  const [hovered, setHovered] = useState<boolean>(false);
  const [direction, setDirection] = useState<Direction>('TOP');

  const rotateDirection = (currentDirection: Direction): Direction => {
    const directions: Direction[] = ['TOP', 'LEFT', 'BOTTOM', 'RIGHT'];
    const currentIndex = directions.indexOf(currentDirection);
    const nextIndex = clockwise
      ? (currentIndex - 1 + directions.length) % directions.length
      : (currentIndex + 1) % directions.length;
    return directions[nextIndex];
  };

  const movingMap: Record<Direction, string> = {
    TOP: 'radial-gradient(20.7% 50% at 50% 0%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)',
    LEFT: 'radial-gradient(16.6% 43.1% at 0% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)',
    BOTTOM: 'radial-gradient(20.7% 50% at 50% 100%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)',
    RIGHT: 'radial-gradient(16.2% 41.2% at 100% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)',
  };

  const highlight =
    'radial-gradient(75% 181.15% at 50% 50%, #3275F8 0%, rgba(255, 255, 255, 0) 100%)';

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setDirection((prevState) => rotateDirection(prevState));
      }, duration * 1000);
      return () => clearInterval(interval);
    }
  }, [hovered, duration]);

  const sharedClassName = `relative flex content-center bg-black/20 hover:bg-black/10 transition duration-500 items-center flex-col flex-nowrap gap-10 h-min justify-center overflow-visible p-px decoration-clone w-fit ${containerClassName || ''}`;

  const sharedStyle = {
    borderRadius: `${borderRadius}px`,
  };

  const innerContent = (
    <>
      <motion.div
        className="flex-none inset-0 overflow-hidden absolute z-0"
        style={{
          filter: 'blur(2px)',
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: `${borderRadius}px`,
        }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered
            ? [movingMap[direction], highlight]
            : movingMap[direction],
        }}
        transition={{ ease: 'linear', duration: duration ?? 1 }}
      />
      <div
        className="absolute z-[1] flex-none"
        style={{
          inset: '2px',
          borderRadius: `${borderRadius - 2}px`,
          backgroundColor: '#0A0B0D',
        }}
      />
      <div
        className={`w-auto z-[2] px-4 py-2 relative ${className}`}
        style={{
          borderRadius: `${borderRadius - 2}px`,
          ...style,
        }}
      >
        {children}
      </div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={sharedClassName}
        style={sharedStyle}
      >
        {innerContent}
      </a>
    );
  }

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={sharedClassName}
      style={sharedStyle}
      {...buttonProps}
    >
      {innerContent}
    </button>
  );
}
