'use client';

import { useEffect } from 'react';
import Navbar from '../components/navbar';
import { TextShimmerWave } from '@/app/components/motion-primitives/text-shimmer-wave';
import { useGradient } from '../context/gradient-context';

export default function ShopPage() {
  const { setColors } = useGradient();

  useEffect(() => {
    setColors({
      color1: '#2B007A',
      color2: '#0D132A',
      color3: '#CEFF47',
      color4: '#141C3F',
      color5: '#FF7300',
      color6: '#080E22',
      darkBase: '#080E22',
    });
  }, [setColors]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen relative flex items-center justify-center -mt-16">
        <div className="relative z-10 text-center">
          <h1
            className="text-[#E2E2E2] text-center"
            style={{
              fontFamily: "'Stack Sans Notch', sans-serif",
              fontWeight: 300,
              fontSize: '90px',
              lineHeight: '1.1',
            }}
          >
            Shop
          </h1>
          <div className="flex justify-center mt-4">
            <TextShimmerWave
              as="p"
              className="text-white/70"
              duration={1.6}
              spread={1.8}
              zDistance={8}
              scaleDistance={1.05}
            >
              Coming soon
            </TextShimmerWave>
          </div>
        </div>
      </div>
    </>
  );
}
