'use client';

import { useEffect } from 'react';
import Navbar from '../components/navbar';
import { useGradient } from '../context/gradient-context';
import FrostedTopOverlay from '../components/frosted-top-overlay';
import InfiniteScrollGallery from '../components/infinite-scroll-gallery';
import LiquidMetalButton from '../components/liquid-metal-button';

// Gallery items - add images to public/about/ folder
const galleryItems = [
  { src: '/about/photo-1.webp', caption: 'My lesser half', aspectRatio: '9:16' as const },
  { src: '/about/photo-2.webp', caption: 'Caption for photo 2', aspectRatio: '9:16' as const },
  { src: '/about/photo-3.webp', caption: 'Caption for photo 3', aspectRatio: '9:16' as const },
  { src: '/about/photo-4.webp', caption: 'Caption for photo 4', aspectRatio: '9:16' as const },
  { src: '/about/photo-5.webp', caption: 'Caption for photo 5', aspectRatio: '9:16' as const },
  { src: '/about/photo-6.webp', caption: 'Caption for photo 6', aspectRatio: '9:16' as const },
  { src: '/about/photo-7.webp', caption: 'Caption for photo 7', aspectRatio: '9:16' as const },
  { src: '/about/photo-8.webp', caption: 'Caption for photo 1', aspectRatio: '2:3' as const },
  { src: '/about/photo-9.webp', caption: 'Caption for photo 2', aspectRatio: '3:4' as const },
  { src: '/about/photo-10.webp', caption: 'Caption for photo 3', aspectRatio: '3:4' as const },
  { src: '/about/photo-11.webp', caption: 'Caption for photo 4', aspectRatio: '9:16' as const },
  { src: '/about/photo-12.webp', caption: 'Caption for photo 5', aspectRatio: '3:4' as const },
  { src: '/about/photo-13.webp', caption: 'Caption for photo 6', aspectRatio: '9:16' as const },
  { src: '/about/photo-14.webp', caption: 'Caption for photo 7', aspectRatio: '3:4' as const },
  { src: '/about/photo-15.webp', caption: 'Caption for photo 1', aspectRatio: '3:4' as const },
  { src: '/about/photo-16.webp', caption: 'Caption for photo 2', aspectRatio: '9:16' as const },
  { src: '/about/photo-17.webp', caption: 'Caption for photo 3', aspectRatio: '3:4' as const },
  { src: '/about/photo-18.webp', caption: 'Caption for photo 4', aspectRatio: '3:4' as const },
  { src: '/about/photo-19.webp', caption: 'Caption for photo 5', aspectRatio: '9:16' as const },
  { src: '/about/photo-20.webp', caption: 'Caption for photo 6', aspectRatio: '3:4' as const },
  { src: '/about/photo-21.webp', caption: 'Caption for photo 7', aspectRatio: '3:4' as const },
  { src: '/about/photo-22.webp', caption: 'Caption for photo 2', aspectRatio: '9:16' as const },
  { src: '/about/photo-23.webp', caption: 'Caption for photo 3', aspectRatio: '3:4' as const },
  { src: '/about/photo-24.webp', caption: 'Caption for photo 4', aspectRatio: '3:4' as const },
  { src: '/about/photo-25.webp', caption: 'Caption for photo 5', aspectRatio: '9:16' as const },
  { src: '/about/photo-26.webp', caption: 'Caption for photo 6', aspectRatio: '9:16' as const },
  { src: '/about/photo-27.webp', caption: 'Caption for photo 7', aspectRatio: '3:4' as const },
  { src: '/about/photo-28.webp', caption: 'Caption for photo 2', aspectRatio: '9:16' as const },
  { src: '/about/photo-29.webp', caption: 'Caption for photo 3', aspectRatio: '9:16' as const },
  { src: '/about/photo-30.webp', caption: 'Caption for photo 4', aspectRatio: '3:4' as const },
  { src: '/about/photo-31.webp', caption: 'Caption for photo 5', aspectRatio: '9:16' as const },
  { src: '/about/photo-32.webp', caption: 'Caption for photo 6', aspectRatio: '9:16' as const },
  { src: '/about/photo-33.webp', caption: 'Caption for photo 7', aspectRatio: '9:16' as const },
  { src: '/about/photo-34.webp', caption: 'Caption for photo 2', aspectRatio: '9:16' as const },
  { src: '/about/photo-35.webp', caption: 'Caption for photo 3', aspectRatio: '9:16' as const },
  { src: '/about/photo-36.webp', caption: 'Caption for photo 4', aspectRatio: '3:4' as const },
  { src: '/about/photo-37.webp', caption: 'Caption for photo 5', aspectRatio: '9:16' as const },
  { src: '/about/photo-38.webp', caption: 'Caption for photo 6', aspectRatio: '3:4' as const },
  { src: '/about/photo-39.webp', caption: 'Caption for photo 7', aspectRatio: '3:4' as const },
  { src: '/about/photo-40.webp', caption: 'Caption for photo 2', aspectRatio: '3:4' as const },
  { src: '/about/photo-41.webp', caption: 'Caption for photo 3', aspectRatio: '9:16' as const },
  { src: '/about/photo-42.webp', caption: 'Caption for photo 4', aspectRatio: '9:16' as const },
  { src: '/about/photo-43.webp', caption: 'Caption for photo 5', aspectRatio: '9:16' as const },
  { src: '/about/photo-44.webp', caption: 'Caption for photo 6', aspectRatio: '3:4' as const },
  { src: '/about/photo-45.webp', caption: 'Caption for photo 7', aspectRatio: '3:4' as const },
  { src: '/about/photo-46.webp', caption: 'Caption for photo 1', aspectRatio: '3:4' as const },
  { src: '/about/photo-47.webp', caption: 'Caption for photo 2', aspectRatio: '9:16' as const },
  { src: '/about/photo-48.webp', caption: 'Caption for photo 3', aspectRatio: '3:4' as const },
  { src: '/about/photo-49.webp', caption: 'Caption for photo 4', aspectRatio: '3:4' as const },
  { src: '/about/photo-50.webp', caption: 'Caption for photo 5', aspectRatio: '3:4' as const },
  { src: '/about/photo-51.webp', caption: 'Caption for photo 6', aspectRatio: '3:4' as const },
  { src: '/about/photo-52.webp', caption: 'Caption for photo 7', aspectRatio: '3:4' as const },
  { src: '/about/photo-53.webp', caption: 'Caption for photo 1', aspectRatio: '3:4' as const },
  { src: '/about/photo-54.webp', caption: 'Caption for photo 2', aspectRatio: '3:4' as const },
  { src: '/about/photo-55.webp', caption: 'Caption for photo 3', aspectRatio: '3:4' as const },
  { src: '/about/photo-56.webp', caption: 'Caption for photo 4', aspectRatio: '3:4' as const },
  { src: '/about/photo-57.webp', caption: 'Caption for photo 5', aspectRatio: '3:4' as const },
  { src: '/about/photo-58.webp', caption: 'Caption for photo 6', aspectRatio: '9:16' as const },
  { src: '/about/photo-59.webp', caption: 'Caption for photo 7', aspectRatio: '9:16' as const },
  { src: '/about/photo-60.webp', caption: 'Caption for photo 1', aspectRatio: '3:4' as const },
  { src: '/about/photo-61.webp', caption: 'Caption for photo 2', aspectRatio: '9:16' as const },
];

export default function AboutPage() {
  const { setColors } = useGradient();

  useEffect(() => {
    setColors({
      color1: "#FF6B6B",
      color2: "#050814",
      color3: "#1A2438",
      color4: "#0B1230",
      color5: "#1F6BFF",
      color6: "#03060F",
      darkBase: "#03060F",
    });
  }, [setColors]);

  return (
    <>
      <Navbar />
      <FrostedTopOverlay />
      <div className="min-h-screen relative overflow-hidden">
        {/* Content */}
        <div className="relative z-10 p-4 md:p-8 lg:p-12">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 md:mb-12">
              <h1
                className="text-[#E2E2E2] text-center"
                style={{
                  fontFamily: "'Stack Sans Notch', sans-serif",
                  fontWeight: 300,
                  fontSize: '90px',
                  lineHeight: '1.1',
                }}
              >
                About
              </h1>
              <div className="max-w-[65ch] mx-auto">
                <p
                  className="text-white text-center mt-6"
                  style={{
                    fontFamily: 'var(--font-archivo), sans-serif',
                    fontWeight: 200,
                    fontSize: '14px',
                    lineHeight: '1.5',
                  }}
                >
                  I'm a Senior Visual Designer working at the intersection of design, crypto, and emerging technologies. With 9 years of experience spanning industries and brands, I've worked on identity development, marketing collateral, motion design, presentation decks & event experiences that translate abstract concepts into tangible moments, led brand refresh initiatives across logos to merchandise, and much more. What excites me is using any tool at my disposal and making the invisible visible. What excites me even more and that I understand the unique challenge of, is designing for technologies that most people don't yet understand, but will eventually depend on.
                </p>
                <div className="flex justify-center gap-4 mt-6 flex-wrap">
                  <LiquidMetalButton
                    borderRadius={16}
                    duration={1}
                    className="cursor-default"
                  >
                    <span
                      className="flex items-center gap-3 text-white whitespace-nowrap"
                      style={{
                        fontFamily: 'var(--font-archivo), sans-serif',
                        fontWeight: 200,
                        fontSize: '14px',
                        lineHeight: '1.5',
                      }}
                    >
                      <span className="relative flex h-3 w-3 flex-shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                      </span>
                      <span>
                        <span className="text-[#808080]">Currently aiding neuroplasticity w:</span> Code, AI agents, ML & LLMs, n8n
                      </span>
                    </span>
                  </LiquidMetalButton>
                </div>
              </div>
            </div>

            {/* Outside of Work Section */}
            <div className="max-w-[65ch] mx-auto mt-32">
              {/* Heading */}
              <h2
                className="text-white mb-4 text-center uppercase"
                style={{
                  fontFamily: 'var(--font-archivo), sans-serif',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '1.2',
                  letterSpacing: '0.1em',
                }}
              >
                Outside of Work
              </h2>

              {/* Body Copy */}
              <p
                className="text-white text-center"
                style={{
                  fontFamily: 'var(--font-archivo), sans-serif',
                  fontWeight: 200,
                  fontSize: '14px',
                  lineHeight: '1.5',
                }}
              >
                I'm very blessed and grateful to have an incredible support system. So outside of work I love hanging out with my cat, partner and friends. I also love going out for gigs, live acts and see my friends on the decks (a lot of my friends are DJs). I love cooking food and taking care of my plants. Sometimes I kill them but I promised I'll make it up to them by getting better at taking care of the new ones. I'm also big on self-sufficiency and so I have too many ongoing projects that are half done as I type this out. I'll tick them off one by one. A girl has too many interests
              </p>
            </div>

            {/* Infinite Scroll Gallery */}
            <div className="mt-16 relative z-20">
              <InfiniteScrollGallery items={galleryItems} />
            </div>

            {/* Music Section Copy */}
            <div className="max-w-[65ch] mx-auto mt-32">
              <p
                className="text-white text-center"
                style={{
                  fontFamily: 'var(--font-archivo), sans-serif',
                  fontWeight: 200,
                  fontSize: '14px',
                  lineHeight: '1.5',
                }}
              >
                I've always loved music and listen to a lot of it. Some of my recent favorites are compiled below<br />in a YouTube Music playlist because fuck Spotify. Enjoy!
              </p>
            </div>

            {/* Playlist Button */}
            <div className="flex justify-center mt-8">
              <LiquidMetalButton
                borderRadius={16}
                duration={1}
                href="https://www.youtube.com/playlist?list=PL4AEswpEPfO8H4BpsnnK1Teb1vu623Nyg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span
                  className="flex items-center gap-3 text-white whitespace-nowrap"
                  style={{
                    fontFamily: 'var(--font-archivo), sans-serif',
                    fontWeight: 200,
                    fontSize: '14px',
                    lineHeight: '1.5',
                  }}
                >
                  <svg
                    className="w-4 h-4 flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                  </svg>
                  <span>
                    <span className="text-[#808080]">Current favorites:</span> boombap
                  </span>
                </span>
              </LiquidMetalButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
