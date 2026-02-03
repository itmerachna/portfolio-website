'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export interface GradientColors {
  color1: string;
  color2: string;
  color3: string;
  color4: string;
  color5: string;
  color6: string;
  darkBase: string;
}

// Default colors (home page)
const defaultColors: GradientColors = {
  color1: '#F15A22',
  color2: '#0A0E27',
  color3: '#F15A22',
  color4: '#0A0E27',
  color5: '#F15A22',
  color6: '#0A0E27',
  darkBase: '#0A0B0D',
};

interface GradientContextType {
  colors: GradientColors;
  setColors: (colors: Partial<GradientColors>) => void;
}

const GradientContext = createContext<GradientContextType | null>(null);

export function GradientProvider({ children }: { children: ReactNode }) {
  const [colors, setColorsState] = useState<GradientColors>(defaultColors);

  const setColors = useCallback((newColors: Partial<GradientColors>) => {
    setColorsState((prev) => ({ ...prev, ...newColors }));
  }, []);

  return (
    <GradientContext.Provider value={{ colors, setColors }}>
      {children}
    </GradientContext.Provider>
  );
}

export function useGradient() {
  const context = useContext(GradientContext);
  if (!context) {
    throw new Error('useGradient must be used within a GradientProvider');
  }
  return context;
}
