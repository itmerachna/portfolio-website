'use client';

import { useEffect } from 'react';
import Navbar from '../components/navbar';
import PortfolioContainer from '../components/portfolio-container';
import { useGradient } from '../context/gradient-context';
import FrostedTopOverlay from '../components/frosted-top-overlay';
import { TextShimmerWave } from '@/app/components/motion-primitives/text-shimmer-wave';

// Direct imports - no fetch delay
import biterData from '../assets/side-quests/biter/data.json';
import forgeData from '../assets/side-quests/forge/data.json';
import mschMischiefData from '../assets/side-quests/msch-mischief/data.json';

const sideQuests = [
  { ...biterData, slug: 'biter' },
  { ...forgeData, slug: 'forge' },
  { ...mschMischiefData, slug: 'msch-mischief' },
];

export default function SideQuestsPage() {
  const { setColors } = useGradient();

  useEffect(() => {
    setColors({
      color1: '#5F68F2',
      color2: '#0F1E2E',
      color3: '#9FF57A',
      color4: '#162A3D',
      color5: '#E83B97',
      color6: '#0A1624',
      darkBase: '#0A1624',
    });
  }, [setColors]);

  const getThumbnailPath = (quest: typeof sideQuests[0]) => {
    if (quest.thumbnail.startsWith('http')) {
      return quest.thumbnail;
    }
    return `/assets/side-quests/${quest.slug}/${quest.thumbnail}`;
  };

  return (
    <>
      <Navbar />
      <FrostedTopOverlay />
      <div className="work-page min-h-screen p-4 md:p-8 lg:p-12 relative">
        <div className="max-w-7xl mx-auto relative z-10">
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
              Side Quests
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
                Currently pending commits
              </TextShimmerWave>
            </div>
          </div>

          <article className="cards">
            {sideQuests.map((quest) => (
              <PortfolioContainer
                key={quest.slug}
                category={quest.category}
                title={quest.title}
                description={quest.description}
                imageSrc={getThumbnailPath(quest)}
                href={`/side-quests/${quest.slug}`}
                comingSoon={true}
              />
            ))}
          </article>
        </div>
      </div>
    </>
  );
}
