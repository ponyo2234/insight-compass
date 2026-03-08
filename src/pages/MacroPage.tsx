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
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    gdpGrowth: true, cpi: true, interestRate: true, unemployment: true,
  });

  const data = useMemo(() => settings.demoMode ? generateMacroData() : macroData as any[], [settings.demoMode, macroData]);
  const activeIndicators = INDICATORS.filter(ind => toggles[ind.key]);

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Macro Data Visualization</h1>
        <p className="text-sm text-muted-foreground mt-1">Explore macroeconomic indicators and overlay with portfolio data</p>
      </div>

      {!settings.demoMode && (
        <CsvUploader onData={(d) => setMacroData(d)}>
          <p className="text-xs text-muted-foreground mt-1">CSV format: date, gdpGrowth, cpi, interestRate, unemployment</p>
        </CsvUploader>
      )}

      {/* Toggle indicators */}
      <div className="flex flex-wrap gap-4 bg-card border border-border rounded-lg p-4">
        {INDICATORS.map(ind => (
          <div key={ind.key} className="flex items-center gap-2">
            <Switch
              checked={toggles[ind.key]}
              onCheckedChange={(v) => setToggles(prev => ({ ...prev, [ind.key]: v }))}
              className="data-[state=checked]:bg-primary"
            />
            <Label className="text-xs text-muted-foreground flex items-center gap-1.5">
              <span className="w-3 h-0.5 rounded" style={{ backgroundColor: ind.color }} />
              {ind.label}
            </Label>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-card border border-border rounded-lg p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-medium text-foreground">Macro Indicators Timeline</h2>
          <ChartExportButton targetRef={chartRef} filename="macro-data" />
        </div>
        <div ref={chartRef}>
          <ResponsiveContainer width="100%" height={450}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,16%,18%)" />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: 'hsl(215,15%,55%)' }} interval={6} />
              <YAxis tick={{ fontSize: 10, fill: 'hsl(215,15%,55%)' }} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(220,18%,12%)', border: '1px solid hsl(220,16%,18%)', borderRadius: '8px', fontSize: '12px' }} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              {activeIndicators.map(ind => (
                <Line key={ind.key} type="monotone" dataKey={ind.key} stroke={ind.color} strokeWidth={2} dot={false} name={ind.label} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Latest values */}
      {data.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {INDICATORS.map(ind => {
            const latest = data[data.length - 1]?.[ind.key];
            return (
              <div key={ind.key} className="bg-card border border-border rounded-lg p-4">
                <div className="text-xs text-muted-foreground mb-1">{ind.label}</div>
                <div className="text-2xl font-mono font-semibold text-foreground">{latest?.toFixed(2)}%</div>
                <div className="text-xs text-muted-foreground mt-1">Latest: {data[data.length - 1]?.date}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
