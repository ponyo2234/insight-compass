import { useAppStore } from '@/store/useAppStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Settings as SettingsIcon, Percent, DollarSign, Shield } from 'lucide-react';

export default function SettingsPage() {
  const { settings, updateSettings } = useAppStore();

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Configure global risk parameters and preferences</p>
      </div>

      <div className="bg-card border border-border rounded-lg divide-y divide-border">
        {/* Risk-free rate */}
        <div className="p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Percent className="h-5 w-5 text-muted-foreground" />
            <div>
              <Label className="text-sm text-foreground">Risk-Free Rate</Label>
              <p className="text-xs text-muted-foreground">Used for Sharpe ratio and CAPM calculations</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={settings.riskFreeRate}
              onChange={e => updateSettings({ riskFreeRate: parseFloat(e.target.value) || 0 })}
              className="h-8 w-20 font-mono text-right"
              step="0.1"
            />
            <span className="text-sm text-muted-foreground">%</span>
          </div>
        </div>

        {/* Base Currency */}
        <div className="p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <DollarSign className="h-5 w-5 text-muted-foreground" />
            <div>
              <Label className="text-sm text-foreground">Base Currency</Label>
              <p className="text-xs text-muted-foreground">Default currency for all calculations</p>
            </div>
          </div>
          <Select value={settings.baseCurrency} onValueChange={v => updateSettings({ baseCurrency: v })}>
            <SelectTrigger className="w-24 h-8 font-mono"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="EUR">EUR</SelectItem>
              <SelectItem value="GBP">GBP</SelectItem>
              <SelectItem value="JPY">JPY</SelectItem>
              <SelectItem value="CHF">CHF</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Confidence Level */}
        <div className="p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-muted-foreground" />
            <div>
              <Label className="text-sm text-foreground">Confidence Level</Label>
              <p className="text-xs text-muted-foreground">Default VaR confidence level</p>
            </div>
          </div>
          <Select value={String(settings.confidenceLevel)} onValueChange={v => updateSettings({ confidenceLevel: parseInt(v) as 95 | 99 })}>
            <SelectTrigger className="w-24 h-8 font-mono"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="95">95%</SelectItem>
              <SelectItem value="99">99%</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Demo Mode */}
        <div className="p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SettingsIcon className="h-5 w-5 text-muted-foreground" />
            <div>
              <Label className="text-sm text-foreground">Demo Mode</Label>
              <p className="text-xs text-muted-foreground">Load sample data for all modules</p>
            </div>
          </div>
          <Switch
            checked={settings.demoMode}
            onCheckedChange={v => updateSettings({ demoMode: v })}
            className="data-[state=checked]:bg-primary"
          />
        </div>
      </div>
    </div>
  );
}
