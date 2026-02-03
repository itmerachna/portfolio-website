'use client';

import { useEffect } from 'react';
import Navbar from '../components/navbar';
import { FloatingDock } from "@/components/ui/floating-dock";
import { useGradient } from '../context/gradient-context';
import Instagram from '@/app/assets/logos/social/instagram.svg';
import X from '@/app/assets/logos/social/x.svg';
import LinkedIn from '@/app/assets/logos/social/linkedin.svg';
import Contra from '@/app/assets/logos/social/contra.svg';
import GitHub from '@/app/assets/logos/social/github.svg';
import Farcaster from '@/app/assets/logos/social/farcaster.svg';

export default function ContactPage() {
  const { setColors } = useGradient();

  useEffect(() => {
    setColors({
      color1: '#F221D6',
      color2: '#000442',
      color3: '#F221D6',
      color4: '#000000',
      color5: '#FFC014',
      color6: '#000000',
      darkBase: '#000000',
    });
  }, [setColors]);

  const socialItems = [
    {
      title: "Instagram",
      icon: <Instagram className="h-full w-full text-neutral-400" />,
      href: "https://www.instagram.com/rachnaravi/",
    },
    {
      title: "X",
      icon: <X className="h-full w-full text-neutral-400" />,
      href: "https://x.com/itmerachna",
    },
    {
      title: "LinkedIn",
      icon: <LinkedIn className="h-full w-full text-neutral-400" />,
      href: "https://www.linkedin.com/in/rachna-ravi/",
    },
    {
      title: "Contra",
      icon: <Contra className="h-full w-full text-neutral-400" />,
      href: "https://contra.com/rachnaravi/work?r=rachnaravi",
    },
    {
      title: "GitHub",
      icon: <GitHub className="h-full w-full text-neutral-400" />,
      href: "https://github.com/itmerachna",
    },
    {
      title: "Farcaster",
      icon: <Farcaster className="h-full w-full text-neutral-400" />,
      href: "https://farcaster.xyz/rachna",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen relative flex flex-col items-center justify-center -mt-16">
        <div className="relative z-10 text-center">
          {/* Subtitle */}
          <p
            className="text-[#B0B0B0] mb-4"
            style={{
              fontFamily: 'var(--font-archivo), sans-serif',
              fontWeight: 300,
              fontSize: '18px',
            }}
          >
            Wanna talk about a project or just say hi?
          </p>

          {/* Email */}
          <a
            href="mailto:contactrachnaravi@gmail.com"
            className="text-[#E2E2E2] hover:text-white transition-colors"
            style={{
              fontFamily: 'var(--font-archivo), sans-serif',
              fontWeight: 300,
              fontSize: '32px',
              lineHeight: '1.2',
            }}
          >
            contactrachnaravi@gmail.com
          </a>

          {/* Social dock */}
          <div className="mt-6">
            <FloatingDock items={socialItems} desktopClassName="w-full" />
          </div>
        </div>
      </div>
    </>
  );
}
