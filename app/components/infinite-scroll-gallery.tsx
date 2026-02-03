'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';
import Image from 'next/image';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, Observer);
}

type AspectRatio = '1:1' | '9:16' | '4:3' | '16:9' | '3:4' | '2:3';

interface GalleryItem {
  src: string;
  caption?: string;
  aspectRatio?: AspectRatio;
}

interface InfiniteScrollGalleryProps {
  items: GalleryItem[];
  className?: string;
}

const aspectRatioClasses: Record<AspectRatio, string> = {
  '1:1': 'aspect-square',
  '9:16': 'aspect-[9/16]',
  '4:3': 'aspect-[4/3]',
  '16:9': 'aspect-[16/9]',
  '3:4': 'aspect-[3/4]',
  '2:3': 'aspect-[2/3]',
};

const aspectRatioWidths: Record<AspectRatio, number> = {
  '1:1': 560,
  '9:16': 400,
  '4:3': 640,
  '16:9': 800,
  '3:4': 480,
  '2:3': 440,
};

function buildSeamlessLoop(items: HTMLElement[], spacing: number) {
  const overlap = Math.ceil(1 / spacing);
  const startTime = items.length * spacing + 0.5;
  const loopTime = (items.length + overlap) * spacing + 1;
  const rawSequence = gsap.timeline({ paused: true });
  const seamlessLoop = gsap.timeline({
    paused: true,
    repeat: -1,
    onRepeat() {
      // @ts-ignore - accessing internal GSAP properties
      if (this._time === this._dur) {
        // @ts-ignore
        this._tTime += this._dur - 0.01;
      }
    },
  });

  const l = items.length + overlap * 2;

  // Set initial state - all cards hidden and positioned off-screen
  gsap.set(items, { xPercent: 400, opacity: 0, scale: 0 });

  for (let i = 0; i < l; i++) {
    const index = i % items.length;
    const item = items[index];
    const time = i * spacing;

    rawSequence
      .fromTo(
        item,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          zIndex: 100,
          duration: 0.5,
          yoyo: true,
          repeat: 1,
          ease: 'power1.in',
          immediateRender: false,
        },
        time
      )
      .fromTo(
        item,
        { xPercent: 400 },
        { xPercent: -400, duration: 1, ease: 'none', immediateRender: false },
        time
      );
  }

  // Set rawSequence to startTime
  rawSequence.time(startTime);

  // Build the seamless loop
  seamlessLoop
    .to(rawSequence, {
      time: loopTime,
      duration: loopTime - startTime,
      ease: 'none',
    })
    .fromTo(
      rawSequence,
      { time: overlap * spacing + 1 },
      {
        time: startTime,
        duration: startTime - (overlap * spacing + 1),
        immediateRender: false,
        ease: 'none',
      }
    );

  return seamlessLoop;
}

export default function InfiniteScrollGallery({ items, className = '' }: InfiniteScrollGalleryProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current || !cardsRef.current || !galleryRef.current || items.length === 0) return;

    const cards = gsap.utils.toArray<HTMLElement>('.gallery-card', cardsRef.current);
    if (cards.length === 0) return;

    const spacing = 0.1;
    const seamlessLoop = buildSeamlessLoop(cards, spacing);

    // Scrub animation for smooth transitions
    const scrub = gsap.to(seamlessLoop, {
      totalTime: 0,
      duration: 0.5,
      ease: 'power3',
      paused: true,
    });

    // Playhead tracking
    let playhead = 0;
    const wrapTime = gsap.utils.wrap(0, seamlessLoop.duration());

    const updateAnimation = (delta: number) => {
      playhead += delta;
      scrub.vars.totalTime = wrapTime(playhead);
      scrub.invalidate().restart();
    };

    // Use Observer for wheel/touch events on the gallery only
    const observer = Observer.create({
      target: galleryRef.current,
      type: 'wheel,touch,pointer',
      wheelSpeed: -1,
      onChangeY: (self) => {
        updateAnimation(self.deltaY * 0.001);
      },
      onDrag: (self) => {
        updateAnimation(self.deltaX * -0.005);
      },
      tolerance: 10,
      preventDefault: true,
    });

    // Set initial position
    playhead = seamlessLoop.duration() * 0.5;
    scrub.vars.totalTime = playhead;
    scrub.invalidate().restart();

    return () => {
      observer.kill();
      scrub.kill();
      seamlessLoop.kill();
    };
  }, [items]);

  if (items.length === 0) return null;

  return (
    <div ref={galleryRef} className={`relative ${className}`}>
      <div
        ref={wrapperRef}
        className="relative h-[450px] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
      >
        <div
          ref={cardsRef}
          className="absolute inset-0 flex items-center justify-center"
        >
          {items.map((item, index) => {
            const aspectRatio = item.aspectRatio || '1:1';
            const width = aspectRatioWidths[aspectRatio];

            return (
              <div
                key={index}
                className="gallery-card absolute flex flex-col items-center"
                style={{ width }}
              >
                <div
                  className={`relative w-full ${aspectRatioClasses[aspectRatio]} overflow-hidden rounded-lg`}
                >
                  <Image
                    src={item.src}
                    alt={item.caption || `Gallery image ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes={`${width}px`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
