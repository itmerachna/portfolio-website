// Project types and utilities

export type AspectRatio = '16:9' | '9:16' | '1:1' | '4:3' | '3:4' | '2500:1309' | '1920:323' | '1800:600' | '5:3' | '1200:630' | '3:2' | '8:3';

export interface TextBlock {
  type: 'text';
  value: string;
}

export interface HeadingBlock {
  type: 'heading';
  value: string;
  level?: 2 | 3; // h2 or h3, defaults to h2
}

export interface ImageBlock {
  type: 'image';
  src: string;
  caption?: string;
  aspectRatio?: AspectRatio;
  fullWidth?: boolean;
}

export interface GalleryBlock {
  type: 'gallery';
  images?: Array<{
    src: string;
    caption?: string;
    aspectRatio?: AspectRatio;
  }>;
  videos?: Array<{
    src: string;
    caption?: string;
    aspectRatio?: AspectRatio;
  }>;
  columns?: 2 | 3 | 4;
}

export interface VideoBlock {
  type: 'video';
  src: string;
  caption?: string;
  aspectRatio?: AspectRatio;
}

export interface SideBySideBlock {
  type: 'side-by-side';
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
}

export interface SpacerBlock {
  type: 'spacer';
  size?: 'sm' | 'md' | 'lg';
}

export interface GifBlock {
  type: 'gif';
  src: string;
  caption?: string;
  aspectRatio?: AspectRatio;
  fullWidth?: boolean;
}

export type ContentBlock =
  | TextBlock
  | HeadingBlock
  | ImageBlock
  | GalleryBlock
  | VideoBlock
  | SideBySideBlock
  | SpacerBlock
  | GifBlock;

export interface ProjectData {
  slug: string;
  title: string;
  category: string;
  description: string;
  thumbnail: string;
  content: ContentBlock[];
}

// Get all project slugs for static generation
export async function getAllProjectSlugs(): Promise<string[]> {
  // Dynamic import for fs (server-side only)
  const fs = await import('fs');
  const path = await import('path');

  const projectsDir = path.join(process.cwd(), 'app/assets/projects');

  try {
    const folders = fs.readdirSync(projectsDir, { withFileTypes: true });
    return folders
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);
  } catch {
    return [];
  }
}

// Get project data by slug
export async function getProjectBySlug(slug: string): Promise<ProjectData | null> {
  const fs = await import('fs');
  const path = await import('path');

  const projectPath = path.join(process.cwd(), 'app/assets/projects', slug, 'data.json');

  try {
    const fileContents = fs.readFileSync(projectPath, 'utf8');
    const data = JSON.parse(fileContents) as ProjectData;
    return { ...data, slug };
  } catch {
    return null;
  }
}

// Get all projects (for listing page)
export async function getAllProjects(): Promise<ProjectData[]> {
  const slugs = await getAllProjectSlugs();
  const projects = await Promise.all(
    slugs.map((slug) => getProjectBySlug(slug))
  );
  return projects.filter((p): p is ProjectData => p !== null);
}

// Helper to get asset path for a project
export function getProjectAssetPath(slug: string, filename: string): string {
  return `/assets/projects/${slug}/${filename}`;
}
