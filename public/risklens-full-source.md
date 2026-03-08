# RiskLens — Full Source Code Export

> Generated on 2026-03-08. React + Vite + TypeScript + Tailwind CSS + shadcn/ui + Zustand + Recharts

---

## package.json

```json
{
  "name": "vite_react_shadcn_ts",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "build:dev": "vite build --mode development",
    "lint": "eslint .",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.10.0",
    "@radix-ui/react-accordion": "^1.2.11",
    "@radix-ui/react-alert-dialog": "^1.1.14",
    "@radix-ui/react-aspect-ratio": "^1.1.7",
    "@radix-ui/react-avatar": "^1.1.10",
    "@radix-ui/react-checkbox": "^1.3.2",
    "@radix-ui/react-collapsible": "^1.1.11",
    "@radix-ui/react-context-menu": "^2.2.15",
    "@radix-ui/react-dialog": "^1.1.14",
    "@radix-ui/react-dropdown-menu": "^2.1.15",
    "@radix-ui/react-hover-card": "^1.1.14",
    "@radix-ui/react-label": "^2.1.7",
    "@radix-ui/react-menubar": "^1.1.15",
    "@radix-ui/react-navigation-menu": "^1.2.13",
    "@radix-ui/react-popover": "^1.1.14",
    "@radix-ui/react-progress": "^1.1.7",
    "@radix-ui/react-radio-group": "^1.3.7",
    "@radix-ui/react-scroll-area": "^1.2.9",
    "@radix-ui/react-select": "^2.2.5",
    "@radix-ui/react-separator": "^1.1.7",
    "@radix-ui/react-slider": "^1.3.5",
    "@radix-ui/react-slot": "^1.2.3",
    "@radix-ui/react-switch": "^1.2.5",
    "@radix-ui/react-tabs": "^1.1.12",
    "@radix-ui/react-toast": "^1.2.14",
    "@radix-ui/react-toggle": "^1.1.9",
    "@radix-ui/react-toggle-group": "^1.1.10",
    "@radix-ui/react-tooltip": "^1.2.7",
    "@tanstack/react-query": "^5.83.0",
    "@types/papaparse": "^5.5.2",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.1.1",
    "date-fns": "^3.6.0",
    "embla-carousel-react": "^8.6.0",
    "framer-motion": "^12.35.1",
    "html-to-image": "^1.11.13",
    "input-otp": "^1.4.2",
    "lucide-react": "^0.462.0",
    "next-themes": "^0.3.0",
    "papaparse": "^5.5.3",
    "react": "^18.3.1",
    "react-day-picker": "^8.10.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.61.1",
    "react-resizable-panels": "^2.1.9",
    "react-router-dom": "^6.30.1",
    "recharts": "^2.15.4",
    "sonner": "^1.7.4",
    "tailwind-merge": "^2.6.0",
    "tailwindcss-animate": "^1.0.7",
    "vaul": "^0.9.9",
    "zod": "^3.25.76",
    "zustand": "^5.0.11"
  },
  "devDependencies": {
    "@eslint/js": "^9.32.0",
    "@testing-library/jest-dom": "^6.6.0",
    "@testing-library/react": "^16.0.0",
    "@tailwindcss/typography": "^0.5.16",
    "@types/node": "^22.16.5",
    "@types/react": "^18.3.23",
    "@types/react-dom": "^18.3.7",
    "@vitejs/plugin-react-swc": "^3.11.0",
    "autoprefixer": "^10.4.21",
    "eslint": "^9.32.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.20",
    "globals": "^15.15.0",
    "jsdom": "^20.0.3",
    "lovable-tagger": "^1.1.13",
    "postcss": "^8.5.6",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.8.3",
    "typescript-eslint": "^8.38.0",
    "vite": "^5.4.19",
    "vitest": "^3.2.4"
  }
}
```

---

## index.html

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>RiskLens — Financial Risk &amp; Data Analysis</title>
    <meta name="description" content="Professional financial risk analysis dashboard with VaR calculator, market risk, DCF valuation, and technical analysis.">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

---

## vite.config.ts

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: { host: "::", port: 8080, hmr: { overlay: false } },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
}));
```

---

## tailwind.config.ts

```ts
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
    extend: {
      fontFamily: { sans: ["Inter", "system-ui", "sans-serif"], mono: ["JetBrains Mono", "monospace"] },
      colors: {
        border: "hsl(var(--border))", input: "hsl(var(--input))", ring: "hsl(var(--ring))",
        background: "hsl(var(--background))", foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        positive: "hsl(var(--chart-positive))", negative: "hsl(var(--chart-negative))",
        warning: "hsl(var(--chart-warning))", info: "hsl(var(--chart-info))", neutral: "hsl(var(--chart-neutral))",
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))", foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))", "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))", "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))", ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: { lg: "var(--radius)", md: "calc(var(--radius) - 2px)", sm: "calc(var(--radius) - 4px)" },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        "pulse-glow": { "0%, 100%": { opacity: "0.4" }, "50%": { opacity: "1" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out", "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
```

---

## tsconfig.json

```json
{
  "compilerOptions": {
    "allowJs": true, "noImplicitAny": false, "noUnusedLocals": false, "noUnusedParameters": false,
    "paths": { "@/*": ["./src/*"] }, "skipLibCheck": true, "strictNullChecks": false
  },
  "files": [],
  "references": [{ "path": "./tsconfig.app.json" }, { "path": "./tsconfig.node.json" }]
}
```

---

## tsconfig.app.json

```json
{
  "compilerOptions": {
    "allowImportingTsExtensions": true, "isolatedModules": true, "jsx": "react-jsx",
    "lib": ["ES2020", "DOM", "DOM.Iterable"], "module": "ESNext", "moduleDetection": "force",
    "moduleResolution": "bundler", "noEmit": true, "noImplicitAny": false, "noUnusedLocals": false,
    "noUnusedParameters": false, "paths": { "@/*": ["./src/*"] }, "skipLibCheck": true, "strict": false,
    "target": "ES2020", "types": ["vitest/globals"], "useDefineForClassFields": true
  },
  "include": ["src"]
}
```

---

## src/index.css

```css
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 220 20% 7%; --foreground: 210 20% 90%;
    --card: 220 18% 10%; --card-foreground: 210 20% 90%;
    --popover: 220 18% 12%; --popover-foreground: 210 20% 90%;
    --primary: 142 70% 45%; --primary-foreground: 220 20% 7%;
    --secondary: 220 16% 16%; --secondary-foreground: 210 20% 80%;
    --muted: 220 14% 14%; --muted-foreground: 215 15% 55%;
    --accent: 38 92% 50%; --accent-foreground: 220 20% 7%;
    --destructive: 0 72% 50%; --destructive-foreground: 210 40% 98%;
    --border: 220 16% 18%; --input: 220 16% 18%; --ring: 142 70% 45%; --radius: 0.5rem;
    --chart-positive: 142 70% 45%; --chart-negative: 0 72% 50%;
    --chart-warning: 38 92% 50%; --chart-info: 210 80% 55%; --chart-neutral: 215 15% 55%;
    --sidebar-background: 220 20% 5%; --sidebar-foreground: 210 20% 75%;
    --sidebar-primary: 142 70% 45%; --sidebar-primary-foreground: 220 20% 7%;
    --sidebar-accent: 220 16% 12%; --sidebar-accent-foreground: 210 20% 90%;
    --sidebar-border: 220 16% 14%; --sidebar-ring: 142 70% 45%;
  }
}

@layer base {
  * { @apply border-border; }
  body { @apply bg-background text-foreground font-sans antialiased; }
}

@layer utilities {
  .font-mono-nums { font-family: 'JetBrains Mono', monospace; font-variant-numeric: tabular-nums; }
  .text-positive { color: hsl(var(--chart-positive)); }
  .text-negative { color: hsl(var(--chart-negative)); }
  .text-warning { color: hsl(var(--chart-warning)); }
  .bg-card-elevated { background-color: hsl(220 18% 12%); }
  .glow-green { box-shadow: 0 0 20px -5px hsl(142 70% 45% / 0.3); }
  .glow-red { box-shadow: 0 0 20px -5px hsl(0 72% 50% / 0.3); }
  .grid-pattern {
    background-image: linear-gradient(hsl(220 16% 14%) 1px, transparent 1px), linear-gradient(90deg, hsl(220 16% 14%) 1px, transparent 1px);
    background-size: 40px 40px;
  }
}

::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: hsl(220 20% 7%); }
::-webkit-scrollbar-thumb { background: hsl(220 16% 22%); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: hsl(220 16% 30%); }
```

---

## src/main.tsx

```tsx
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
createRoot(document.getElementById("root")!).render(<App />);
```

---

## src/App.tsx

```tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import PortfolioPage from "@/pages/PortfolioPage";
import MarketRiskPage from "@/pages/MarketRiskPage";
import MacroPage from "@/pages/MacroPage";
import DCFPage from "@/pages/DCFPage";
import TechnicalPage from "@/pages/TechnicalPage";
import SettingsPage from "@/pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<PortfolioPage />} />
            <Route path="/market-risk" element={<MarketRiskPage />} />
            <Route path="/macro" element={<MacroPage />} />
            <Route path="/dcf" element={<DCFPage />} />
            <Route path="/technical" element={<TechnicalPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DashboardLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
```

---

## src/store/useAppStore.ts

```tsx
import { create } from 'zustand';

export interface PortfolioAsset { ticker: string; weight: number; assetClass: string; }
export interface Settings { riskFreeRate: number; baseCurrency: string; confidenceLevel: 95 | 99; demoMode: boolean; }

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
  settings: { riskFreeRate: 2, baseCurrency: 'USD', confidenceLevel: 95, demoMode: true },
  updateSettings: (s) => set((state) => ({ settings: { ...state.settings, ...s } })),
  portfolioAssets: [],
  setPortfolioAssets: (a) => set({ portfolioAssets: a }),
  priceData: [],
  setPriceData: (d) => set({ priceData: d }),
  macroData: [],
  setMacroData: (d) => set({ macroData: d }),
}));
```

---

## src/lib/utils.ts

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
```

---

## src/lib/calculations.ts

```ts
export function mean(arr: number[]): number {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

export function stdDev(arr: number[]): number {
  const m = mean(arr);
  return Math.sqrt(arr.reduce((s, v) => s + (v - m) ** 2, 0) / (arr.length - 1));
}

export function percentile(arr: number[], p: number): number {
  const sorted = [...arr].sort((a, b) => a - b);
  const idx = (p / 100) * (sorted.length - 1);
  const lower = Math.floor(idx);
  const frac = idx - lower;
  return sorted[lower] + frac * ((sorted[lower + 1] ?? sorted[lower]) - sorted[lower]);
}

function normInv(p: number): number {
  const a = [-3.969683028665376e1, 2.209460984245205e2, -2.759285104469687e2, 1.383577518672690e2, -3.066479806614716e1, 2.506628277459239e0];
  const b = [-5.447609879822406e1, 1.615858368580409e2, -1.556989798598866e2, 6.680131188771972e1, -1.328068155288572e1];
  const c = [-7.784894002430293e-3, -3.223964580411365e-1, -2.400758277161838e0, -2.549732539343734e0, 4.374664141464968e0, 2.938163982698783e0];
  const d = [7.784695709041462e-3, 3.224671290700398e-1, 2.445134137142996e0, 3.754408661907416e0];
  const pLow = 0.02425, pHigh = 1 - pLow;
  let q: number, r: number;
  if (p < pLow) {
    q = Math.sqrt(-2 * Math.log(p));
    return (((((c[0]*q+c[1])*q+c[2])*q+c[3])*q+c[4])*q+c[5]) / ((((d[0]*q+d[1])*q+d[2])*q+d[3])*q+1);
  } else if (p <= pHigh) {
    q = p - 0.5; r = q * q;
    return (((((a[0]*r+a[1])*r+a[2])*r+a[3])*r+a[4])*r+a[5])*q / (((((b[0]*r+b[1])*r+b[2])*r+b[3])*r+b[4])*r+1);
  } else {
    q = Math.sqrt(-2 * Math.log(1 - p));
    return -(((((c[0]*q+c[1])*q+c[2])*q+c[3])*q+c[4])*q+c[5]) / ((((d[0]*q+d[1])*q+d[2])*q+d[3])*q+1);
  }
}

export function historicalVaR(returns: number[], confidence: number): number { return -percentile(returns, 100 - confidence); }

export function parametricVaR(returns: number[], confidence: number): number {
  const m = mean(returns); const s = stdDev(returns); const z = -normInv(1 - confidence / 100);
  return -(m - z * s);
}

export function scaledVaR(oneDayVaR: number, days: number): number { return oneDayVaR * Math.sqrt(days); }

export function sharpeRatio(returns: number[], riskFreeRate: number): number {
  const annualReturn = mean(returns) * 252; const annualVol = stdDev(returns) * Math.sqrt(252);
  return (annualReturn - riskFreeRate / 100) / annualVol;
}

export function maxDrawdown(returns: number[]): number {
  let cumReturn = 1, peak = 1, maxDD = 0;
  for (const r of returns) { cumReturn *= (1 + r); peak = Math.max(peak, cumReturn); maxDD = Math.max(maxDD, (peak - cumReturn) / peak); }
  return maxDD;
}

export function rollingVolatility(returns: number[], window: number): (number | null)[] {
  return returns.map((_, i) => { if (i < window - 1) return null; return stdDev(returns.slice(i - window + 1, i + 1)) * Math.sqrt(252); });
}

export function computeReturns(prices: number[]): number[] {
  return prices.slice(1).map((p, i) => (p - prices[i]) / prices[i]);
}

export function sma(data: number[], period: number): (number | null)[] {
  return data.map((_, i) => { if (i < period - 1) return null; return mean(data.slice(i - period + 1, i + 1)); });
}

export function ema(data: number[], period: number): number[] {
  const k = 2 / (period + 1); const result: number[] = [data[0]];
  for (let i = 1; i < data.length; i++) { result.push(data[i] * k + result[i - 1] * (1 - k)); }
  return result;
}

export function rsi(data: number[], period: number = 14): (number | null)[] {
  const returns = data.slice(1).map((v, i) => v - data[i]);
  const result: (number | null)[] = new Array(period + 1).fill(null);
  let avgGain = 0, avgLoss = 0;
  for (let i = 0; i < period; i++) { if (returns[i] > 0) avgGain += returns[i]; else avgLoss -= returns[i]; }
  avgGain /= period; avgLoss /= period;
  result.push(avgLoss === 0 ? 100 : 100 - 100 / (1 + avgGain / avgLoss));
  for (let i = period; i < returns.length; i++) {
    const gain = returns[i] > 0 ? returns[i] : 0; const loss = returns[i] < 0 ? -returns[i] : 0;
    avgGain = (avgGain * (period - 1) + gain) / period; avgLoss = (avgLoss * (period - 1) + loss) / period;
    result.push(avgLoss === 0 ? 100 : 100 - 100 / (1 + avgGain / avgLoss));
  }
  return result;
}

export function macd(data: number[], fast = 12, slow = 26, signal = 9) {
  const emaFast = ema(data, fast); const emaSlow = ema(data, slow);
  const macdLine = emaFast.map((v, i) => v - emaSlow[i]);
  const signalLine = ema(macdLine, signal);
  const histogram = macdLine.map((v, i) => v - signalLine[i]);
  return { macdLine, signalLine, histogram };
}

export function bollingerBands(data: number[], period = 20, multiplier = 2) {
  return data.map((_, i) => {
    if (i < period - 1) return { upper: null, middle: null, lower: null };
    const slice = data.slice(i - period + 1, i + 1); const m = mean(slice); const s = stdDev(slice);
    return { upper: m + multiplier * s, middle: m, lower: m - multiplier * s };
  });
}

export function calculateDCF(fcfs: number[], terminalGrowthRate: number, wacc: number, netDebt: number, sharesOutstanding: number) {
  const waccDec = wacc / 100; const tgrDec = terminalGrowthRate / 100;
  const pvFCFs = fcfs.map((fcf, i) => ({ year: i + 1, fcf, pv: fcf / Math.pow(1 + waccDec, i + 1) }));
  const lastFCF = fcfs[fcfs.length - 1];
  const terminalValue = (lastFCF * (1 + tgrDec)) / (waccDec - tgrDec);
  const pvTerminal = terminalValue / Math.pow(1 + waccDec, fcfs.length);
  const enterpriseValue = pvFCFs.reduce((s, v) => s + v.pv, 0) + pvTerminal;
  const equityValue = enterpriseValue - netDebt;
  const intrinsicValue = equityValue / sharesOutstanding;
  return { pvFCFs, terminalValue, pvTerminal, enterpriseValue, equityValue, intrinsicValue };
}

export function dcfSensitivity(fcfs: number[], terminalGrowthRate: number, wacc: number, netDebt: number, sharesOutstanding: number,
  waccRange: number[] = [7, 8, 9, 9.5, 10, 11, 12], tgrRange: number[] = [1, 1.5, 2, 2.5, 3, 3.5, 4]) {
  return waccRange.map(w => ({ wacc: w, values: tgrRange.map(t => ({ tgr: t, value: calculateDCF(fcfs, t, w, netDebt, sharesOutstanding).intrinsicValue })) }));
}

export function calculateWACC(costOfEquity: number, costOfDebt: number, taxRate: number, debtToEquity: number): number {
  const E = 1 / (1 + debtToEquity); const D = debtToEquity / (1 + debtToEquity);
  return E * costOfEquity + D * costOfDebt * (1 - taxRate / 100);
}
```

---

## src/lib/alphaVantage.ts

```ts
const BASE_URL = 'https://www.alphavantage.co/query';

export interface AlphaVantageDaily { date: string; open: number; high: number; low: number; close: number; volume: number; }

export async function fetchDailyPrices(ticker: string, apiKey: string): Promise<AlphaVantageDaily[]> {
  const url = `${BASE_URL}?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${encodeURIComponent(ticker)}&outputsize=full&apikey=${encodeURIComponent(apiKey)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API request failed: ${res.status}`);
  const json = await res.json();
  if (json['Error Message']) throw new Error(json['Error Message']);
  if (json['Note']) throw new Error('API rate limit reached. Free tier allows 25 requests/day.');
  if (json['Information']) throw new Error(json['Information']);
  const timeSeries = json['Time Series (Daily)'];
  if (!timeSeries) throw new Error('No data returned for this ticker');
  return Object.entries(timeSeries)
    .map(([date, vals]: [string, any]) => ({
      date, open: parseFloat(vals['1. open']), high: parseFloat(vals['2. high']),
      low: parseFloat(vals['3. low']), close: parseFloat(vals['5. adjusted close'] || vals['4. close']),
      volume: parseInt(vals['6. volume'] || vals['5. volume'], 10),
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

export async function validateApiKey(apiKey: string): Promise<boolean> {
  try {
    const url = `${BASE_URL}?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&apikey=${encodeURIComponent(apiKey)}&outputsize=compact`;
    const res = await fetch(url); const json = await res.json();
    return !!json['Time Series (Daily)'];
  } catch { return false; }
}

export function getApiKey(): string { return localStorage.getItem('alphaVantageApiKey') || ''; }
export function setApiKey(key: string): void { localStorage.setItem('alphaVantageApiKey', key); }
export function getDefaultTicker(): string { return localStorage.getItem('defaultTicker') || 'AAPL'; }
export function setDefaultTicker(ticker: string): void { localStorage.setItem('defaultTicker', ticker); }
```

---

## src/lib/sampleData.ts

```ts
import { PortfolioAsset } from '@/store/useAppStore';

function seededRandom(seed: number) {
  let s = seed;
  return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
}

export const SAMPLE_PORTFOLIO: PortfolioAsset[] = [
  { ticker: 'AAPL', weight: 25, assetClass: 'Equity' },
  { ticker: 'MSFT', weight: 20, assetClass: 'Equity' },
  { ticker: 'GOOGL', weight: 20, assetClass: 'Equity' },
  { ticker: 'BND', weight: 20, assetClass: 'Bond' },
  { ticker: 'GLD', weight: 15, assetClass: 'Commodity' },
];

export function generateDailyReturns(days: number, meanReturn: number, volatility: number, seed: number) {
  const rand = seededRandom(seed); const returns: number[] = [];
  for (let i = 0; i < days; i++) {
    const u1 = rand(); const u2 = rand();
    const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    returns.push(meanReturn + volatility * z);
  }
  return returns;
}

export function generateSamplePortfolioReturns(): { date: string; returns: Record<string, number>; portfolioReturn: number }[] {
  const tickers = SAMPLE_PORTFOLIO.map(a => a.ticker);
  const weights = SAMPLE_PORTFOLIO.map(a => a.weight / 100);
  const params: Record<string, { mean: number; vol: number; seed: number }> = {
    AAPL: { mean: 0.0008, vol: 0.018, seed: 42 }, MSFT: { mean: 0.0007, vol: 0.016, seed: 137 },
    GOOGL: { mean: 0.0006, vol: 0.02, seed: 256 }, BND: { mean: 0.0001, vol: 0.003, seed: 512 },
    GLD: { mean: 0.0003, vol: 0.01, seed: 777 },
  };
  const days = 504;
  const allReturns: Record<string, number[]> = {};
  tickers.forEach(t => { const p = params[t]; allReturns[t] = generateDailyReturns(days, p.mean, p.vol, p.seed); });
  const startDate = new Date('2024-01-02');
  const data: { date: string; returns: Record<string, number>; portfolioReturn: number }[] = [];
  for (let i = 0; i < days; i++) {
    const d = new Date(startDate); d.setDate(d.getDate() + Math.floor(i * 365 * 2 / days));
    const dayReturns: Record<string, number> = {}; let portRet = 0;
    tickers.forEach((t, idx) => { dayReturns[t] = allReturns[t][i]; portRet += weights[idx] * allReturns[t][i]; });
    data.push({ date: d.toISOString().split('T')[0], returns: dayReturns, portfolioReturn: portRet });
  }
  return data;
}

export function generateOHLCV(days: number, startPrice: number, seed: number) {
  const rand = seededRandom(seed);
  const data: { date: string; open: number; high: number; low: number; close: number; volume: number }[] = [];
  let price = startPrice; const startDate = new Date('2025-01-02');
  for (let i = 0; i < days; i++) {
    const d = new Date(startDate); d.setDate(d.getDate() + i);
    if (d.getDay() === 0 || d.getDay() === 6) continue;
    const open = price; const change = (rand() - 0.48) * 0.03 * price; const close = price + change;
    const high = Math.max(open, close) + rand() * 0.01 * price;
    const low = Math.min(open, close) - rand() * 0.01 * price;
    const volume = Math.floor(1000000 + rand() * 5000000);
    data.push({ date: d.toISOString().split('T')[0], open: +open.toFixed(2), high: +high.toFixed(2), low: +low.toFixed(2), close: +close.toFixed(2), volume });
    price = close;
  }
  return data;
}

export function generateMacroData() {
  const rand = seededRandom(999);
  const data: { date: string; gdpGrowth: number; cpi: number; interestRate: number; unemployment: number }[] = [];
  let gdp = 2.5, cpi = 3.2, ir = 5.25, unemp = 3.7; const startDate = new Date('2020-01-01');
  for (let i = 0; i < 60; i++) {
    const d = new Date(startDate); d.setMonth(d.getMonth() + i);
    gdp += (rand() - 0.5) * 0.4; cpi += (rand() - 0.48) * 0.3; ir += (rand() - 0.5) * 0.15; unemp += (rand() - 0.5) * 0.2;
    gdp = Math.max(-2, Math.min(6, gdp)); cpi = Math.max(0, Math.min(9, cpi));
    ir = Math.max(0, Math.min(8, ir)); unemp = Math.max(2, Math.min(8, unemp));
    data.push({ date: d.toISOString().split('T')[0], gdpGrowth: +gdp.toFixed(2), cpi: +cpi.toFixed(2), interestRate: +ir.toFixed(2), unemployment: +unemp.toFixed(2) });
  }
  return data;
}

export const SAMPLE_DCF = {
  companyName: 'TechCorp AG', currentPrice: 145, sharesOutstanding: 500,
  fcfProjections: [800, 880, 960, 1050, 1150, 1250, 1360, 1480, 1610, 1750],
  terminalGrowthRate: 2.5, wacc: 9.5, costOfEquity: 11, costOfDebt: 4.5,
  taxRate: 21, debtToEquity: 0.4, netDebt: 5000,
};
```

---

## src/components/DashboardLayout.tsx

```tsx
import { ReactNode } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { useAppStore } from '@/store/useAppStore';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface DashboardLayoutProps { children: ReactNode; }

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { settings, updateSettings } = useAppStore();
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-12 flex items-center justify-between border-b border-border px-4 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
              <div className="h-4 w-px bg-border" />
              <span className="text-xs text-muted-foreground font-mono">
                {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Label htmlFor="demo-mode" className="text-xs text-muted-foreground">Demo</Label>
                <Switch id="demo-mode" checked={settings.demoMode} onCheckedChange={(v) => updateSettings({ demoMode: v })} className="data-[state=checked]:bg-primary" />
              </div>
              <div className="text-xs font-mono text-muted-foreground">{settings.baseCurrency} | {settings.confidenceLevel}% CL</div>
            </div>
          </header>
          <main className="flex-1 p-6 overflow-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
```

---

## src/components/AppSidebar.tsx

```tsx
import { Briefcase, TrendingUp, Globe, Settings, BarChart3, Activity, Zap } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useAppStore } from '@/store/useAppStore';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter, useSidebar } from '@/components/ui/sidebar';

const mainNav = [
  { title: 'Portfolio & VaR', url: '/', icon: Briefcase },
  { title: 'Market Risk', url: '/market-risk', icon: TrendingUp },
  { title: 'Macro Data', url: '/macro', icon: Globe },
];
const analysisNav = [
  { title: 'DCF Valuation', url: '/dcf', icon: BarChart3 },
  { title: 'Technical Analysis', url: '/technical', icon: Activity },
];
const settingsNav = [{ title: 'Settings', url: '/settings', icon: Settings }];

export function AppSidebar() {
  const { state } = useSidebar(); const collapsed = state === 'collapsed';
  const { settings } = useAppStore();
  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarHeader className="p-4">
        {!collapsed ? (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center"><Zap className="h-5 w-5 text-primary-foreground" /></div>
            <div><h1 className="text-sm font-semibold text-foreground">RiskLens</h1><p className="text-[10px] text-muted-foreground">Financial Analytics</p></div>
          </div>
        ) : (<div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center mx-auto"><Zap className="h-5 w-5 text-primary-foreground" /></div>)}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup><SidebarGroupLabel>Risk Analysis</SidebarGroupLabel><SidebarGroupContent><SidebarMenu>
          {mainNav.map((item) => (<SidebarMenuItem key={item.url}><SidebarMenuButton asChild><NavLink to={item.url} end={item.url === '/'} className="hover:bg-muted/50" activeClassName="bg-primary/10 text-primary font-medium"><item.icon className="mr-2 h-4 w-4" />{!collapsed && <span>{item.title}</span>}</NavLink></SidebarMenuButton></SidebarMenuItem>))}
        </SidebarMenu></SidebarGroupContent></SidebarGroup>
        <SidebarGroup><SidebarGroupLabel>Analysis</SidebarGroupLabel><SidebarGroupContent><SidebarMenu>
          {analysisNav.map((item) => (<SidebarMenuItem key={item.url}><SidebarMenuButton asChild><NavLink to={item.url} className="hover:bg-muted/50" activeClassName="bg-primary/10 text-primary font-medium"><item.icon className="mr-2 h-4 w-4" />{!collapsed && <span>{item.title}</span>}</NavLink></SidebarMenuButton></SidebarMenuItem>))}
        </SidebarMenu></SidebarGroupContent></SidebarGroup>
        <SidebarGroup><SidebarGroupContent><SidebarMenu>
          {settingsNav.map((item) => (<SidebarMenuItem key={item.url}><SidebarMenuButton asChild><NavLink to={item.url} className="hover:bg-muted/50" activeClassName="bg-primary/10 text-primary font-medium"><item.icon className="mr-2 h-4 w-4" />{!collapsed && <span>{item.title}</span>}</NavLink></SidebarMenuButton></SidebarMenuItem>))}
        </SidebarMenu></SidebarGroupContent></SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-3">
        {!collapsed && settings.demoMode && (<div className="text-[10px] text-muted-foreground text-center"><span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-mono">DEMO MODE</span></div>)}
      </SidebarFooter>
    </Sidebar>
  );
}
```

---

## src/components/MetricCard.tsx

```tsx
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface MetricCardProps { label: string; value: string; subValue?: string; variant?: 'default' | 'positive' | 'negative' | 'warning'; icon?: ReactNode; }
const variantClasses = { default: 'border-border', positive: 'border-positive/30 glow-green', negative: 'border-negative/30 glow-red', warning: 'border-warning/30' };

export function MetricCard({ label, value, subValue, variant = 'default', icon }: MetricCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`bg-card border rounded-lg p-4 ${variantClasses[variant]}`}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-muted-foreground uppercase tracking-wider">{label}</span>
        {icon && <span className="text-muted-foreground">{icon}</span>}
      </div>
      <div className="font-mono text-2xl font-semibold text-foreground">{value}</div>
      {subValue && <div className="text-xs text-muted-foreground mt-1 font-mono">{subValue}</div>}
    </motion.div>
  );
}
```

---

## src/components/ChartExportButton.tsx

```tsx
import { useCallback } from 'react';
import { toPng } from 'html-to-image';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChartExportButtonProps { targetRef: React.RefObject<HTMLDivElement>; filename?: string; }

export function ChartExportButton({ targetRef, filename = 'chart' }: ChartExportButtonProps) {
  const handleExport = useCallback(async () => {
    if (!targetRef.current) return;
    try { const dataUrl = await toPng(targetRef.current, { backgroundColor: '#111318' }); const link = document.createElement('a'); link.download = `${filename}.png`; link.href = dataUrl; link.click(); }
    catch (e) { console.error('Export failed', e); }
  }, [targetRef, filename]);
  return (<Button variant="ghost" size="sm" onClick={handleExport} className="text-muted-foreground hover:text-foreground"><Download className="h-4 w-4 mr-1" />Export</Button>);
}
```

---

## src/components/CsvUploader.tsx

```tsx
import { useCallback, useState, ReactNode } from 'react';
import Papa from 'papaparse';
import { Upload } from 'lucide-react';

interface CsvUploaderProps { onData: (data: any[]) => void; children?: ReactNode; accept?: string; }

export function CsvUploader({ onData, children, accept = '.csv' }: CsvUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const handleFile = useCallback((file: File) => {
    setFileName(file.name);
    Papa.parse(file, { header: true, dynamicTyping: true, skipEmptyLines: true, complete: (results) => { onData(results.data); } });
  }, [onData]);
  const handleDrop = useCallback((e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); const file = e.dataTransfer.files[0]; if (file) handleFile(file); }, [handleFile]);
  return (
    <div onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }} onDragLeave={() => setIsDragging(false)} onDrop={handleDrop}
      className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${isDragging ? 'border-primary bg-primary/5' : 'border-border hover:border-muted-foreground'}`}>
      <input type="file" accept={accept} onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} className="hidden" id="csv-upload" />
      <label htmlFor="csv-upload" className="cursor-pointer">
        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
        {fileName ? <p className="text-sm text-primary font-mono">{fileName}</p> : <><p className="text-sm text-muted-foreground">Drag & drop CSV or click to upload</p>{children}</>}
      </label>
    </div>
  );
}
```

---

## src/components/TickerSearch.tsx

```tsx
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2 } from 'lucide-react';

interface TickerSearchProps { onSearch: (ticker: string) => void; loading?: boolean; defaultValue?: string; placeholder?: string; }

export function TickerSearch({ onSearch, loading, defaultValue = '', placeholder = 'Enter ticker (e.g. AAPL)' }: TickerSearchProps) {
  const [ticker, setTicker] = useState(defaultValue);
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if (ticker.trim()) onSearch(ticker.trim().toUpperCase()); };
  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center">
      <div className="relative flex-1 max-w-xs"><Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input value={ticker} onChange={e => setTicker(e.target.value)} placeholder={placeholder} className="pl-8 h-9 font-mono uppercase" /></div>
      <Button type="submit" size="sm" disabled={loading || !ticker.trim()} className="h-9">{loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Fetch'}</Button>
    </form>
  );
}
```

---

## src/components/DemoDataNotice.tsx

```tsx
import { AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

export function DemoDataNotice() {
  return (
    <div className="flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-lg px-4 py-2.5 text-sm">
      <AlertTriangle className="h-4 w-4 text-accent shrink-0" />
      <span className="text-accent-foreground">Showing demo data — <Link to="/settings" className="underline text-accent hover:text-accent/80">add API key in Settings</Link> for real data</span>
    </div>
  );
}
```

---

## src/components/SampleCsvDownload.tsx

```tsx
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SampleCsvDownloadProps { type: 'price' | 'portfolio'; }

const PRICE_CSV = `date,open,high,low,close,volume\n2025-01-02,150.00,152.50,149.20,151.80,1200000\n2025-01-03,151.80,153.00,150.50,152.40,1350000\n2025-01-06,152.40,154.10,151.90,153.70,1100000`;
const PORTFOLIO_CSV = `date,AAPL,MSFT,GOOGL,BND,GLD\n2024-01-02,0.0012,-0.0008,0.0015,0.0001,0.0003\n2024-01-03,0.0023,0.0018,-0.0005,-0.0002,0.0011\n2024-01-04,-0.0015,0.0009,0.0022,0.0003,-0.0007`;

export function SampleCsvDownload({ type }: SampleCsvDownloadProps) {
  const csv = type === 'price' ? PRICE_CSV : PORTFOLIO_CSV;
  const filename = type === 'price' ? 'sample_prices.csv' : 'sample_portfolio_returns.csv';
  const download = () => { const blob = new Blob([csv], { type: 'text/csv' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = filename; a.click(); URL.revokeObjectURL(url); };
  return (<Button variant="ghost" size="sm" onClick={download} className="text-xs text-muted-foreground h-7 gap-1"><Download className="h-3 w-3" />Download sample CSV</Button>);
}
```

---

## src/components/NavLink.tsx

```tsx
import { NavLink as RouterNavLink, NavLinkProps } from "react-router-dom";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkCompatProps extends Omit<NavLinkProps, "className"> { className?: string; activeClassName?: string; pendingClassName?: string; }

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName, to, ...props }, ref) => (
    <RouterNavLink ref={ref} to={to} className={({ isActive, isPending }) => cn(className, isActive && activeClassName, isPending && pendingClassName)} {...props} />
  ),
);
NavLink.displayName = "NavLink";
export { NavLink };
```

---

## src/pages/PortfolioPage.tsx

```tsx
import { useState, useMemo, useRef, useCallback } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { SAMPLE_PORTFOLIO, generateSamplePortfolioReturns } from '@/lib/sampleData';
import { historicalVaR, parametricVaR, scaledVaR, sharpeRatio, maxDrawdown, stdDev, mean } from '@/lib/calculations';
import { fetchDailyPrices, getApiKey } from '@/lib/alphaVantage';
import { MetricCard } from '@/components/MetricCard';
import { ChartExportButton } from '@/components/ChartExportButton';
import { CsvUploader } from '@/components/CsvUploader';
import { SampleCsvDownload } from '@/components/SampleCsvDownload';
import { DemoDataNotice } from '@/components/DemoDataNotice';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Plus, AlertTriangle, Shield, TrendingDown, Loader2 } from 'lucide-react';
import { PortfolioAsset } from '@/store/useAppStore';
import { toast } from 'sonner';

const PIE_COLORS = ['hsl(142,70%,45%)', 'hsl(210,80%,55%)', 'hsl(38,92%,50%)', 'hsl(280,60%,55%)', 'hsl(0,72%,50%)'];

export default function PortfolioPage() {
  const { settings, portfolioAssets, setPortfolioAssets } = useAppStore();
  const chartRef = useRef<HTMLDivElement>(null);
  const [newTicker, setNewTicker] = useState('');
  const [newWeight, setNewWeight] = useState('');
  const [newAssetClass, setNewAssetClass] = useState('Equity');
  const [loading, setLoading] = useState(false);
  const [liveReturns, setLiveReturns] = useState<{ date: string; returns: Record<string, number>; portfolioReturn: number }[] | null>(null);
  const [csvReturns, setCsvReturns] = useState<{ date: string; returns: Record<string, number>; portfolioReturn: number }[] | null>(null);

  const assets = settings.demoMode && portfolioAssets.length === 0 ? SAMPLE_PORTFOLIO : portfolioAssets.length > 0 ? portfolioAssets : SAMPLE_PORTFOLIO;
  const useDemo = settings.demoMode && !liveReturns && !csvReturns && portfolioAssets.length === 0;
  const sampleData = useMemo(() => generateSamplePortfolioReturns(), []);

  const portfolioReturns = useMemo(() => {
    if (liveReturns) return liveReturns.map(d => d.portfolioReturn);
    if (csvReturns) return csvReturns.map(d => d.portfolioReturn);
    return sampleData.map(d => d.portfolioReturn);
  }, [liveReturns, csvReturns, sampleData]);

  const var95hist = useMemo(() => historicalVaR(portfolioReturns, 95), [portfolioReturns]);
  const var99hist = useMemo(() => historicalVaR(portfolioReturns, 99), [portfolioReturns]);
  const var95param = useMemo(() => parametricVaR(portfolioReturns, 95), [portfolioReturns]);
  const var99param = useMemo(() => parametricVaR(portfolioReturns, 99), [portfolioReturns]);
  const vol = useMemo(() => stdDev(portfolioReturns) * Math.sqrt(252), [portfolioReturns]);
  const sr = useMemo(() => sharpeRatio(portfolioReturns, settings.riskFreeRate), [portfolioReturns, settings.riskFreeRate]);
  const mdd = useMemo(() => maxDrawdown(portfolioReturns), [portfolioReturns]);

  const histogramData = useMemo(() => {
    const bins = 50; const min = Math.min(...portfolioReturns); const max = Math.max(...portfolioReturns);
    const binWidth = (max - min) / bins; const counts = new Array(bins).fill(0);
    portfolioReturns.forEach(r => { const idx = Math.min(Math.floor((r - min) / binWidth), bins - 1); counts[idx]++; });
    return counts.map((count, i) => ({
      return: +(min + (i + 0.5) * binWidth).toFixed(4), returnLabel: ((min + (i + 0.5) * binWidth) * 100).toFixed(2) + '%',
      count, isVaR95: (min + (i + 0.5) * binWidth) <= -var95hist, isVaR99: (min + (i + 0.5) * binWidth) <= -var99hist,
    }));
  }, [portfolioReturns, var95hist, var99hist]);

  const addAsset = () => {
    if (!newTicker || !newWeight) return;
    setPortfolioAssets([...portfolioAssets, { ticker: newTicker.toUpperCase(), weight: parseFloat(newWeight), assetClass: newAssetClass }]);
    setNewTicker(''); setNewWeight('');
  };
  const removeAsset = (idx: number) => setPortfolioAssets(portfolioAssets.filter((_, i) => i !== idx));

  const fetchPortfolioData = useCallback(async () => {
    const apiKey = getApiKey();
    if (!apiKey) { toast.error('Add your Alpha Vantage API key in Settings first'); return; }
    if (assets.length === 0) return;
    setLoading(true);
    try {
      const weights = assets.map(a => a.weight / 100);
      const allPrices: Record<string, { date: string; close: number }[]> = {};
      for (const asset of assets) { const data = await fetchDailyPrices(asset.ticker, apiKey); allPrices[asset.ticker] = data.slice(-504); }
      const dateSets = Object.values(allPrices).map(prices => new Set(prices.map(p => p.date)));
      const commonDates = [...dateSets[0]].filter(d => dateSets.every(s => s.has(d))).sort();
      const priceByDate: Record<string, Record<string, number>> = {};
      for (const [ticker, prices] of Object.entries(allPrices)) { for (const p of prices) { if (!priceByDate[p.date]) priceByDate[p.date] = {}; priceByDate[p.date][ticker] = p.close; } }
      const result: { date: string; returns: Record<string, number>; portfolioReturn: number }[] = [];
      for (let i = 1; i < commonDates.length; i++) {
        const today = commonDates[i]; const yesterday = commonDates[i - 1];
        const dayReturns: Record<string, number> = {}; let portRet = 0;
        assets.forEach((a, idx) => { const ret = (priceByDate[today][a.ticker] - priceByDate[yesterday][a.ticker]) / priceByDate[yesterday][a.ticker]; dayReturns[a.ticker] = ret; portRet += weights[idx] * ret; });
        result.push({ date: today, returns: dayReturns, portfolioReturn: portRet });
      }
      setLiveReturns(result); setCsvReturns(null);
      toast.success(`Fetched real data for ${assets.length} assets (${result.length} days)`);
    } catch (err: any) { toast.error(err.message || 'Failed to fetch portfolio data'); }
    finally { setLoading(false); }
  }, [assets]);

  const handleCsvUpload = useCallback((data: any[]) => {
    if (data.length === 0) return;
    const headers = Object.keys(data[0]).filter(h => h.toLowerCase() !== 'date');
    if (portfolioAssets.length === 0) { const equalWeight = +(100 / headers.length).toFixed(1); setPortfolioAssets(headers.map(t => ({ ticker: t, weight: equalWeight, assetClass: 'Equity' }))); }
    const weights = headers.map((_, i) => { const asset = portfolioAssets.find(a => a.ticker === headers[i]); return asset ? asset.weight / 100 : 1 / headers.length; });
    const result = data.map((row: any) => {
      const dayReturns: Record<string, number> = {}; let portRet = 0;
      headers.forEach((t, idx) => { const val = parseFloat(row[t] || 0); dayReturns[t] = val; portRet += weights[idx] * val; });
      return { date: row.date || row.Date, returns: dayReturns, portfolioReturn: portRet };
    });
    setCsvReturns(result); setLiveReturns(null);
    toast.success(`Loaded ${result.length} days for ${headers.length} assets from CSV`);
  }, [portfolioAssets, setPortfolioAssets]);

  const totalWeight = assets.reduce((s, a) => s + a.weight, 0);

  return (
    <div className="space-y-6 max-w-7xl">
      <div><h1 className="text-2xl font-semibold text-foreground">Portfolio & VaR Calculator</h1><p className="text-sm text-muted-foreground mt-1">Calculate Value at Risk and key portfolio risk metrics</p></div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card border border-border rounded-lg p-5">
          <h2 className="text-sm font-medium text-foreground mb-4">Portfolio Holdings</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm"><thead><tr className="border-b border-border"><th className="text-left py-2 text-muted-foreground font-medium">Ticker</th><th className="text-left py-2 text-muted-foreground font-medium">Weight (%)</th><th className="text-left py-2 text-muted-foreground font-medium">Asset Class</th><th className="py-2 w-10"></th></tr></thead>
              <tbody>{assets.map((a, i) => (<tr key={i} className="border-b border-border/50"><td className="py-2 font-mono font-medium text-foreground">{a.ticker}</td><td className="py-2 font-mono">{a.weight}%</td><td className="py-2"><span className="px-2 py-0.5 rounded text-xs bg-secondary text-secondary-foreground">{a.assetClass}</span></td><td className="py-2"><button onClick={() => removeAsset(i)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button></td></tr>))}</tbody>
            </table>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs font-mono"><span className="text-muted-foreground">Total Weight:</span><span className={totalWeight === 100 ? 'text-positive' : 'text-warning'}>{totalWeight}%</span></div>
          <div className="mt-4 flex gap-2 items-end flex-wrap">
            <div><label className="text-xs text-muted-foreground">Ticker</label><Input value={newTicker} onChange={e => setNewTicker(e.target.value)} placeholder="AAPL" className="h-8 w-24 font-mono" /></div>
            <div><label className="text-xs text-muted-foreground">Weight %</label><Input value={newWeight} onChange={e => setNewWeight(e.target.value)} type="number" placeholder="20" className="h-8 w-20 font-mono" /></div>
            <div><label className="text-xs text-muted-foreground">Class</label><Select value={newAssetClass} onValueChange={setNewAssetClass}><SelectTrigger className="h-8 w-28"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Equity">Equity</SelectItem><SelectItem value="Bond">Bond</SelectItem><SelectItem value="Commodity">Commodity</SelectItem><SelectItem value="FX">FX</SelectItem></SelectContent></Select></div>
            <Button size="sm" onClick={addAsset} className="h-8"><Plus className="h-4 w-4 mr-1" />Add</Button>
          </div>
          <div className="mt-4 flex gap-2 items-center flex-wrap">
            <Button size="sm" variant="outline" onClick={fetchPortfolioData} disabled={loading} className="h-8 gap-1">{loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}Fetch Real Data for Portfolio</Button>
            <span className="text-xs text-muted-foreground">or</span><SampleCsvDownload type="portfolio" />
          </div>
          <div className="mt-4"><CsvUploader onData={handleCsvUpload}><p className="text-xs text-muted-foreground mt-1">CSV format: date, TICKER1, TICKER2, ... (daily returns)</p></CsvUploader></div>
        </div>
        <div className="bg-card border border-border rounded-lg p-5">
          <h2 className="text-sm font-medium text-foreground mb-4">Allocation</h2>
          <ResponsiveContainer width="100%" height={200}><PieChart><Pie data={assets} dataKey="weight" nameKey="ticker" cx="50%" cy="50%" outerRadius={80} innerRadius={40} stroke="none">{assets.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}</Pie><Tooltip contentStyle={{ backgroundColor: 'hsl(220,18%,12%)', border: '1px solid hsl(220,16%,18%)', borderRadius: '8px', fontSize: '12px' }} formatter={(value: number) => [`${value}%`, 'Weight']} /></PieChart></ResponsiveContainer>
          <div className="space-y-1 mt-2">{assets.map((a, i) => (<div key={i} className="flex items-center gap-2 text-xs"><div className="w-3 h-3 rounded-sm" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} /><span className="font-mono text-foreground">{a.ticker}</span><span className="text-muted-foreground ml-auto">{a.weight}%</span></div>))}</div>
        </div>
      </div>
      {useDemo && <DemoDataNotice />}
      <div><h2 className="text-sm font-medium text-foreground mb-3">Value at Risk</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard label="1-Day VaR (95%) Hist" value={(var95hist * 100).toFixed(2) + '%'} subValue={`10-Day: ${(scaledVaR(var95hist, 10) * 100).toFixed(2)}%`} variant="negative" icon={<AlertTriangle className="h-4 w-4" />} />
          <MetricCard label="1-Day VaR (99%) Hist" value={(var99hist * 100).toFixed(2) + '%'} subValue={`10-Day: ${(scaledVaR(var99hist, 10) * 100).toFixed(2)}%`} variant="negative" icon={<AlertTriangle className="h-4 w-4" />} />
          <MetricCard label="1-Day VaR (95%) Param" value={(var95param * 100).toFixed(2) + '%'} subValue={`10-Day: ${(scaledVaR(var95param, 10) * 100).toFixed(2)}%`} variant="warning" icon={<Shield className="h-4 w-4" />} />
          <MetricCard label="1-Day VaR (99%) Param" value={(var99param * 100).toFixed(2) + '%'} subValue={`10-Day: ${(scaledVaR(var99param, 10) * 100).toFixed(2)}%`} variant="warning" icon={<Shield className="h-4 w-4" />} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard label="Annualized Volatility" value={(vol * 100).toFixed(2) + '%'} />
        <MetricCard label="Sharpe Ratio" value={sr.toFixed(3)} subValue={`Risk-free: ${settings.riskFreeRate}%`} variant={sr > 1 ? 'positive' : sr > 0 ? 'default' : 'negative'} />
        <MetricCard label="Max Drawdown" value={(mdd * 100).toFixed(2) + '%'} variant="negative" icon={<TrendingDown className="h-4 w-4" />} />
      </div>
      <div className="bg-card border border-border rounded-lg p-5">
        <div className="flex items-center justify-between mb-4"><div><h2 className="text-sm font-medium text-foreground">Return Distribution</h2><p className="text-xs text-muted-foreground">Portfolio daily returns with VaR cutoff lines</p></div><ChartExportButton targetRef={chartRef} filename="return-distribution" /></div>
        <div ref={chartRef}>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={histogramData} barCategoryGap={0}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,16%,18%)" /><XAxis dataKey="returnLabel" tick={{ fontSize: 10, fill: 'hsl(215,15%,55%)' }} interval={4} /><YAxis tick={{ fontSize: 10, fill: 'hsl(215,15%,55%)' }} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(220,18%,12%)', border: '1px solid hsl(220,16%,18%)', borderRadius: '8px', fontSize: '12px' }} />
              <Bar dataKey="count" fill="hsl(210,80%,55%)" radius={[2, 2, 0, 0]}>{histogramData.map((entry, i) => (<Cell key={i} fill={entry.isVaR99 ? 'hsl(0,72%,50%)' : entry.isVaR95 ? 'hsl(38,92%,50%)' : 'hsl(210,80%,55%)'} />))}</Bar>
              <ReferenceLine x={(-var95hist * 100).toFixed(2) + '%'} stroke="hsl(38,92%,50%)" strokeDasharray="5 5" label={{ value: 'VaR 95%', fill: 'hsl(38,92%,50%)', fontSize: 11 }} />
              <ReferenceLine x={(-var99hist * 100).toFixed(2) + '%'} stroke="hsl(0,72%,50%)" strokeDasharray="5 5" label={{ value: 'VaR 99%', fill: 'hsl(0,72%,50%)', fontSize: 11 }} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
```

---

## src/pages/MarketRiskPage.tsx

```tsx
import { useState, useMemo, useRef, useCallback } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { generateOHLCV } from '@/lib/sampleData';
import { computeReturns, rollingVolatility, stdDev, mean } from '@/lib/calculations';
import { fetchDailyPrices, getApiKey, getDefaultTicker } from '@/lib/alphaVantage';
import { MetricCard } from '@/components/MetricCard';
import { ChartExportButton } from '@/components/ChartExportButton';
import { CsvUploader } from '@/components/CsvUploader';
import { SampleCsvDownload } from '@/components/SampleCsvDownload';
import { TickerSearch } from '@/components/TickerSearch';
import { DemoDataNotice } from '@/components/DemoDataNotice';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, ComposedChart, Scatter, Line } from 'recharts';
import { TrendingUp, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

export default function MarketRiskPage() {
  const { settings, priceData, setPriceData } = useAppStore();
  const chartRef = useRef<HTMLDivElement>(null);
  const volChartRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [activeTicker, setActiveTicker] = useState<string | null>(null);
  const [csvData, setCsvData] = useState<any[] | null>(null);
  const useDemo = settings.demoMode && !csvData && priceData.length === 0;

  const ohlcv = useMemo(() => { if (csvData) return csvData; if (priceData.length > 0) return priceData as any[]; return generateOHLCV(300, 150, 42); }, [csvData, priceData]);

  const handleFetchTicker = useCallback(async (ticker: string) => {
    const apiKey = getApiKey(); if (!apiKey) { toast.error('Add your Alpha Vantage API key in Settings first'); return; }
    setLoading(true);
    try { const data = await fetchDailyPrices(ticker, apiKey); const recent = data.slice(-504); setPriceData(recent); setCsvData(null); setActiveTicker(ticker); toast.success(`Loaded ${recent.length} days of data for ${ticker}`); }
    catch (err: any) { toast.error(err.message || 'Failed to fetch data'); } finally { setLoading(false); }
  }, [setPriceData]);

  const handleCsvUpload = useCallback((data: any[]) => {
    const parsed = data.map((row: any) => ({ date: row.date || row.Date, open: parseFloat(row.open || row.Open || 0), high: parseFloat(row.high || row.High || 0), low: parseFloat(row.low || row.Low || 0), close: parseFloat(row.close || row.Close || 0), volume: parseInt(row.volume || row.Volume || 0, 10) })).filter(d => d.date && !isNaN(d.close));
    setCsvData(parsed); setActiveTicker('CSV'); toast.success(`Loaded ${parsed.length} rows from CSV`);
  }, []);

  const closes = useMemo(() => ohlcv.map((d: any) => d.close), [ohlcv]);
  const returns = useMemo(() => computeReturns(closes), [closes]);
  const rollingVol = useMemo(() => rollingVolatility(returns, 30), [returns]);
  const avgVol = useMemo(() => { const valid = rollingVol.filter(v => v !== null) as number[]; return valid.length ? mean(valid) : 0; }, [rollingVol]);
  const volStdDev = useMemo(() => { const valid = rollingVol.filter(v => v !== null) as number[]; return valid.length ? stdDev(valid) : 0; }, [rollingVol]);
  const highRiskThreshold = avgVol + 2 * volStdDev;

  const chartData = useMemo(() => ohlcv.map((d: any, i: number) => {
    const vol = i > 0 ? rollingVol[i - 1] : null;
    return { date: d.date, price: d.close, high: d.high, low: d.low, volume: d.volume, volatility: vol ? +(vol * 100).toFixed(2) : null, isHighRisk: vol !== null && vol > highRiskThreshold };
  }), [ohlcv, rollingVol, highRiskThreshold]);

  const annualReturn = useMemo(() => closes.length < 2 ? 0 : ((closes[closes.length - 1] / closes[0]) - 1) * 100, [closes]);
  const currentVol = useMemo(() => { const valid = rollingVol.filter(v => v !== null) as number[]; return valid.length ? valid[valid.length - 1] * 100 : 0; }, [rollingVol]);
  const highRiskDays = chartData.filter(d => d.isHighRisk).length;

  return (
    <div className="space-y-6 max-w-7xl">
      <div><h1 className="text-2xl font-semibold text-foreground">Market Price Risk Analysis</h1><p className="text-sm text-muted-foreground mt-1">Analyze price volatility and identify high-risk periods</p></div>
      <div className="bg-card border border-border rounded-lg p-5 space-y-4">
        <h2 className="text-sm font-medium text-foreground">Data Source</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1"><p className="text-xs text-muted-foreground mb-2">Fetch via API</p><TickerSearch onSearch={handleFetchTicker} loading={loading} defaultValue={getDefaultTicker()} /></div>
          <div className="text-xs text-muted-foreground flex items-center">or</div>
          <div className="flex-1"><div className="flex items-center justify-between mb-2"><p className="text-xs text-muted-foreground">Upload CSV</p><SampleCsvDownload type="price" /></div><CsvUploader onData={handleCsvUpload}><p className="text-xs text-muted-foreground mt-1">Format: date, open, high, low, close, volume</p></CsvUploader></div>
        </div>
        {activeTicker && <p className="text-xs text-primary font-mono">Active: {activeTicker} ({ohlcv.length} data points)</p>}
      </div>
      {useDemo && <DemoDataNotice />}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Current Price" value={`$${closes[closes.length - 1]?.toFixed(2) || '—'}`} icon={<TrendingUp className="h-4 w-4" />} />
        <MetricCard label="Period Return" value={`${annualReturn.toFixed(2)}%`} variant={annualReturn > 0 ? 'positive' : 'negative'} />
        <MetricCard label="Current 30d Vol" value={`${currentVol.toFixed(2)}%`} variant={currentVol > highRiskThreshold * 100 ? 'negative' : 'default'} />
        <MetricCard label="High-Risk Days" value={`${highRiskDays}`} subValue={`Threshold: ${(highRiskThreshold * 100).toFixed(1)}% vol`} variant={highRiskDays > 10 ? 'warning' : 'default'} icon={<AlertTriangle className="h-4 w-4" />} />
      </div>
      <div className="bg-card border border-border rounded-lg p-5">
        <div className="flex items-center justify-between mb-4"><div><h2 className="text-sm font-medium text-foreground">Price Chart with Volatility Band</h2><p className="text-xs text-muted-foreground">30-day rolling volatility overlay</p></div><ChartExportButton targetRef={chartRef} filename="market-risk-price" /></div>
        <div ref={chartRef}><ResponsiveContainer width="100%" height={400}><ComposedChart data={chartData}><CartesianGrid strokeDasharray="3 3" stroke="hsl(220,16%,18%)" /><XAxis dataKey="date" tick={{ fontSize: 10, fill: 'hsl(215,15%,55%)' }} interval={30} /><YAxis yAxisId="price" tick={{ fontSize: 10, fill: 'hsl(215,15%,55%)' }} domain={['auto', 'auto']} /><YAxis yAxisId="vol" orientation="right" tick={{ fontSize: 10, fill: 'hsl(215,15%,55%)' }} /><Tooltip contentStyle={{ backgroundColor: 'hsl(220,18%,12%)', border: '1px solid hsl(220,16%,18%)', borderRadius: '8px', fontSize: '12px' }} /><Area yAxisId="price" dataKey="high" stroke="none" fill="hsl(142,70%,45%)" fillOpacity={0.05} /><Area yAxisId="price" dataKey="low" stroke="none" fill="hsl(0,72%,50%)" fillOpacity={0.05} /><Line yAxisId="price" type="monotone" dataKey="price" stroke="hsl(210,80%,55%)" strokeWidth={1.5} dot={false} /><Scatter yAxisId="price" dataKey={(entry: any) => entry.isHighRisk ? entry.price : undefined} fill="hsl(0,72%,50%)" r={3} /></ComposedChart></ResponsiveContainer></div>
      </div>
      <div className="bg-card border border-border rounded-lg p-5">
        <div className="flex items-center justify-between mb-4"><div><h2 className="text-sm font-medium text-foreground">Rolling 30-Day Volatility (Annualized)</h2><p className="text-xs text-muted-foreground">Red zones indicate volatility &gt; 2σ above mean</p></div><ChartExportButton targetRef={volChartRef} filename="volatility" /></div>
        <div ref={volChartRef}><ResponsiveContainer width="100%" height={250}><ComposedChart data={chartData}><CartesianGrid strokeDasharray="3 3" stroke="hsl(220,16%,18%)" /><XAxis dataKey="date" tick={{ fontSize: 10, fill: 'hsl(215,15%,55%)' }} interval={30} /><YAxis tick={{ fontSize: 10, fill: 'hsl(215,15%,55%)' }} /><Tooltip contentStyle={{ backgroundColor: 'hsl(220,18%,12%)', border: '1px solid hsl(220,16%,18%)', borderRadius: '8px', fontSize: '12px' }} /><Area dataKey="volatility" stroke="hsl(142,70%,45%)" fill="hsl(142,70%,45%)" fillOpacity={0.15} strokeWidth={1.5} /></ComposedChart></ResponsiveContainer></div>
      </div>
    </div>
  );
}
```

---

## src/pages/TechnicalPage.tsx

```tsx
import { useState, useMemo, useRef, useCallback } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { generateOHLCV } from '@/lib/sampleData';
import { sma, ema, rsi as calcRSI, macd as calcMACD, bollingerBands } from '@/lib/calculations';
import { fetchDailyPrices, getApiKey, getDefaultTicker } from '@/lib/alphaVantage';
import { ChartExportButton } from '@/components/ChartExportButton';
import { CsvUploader } from '@/components/CsvUploader';
import { SampleCsvDownload } from '@/components/SampleCsvDownload';
import { TickerSearch } from '@/components/TickerSearch';
import { DemoDataNotice } from '@/components/DemoDataNotice';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, ComposedChart, Bar, ReferenceLine } from 'recharts';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Activity } from 'lucide-react';
import { toast } from 'sonner';

export default function TechnicalPage() {
  const { settings, priceData, setPriceData } = useAppStore();
  const priceChartRef = useRef<HTMLDivElement>(null); const rsiChartRef = useRef<HTMLDivElement>(null); const macdChartRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false); const [activeTicker, setActiveTicker] = useState<string | null>(null); const [csvData, setCsvData] = useState<any[] | null>(null);
  const [indicators, setIndicators] = useState({ sma20: true, sma50: true, ema200: true, bollinger: true });
  const useDemo = settings.demoMode && !csvData && priceData.length === 0;

  const ohlcv = useMemo(() => { if (csvData) return csvData; if (priceData.length > 0) return priceData as any[]; return generateOHLCV(300, 150, 42); }, [csvData, priceData]);

  const handleFetchTicker = useCallback(async (ticker: string) => {
    const apiKey = getApiKey(); if (!apiKey) { toast.error('Add your Alpha Vantage API key in Settings first'); return; }
    setLoading(true);
    try { const data = await fetchDailyPrices(ticker, apiKey); const recent = data.slice(-504); setPriceData(recent); setCsvData(null); setActiveTicker(ticker); toast.success(`Loaded ${recent.length} days of data for ${ticker}`); }
    catch (err: any) { toast.error(err.message || 'Failed to fetch data'); } finally { setLoading(false); }
  }, [setPriceData]);

  const handleCsvUpload = useCallback((data: any[]) => {
    const parsed = data.map((row: any) => ({ date: row.date || row.Date, open: parseFloat(row.open || row.Open || 0), high: parseFloat(row.high || row.High || 0), low: parseFloat(row.low || row.Low || 0), close: parseFloat(row.close || row.Close || 0), volume: parseInt(row.volume || row.Volume || 0, 10) })).filter(d => d.date && !isNaN(d.close));
    setCsvData(parsed); setActiveTicker('CSV'); toast.success(`Loaded ${parsed.length} rows from CSV`);
  }, []);

  const closes = useMemo(() => ohlcv.map((d: any) => d.close), [ohlcv]);
  const sma20 = useMemo(() => sma(closes, 20), [closes]); const sma50 = useMemo(() => sma(closes, 50), [closes]);
  const ema200 = useMemo(() => ema(closes, 200), [closes]); const rsiData = useMemo(() => calcRSI(closes, 14), [closes]);
  const macdData = useMemo(() => calcMACD(closes), [closes]); const bbData = useMemo(() => bollingerBands(closes), [closes]);

  const chartData = useMemo(() => ohlcv.map((d: any, i: number) => ({
    date: d.date, close: d.close, sma20: sma20[i], sma50: sma50[i], ema200: ema200[i],
    bbUpper: bbData[i]?.upper, bbMiddle: bbData[i]?.middle, bbLower: bbData[i]?.lower,
    rsi: rsiData[i], macdLine: macdData.macdLine[i], signalLine: macdData.signalLine[i], histogram: macdData.histogram[i],
  })), [ohlcv, sma20, sma50, ema200, bbData, rsiData, macdData]);

  const latestRSI = rsiData[rsiData.length - 1] ?? 50; const latestMACD = macdData.macdLine[macdData.macdLine.length - 1]; const latestSignal = macdData.signalLine[macdData.signalLine.length - 1]; const latestPrice = closes[closes.length - 1]; const latestSMA50 = sma50[sma50.length - 1];
  const signals = [
    { label: 'RSI', value: latestRSI < 30 ? 'Oversold' : latestRSI > 70 ? 'Overbought' : 'Neutral', color: latestRSI < 30 ? 'text-positive' : latestRSI > 70 ? 'text-negative' : 'text-muted-foreground' },
    { label: 'MACD', value: latestMACD > latestSignal ? 'Bullish crossover' : 'Bearish crossover', color: latestMACD > latestSignal ? 'text-positive' : 'text-negative' },
    { label: 'MA', value: latestSMA50 && latestPrice > latestSMA50 ? 'Price above SMA50' : 'Price below SMA50', color: latestSMA50 && latestPrice > latestSMA50 ? 'text-positive' : 'text-negative' },
  ];

  return (
    <div className="space-y-6 max-w-7xl">
      <div><h1 className="text-2xl font-semibold text-foreground">Technical Analysis</h1><p className="text-sm text-muted-foreground mt-1">Moving averages, RSI, MACD, and Bollinger Bands with signal detection</p></div>
      <div className="bg-card border border-border rounded-lg p-5 space-y-4">
        <h2 className="text-sm font-medium text-foreground">Data Source</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1"><p className="text-xs text-muted-foreground mb-2">Fetch via API</p><TickerSearch onSearch={handleFetchTicker} loading={loading} defaultValue={getDefaultTicker()} /></div>
          <div className="text-xs text-muted-foreground flex items-center">or</div>
          <div className="flex-1"><div className="flex items-center justify-between mb-2"><p className="text-xs text-muted-foreground">Upload CSV</p><SampleCsvDownload type="price" /></div><CsvUploader onData={handleCsvUpload}><p className="text-xs text-muted-foreground mt-1">Format: date, open, high, low, close, volume</p></CsvUploader></div>
        </div>
        {activeTicker && <p className="text-xs text-primary font-mono">Active: {activeTicker} ({ohlcv.length} data points)</p>}
      </div>
      {useDemo && <DemoDataNotice />}
      <div className="bg-card border border-border rounded-lg p-4 flex flex-wrap gap-6">
        <div className="flex items-center gap-2"><Activity className="h-4 w-4 text-primary" /><span className="text-sm font-medium text-foreground">Signal Summary</span></div>
        {signals.map(s => (<div key={s.label} className="text-sm"><span className="text-muted-foreground">{s.label}: </span><span className={`font-medium ${s.color}`}>{s.value}</span></div>))}
      </div>
      <div className="flex flex-wrap gap-4 bg-card border border-border rounded-lg p-4">
        {[{ key: 'sma20', label: 'SMA 20', color: 'hsl(38,92%,50%)' }, { key: 'sma50', label: 'SMA 50', color: 'hsl(280,60%,55%)' }, { key: 'ema200', label: 'EMA 200', color: 'hsl(0,72%,50%)' }, { key: 'bollinger', label: 'Bollinger Bands', color: 'hsl(215,15%,55%)' }].map(ind => (
          <div key={ind.key} className="flex items-center gap-2"><Switch checked={indicators[ind.key as keyof typeof indicators]} onCheckedChange={(v) => setIndicators(prev => ({ ...prev, [ind.key]: v }))} className="data-[state=checked]:bg-primary" /><Label className="text-xs text-muted-foreground flex items-center gap-1.5"><span className="w-3 h-0.5 rounded" style={{ backgroundColor: ind.color }} />{ind.label}</Label></div>
        ))}
      </div>
      <div className="bg-card border border-border rounded-lg p-5">
        <div className="flex items-center justify-between mb-4"><h2 className="text-sm font-medium text-foreground">Price Chart with Overlays</h2><ChartExportButton targetRef={priceChartRef} filename="technical-price" /></div>
        <div ref={priceChartRef}><ResponsiveContainer width="100%" height={400}><ComposedChart data={chartData}><CartesianGrid strokeDasharray="3 3" stroke="hsl(220,16%,18%)" /><XAxis dataKey="date" tick={{ fontSize: 10, fill: 'hsl(215,15%,55%)' }} interval={30} /><YAxis tick={{ fontSize: 10, fill: 'hsl(215,15%,55%)' }} domain={['auto', 'auto']} /><Tooltip contentStyle={{ backgroundColor: 'hsl(220,18%,12%)', border: '1px solid hsl(220,16%,18%)', borderRadius: '8px', fontSize: '12px' }} />{indicators.bollinger && (<><Area dataKey="bbUpper" stroke="none" fill="hsl(215,15%,55%)" fillOpacity={0.05} /><Line type="monotone" dataKey="bbUpper" stroke="hsl(215,15%,55%)" strokeWidth={1} dot={false} strokeDasharray="3 3" /><Line type="monotone" dataKey="bbLower" stroke="hsl(215,15%,55%)" strokeWidth={1} dot={false} strokeDasharray="3 3" /></>)}<Line type="monotone" dataKey="close" stroke="hsl(210,80%,55%)" strokeWidth={1.5} dot={false} />{indicators.sma20 && <Line type="monotone" dataKey="sma20" stroke="hsl(38,92%,50%)" strokeWidth={1} dot={false} />}{indicators.sma50 && <Line type="monotone" dataKey="sma50" stroke="hsl(280,60%,55%)" strokeWidth={1} dot={false} />}{indicators.ema200 && <Line type="monotone" dataKey="ema200" stroke="hsl(0,72%,50%)" strokeWidth={1} dot={false} />}</ComposedChart></ResponsiveContainer></div>
      </div>
      <div className="bg-card border border-border rounded-lg p-5">
        <div className="flex items-center justify-between mb-4"><h2 className="text-sm font-medium text-foreground">RSI (14-Day)</h2><ChartExportButton targetRef={rsiChartRef} filename="rsi" /></div>
        <div ref={rsiChartRef}><ResponsiveContainer width="100%" height={200}><LineChart data={chartData}><CartesianGrid strokeDasharray="3 3" stroke="hsl(220,16%,18%)" /><XAxis dataKey="date" tick={{ fontSize: 10, fill: 'hsl(215,15%,55%)' }} interval={30} /><YAxis tick={{ fontSize: 10, fill: 'hsl(215,15%,55%)' }} domain={[0, 100]} /><Tooltip contentStyle={{ backgroundColor: 'hsl(220,18%,12%)', border: '1px solid hsl(220,16%,18%)', borderRadius: '8px', fontSize: '12px' }} /><ReferenceLine y={70} stroke="hsl(0,72%,50%)" strokeDasharray="5 5" label={{ value: 'Overbought', fill: 'hsl(0,72%,50%)', fontSize: 10 }} /><ReferenceLine y={30} stroke="hsl(142,70%,45%)" strokeDasharray="5 5" label={{ value: 'Oversold', fill: 'hsl(142,70%,45%)', fontSize: 10 }} /><Line type="monotone" dataKey="rsi" stroke="hsl(38,92%,50%)" strokeWidth={1.5} dot={false} /></LineChart></ResponsiveContainer></div>
      </div>
      <div className="bg-card border border-border rounded-lg p-5">
        <div className="flex items-center justify-between mb-4"><h2 className="text-sm font-medium text-foreground">MACD (12, 26, 9)</h2><ChartExportButton targetRef={macdChartRef} filename="macd" /></div>
        <div ref={macdChartRef}><ResponsiveContainer width="100%" height={200}><ComposedChart data={chartData}><CartesianGrid strokeDasharray="3 3" stroke="hsl(220,16%,18%)" /><XAxis dataKey="date" tick={{ fontSize: 10, fill: 'hsl(215,15%,55%)' }} interval={30} /><YAxis tick={{ fontSize: 10, fill: 'hsl(215,15%,55%)' }} /><Tooltip contentStyle={{ backgroundColor: 'hsl(220,18%,12%)', border: '1px solid hsl(220,16%,18%)', borderRadius: '8px', fontSize: '12px' }} /><Bar dataKey="histogram" fill="hsl(142,70%,45%)" opacity={0.5} /><Line type="monotone" dataKey="macdLine" stroke="hsl(210,80%,55%)" strokeWidth={1.5} dot={false} /><Line type="monotone" dataKey="signalLine" stroke="hsl(0,72%,50%)" strokeWidth={1.5} dot={false} /></ComposedChart></ResponsiveContainer></div>
      </div>
    </div>
  );
}
```

---

## src/pages/DCFPage.tsx

```tsx
import { useState, useMemo, useRef } from 'react';
import { SAMPLE_DCF } from '@/lib/sampleData';
import { calculateDCF, dcfSensitivity, calculateWACC } from '@/lib/calculations';
import { MetricCard } from '@/components/MetricCard';
import { ChartExportButton } from '@/components/ChartExportButton';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppStore } from '@/store/useAppStore';

export default function DCFPage() {
  const { settings } = useAppStore();
  const chartRef = useRef<HTMLDivElement>(null);
  const [dcf, setDcf] = useState(SAMPLE_DCF);

  const wacc = useMemo(() => calculateWACC(dcf.costOfEquity, dcf.costOfDebt, dcf.taxRate, dcf.debtToEquity), [dcf.costOfEquity, dcf.costOfDebt, dcf.taxRate, dcf.debtToEquity]);
  const result = useMemo(() => calculateDCF(dcf.fcfProjections, dcf.terminalGrowthRate, dcf.wacc, dcf.netDebt, dcf.sharesOutstanding), [dcf.fcfProjections, dcf.terminalGrowthRate, dcf.wacc, dcf.netDebt, dcf.sharesOutstanding]);
  const sensitivity = useMemo(() => dcfSensitivity(dcf.fcfProjections, dcf.terminalGrowthRate, dcf.wacc, dcf.netDebt, dcf.sharesOutstanding), [dcf.fcfProjections, dcf.terminalGrowthRate, dcf.wacc, dcf.netDebt, dcf.sharesOutstanding]);

  const premiumDiscount = ((dcf.currentPrice - result.intrinsicValue) / result.intrinsicValue * 100);
  const waterfallData = [...result.pvFCFs.map(pv => ({ name: `Y${pv.year}`, value: +pv.pv.toFixed(1), type: 'fcf' })), { name: 'Terminal', value: +result.pvTerminal.toFixed(1), type: 'terminal' }];
  const updateField = (field: string, value: number | string) => setDcf(prev => ({ ...prev, [field]: value }));
  const updateFCF = (idx: number, val: number) => setDcf(prev => { const newFCFs = [...prev.fcfProjections]; newFCFs[idx] = val; return { ...prev, fcfProjections: newFCFs }; });

  return (
    <div className="space-y-6 max-w-7xl">
      <div><h1 className="text-2xl font-semibold text-foreground">DCF Valuation Tool</h1><p className="text-sm text-muted-foreground mt-1">Calculate intrinsic value using Discounted Cash Flow methodology</p></div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-lg p-5 space-y-4">
          <div><Label className="text-xs text-muted-foreground">Company Name</Label><Input value={dcf.companyName} onChange={e => updateField('companyName', e.target.value)} className="h-8 font-medium" placeholder="Enter company name" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><Label className="text-xs text-muted-foreground">Current Price ($)</Label><Input type="number" value={dcf.currentPrice} onChange={e => updateField('currentPrice', +e.target.value)} className="h-8 font-mono" /></div>
            <div><Label className="text-xs text-muted-foreground">Shares (M)</Label><Input type="number" value={dcf.sharesOutstanding} onChange={e => updateField('sharesOutstanding', +e.target.value)} className="h-8 font-mono" /></div>
            <div><Label className="text-xs text-muted-foreground">WACC (%)</Label><Input type="number" value={dcf.wacc} onChange={e => updateField('wacc', +e.target.value)} className="h-8 font-mono" step="0.1" /></div>
            <div><Label className="text-xs text-muted-foreground">Terminal Growth (%)</Label><Input type="number" value={dcf.terminalGrowthRate} onChange={e => updateField('terminalGrowthRate', +e.target.value)} className="h-8 font-mono" step="0.1" /></div>
            <div><Label className="text-xs text-muted-foreground">Net Debt ($M)</Label><Input type="number" value={dcf.netDebt} onChange={e => updateField('netDebt', +e.target.value)} className="h-8 font-mono" /></div>
            <div><Label className="text-xs text-muted-foreground">Cost of Equity (%)</Label><Input type="number" value={dcf.costOfEquity} onChange={e => updateField('costOfEquity', +e.target.value)} className="h-8 font-mono" step="0.1" /></div>
            <div><Label className="text-xs text-muted-foreground">Cost of Debt (%)</Label><Input type="number" value={dcf.costOfDebt} onChange={e => updateField('costOfDebt', +e.target.value)} className="h-8 font-mono" step="0.1" /></div>
            <div><Label className="text-xs text-muted-foreground">Tax Rate (%)</Label><Input type="number" value={dcf.taxRate} onChange={e => updateField('taxRate', +e.target.value)} className="h-8 font-mono" step="1" /></div>
            <div><Label className="text-xs text-muted-foreground">D/E Ratio</Label><Input type="number" value={dcf.debtToEquity} onChange={e => updateField('debtToEquity', +e.target.value)} className="h-8 font-mono" step="0.1" /></div>
          </div>
          <div><Label className="text-xs text-muted-foreground mb-2 block">FCF Projections ($M)</Label>
            <div className="grid grid-cols-5 gap-1.5">{dcf.fcfProjections.map((fcf, i) => (<div key={i}><span className="text-[10px] text-muted-foreground">Y{i + 1}</span><Input type="number" value={fcf} onChange={e => updateFCF(i, +e.target.value)} className="h-7 text-xs font-mono p-1" /></div>))}</div>
          </div>
          <div className="text-xs text-muted-foreground border-t border-border pt-3">Auto WACC: {wacc.toFixed(2)}% (CoE: {dcf.costOfEquity}%, CoD: {dcf.costOfDebt}%, Tax: {dcf.taxRate}%, D/E: {dcf.debtToEquity})</div>
        </div>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard label="Intrinsic Value" value={`$${result.intrinsicValue.toFixed(2)}`} variant={result.intrinsicValue > 0 ? 'positive' : 'negative'} />
            <MetricCard label="Enterprise Value" value={`$${(result.enterpriseValue / 1000).toFixed(1)}B`} />
            <MetricCard label="Equity Value" value={`$${(result.equityValue / 1000).toFixed(1)}B`} />
            <MetricCard label="Premium/Discount" value={`${premiumDiscount > 0 ? '+' : ''}${premiumDiscount.toFixed(1)}%`} variant={premiumDiscount > 0 ? 'negative' : 'positive'} subValue={premiumDiscount > 0 ? 'Overvalued' : 'Undervalued'} />
          </div>
          <div className="bg-card border border-border rounded-lg p-5">
            <div className="flex items-center justify-between mb-4"><h2 className="text-sm font-medium text-foreground">DCF Waterfall — PV of Cash Flows</h2><ChartExportButton targetRef={chartRef} filename="dcf-waterfall" /></div>
            <div ref={chartRef}><ResponsiveContainer width="100%" height={280}><BarChart data={waterfallData}><CartesianGrid strokeDasharray="3 3" stroke="hsl(220,16%,18%)" /><XAxis dataKey="name" tick={{ fontSize: 11, fill: 'hsl(215,15%,55%)' }} /><YAxis tick={{ fontSize: 10, fill: 'hsl(215,15%,55%)' }} /><Tooltip contentStyle={{ backgroundColor: 'hsl(220,18%,12%)', border: '1px solid hsl(220,16%,18%)', borderRadius: '8px', fontSize: '12px' }} formatter={(v: number) => [`$${v.toFixed(1)}M`, 'PV']} /><Bar dataKey="value" radius={[4, 4, 0, 0]}>{waterfallData.map((entry, i) => (<Cell key={i} fill={entry.type === 'terminal' ? 'hsl(38,92%,50%)' : 'hsl(142,70%,45%)'} />))}</Bar></BarChart></ResponsiveContainer></div>
          </div>
        </div>
      </div>
      <div className="bg-card border border-border rounded-lg p-5 overflow-x-auto">
        <h2 className="text-sm font-medium text-foreground mb-4">Sensitivity Analysis — Intrinsic Value per Share</h2>
        <table className="w-full text-xs font-mono"><thead><tr><th className="p-2 text-muted-foreground text-left">WACC \ TGR</th>{sensitivity[0]?.values.map(v => (<th key={v.tgr} className="p-2 text-muted-foreground text-center">{v.tgr}%</th>))}</tr></thead>
          <tbody>{sensitivity.map(row => (<tr key={row.wacc} className="border-t border-border/50"><td className="p-2 text-muted-foreground font-medium">{row.wacc}%</td>{row.values.map(cell => {
            const diff = ((dcf.currentPrice - cell.value) / cell.value) * 100;
            const bg = cell.value <= 0 ? 'bg-destructive/20' : diff > 20 ? 'bg-destructive/20' : diff > 0 ? 'bg-destructive/10' : diff > -20 ? 'bg-primary/10' : 'bg-primary/20';
            return (<td key={cell.tgr} className={`p-2 text-center ${bg} text-foreground`}>${cell.value.toFixed(0)}</td>);
          })}</tr>))}</tbody>
        </table>
        <div className="flex gap-4 mt-3 text-[10px] text-muted-foreground"><span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-primary/20" /> Undervalued</span><span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-destructive/20" /> Overvalued</span><span>Current price: ${dcf.currentPrice}</span></div>
      </div>
    </div>
  );
}
```

---

## src/pages/MacroPage.tsx

```tsx
import { useState, useMemo, useRef } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { generateMacroData } from '@/lib/sampleData';
import { ChartExportButton } from '@/components/ChartExportButton';
import { CsvUploader } from '@/components/CsvUploader';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const INDICATORS = [
  { key: 'gdpGrowth', label: 'GDP Growth %', color: 'hsl(142,70%,45%)' },
  { key: 'cpi', label: 'CPI Inflation %', color: 'hsl(38,92%,50%)' },
  { key: 'interestRate', label: 'Interest Rate %', color: 'hsl(210,80%,55%)' },
  { key: 'unemployment', label: 'Unemployment %', color: 'hsl(0,72%,50%)' },
];

export default function MacroPage() {
  const { settings, macroData, setMacroData } = useAppStore();
  const chartRef = useRef<HTMLDivElement>(null);
  const [toggles, setToggles] = useState<Record<string, boolean>>({ gdpGrowth: true, cpi: true, interestRate: true, unemployment: true });

  const data = useMemo(() => settings.demoMode ? generateMacroData() : macroData as any[], [settings.demoMode, macroData]);
  const activeIndicators = INDICATORS.filter(ind => toggles[ind.key]);

  return (
    <div className="space-y-6 max-w-7xl">
      <div><h1 className="text-2xl font-semibold text-foreground">Macro Data Visualization</h1><p className="text-sm text-muted-foreground mt-1">Explore macroeconomic indicators and overlay with portfolio data</p></div>
      {!settings.demoMode && (<CsvUploader onData={(d) => setMacroData(d)}><p className="text-xs text-muted-foreground mt-1">CSV format: date, gdpGrowth, cpi, interestRate, unemployment</p></CsvUploader>)}
      <div className="flex flex-wrap gap-4 bg-card border border-border rounded-lg p-4">
        {INDICATORS.map(ind => (<div key={ind.key} className="flex items-center gap-2"><Switch checked={toggles[ind.key]} onCheckedChange={(v) => setToggles(prev => ({ ...prev, [ind.key]: v }))} className="data-[state=checked]:bg-primary" /><Label className="text-xs text-muted-foreground flex items-center gap-1.5"><span className="w-3 h-0.5 rounded" style={{ backgroundColor: ind.color }} />{ind.label}</Label></div>))}
      </div>
      <div className="bg-card border border-border rounded-lg p-5">
        <div className="flex items-center justify-between mb-4"><h2 className="text-sm font-medium text-foreground">Macro Indicators Timeline</h2><ChartExportButton targetRef={chartRef} filename="macro-data" /></div>
        <div ref={chartRef}><ResponsiveContainer width="100%" height={450}><LineChart data={data}><CartesianGrid strokeDasharray="3 3" stroke="hsl(220,16%,18%)" /><XAxis dataKey="date" tick={{ fontSize: 10, fill: 'hsl(215,15%,55%)' }} interval={6} /><YAxis tick={{ fontSize: 10, fill: 'hsl(215,15%,55%)' }} /><Tooltip contentStyle={{ backgroundColor: 'hsl(220,18%,12%)', border: '1px solid hsl(220,16%,18%)', borderRadius: '8px', fontSize: '12px' }} /><Legend wrapperStyle={{ fontSize: '11px' }} />{activeIndicators.map(ind => (<Line key={ind.key} type="monotone" dataKey={ind.key} stroke={ind.color} strokeWidth={2} dot={false} name={ind.label} />))}</LineChart></ResponsiveContainer></div>
      </div>
      {data.length > 0 && (<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">{INDICATORS.map(ind => { const latest = data[data.length - 1]?.[ind.key]; return (<div key={ind.key} className="bg-card border border-border rounded-lg p-4"><div className="text-xs text-muted-foreground mb-1">{ind.label}</div><div className="text-2xl font-mono font-semibold text-foreground">{latest?.toFixed(2)}%</div><div className="text-xs text-muted-foreground mt-1">Latest: {data[data.length - 1]?.date}</div></div>); })}</div>)}
    </div>
  );
}
```

---

## src/pages/SettingsPage.tsx

```tsx
import { useState, useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { getApiKey, setApiKey, getDefaultTicker, setDefaultTicker, validateApiKey } from '@/lib/alphaVantage';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Settings as SettingsIcon, Percent, DollarSign, Shield, Key, CheckCircle2, XCircle, Loader2, Tag } from 'lucide-react';

export default function SettingsPage() {
  const { settings, updateSettings } = useAppStore();
  const [apiKey, setApiKeyState] = useState(getApiKey());
  const [defaultTicker, setDefaultTickerState] = useState(getDefaultTicker());
  const [apiStatus, setApiStatus] = useState<'idle' | 'checking' | 'valid' | 'invalid'>('idle');

  useEffect(() => { if (getApiKey()) setApiStatus('valid'); }, []);

  const handleSaveApiKey = async (key: string) => {
    setApiKeyState(key); setApiKey(key);
    if (!key) { setApiStatus('idle'); return; }
    setApiStatus('checking'); const valid = await validateApiKey(key); setApiStatus(valid ? 'valid' : 'invalid');
  };
  const handleSaveDefaultTicker = (ticker: string) => { setDefaultTickerState(ticker); setDefaultTicker(ticker.toUpperCase()); };

  return (
    <div className="space-y-6 max-w-2xl">
      <div><h1 className="text-2xl font-semibold text-foreground">Settings</h1><p className="text-sm text-muted-foreground mt-1">Configure global risk parameters, API keys, and preferences</p></div>
      <div className="bg-card border border-border rounded-lg divide-y divide-border">
        <div className="p-5 space-y-3">
          <div className="flex items-center gap-3"><Key className="h-5 w-5 text-muted-foreground" /><div className="flex-1"><Label className="text-sm text-foreground">Alpha Vantage API Key</Label><p className="text-xs text-muted-foreground">Free key at <a href="https://www.alphavantage.co/support/#api-key" target="_blank" rel="noopener noreferrer" className="text-primary underline">alphavantage.co</a> — 25 calls/day</p></div>
            <div className="shrink-0">{apiStatus === 'checking' && <Loader2 className="h-5 w-5 text-muted-foreground animate-spin" />}{apiStatus === 'valid' && <CheckCircle2 className="h-5 w-5 text-primary" />}{apiStatus === 'invalid' && <XCircle className="h-5 w-5 text-destructive" />}</div></div>
          <Input type="password" value={apiKey} onChange={e => handleSaveApiKey(e.target.value)} placeholder="Enter your API key" className="h-8 font-mono" />
          {apiStatus === 'valid' && <p className="text-xs text-primary">✓ API key is valid</p>}{apiStatus === 'invalid' && <p className="text-xs text-destructive">✗ API key is invalid or rate-limited</p>}
        </div>
        <div className="p-5 flex items-center justify-between"><div className="flex items-center gap-3"><Tag className="h-5 w-5 text-muted-foreground" /><div><Label className="text-sm text-foreground">Default Ticker</Label><p className="text-xs text-muted-foreground">Pre-filled ticker for Market Risk & Technical pages</p></div></div><Input value={defaultTicker} onChange={e => handleSaveDefaultTicker(e.target.value)} placeholder="AAPL" className="h-8 w-24 font-mono text-right uppercase" /></div>
        <div className="p-5 flex items-center justify-between"><div className="flex items-center gap-3"><Percent className="h-5 w-5 text-muted-foreground" /><div><Label className="text-sm text-foreground">Risk-Free Rate</Label><p className="text-xs text-muted-foreground">Used for Sharpe ratio and CAPM calculations</p></div></div><div className="flex items-center gap-2"><Input type="number" value={settings.riskFreeRate} onChange={e => updateSettings({ riskFreeRate: parseFloat(e.target.value) || 0 })} className="h-8 w-20 font-mono text-right" step="0.1" /><span className="text-sm text-muted-foreground">%</span></div></div>
        <div className="p-5 flex items-center justify-between"><div className="flex items-center gap-3"><DollarSign className="h-5 w-5 text-muted-foreground" /><div><Label className="text-sm text-foreground">Base Currency</Label><p className="text-xs text-muted-foreground">Default currency for all calculations</p></div></div><Select value={settings.baseCurrency} onValueChange={v => updateSettings({ baseCurrency: v })}><SelectTrigger className="w-24 h-8 font-mono"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="USD">USD</SelectItem><SelectItem value="EUR">EUR</SelectItem><SelectItem value="GBP">GBP</SelectItem><SelectItem value="JPY">JPY</SelectItem><SelectItem value="CHF">CHF</SelectItem></SelectContent></Select></div>
        <div className="p-5 flex items-center justify-between"><div className="flex items-center gap-3"><Shield className="h-5 w-5 text-muted-foreground" /><div><Label className="text-sm text-foreground">Confidence Level</Label><p className="text-xs text-muted-foreground">Default VaR confidence level</p></div></div><Select value={String(settings.confidenceLevel)} onValueChange={v => updateSettings({ confidenceLevel: parseInt(v) as 95 | 99 })}><SelectTrigger className="w-24 h-8 font-mono"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="95">95%</SelectItem><SelectItem value="99">99%</SelectItem></SelectContent></Select></div>
        <div className="p-5 flex items-center justify-between"><div className="flex items-center gap-3"><SettingsIcon className="h-5 w-5 text-muted-foreground" /><div><Label className="text-sm text-foreground">Demo Mode</Label><p className="text-xs text-muted-foreground">Load sample data for all modules</p></div></div><Switch checked={settings.demoMode} onCheckedChange={v => updateSettings({ demoMode: v })} className="data-[state=checked]:bg-primary" /></div>
      </div>
    </div>
  );
}
```

---

## src/pages/NotFound.tsx

```tsx
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();
  useEffect(() => { console.error("404 Error: User attempted to access non-existent route:", location.pathname); }, [location.pathname]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center"><h1 className="mb-4 text-4xl font-bold">404</h1><p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p><a href="/" className="text-primary underline hover:text-primary/90">Return to Home</a></div>
    </div>
  );
};
export default NotFound;
```

---

> **Not:** shadcn/ui bileşenleri (`src/components/ui/*`) standart shadcn kurulumudur ve bu dosyaya dahil edilmemiştir. `npx shadcn-ui@latest init` ile kurulabilir.
