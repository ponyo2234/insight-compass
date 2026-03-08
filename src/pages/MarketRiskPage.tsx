import { useState, useMemo, useRef } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { generateOHLCV } from '@/lib/sampleData';
import { computeReturns, rollingVolatility, stdDev, mean } from '@/lib/calculations';
import { MetricCard } from '@/components/MetricCard';
import { ChartExportButton } from '@/components/ChartExportButton';
import { CsvUploader } from '@/components/CsvUploader';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, ComposedChart, Scatter } from 'recharts';
import { TrendingUp, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MarketRiskPage() {
  const { settings, priceData, setPriceData } = useAppStore();
  const chartRef = useRef<HTMLDivElement>(null);
  const volChartRef = useRef<HTMLDivElement>(null);

  const ohlcv = useMemo(() => settings.demoMode ? generateOHLCV(300, 150, 42) : priceData as any[], [settings.demoMode, priceData]);

  const closes = useMemo(() => ohlcv.map((d: any) => d.close), [ohlcv]);
  const returns = useMemo(() => computeReturns(closes), [closes]);
  const rollingVol = useMemo(() => rollingVolatility(returns, 30), [returns]);
  const avgVol = useMemo(() => {
    const valid = rollingVol.filter(v => v !== null) as number[];
    return valid.length ? mean(valid) : 0;
  }, [rollingVol]);
  const volStdDev = useMemo(() => {
    const valid = rollingVol.filter(v => v !== null) as number[];
    return valid.length ? stdDev(valid) : 0;
  }, [rollingVol]);
  const highRiskThreshold = avgVol + 2 * volStdDev;

  const chartData = useMemo(() => {
    return ohlcv.map((d: any, i: number) => {
      const vol = i > 0 ? rollingVol[i - 1] : null;
      return {
        date: d.date,
        price: d.close,
        high: d.high,
        low: d.low,
        volume: d.volume,
        volatility: vol ? +(vol * 100).toFixed(2) : null,
        isHighRisk: vol !== null && vol > highRiskThreshold,
      };
    });
  }, [ohlcv, rollingVol, highRiskThreshold]);

  const annualReturn = useMemo(() => {
    if (closes.length < 2) return 0;
    return ((closes[closes.length - 1] / closes[0]) - 1) * 100;
  }, [closes]);

  const currentVol = useMemo(() => {
    const valid = rollingVol.filter(v => v !== null) as number[];
    return valid.length ? valid[valid.length - 1] * 100 : 0;
  }, [rollingVol]);

  const highRiskDays = chartData.filter(d => d.isHighRisk).length;

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Market Price Risk Analysis</h1>
        <p className="text-sm text-muted-foreground mt-1">Analyze price volatility and identify high-risk periods</p>
      </div>

      {!settings.demoMode && (
        <CsvUploader onData={(data) => setPriceData(data)}>
          <p className="text-xs text-muted-foreground mt-1">CSV format: date, open, high, low, close, volume</p>
        </CsvUploader>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Current Price" value={`$${closes[closes.length - 1]?.toFixed(2) || '—'}`} icon={<TrendingUp className="h-4 w-4" />} />
        <MetricCard label="Period Return" value={`${annualReturn.toFixed(2)}%`} variant={annualReturn > 0 ? 'positive' : 'negative'} />
        <MetricCard label="Current 30d Vol" value={`${currentVol.toFixed(2)}%`} variant={currentVol > highRiskThreshold * 100 ? 'negative' : 'default'} />
        <MetricCard label="High-Risk Days" value={`${highRiskDays}`} subValue={`Threshold: ${(highRiskThreshold * 100).toFixed(1)}% vol`} variant={highRiskDays > 10 ? 'warning' : 'default'} icon={<AlertTriangle className="h-4 w-4" />} />
      </div>

      {/* Price Chart */}
      <div className="bg-card border border-border rounded-lg p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-medium text-foreground">Price Chart with Volatility Band</h2>
            <p className="text-xs text-muted-foreground">30-day rolling volatility overlay • High-risk zones highlighted</p>
          </div>
          <ChartExportButton targetRef={chartRef} filename="market-risk-price" />
        </div>
        <div ref={chartRef}>
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,16%,18%)" />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: 'hsl(215,15%,55%)' }} interval={30} />
              <YAxis yAxisId="price" tick={{ fontSize: 10, fill: 'hsl(215,15%,55%)' }} domain={['auto', 'auto']} />
              <YAxis yAxisId="vol" orientation="right" tick={{ fontSize: 10, fill: 'hsl(215,15%,55%)' }} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(220,18%,12%)', border: '1px solid hsl(220,16%,18%)', borderRadius: '8px', fontSize: '12px' }} />
              <Area yAxisId="price" dataKey="high" stroke="none" fill="hsl(142,70%,45%)" fillOpacity={0.05} />
              <Area yAxisId="price" dataKey="low" stroke="none" fill="hsl(0,72%,50%)" fillOpacity={0.05} />
              <Line yAxisId="price" type="monotone" dataKey="price" stroke="hsl(210,80%,55%)" strokeWidth={1.5} dot={false} />
              <Scatter yAxisId="price" dataKey={(entry: any) => entry.isHighRisk ? entry.price : undefined} fill="hsl(0,72%,50%)" r={3} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Volatility Chart */}
      <div className="bg-card border border-border rounded-lg p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-medium text-foreground">Rolling 30-Day Volatility (Annualized)</h2>
            <p className="text-xs text-muted-foreground">Red zones indicate volatility &gt; 2σ above mean</p>
          </div>
          <ChartExportButton targetRef={volChartRef} filename="volatility" />
        </div>
        <div ref={volChartRef}>
          <ResponsiveContainer width="100%" height={250}>
            <ComposedChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,16%,18%)" />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: 'hsl(215,15%,55%)' }} interval={30} />
              <YAxis tick={{ fontSize: 10, fill: 'hsl(215,15%,55%)' }} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(220,18%,12%)', border: '1px solid hsl(220,16%,18%)', borderRadius: '8px', fontSize: '12px' }} />
              <Area dataKey="volatility" stroke="hsl(142,70%,45%)" fill="hsl(142,70%,45%)" fillOpacity={0.15} strokeWidth={1.5} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
