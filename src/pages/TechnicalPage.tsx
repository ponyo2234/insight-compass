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
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Area, ComposedChart, Bar, ReferenceLine
} from 'recharts';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Activity } from 'lucide-react';
import { toast } from 'sonner';

export default function TechnicalPage() {
  const { settings, priceData, setPriceData } = useAppStore();
  const priceChartRef = useRef<HTMLDivElement>(null);
  const rsiChartRef = useRef<HTMLDivElement>(null);
  const macdChartRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [activeTicker, setActiveTicker] = useState<string | null>(null);
  const [csvData, setCsvData] = useState<any[] | null>(null);

  const [indicators, setIndicators] = useState({
    sma20: true, sma50: true, ema200: true, bollinger: true,
  });

  const useDemo = settings.demoMode && !csvData && priceData.length === 0;

  const ohlcv = useMemo(() => {
    if (csvData) return csvData;
    if (priceData.length > 0) return priceData as any[];
    return generateOHLCV(300, 150, 42);
  }, [csvData, priceData]);

  const handleFetchTicker = useCallback(async (ticker: string) => {
    const apiKey = getApiKey();
    if (!apiKey) {
      toast.error('Add your Alpha Vantage API key in Settings first');
      return;
    }
    setLoading(true);
    try {
      const data = await fetchDailyPrices(ticker, apiKey);
      const recent = data.slice(-504);
      setPriceData(recent);
      setCsvData(null);
      setActiveTicker(ticker);
      toast.success(`Loaded ${recent.length} days of data for ${ticker}`);
    } catch (err: any) {
      toast.error(err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, [setPriceData]);

  const handleCsvUpload = useCallback((data: any[]) => {
    const parsed = data.map((row: any) => ({
      date: row.date || row.Date,
      open: parseFloat(row.open || row.Open || 0),
      high: parseFloat(row.high || row.High || 0),
      low: parseFloat(row.low || row.Low || 0),
      close: parseFloat(row.close || row.Close || 0),
      volume: parseInt(row.volume || row.Volume || 0, 10),
    })).filter(d => d.date && !isNaN(d.close));
    setCsvData(parsed);
    setActiveTicker('CSV');
    toast.success(`Loaded ${parsed.length} rows from CSV`);
  }, []);

  const closes = useMemo(() => ohlcv.map((d: any) => d.close), [ohlcv]);

  const sma20 = useMemo(() => sma(closes, 20), [closes]);
  const sma50 = useMemo(() => sma(closes, 50), [closes]);
  const ema200 = useMemo(() => ema(closes, 200), [closes]);
  const rsiData = useMemo(() => calcRSI(closes, 14), [closes]);
  const macdData = useMemo(() => calcMACD(closes), [closes]);
  const bbData = useMemo(() => bollingerBands(closes), [closes]);

  const chartData = useMemo(() => ohlcv.map((d: any, i: number) => ({
    date: d.date,
    close: d.close,
    sma20: sma20[i],
    sma50: sma50[i],
    ema200: ema200[i],
    bbUpper: bbData[i]?.upper,
    bbMiddle: bbData[i]?.middle,
    bbLower: bbData[i]?.lower,
    rsi: rsiData[i],
    macdLine: macdData.macdLine[i],
    signalLine: macdData.signalLine[i],
    histogram: macdData.histogram[i],
  })), [ohlcv, sma20, sma50, ema200, bbData, rsiData, macdData]);

  const latestRSI = rsiData[rsiData.length - 1] ?? 50;
  const latestMACD = macdData.macdLine[macdData.macdLine.length - 1];
  const latestSignal = macdData.signalLine[macdData.signalLine.length - 1];
  const latestPrice = closes[closes.length - 1];
  const latestSMA50 = sma50[sma50.length - 1];

  const signals = [
    {
      label: 'RSI',
      value: latestRSI < 30 ? 'Oversold' : latestRSI > 70 ? 'Overbought' : 'Neutral',
      color: latestRSI < 30 ? 'text-positive' : latestRSI > 70 ? 'text-negative' : 'text-muted-foreground',
    },
    {
      label: 'MACD',
      value: latestMACD > latestSignal ? 'Bullish crossover' : 'Bearish crossover',
      color: latestMACD > latestSignal ? 'text-positive' : 'text-negative',
    },
    {
      label: 'MA',
      value: latestSMA50 && latestPrice > latestSMA50 ? 'Price above SMA50' : 'Price below SMA50',
      color: latestSMA50 && latestPrice > latestSMA50 ? 'text-positive' : 'text-negative',
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Technical Analysis</h1>
        <p className="text-sm text-muted-foreground mt-1">Moving averages, RSI, MACD, and Bollinger Bands with signal detection</p>
      </div>

      {/* Data Input Section */}
      <div className="bg-card border border-border rounded-lg p-5 space-y-4">
        <h2 className="text-sm font-medium text-foreground">Data Source</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <p className="text-xs text-muted-foreground mb-2">Fetch via API</p>
            <TickerSearch onSearch={handleFetchTicker} loading={loading} defaultValue={getDefaultTicker()} />
          </div>
          <div className="text-xs text-muted-foreground flex items-center">or</div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground">Upload CSV</p>
              <SampleCsvDownload type="price" />
            </div>
            <CsvUploader onData={handleCsvUpload}>
              <p className="text-xs text-muted-foreground mt-1">Format: date, open, high, low, close, volume</p>
            </CsvUploader>
          </div>
        </div>
        {activeTicker && (
          <p className="text-xs text-primary font-mono">Active: {activeTicker} ({ohlcv.length} data points)</p>
        )}
      </div>

      {useDemo && <DemoDataNotice />}

      {/* Signal Summary */}
      <div className="bg-card border border-border rounded-lg p-4 flex flex-wrap gap-6">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-foreground">Signal Summary</span>
        </div>
        {signals.map(s => (
          <div key={s.label} className="text-sm">
            <span className="text-muted-foreground">{s.label}: </span>
            <span className={`font-medium ${s.color}`}>{s.value}</span>
          </div>
        ))}
      </div>

      {/* Indicator Toggles */}
      <div className="flex flex-wrap gap-4 bg-card border border-border rounded-lg p-4">
        {[
          { key: 'sma20', label: 'SMA 20', color: 'hsl(38,92%,50%)' },
          { key: 'sma50', label: 'SMA 50', color: 'hsl(280,60%,55%)' },
          { key: 'ema200', label: 'EMA 200', color: 'hsl(0,72%,50%)' },
          { key: 'bollinger', label: 'Bollinger Bands', color: 'hsl(215,15%,55%)' },
        ].map(ind => (
          <div key={ind.key} className="flex items-center gap-2">
            <Switch
              checked={indicators[ind.key as keyof typeof indicators]}
              onCheckedChange={(v) => setIndicators(prev => ({ ...prev, [ind.key]: v }))}
              className="data-[state=checked]:bg-primary"
            />
            <Label className="text-xs text-muted-foreground flex items-center gap-1.5">
              <span className="w-3 h-0.5 rounded" style={{ backgroundColor: ind.color }} />
              {ind.label}
            </Label>
          </div>
        ))}
      </div>

      {/* Price Chart */}
      <div className="bg-card border border-border rounded-lg p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-medium text-foreground">Price Chart with Overlays</h2>
          <ChartExportButton targetRef={priceChartRef} filename="technical-price" />
        </div>
        <div ref={priceChartRef}>
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,16%,18%)" />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: 'hsl(215,15%,55%)' }} interval={30} />
              <YAxis tick={{ fontSize: 10, fill: 'hsl(215,15%,55%)' }} domain={['auto', 'auto']} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(220,18%,12%)', border: '1px solid hsl(220,16%,18%)', borderRadius: '8px', fontSize: '12px' }} />
              {indicators.bollinger && (
                <>
                  <Area dataKey="bbUpper" stroke="none" fill="hsl(215,15%,55%)" fillOpacity={0.05} />
                  <Line type="monotone" dataKey="bbUpper" stroke="hsl(215,15%,55%)" strokeWidth={1} dot={false} strokeDasharray="3 3" />
                  <Line type="monotone" dataKey="bbLower" stroke="hsl(215,15%,55%)" strokeWidth={1} dot={false} strokeDasharray="3 3" />
                </>
              )}
              <Line type="monotone" dataKey="close" stroke="hsl(210,80%,55%)" strokeWidth={1.5} dot={false} />
              {indicators.sma20 && <Line type="monotone" dataKey="sma20" stroke="hsl(38,92%,50%)" strokeWidth={1} dot={false} />}
              {indicators.sma50 && <Line type="monotone" dataKey="sma50" stroke="hsl(280,60%,55%)" strokeWidth={1} dot={false} />}
              {indicators.ema200 && <Line type="monotone" dataKey="ema200" stroke="hsl(0,72%,50%)" strokeWidth={1} dot={false} />}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* RSI */}
      <div className="bg-card border border-border rounded-lg p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-medium text-foreground">RSI (14-Day)</h2>
          <ChartExportButton targetRef={rsiChartRef} filename="rsi" />
        </div>
        <div ref={rsiChartRef}>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,16%,18%)" />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: 'hsl(215,15%,55%)' }} interval={30} />
              <YAxis tick={{ fontSize: 10, fill: 'hsl(215,15%,55%)' }} domain={[0, 100]} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(220,18%,12%)', border: '1px solid hsl(220,16%,18%)', borderRadius: '8px', fontSize: '12px' }} />
              <ReferenceLine y={70} stroke="hsl(0,72%,50%)" strokeDasharray="5 5" label={{ value: 'Overbought', fill: 'hsl(0,72%,50%)', fontSize: 10 }} />
              <ReferenceLine y={30} stroke="hsl(142,70%,45%)" strokeDasharray="5 5" label={{ value: 'Oversold', fill: 'hsl(142,70%,45%)', fontSize: 10 }} />
              <Line type="monotone" dataKey="rsi" stroke="hsl(38,92%,50%)" strokeWidth={1.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* MACD */}
      <div className="bg-card border border-border rounded-lg p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-medium text-foreground">MACD (12, 26, 9)</h2>
          <ChartExportButton targetRef={macdChartRef} filename="macd" />
        </div>
        <div ref={macdChartRef}>
          <ResponsiveContainer width="100%" height={200}>
            <ComposedChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,16%,18%)" />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: 'hsl(215,15%,55%)' }} interval={30} />
              <YAxis tick={{ fontSize: 10, fill: 'hsl(215,15%,55%)' }} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(220,18%,12%)', border: '1px solid hsl(220,16%,18%)', borderRadius: '8px', fontSize: '12px' }} />
              <Bar dataKey="histogram" fill="hsl(142,70%,45%)" opacity={0.5} />
              <Line type="monotone" dataKey="macdLine" stroke="hsl(210,80%,55%)" strokeWidth={1.5} dot={false} />
              <Line type="monotone" dataKey="signalLine" stroke="hsl(0,72%,50%)" strokeWidth={1.5} dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
