// Financial calculations - all client-side

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

// Normal distribution inverse (Beasley-Springer-Moro approximation)
function normInv(p: number): number {
  const a = [-3.969683028665376e1, 2.209460984245205e2, -2.759285104469687e2,
    1.383577518672690e2, -3.066479806614716e1, 2.506628277459239e0];
  const b = [-5.447609879822406e1, 1.615858368580409e2, -1.556989798598866e2,
    6.680131188771972e1, -1.328068155288572e1];
  const c = [-7.784894002430293e-3, -3.223964580411365e-1, -2.400758277161838e0,
    -2.549732539343734e0, 4.374664141464968e0, 2.938163982698783e0];
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

// VaR calculations
export function historicalVaR(returns: number[], confidence: number): number {
  return -percentile(returns, 100 - confidence);
}

export function parametricVaR(returns: number[], confidence: number): number {
  const m = mean(returns);
  const s = stdDev(returns);
  const z = -normInv(1 - confidence / 100);
  return -(m - z * s);
}

export function scaledVaR(oneDayVaR: number, days: number): number {
  return oneDayVaR * Math.sqrt(days);
}

export function sharpeRatio(returns: number[], riskFreeRate: number): number {
  const annualReturn = mean(returns) * 252;
  const annualVol = stdDev(returns) * Math.sqrt(252);
  return (annualReturn - riskFreeRate / 100) / annualVol;
}

export function maxDrawdown(returns: number[]): number {
  let cumReturn = 1;
  let peak = 1;
  let maxDD = 0;
  for (const r of returns) {
    cumReturn *= (1 + r);
    peak = Math.max(peak, cumReturn);
    const dd = (peak - cumReturn) / peak;
    maxDD = Math.max(maxDD, dd);
  }
  return maxDD;
}

export function rollingVolatility(returns: number[], window: number): (number | null)[] {
  return returns.map((_, i) => {
    if (i < window - 1) return null;
    const slice = returns.slice(i - window + 1, i + 1);
    return stdDev(slice) * Math.sqrt(252);
  });
}

export function computeReturns(prices: number[]): number[] {
  return prices.slice(1).map((p, i) => (p - prices[i]) / prices[i]);
}

// Technical indicators
export function sma(data: number[], period: number): (number | null)[] {
  return data.map((_, i) => {
    if (i < period - 1) return null;
    return mean(data.slice(i - period + 1, i + 1));
  });
}

export function ema(data: number[], period: number): number[] {
  const k = 2 / (period + 1);
  const result: number[] = [data[0]];
  for (let i = 1; i < data.length; i++) {
    result.push(data[i] * k + result[i - 1] * (1 - k));
  }
  return result;
}

export function rsi(data: number[], period: number = 14): (number | null)[] {
  const returns = data.slice(1).map((v, i) => v - data[i]);
  const result: (number | null)[] = new Array(period + 1).fill(null);
  
  let avgGain = 0, avgLoss = 0;
  for (let i = 0; i < period; i++) {
    if (returns[i] > 0) avgGain += returns[i];
    else avgLoss -= returns[i];
  }
  avgGain /= period;
  avgLoss /= period;
  
  result.push(avgLoss === 0 ? 100 : 100 - 100 / (1 + avgGain / avgLoss));
  
  for (let i = period; i < returns.length; i++) {
    const gain = returns[i] > 0 ? returns[i] : 0;
    const loss = returns[i] < 0 ? -returns[i] : 0;
    avgGain = (avgGain * (period - 1) + gain) / period;
    avgLoss = (avgLoss * (period - 1) + loss) / period;
    result.push(avgLoss === 0 ? 100 : 100 - 100 / (1 + avgGain / avgLoss));
  }
  return result;
}

export function macd(data: number[], fast = 12, slow = 26, signal = 9) {
  const emaFast = ema(data, fast);
  const emaSlow = ema(data, slow);
  const macdLine = emaFast.map((v, i) => v - emaSlow[i]);
  const signalLine = ema(macdLine, signal);
  const histogram = macdLine.map((v, i) => v - signalLine[i]);
  return { macdLine, signalLine, histogram };
}

export function bollingerBands(data: number[], period = 20, multiplier = 2) {
  return data.map((_, i) => {
    if (i < period - 1) return { upper: null, middle: null, lower: null };
    const slice = data.slice(i - period + 1, i + 1);
    const m = mean(slice);
    const s = stdDev(slice);
    return { upper: m + multiplier * s, middle: m, lower: m - multiplier * s };
  });
}

// DCF
export function calculateDCF(
  fcfs: number[],
  terminalGrowthRate: number,
  wacc: number,
  netDebt: number,
  sharesOutstanding: number
) {
  const waccDec = wacc / 100;
  const tgrDec = terminalGrowthRate / 100;
  
  const pvFCFs = fcfs.map((fcf, i) => ({
    year: i + 1,
    fcf,
    pv: fcf / Math.pow(1 + waccDec, i + 1),
  }));
  
  const lastFCF = fcfs[fcfs.length - 1];
  const terminalValue = (lastFCF * (1 + tgrDec)) / (waccDec - tgrDec);
  const pvTerminal = terminalValue / Math.pow(1 + waccDec, fcfs.length);
  
  const enterpriseValue = pvFCFs.reduce((s, v) => s + v.pv, 0) + pvTerminal;
  const equityValue = enterpriseValue - netDebt;
  const intrinsicValue = equityValue / sharesOutstanding;
  
  return { pvFCFs, terminalValue, pvTerminal, enterpriseValue, equityValue, intrinsicValue };
}

export function dcfSensitivity(
  fcfs: number[],
  terminalGrowthRate: number,
  wacc: number,
  netDebt: number,
  sharesOutstanding: number,
  waccRange: number[] = [7, 8, 9, 9.5, 10, 11, 12],
  tgrRange: number[] = [1, 1.5, 2, 2.5, 3, 3.5, 4]
) {
  return waccRange.map(w => ({
    wacc: w,
    values: tgrRange.map(t => ({
      tgr: t,
      value: calculateDCF(fcfs, t, w, netDebt, sharesOutstanding).intrinsicValue,
    })),
  }));
}

export function calculateWACC(
  costOfEquity: number,
  costOfDebt: number,
  taxRate: number,
  debtToEquity: number
): number {
  const E = 1 / (1 + debtToEquity);
  const D = debtToEquity / (1 + debtToEquity);
  return E * costOfEquity + D * costOfDebt * (1 - taxRate / 100);
}
