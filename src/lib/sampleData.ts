import { PortfolioAsset } from '@/store/useAppStore';

// Seeded random for reproducibility
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export const SAMPLE_PORTFOLIO: PortfolioAsset[] = [
  { ticker: 'AAPL', weight: 25, assetClass: 'Equity' },
  { ticker: 'MSFT', weight: 20, assetClass: 'Equity' },
  { ticker: 'GOOGL', weight: 20, assetClass: 'Equity' },
  { ticker: 'BND', weight: 20, assetClass: 'Bond' },
  { ticker: 'GLD', weight: 15, assetClass: 'Commodity' },
];

export function generateDailyReturns(days: number, meanReturn: number, volatility: number, seed: number) {
  const rand = seededRandom(seed);
  const returns: number[] = [];
  for (let i = 0; i < days; i++) {
    // Box-Muller transform
    const u1 = rand();
    const u2 = rand();
    const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    returns.push(meanReturn + volatility * z);
  }
  return returns;
}

export function generateSamplePortfolioReturns(): { date: string; returns: Record<string, number>; portfolioReturn: number }[] {
  const tickers = SAMPLE_PORTFOLIO.map(a => a.ticker);
  const weights = SAMPLE_PORTFOLIO.map(a => a.weight / 100);
  const params: Record<string, { mean: number; vol: number; seed: number }> = {
    AAPL: { mean: 0.0008, vol: 0.018, seed: 42 },
    MSFT: { mean: 0.0007, vol: 0.016, seed: 137 },
    GOOGL: { mean: 0.0006, vol: 0.02, seed: 256 },
    BND: { mean: 0.0001, vol: 0.003, seed: 512 },
    GLD: { mean: 0.0003, vol: 0.01, seed: 777 },
  };

  const days = 504; // ~2 years
  const allReturns: Record<string, number[]> = {};
  tickers.forEach(t => {
    const p = params[t];
    allReturns[t] = generateDailyReturns(days, p.mean, p.vol, p.seed);
  });

  const startDate = new Date('2024-01-02');
  const data: { date: string; returns: Record<string, number>; portfolioReturn: number }[] = [];

  for (let i = 0; i < days; i++) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + Math.floor(i * 365 * 2 / days));
    const dayReturns: Record<string, number> = {};
    let portRet = 0;
    tickers.forEach((t, idx) => {
      dayReturns[t] = allReturns[t][i];
      portRet += weights[idx] * allReturns[t][i];
    });
    data.push({
      date: d.toISOString().split('T')[0],
      returns: dayReturns,
      portfolioReturn: portRet,
    });
  }
  return data;
}

export function generateOHLCV(days: number, startPrice: number, seed: number) {
  const rand = seededRandom(seed);
  const data: { date: string; open: number; high: number; low: number; close: number; volume: number }[] = [];
  let price = startPrice;
  const startDate = new Date('2025-01-02');

  for (let i = 0; i < days; i++) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    if (d.getDay() === 0 || d.getDay() === 6) continue;

    const open = price;
    const change = (rand() - 0.48) * 0.03 * price;
    const close = price + change;
    const high = Math.max(open, close) + rand() * 0.01 * price;
    const low = Math.min(open, close) - rand() * 0.01 * price;
    const volume = Math.floor(1000000 + rand() * 5000000);

    data.push({
      date: d.toISOString().split('T')[0],
      open: +open.toFixed(2),
      high: +high.toFixed(2),
      low: +low.toFixed(2),
      close: +close.toFixed(2),
      volume,
    });
    price = close;
  }
  return data;
}

export function generateMacroData() {
  const rand = seededRandom(999);
  const data: { date: string; gdpGrowth: number; cpi: number; interestRate: number; unemployment: number }[] = [];
  let gdp = 2.5, cpi = 3.2, ir = 5.25, unemp = 3.7;
  const startDate = new Date('2020-01-01');

  for (let i = 0; i < 60; i++) { // 5 years monthly
    const d = new Date(startDate);
    d.setMonth(d.getMonth() + i);
    gdp += (rand() - 0.5) * 0.4;
    cpi += (rand() - 0.48) * 0.3;
    ir += (rand() - 0.5) * 0.15;
    unemp += (rand() - 0.5) * 0.2;
    gdp = Math.max(-2, Math.min(6, gdp));
    cpi = Math.max(0, Math.min(9, cpi));
    ir = Math.max(0, Math.min(8, ir));
    unemp = Math.max(2, Math.min(8, unemp));

    data.push({
      date: d.toISOString().split('T')[0],
      gdpGrowth: +gdp.toFixed(2),
      cpi: +cpi.toFixed(2),
      interestRate: +ir.toFixed(2),
      unemployment: +unemp.toFixed(2),
    });
  }
  return data;
}

export const SAMPLE_DCF = {
  companyName: 'TechCorp AG',
  currentPrice: 145,
  sharesOutstanding: 500, // millions
  fcfProjections: [12, 14, 16.5, 19, 21.5, 24, 26, 28, 30, 32],
  terminalGrowthRate: 2.5,
  wacc: 9.5,
  costOfEquity: 11,
  costOfDebt: 4.5,
  taxRate: 21,
  debtToEquity: 0.4,
  netDebt: 2000, // millions
};
