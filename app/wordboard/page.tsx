'use client';

import { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import { TextShimmerWave } from '@/app/components/motion-primitives/text-shimmer-wave';
import { useGradient } from '../context/gradient-context';
import LiquidMetalButton from '../components/liquid-metal-button';

export default function WordboardPage() {
  const { setColors } = useGradient();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setColors({
      color1: '#F15A22',
      color2: '#004238',
      color3: '#F15A22',
      color4: '#000000',
      color5: '#F15A22',
      color6: '#000000',
      darkBase: '#000000',
    });
  }, [setColors]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage("You're in! I'll reach out when the newsletter is ready.");
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen relative flex flex-col items-center justify-center -mt-16">
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
            Wordboard
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
              Coming soon...maybe?
            </TextShimmerWave>
          </div>

          <div className="max-w-2xl mx-auto mt-8">
            <p
              className="text-white text-center mb-8"
              style={{
                fontFamily: 'var(--font-archivo), sans-serif',
                fontWeight: 200,
                fontSize: '14px',
                lineHeight: '1.5',
              }}
            >
              I've wanted to start a newsletter for a while and see myself doing so in the near future.
              If the ramblings that'll come out of my three braincells are of any interest to you,
              please feel free to submit your email below and I'll shoot across an email whenever it's ready.
              No spam, I promise.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="plsnospam@email.com"
                required
                className="w-full sm:w-80 px-4 py-3 rounded-2xl text-[#E2E2E2] placeholder-[#666] focus:outline-none transition-colors border-none"
                style={{
                  fontFamily: 'var(--font-archivo), sans-serif',
                  fontWeight: 200,
                  fontSize: '14px',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  mixBlendMode: 'multiply',
                }}
                disabled={status === 'loading'}
              />
              <LiquidMetalButton
                type="submit"
                disabled={status === 'loading'}
                className="text-[#666] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                borderRadius={16}
                duration={1}
                style={{
                  fontFamily: 'var(--font-archivo), sans-serif',
                  fontWeight: 200,
                  fontSize: '14px',
                }}
              >
                {status === 'loading' ? '...' : 'submit'}
              </LiquidMetalButton>
            </form>

            {message && (
              <p
                className={`text-center mt-4 ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}
                style={{
                  fontFamily: 'var(--font-archivo), sans-serif',
                  fontWeight: 300,
                  fontSize: '14px',
                }}
              >
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
