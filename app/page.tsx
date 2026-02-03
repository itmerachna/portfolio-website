'use client';

import { useEffect } from 'react';
import Navbar from './components/navbar';
import { useGradient } from './context/gradient-context';
import RollingText from './components/rolling-text';

export default function Page() {
  const { setColors } = useGradient();

  useEffect(() => {
    // Reset to default home page colors
    setColors({
      color1: '#F15A22',
      color2: '#0A0E27',
      color3: '#F15A22',
      color4: '#0A0E27',
      color5: '#F15A22',
      color6: '#0A0E27',
      darkBase: '#0A0B0D',
    });
  }, [setColors]);

  return (
    <div className="h-screen overflow-hidden relative">
      <Navbar />

      {/* Main content area - full viewport minus navbar */}
      <div className="relative h-[calc(100vh-64px)] flex items-center justify-center -mt-8">

        {/* Text content - vertically and horizontally centered */}
        <div className="relative z-10 flex flex-col items-center">
          <RollingText
            className="text-[#E2E2E2] text-center"
            style={{
              fontFamily: "'Stack Sans Notch', sans-serif",
              fontWeight: 300,
              fontSize: '90px',
              lineHeight: '1.1',
            }}
          >
            Designer, Illustrator
            <br />
            and Code-tinkerer
          </RollingText>
          <p
            className="text-white text-center mt-3"
            style={{
              fontFamily: 'var(--font-archivo), sans-serif',
              fontWeight: 200,
              fontSize: '14px',
              lineHeight: '1.5',
            }}
          >
            Many ongoing AI side quests. Currently pending commits.
          </p>
        </div>
      </div>
    </div>
  );
}
