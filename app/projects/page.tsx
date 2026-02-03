'use client';

import { useEffect } from 'react';
import Navbar from '../components/navbar';
import PortfolioContainer from '../components/portfolio-container';
import { useGradient } from '../context/gradient-context';
import FrostedTopOverlay from '../components/frosted-top-overlay';

// Direct imports - no fetch delay
import baseIndiaData from '../assets/projects/base-india/data.json';
import boxoutFmData from '../assets/projects/boxout-fm/data.json';
import dechargeData from '../assets/projects/decharge/data.json';
import personalArtData from '../assets/projects/personal-art/data.json';
import suchiIndiaTourData from '../assets/projects/suchi-india-tour/data.json';
import syncaiNetworkData from '../assets/projects/syncai-network/data.json';
import xeonProtocolData from '../assets/projects/xeon-protocol/data.json';
import dawnshardData from '../assets/projects/dawnshard/data.json';

const projects = [
  { ...baseIndiaData, slug: 'base-india' },
  { ...boxoutFmData, slug: 'boxout-fm' },
  { ...dechargeData, slug: 'decharge' },
  { ...personalArtData, slug: 'personal-art' },
  { ...suchiIndiaTourData, slug: 'suchi-india-tour' },
  { ...syncaiNetworkData, slug: 'syncai-network' },
  { ...xeonProtocolData, slug: 'xeon-protocol' },
  { ...dawnshardData, slug: 'dawnshard' },
];

export default function ProjectsPage() {
  const { setColors } = useGradient();

  useEffect(() => {
    setColors({
      color1: '#FF2424',
      color2: '#141414',
      color3: '#C8FF5A',
      color4: '#1F1F1F',
      color5: '#A31AFF',
      color6: '#0051FF',
      darkBase: '#0A0B0D',
    });
  }, [setColors]);

  const getThumbnailPath = (project: typeof projects[0]) => {
    if (project.thumbnail.startsWith('http')) {
      return project.thumbnail;
    }
    return `/assets/projects/${project.slug}/${project.thumbnail}`;
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
              Projects
            </h1>
          </div>

          <article className="cards">
            {projects.map((project) => (
              <PortfolioContainer
                key={project.slug}
                category={project.category}
                title={project.title}
                description={project.description}
                imageSrc={getThumbnailPath(project)}
                href={`/projects/${project.slug}`}
              />
            ))}
          </article>
        </div>
      </div>
    </>
  );
}
