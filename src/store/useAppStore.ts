import { create } from 'zustand';

export interface PortfolioAsset {
  ticker: string;
  weight: number;
  assetClass: string;
}

export interface Settings {
  riskFreeRate: number;
  baseCurrency: string;
  confidenceLevel: 95 | 99;
  demoMode: boolean;
}

interface AppState {
  settings: Settings;
  updateSettings: (s: Partial<Settings>) => void;
  portfolioAssets: PortfolioAsset[];
  setPortfolioAssets: (a: PortfolioAsset[]) => void;
  priceData: { date: string; [key: string]: any }[];
  setPriceData: (d: any[]) => void;
  macroData: { date: string; [key: string]: any }[];
  setMacroData: (d: any[]) => void;
}

export const useAppStore = create<AppState>((set) => ({
  settings: {
    riskFreeRate: 2,
    baseCurrency: 'USD',
    confidenceLevel: 95,
    demoMode: true,
  },
  updateSettings: (s) => set((state) => ({ settings: { ...state.settings, ...s } })),
  portfolioAssets: [],
  setPortfolioAssets: (a) => set({ portfolioAssets: a }),
  priceData: [],
  setPriceData: (d) => set({ priceData: d }),
  macroData: [],
  setMacroData: (d) => set({ macroData: d }),
}));
