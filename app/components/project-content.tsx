'use client';

import React from 'react';
import type {
  ContentBlock,
  AspectRatio,
} from '@/app/lib/projects';

// Aspect ratio CSS classes
const aspectRatioClasses: Record<AspectRatio, string> = {
  '16:9': 'aspect-video',
  '9:16': 'aspect-[9/16]',
  '1:1': 'aspect-square',
  '4:3': 'aspect-[4/3]',
  '3:4': 'aspect-[3/4]',
  '2500:1309': 'aspect-[2500/1309]',
  '1920:323': 'aspect-[1920/323]',
  '1800:600': 'aspect-[1800/600]',
  '5:3': 'aspect-[5/3]',
  '1200:630': 'aspect-[1200/630]',
  '3:2': 'aspect-[3/2]',
  '8:3': 'aspect-[8/3]',
};

interface ProjectContentProps {
  content: ContentBlock[];
  projectSlug: string;
  basePath?: string;
}

// Helper to get the full asset path
function getAssetPath(projectSlug: string, filename: string, basePath: string = 'projects'): string {
  // If it's already a full URL, return as-is
  if (filename.startsWith('http://') || filename.startsWith('https://')) {
    return filename;
  }
  return `/assets/${basePath}/${projectSlug}/${filename}`;
}

// Text Block Component
function TextBlock({ value }: { value: string }) {
  return (
    <p
      className="text-[#B0B0B0] leading-relaxed text-center"
      style={{
        fontFamily: 'var(--font-archivo), sans-serif',
        fontWeight: 300,
        fontSize: '16px',
        lineHeight: '1.7',
      }}
      dangerouslySetInnerHTML={{ __html: value }}
    />
  );
}

// Heading Block Component
function HeadingBlock({ value, level = 2 }: { value: string; level?: 2 | 3 }) {
  const Tag = level === 2 ? 'h2' : 'h3';

  return (
    <>
      <div className="mt-16 mb-16">
        <div
          className="w-full h-px"
          style={{ backgroundColor: '#1B1C1C' }}
        />
      </div>
      <Tag
        className="text-[#808080] mb-4 text-center uppercase"
        style={{
          fontFamily: 'var(--font-archivo), sans-serif',
          fontWeight: 400,
          fontSize: '14px',
          lineHeight: '1.2',
          letterSpacing: '0.1em',
        }}
      >
        {value}
      </Tag>
    </>
  );
}

// Image Block Component
function ImageBlock({
  src,
  caption,
  aspectRatio = '16:9',
  fullWidth = false,
  projectSlug,
  basePath = 'projects',
}: {
  src: string;
  caption?: string;
  aspectRatio?: AspectRatio;
  fullWidth?: boolean;
  projectSlug: string;
  basePath?: string;
}) {
  return (
    <figure className={`my-8 ${fullWidth ? 'w-full' : ''}`}>
      <div
        className={`relative overflow-hidden rounded-lg ${aspectRatioClasses[aspectRatio]}`}
      >
        <img
          src={getAssetPath(projectSlug, src, basePath)}
          alt={caption || ''}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      {caption && (
        <figcaption
          className="text-[#808080] text-center mt-3"
          style={{
            fontFamily: 'var(--font-archivo), sans-serif',
            fontWeight: 300,
            fontSize: '14px',
          }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// Helper to check if a file is a video
function isVideo(src: string): boolean {
  const lower = src.toLowerCase();
  return lower.endsWith('.mp4') || lower.endsWith('.webm') || lower.endsWith('.mov');
}

// Gallery Block Component
function GalleryBlock({
  images,
  videos,
  columns = 2,
  projectSlug,
  basePath = 'projects',
}: {
  images?: Array<{ src: string; caption?: string; aspectRatio?: AspectRatio }>;
  videos?: Array<{ src: string; caption?: string; aspectRatio?: AspectRatio }>;
  columns?: 2 | 3 | 4;
  projectSlug: string;
  basePath?: string;
}) {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  };

  // Use images or videos, whichever is provided
  const items = images || videos || [];

  return (
    <div className={`grid ${gridCols[columns]} gap-4 my-8`}>
      {items.map((item, index) => (
        <figure key={index}>
          <div
            className={`relative overflow-hidden rounded-lg ${
              aspectRatioClasses[item.aspectRatio || '1:1']
            }`}
          >
            {isVideo(item.src) ? (
              <video
                src={getAssetPath(projectSlug, item.src, basePath)}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              <img
                src={getAssetPath(projectSlug, item.src, basePath)}
                alt={item.caption || ''}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
          </div>
          {item.caption && (
            <figcaption
              className="text-[#808080] text-center mt-2"
              style={{
                fontFamily: 'var(--font-archivo), sans-serif',
                fontWeight: 300,
                fontSize: '12px',
              }}
            >
              {item.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}

// Video Block Component
function VideoBlock({
  src,
  caption,
  aspectRatio = '16:9',
  projectSlug,
  basePath = 'projects',
}: {
  src: string;
  caption?: string;
  aspectRatio?: AspectRatio;
  projectSlug: string;
  basePath?: string;
}) {
  const videoSrc = getAssetPath(projectSlug, src, basePath);
  const isEmbed = src.includes('youtube') || src.includes('vimeo');

  return (
    <figure className="my-8">
      <div
        className={`relative overflow-hidden rounded-lg ${aspectRatioClasses[aspectRatio]}`}
      >
        {isEmbed ? (
          <iframe
            src={videoSrc}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video
            src={videoSrc}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
        )}
      </div>
      {caption && (
        <figcaption
          className="text-[#808080] text-center mt-3"
          style={{
            fontFamily: 'var(--font-archivo), sans-serif',
            fontWeight: 300,
            fontSize: '14px',
          }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// Side by Side Block Component
function SideBySideBlock({
  left,
  right,
  projectSlug,
  basePath = 'projects',
}: {
  left: {
    type: 'image' | 'text';
    src?: string;
    value?: string;
    aspectRatio?: AspectRatio;
  };
  right: {
    type: 'image' | 'text';
    src?: string;
    value?: string;
    aspectRatio?: AspectRatio;
  };
  projectSlug: string;
  basePath?: string;
}) {
  const renderSide = (side: typeof left) => {
    if (side.type === 'image' && side.src) {
      return (
        <div
          className={`relative overflow-hidden rounded-lg ${
            aspectRatioClasses[side.aspectRatio || '1:1']
          }`}
        >
          <img
            src={getAssetPath(projectSlug, side.src, basePath)}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      );
    }
    if (side.type === 'text' && side.value) {
      return (
        <p
          className="text-[#B0B0B0] text-center"
          style={{
            fontFamily: 'var(--font-archivo), sans-serif',
            fontWeight: 300,
            fontSize: '16px',
            lineHeight: '1.7',
          }}
        >
          {side.value}
        </p>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 items-center">
      <div>{renderSide(left)}</div>
      <div>{renderSide(right)}</div>
    </div>
  );
}

// Spacer Block Component
function SpacerBlock({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const heights = {
    sm: 'h-8',
    md: 'h-16',
    lg: 'h-24',
  };
  return <div className={heights[size]} />;
}

// GIF Block Component
function GifBlock({
  src,
  caption,
  aspectRatio = '16:9',
  fullWidth = false,
  projectSlug,
  basePath = 'projects',
}: {
  src: string;
  caption?: string;
  aspectRatio?: AspectRatio;
  fullWidth?: boolean;
  projectSlug: string;
  basePath?: string;
}) {
  return (
    <figure className={`my-8 ${fullWidth ? 'w-full' : ''}`}>
      <div
        className={`relative overflow-hidden rounded-lg ${aspectRatioClasses[aspectRatio]}`}
      >
        <img
          src={getAssetPath(projectSlug, src, basePath)}
          alt={caption || ''}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      {caption && (
        <figcaption
          className="text-[#808080] text-center mt-3"
          style={{
            fontFamily: 'var(--font-archivo), sans-serif',
            fontWeight: 300,
            fontSize: '14px',
          }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// Main Project Content Component
export default function ProjectContent({ content, projectSlug, basePath = 'projects' }: ProjectContentProps) {
  return (
    <div className="space-y-6">
      {content.map((block, index) => {
        switch (block.type) {
          case 'text':
            return <TextBlock key={index} value={block.value} />;
          case 'heading':
            return (
              <HeadingBlock
                key={index}
                value={block.value}
                level={block.level}
              />
            );
          case 'image':
            return (
              <ImageBlock
                key={index}
                src={block.src}
                caption={block.caption}
                aspectRatio={block.aspectRatio}
                fullWidth={block.fullWidth}
                projectSlug={projectSlug}
                basePath={basePath}
              />
            );
          case 'gallery':
            return (
              <GalleryBlock
                key={index}
                images={block.images}
                videos={block.videos}
                columns={block.columns}
                projectSlug={projectSlug}
                basePath={basePath}
              />
            );
          case 'video':
            return (
              <VideoBlock
                key={index}
                src={block.src}
                caption={block.caption}
                aspectRatio={block.aspectRatio}
                projectSlug={projectSlug}
                basePath={basePath}
              />
            );
          case 'side-by-side':
            return (
              <SideBySideBlock
                key={index}
                left={block.left}
                right={block.right}
                projectSlug={projectSlug}
                basePath={basePath}
              />
            );
          case 'spacer':
            return <SpacerBlock key={index} size={block.size} />;
          case 'gif':
            return (
              <GifBlock
                key={index}
                src={block.src}
                caption={block.caption}
                aspectRatio={block.aspectRatio}
                fullWidth={block.fullWidth}
                projectSlug={projectSlug}
                basePath={basePath}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
