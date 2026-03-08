const BASE_URL = 'https://www.alphavantage.co/query';

export interface AlphaVantageDaily {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export async function fetchDailyPrices(ticker: string, apiKey: string): Promise<AlphaVantageDaily[]> {
  const url = `${BASE_URL}?function=TIME_SERIES_DAILY&symbol=${encodeURIComponent(ticker)}&outputsize=full&apikey=${encodeURIComponent(apiKey)}`;
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
      date,
      open: parseFloat(vals['1. open']),
      high: parseFloat(vals['2. high']),
      low: parseFloat(vals['3. low']),
      close: parseFloat(vals['5. adjusted close'] || vals['4. close']),
      volume: parseInt(vals['6. volume'] || vals['5. volume'], 10),
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

export async function validateApiKey(apiKey: string): Promise<boolean> {
  try {
    const url = `${BASE_URL}?function=TIME_SERIES_DAILY&symbol=IBM&apikey=${encodeURIComponent(apiKey)}&outputsize=compact`;
    const res = await fetch(url);
    const json = await res.json();
    // Invalid only if explicit error message about the key itself
    if (json['Error Message'] && json['Error Message'].toLowerCase().includes('invalid api key')) {
      return false;
    }
    return true; // Note, Information, or actual data = key is valid
  } catch {
    return false;
  }
}

export function getApiKey(): string {
  return localStorage.getItem('alphaVantageApiKey') || '';
}

export function setApiKey(key: string): void {
  localStorage.setItem('alphaVantageApiKey', key);
}

export function getDefaultTicker(): string {
  return localStorage.getItem('defaultTicker') || 'AAPL';
}

export function setDefaultTicker(ticker: string): void {
  localStorage.setItem('defaultTicker', ticker);
}
