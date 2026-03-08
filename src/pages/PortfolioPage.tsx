import { useState, useMemo, useRef } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { SAMPLE_PORTFOLIO, generateSamplePortfolioReturns } from '@/lib/sampleData';
import {
  historicalVaR, parametricVaR, scaledVaR, sharpeRatio, maxDrawdown, stdDev, mean
} from '@/lib/calculations';
import { MetricCard } from '@/components/MetricCard';
import { ChartExportButton } from '@/components/ChartExportButton';
import { CsvUploader } from '@/components/CsvUploader';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Plus, AlertTriangle, Shield, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { PortfolioAsset } from '@/store/useAppStore';

const PIE_COLORS = ['hsl(142,70%,45%)', 'hsl(210,80%,55%)', 'hsl(38,92%,50%)', 'hsl(280,60%,55%)', 'hsl(0,72%,50%)'];

export default function PortfolioPage() {
  const { settings, portfolioAssets, setPortfolioAssets } = useAppStore();
  const chartRef = useRef<HTMLDivElement>(null);
  const [newTicker, setNewTicker] = useState('');
  const [newWeight, setNewWeight] = useState('');
  const [newAssetClass, setNewAssetClass] = useState('Equity');

  const assets = settings.demoMode ? SAMPLE_PORTFOLIO : portfolioAssets;

  const sampleData = useMemo(() => generateSamplePortfolioReturns(), []);
  const portfolioReturns = useMemo(() => sampleData.map(d => d.portfolioReturn), [sampleData]);

  const var95hist = useMemo(() => historicalVaR(portfolioReturns, 95), [portfolioReturns]);
  const var99hist = useMemo(() => historicalVaR(portfolioReturns, 99), [portfolioReturns]);
  const var95param = useMemo(() => parametricVaR(portfolioReturns, 95), [portfolioReturns]);
  const var99param = useMemo(() => parametricVaR(portfolioReturns, 99), [portfolioReturns]);
  const vol = useMemo(() => stdDev(portfolioReturns) * Math.sqrt(252), [portfolioReturns]);
  const sr = useMemo(() => sharpeRatio(portfolioReturns, settings.riskFreeRate), [portfolioReturns, settings.riskFreeRate]);
  const mdd = useMemo(() => maxDrawdown(portfolioReturns), [portfolioReturns]);

  // Histogram data
  const histogramData = useMemo(() => {
    const bins = 50;
    const min = Math.min(...portfolioReturns);
    const max = Math.max(...portfolioReturns);
    const binWidth = (max - min) / bins;
    const counts = new Array(bins).fill(0);
    portfolioReturns.forEach(r => {
      const idx = Math.min(Math.floor((r - min) / binWidth), bins - 1);
      counts[idx]++;
    });
    return counts.map((count, i) => ({
      return: +(min + (i + 0.5) * binWidth).toFixed(4),
      returnLabel: ((min + (i + 0.5) * binWidth) * 100).toFixed(2) + '%',
      count,
      isVaR95: (min + (i + 0.5) * binWidth) <= -var95hist,
      isVaR99: (min + (i + 0.5) * binWidth) <= -var99hist,
    }));
  }, [portfolioReturns, var95hist, var99hist]);

  const addAsset = () => {
    if (!newTicker || !newWeight) return;
    setPortfolioAssets([...portfolioAssets, { ticker: newTicker.toUpperCase(), weight: parseFloat(newWeight), assetClass: newAssetClass }]);
    setNewTicker('');
    setNewWeight('');
  };

  const removeAsset = (idx: number) => {
    setPortfolioAssets(portfolioAssets.filter((_, i) => i !== idx));
  };

  const totalWeight = assets.reduce((s, a) => s + a.weight, 0);

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Portfolio & VaR Calculator</h1>
        <p className="text-sm text-muted-foreground mt-1">Calculate Value at Risk and key portfolio risk metrics</p>
      </div>

      {/* Portfolio Composition */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card border border-border rounded-lg p-5">
          <h2 className="text-sm font-medium text-foreground mb-4">Portfolio Holdings</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-muted-foreground font-medium">Ticker</th>
                  <th className="text-left py-2 text-muted-foreground font-medium">Weight (%)</th>
                  <th className="text-left py-2 text-muted-foreground font-medium">Asset Class</th>
                  {!settings.demoMode && <th className="py-2 w-10"></th>}
                </tr>
              </thead>
              <tbody>
                {assets.map((a, i) => (
                  <tr key={i} className="border-b border-border/50">
                    <td className="py-2 font-mono font-medium text-foreground">{a.ticker}</td>
                    <td className="py-2 font-mono">{a.weight}%</td>
                    <td className="py-2">
                      <span className="px-2 py-0.5 rounded text-xs bg-secondary text-secondary-foreground">{a.assetClass}</span>
                    </td>
                    {!settings.demoMode && (
                      <td className="py-2">
                        <button onClick={() => removeAsset(i)} className="text-muted-foreground hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs font-mono">
            <span className="text-muted-foreground">Total Weight:</span>
            <span className={totalWeight === 100 ? 'text-positive' : 'text-warning'}>{totalWeight}%</span>
          </div>

          {!settings.demoMode && (
            <div className="mt-4 flex gap-2 items-end">
              <div>
                <label className="text-xs text-muted-foreground">Ticker</label>
                <Input value={newTicker} onChange={e => setNewTicker(e.target.value)} placeholder="AAPL" className="h-8 w-24 font-mono" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Weight %</label>
                <Input value={newWeight} onChange={e => setNewWeight(e.target.value)} type="number" placeholder="20" className="h-8 w-20 font-mono" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Class</label>
                <Select value={newAssetClass} onValueChange={setNewAssetClass}>
                  <SelectTrigger className="h-8 w-28"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Equity">Equity</SelectItem>
                    <SelectItem value="Bond">Bond</SelectItem>
                    <SelectItem value="Commodity">Commodity</SelectItem>
                    <SelectItem value="FX">FX</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button size="sm" onClick={addAsset} className="h-8"><Plus className="h-4 w-4 mr-1" />Add</Button>
            </div>
          )}

          {!settings.demoMode && (
            <div className="mt-4">
              <CsvUploader onData={(data) => {
                const parsed: PortfolioAsset[] = data.map((row: any) => ({
                  ticker: row.ticker || row.Ticker || '',
                  weight: parseFloat(row.weight || row.Weight || 0),
                  assetClass: row.assetClass || row['Asset Class'] || 'Equity',
                })).filter(a => a.ticker);
                setPortfolioAssets(parsed);
              }}>
                <p className="text-xs text-muted-foreground mt-1">CSV format: ticker, weight, assetClass</p>
              </CsvUploader>
            </div>
          )}
        </div>

        {/* Allocation Pie */}
        <div className="bg-card border border-border rounded-lg p-5">
          <h2 className="text-sm font-medium text-foreground mb-4">Allocation</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={assets} dataKey="weight" nameKey="ticker" cx="50%" cy="50%" outerRadius={80} innerRadius={40} stroke="none">
                {assets.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: 'hsl(220,18%,12%)', border: '1px solid hsl(220,16%,18%)', borderRadius: '8px', fontSize: '12px' }}
                formatter={(value: number) => [`${value}%`, 'Weight']}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1 mt-2">
            {assets.map((a, i) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
                <span className="font-mono text-foreground">{a.ticker}</span>
                <span className="text-muted-foreground ml-auto">{a.weight}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* VaR Metrics */}
      <div>
        <h2 className="text-sm font-medium text-foreground mb-3">Value at Risk</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            label="1-Day VaR (95%) Hist"
            value={(var95hist * 100).toFixed(2) + '%'}
            subValue={`10-Day: ${(scaledVaR(var95hist, 10) * 100).toFixed(2)}%`}
            variant="negative"
            icon={<AlertTriangle className="h-4 w-4" />}
          />
          <MetricCard
            label="1-Day VaR (99%) Hist"
            value={(var99hist * 100).toFixed(2) + '%'}
            subValue={`10-Day: ${(scaledVaR(var99hist, 10) * 100).toFixed(2)}%`}
            variant="negative"
            icon={<AlertTriangle className="h-4 w-4" />}
          />
          <MetricCard
            label="1-Day VaR (95%) Param"
            value={(var95param * 100).toFixed(2) + '%'}
            subValue={`10-Day: ${(scaledVaR(var95param, 10) * 100).toFixed(2)}%`}
            variant="warning"
            icon={<Shield className="h-4 w-4" />}
          />
          <MetricCard
            label="1-Day VaR (99%) Param"
            value={(var99param * 100).toFixed(2) + '%'}
            subValue={`10-Day: ${(scaledVaR(var99param, 10) * 100).toFixed(2)}%`}
            variant="warning"
            icon={<Shield className="h-4 w-4" />}
          />
        </div>
      </div>

      {/* Risk Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard label="Annualized Volatility" value={(vol * 100).toFixed(2) + '%'} />
        <MetricCard
          label="Sharpe Ratio"
          value={sr.toFixed(3)}
          subValue={`Risk-free: ${settings.riskFreeRate}%`}
          variant={sr > 1 ? 'positive' : sr > 0 ? 'default' : 'negative'}
        />
        <MetricCard
          label="Max Drawdown"
          value={(mdd * 100).toFixed(2) + '%'}
          variant="negative"
          icon={<TrendingDown className="h-4 w-4" />}
        />
      </div>

      {/* Distribution Chart */}
      <div className="bg-card border border-border rounded-lg p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-medium text-foreground">Return Distribution</h2>
            <p className="text-xs text-muted-foreground">Portfolio daily returns with VaR cutoff lines</p>
          </div>
          <ChartExportButton targetRef={chartRef} filename="return-distribution" />
        </div>
        <div ref={chartRef}>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={histogramData} barCategoryGap={0}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,16%,18%)" />
              <XAxis dataKey="returnLabel" tick={{ fontSize: 10, fill: 'hsl(215,15%,55%)' }} interval={4} />
              <YAxis tick={{ fontSize: 10, fill: 'hsl(215,15%,55%)' }} />
              <Tooltip
                contentStyle={{ backgroundColor: 'hsl(220,18%,12%)', border: '1px solid hsl(220,16%,18%)', borderRadius: '8px', fontSize: '12px' }}
              />
              <Bar dataKey="count" fill="hsl(210,80%,55%)" radius={[2, 2, 0, 0]}>
                {histogramData.map((entry, i) => (
                  <Cell
                    key={i}
                    fill={entry.isVaR99 ? 'hsl(0,72%,50%)' : entry.isVaR95 ? 'hsl(38,92%,50%)' : 'hsl(210,80%,55%)'}
                  />
                ))}
              </Bar>
              <ReferenceLine x={(-var95hist * 100).toFixed(2) + '%'} stroke="hsl(38,92%,50%)" strokeDasharray="5 5" label={{ value: 'VaR 95%', fill: 'hsl(38,92%,50%)', fontSize: 11 }} />
              <ReferenceLine x={(-var99hist * 100).toFixed(2) + '%'} stroke="hsl(0,72%,50%)" strokeDasharray="5 5" label={{ value: 'VaR 99%', fill: 'hsl(0,72%,50%)', fontSize: 11 }} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
