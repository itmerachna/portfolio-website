'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

type Direction = 'TOP' | 'LEFT' | 'BOTTOM' | 'RIGHT';

interface PortfolioContainerProps {
  imageSrc: string;
  category: string;
  title: string;
  description: string;
  href?: string;
  className?: string;
  comingSoon?: boolean;
}

// Helper to check if the source is a video
function isVideo(src: string): boolean {
  return src.toLowerCase().endsWith('.mp4') ||
         src.toLowerCase().endsWith('.webm') ||
         src.toLowerCase().endsWith('.mov');
}

export default function PortfolioContainer({
  imageSrc,
  category,
  title,
  description,
  href = '#',
  className,
  comingSoon = false,
}: PortfolioContainerProps) {
  const [hovered, setHovered] = useState<boolean>(false);
  const [direction, setDirection] = useState<Direction>('TOP');
  const duration = 1;
  const borderRadius = 24;

  const rotateDirection = (currentDirection: Direction): Direction => {
    const directions: Direction[] = ['TOP', 'LEFT', 'BOTTOM', 'RIGHT'];
    const currentIndex = directions.indexOf(currentDirection);
    const nextIndex = (currentIndex - 1 + directions.length) % directions.length;
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
    if (!hovered && comingSoon) {
      const interval = setInterval(() => {
        setDirection((prevState) => rotateDirection(prevState));
      }, duration * 1000);
      return () => clearInterval(interval);
    }
  }, [hovered, comingSoon]);

  if (comingSoon) {
    return (
      <div
        className="relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ padding: '2px' }}
      >
        {/* Pulsating border effect - positioned behind the card */}
        <motion.div
          className="absolute inset-0"
          style={{
            filter: 'blur(1px)',
            borderRadius: `${borderRadius}px`,
          }}
          initial={{ background: movingMap[direction] }}
          animate={{
            background: hovered
              ? [movingMap[direction], highlight]
              : movingMap[direction],
          }}
          transition={{ ease: 'linear', duration: duration }}
        />

        {/* The actual card */}
        <div
          className={['previewCard', className].filter(Boolean).join(' ')}
          style={{ position: 'relative', zIndex: 1 }}
        >
          {/* Solid black background instead of image */}
          <div
            className="backdrop"
            style={{ backgroundColor: '#0A0B0D' }}
          />

          {/* Opaque overlay */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              zIndex: 1,
            }}
          />

          {/* Content - z-index 2 from CSS */}
          <div className="content">
            <div className="category">{category}</div>
            <div className="title">{title}</div>
            <div className="description">
              <p>{description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <a href={href} className={['previewCard', className].filter(Boolean).join(' ')}>
      {isVideo(imageSrc) ? (
        <video
          src={imageSrc}
          className="backdrop"
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <img src={imageSrc} className="backdrop" alt="" />
      )}
      <div className="content">
        <div className="category">{category}</div>
        <div className="title">{title}</div>
        <div className="description">
          <p>{description}</p>
          <span aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              fill="#e3e3e3"
            >
              <path d="M504-480 348-636q-11-11-11-28t11-28q11-11 28-11t28 11l184 184q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L404-268q-11 11-28 11t-28-11q-11-11-11-28t11-28l156-156Z" />
            </svg>
          </span>
        </div>
      </div>
    </a>
  );
}
