'use client';

import Link from 'next/link';
import Navbar from '../../components/navbar';
import ProjectContent from '../../components/project-content';
import type { ProjectData } from '../../lib/projects';

// Direct import - instant load
import projectData from '../../assets/projects/suchi-india-tour/data.json';

const project = { ...projectData, slug: 'suchi-india-tour' } as ProjectData;

export default function SuchiIndiaTourPage() {
  return (
    <>
      <Navbar solid />
      <div className="min-h-screen bg-[#0A0B0D] relative z-10">
        <div className="relative">
          <div className="fixed top-24 left-8 z-20">
            <Link
              href="/projects"
              className="flex items-center gap-2 text-[#E2E2E2] hover:text-white transition-colors group"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transform rotate-180 group-hover:-translate-x-1 transition-transform"
              >
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span
                className="text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  fontFamily: 'var(--font-archivo), sans-serif',
                  fontWeight: 300,
                }}
              >
                Back
              </span>
            </Link>
          </div>

          <div className="pt-16 pb-8 px-4 md:px-8 lg:px-12">
            <div className="max-w-4xl mx-auto text-center">
              <p
                className="text-[#808080] mb-4"
                style={{
                  fontFamily: 'var(--font-archivo), sans-serif',
                  fontWeight: 400,
                  fontSize: '14px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                {project.category}
              </p>
              <h1
                className="text-[#E2E2E2] mb-6"
                style={{
                  fontFamily: "'Stack Sans Notch', sans-serif",
                  fontWeight: 300,
                  fontSize: '90px',
                  lineHeight: '1.1',
                }}
              >
                {project.title}
              </h1>
              <p
                className="text-[#B0B0B0] max-w-2xl mx-auto"
                style={{
                  fontFamily: 'var(--font-archivo), sans-serif',
                  fontWeight: 300,
                  fontSize: '18px',
                  lineHeight: '1.6',
                }}
              >
                {project.description}
              </p>
            </div>
          </div>

          <div className="px-4 md:px-8 lg:px-12 pb-24">
            <div className="max-w-4xl mx-auto">
              <ProjectContent content={project.content} projectSlug={project.slug} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
