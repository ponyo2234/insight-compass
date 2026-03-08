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

  const wacc = useMemo(() => calculateWACC(dcf.costOfEquity, dcf.costOfDebt, dcf.taxRate, dcf.debtToEquity), [dcf]);
  const result = useMemo(() => calculateDCF(dcf.fcfProjections, dcf.terminalGrowthRate, dcf.wacc, dcf.netDebt, dcf.sharesOutstanding), [dcf]);
  const sensitivity = useMemo(() => dcfSensitivity(dcf.fcfProjections, dcf.terminalGrowthRate, dcf.wacc, dcf.netDebt, dcf.sharesOutstanding), [dcf]);

  const premiumDiscount = ((dcf.currentPrice - result.intrinsicValue) / result.intrinsicValue * 100);

  const waterfallData = [
    ...result.pvFCFs.map(pv => ({ name: `Y${pv.year}`, value: +pv.pv.toFixed(1), type: 'fcf' })),
    { name: 'Terminal', value: +result.pvTerminal.toFixed(1), type: 'terminal' },
  ];

  const updateField = (field: string, value: any) => setDcf(prev => ({ ...prev, [field]: value }));
  const updateFCF = (idx: number, val: number) => {
    const newFCFs = [...dcf.fcfProjections];
    newFCFs[idx] = val;
    setDcf(prev => ({ ...prev, fcfProjections: newFCFs }));
  };

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">DCF Valuation Tool</h1>
        <p className="text-sm text-muted-foreground mt-1">Calculate intrinsic value using Discounted Cash Flow methodology</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inputs */}
        <div className="bg-card border border-border rounded-lg p-5 space-y-4">
          <h2 className="text-sm font-medium text-foreground">Company: {dcf.companyName}</h2>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs text-muted-foreground">Current Price ($)</Label>
              <Input type="number" value={dcf.currentPrice} onChange={e => updateField('currentPrice', +e.target.value)} className="h-8 font-mono" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Shares (M)</Label>
              <Input type="number" value={dcf.sharesOutstanding} onChange={e => updateField('sharesOutstanding', +e.target.value)} className="h-8 font-mono" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">WACC (%)</Label>
              <Input type="number" value={dcf.wacc} onChange={e => updateField('wacc', +e.target.value)} className="h-8 font-mono" step="0.1" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Terminal Growth (%)</Label>
              <Input type="number" value={dcf.terminalGrowthRate} onChange={e => updateField('terminalGrowthRate', +e.target.value)} className="h-8 font-mono" step="0.1" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Net Debt ($M)</Label>
              <Input type="number" value={dcf.netDebt} onChange={e => updateField('netDebt', +e.target.value)} className="h-8 font-mono" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Cost of Equity (%)</Label>
              <Input type="number" value={dcf.costOfEquity} onChange={e => updateField('costOfEquity', +e.target.value)} className="h-8 font-mono" step="0.1" />
            </div>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground mb-2 block">FCF Projections ($M)</Label>
            <div className="grid grid-cols-5 gap-1.5">
              {dcf.fcfProjections.map((fcf, i) => (
                <div key={i}>
                  <span className="text-[10px] text-muted-foreground">Y{i + 1}</span>
                  <Input type="number" value={fcf} onChange={e => updateFCF(i, +e.target.value)} className="h-7 text-xs font-mono p-1" />
                </div>
              ))}
            </div>
          </div>

          <div className="text-xs text-muted-foreground border-t border-border pt-3">
            Auto WACC: {wacc.toFixed(2)}% (CoE: {dcf.costOfEquity}%, CoD: {dcf.costOfDebt}%, Tax: {dcf.taxRate}%, D/E: {dcf.debtToEquity})
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard label="Intrinsic Value" value={`$${result.intrinsicValue.toFixed(2)}`} variant="positive" />
            <MetricCard label="Enterprise Value" value={`$${(result.enterpriseValue / 1000).toFixed(1)}B`} />
            <MetricCard label="Equity Value" value={`$${(result.equityValue / 1000).toFixed(1)}B`} />
            <MetricCard
              label="Premium/Discount"
              value={`${premiumDiscount > 0 ? '+' : ''}${premiumDiscount.toFixed(1)}%`}
              variant={premiumDiscount > 0 ? 'negative' : 'positive'}
              subValue={premiumDiscount > 0 ? 'Overvalued' : 'Undervalued'}
            />
          </div>

          {/* Waterfall */}
          <div className="bg-card border border-border rounded-lg p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-medium text-foreground">DCF Waterfall — PV of Cash Flows</h2>
              <ChartExportButton targetRef={chartRef} filename="dcf-waterfall" />
            </div>
            <div ref={chartRef}>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={waterfallData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,16%,18%)" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'hsl(215,15%,55%)' }} />
                  <YAxis tick={{ fontSize: 10, fill: 'hsl(215,15%,55%)' }} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(220,18%,12%)', border: '1px solid hsl(220,16%,18%)', borderRadius: '8px', fontSize: '12px' }} formatter={(v: number) => [`$${v.toFixed(1)}M`, 'PV']} />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {waterfallData.map((entry, i) => (
                      <Cell key={i} fill={entry.type === 'terminal' ? 'hsl(38,92%,50%)' : 'hsl(142,70%,45%)'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Sensitivity Table */}
      <div className="bg-card border border-border rounded-lg p-5 overflow-x-auto">
        <h2 className="text-sm font-medium text-foreground mb-4">Sensitivity Analysis — Intrinsic Value per Share</h2>
        <table className="w-full text-xs font-mono">
          <thead>
            <tr>
              <th className="p-2 text-muted-foreground text-left">WACC \ TGR</th>
              {sensitivity[0]?.values.map(v => (
                <th key={v.tgr} className="p-2 text-muted-foreground text-center">{v.tgr}%</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sensitivity.map(row => (
              <tr key={row.wacc} className="border-t border-border/50">
                <td className="p-2 text-muted-foreground font-medium">{row.wacc}%</td>
                {row.values.map(cell => {
                  const diff = ((dcf.currentPrice - cell.value) / cell.value) * 100;
                  const bg = diff > 20 ? 'bg-destructive/20' : diff > 0 ? 'bg-destructive/10' : diff > -20 ? 'bg-primary/10' : 'bg-primary/20';
                  return (
                    <td key={cell.tgr} className={`p-2 text-center ${bg} text-foreground`}>
                      ${cell.value.toFixed(0)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex gap-4 mt-3 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-primary/20" /> Undervalued</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-destructive/20" /> Overvalued</span>
          <span>Current price: ${dcf.currentPrice}</span>
        </div>
      </div>
    </div>
  );
}
