import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SampleCsvDownloadProps {
  type: 'price' | 'portfolio';
}

const PRICE_CSV = `date,open,high,low,close,volume
2025-01-02,150.00,152.50,149.20,151.80,1200000
2025-01-03,151.80,153.00,150.50,152.40,1350000
2025-01-06,152.40,154.10,151.90,153.70,1100000`;

const PORTFOLIO_CSV = `date,AAPL,MSFT,GOOGL,BND,GLD
2024-01-02,0.0012,-0.0008,0.0015,0.0001,0.0003
2024-01-03,0.0023,0.0018,-0.0005,-0.0002,0.0011
2024-01-04,-0.0015,0.0009,0.0022,0.0003,-0.0007`;

export function SampleCsvDownload({ type }: SampleCsvDownloadProps) {
  const csv = type === 'price' ? PRICE_CSV : PORTFOLIO_CSV;
  const filename = type === 'price' ? 'sample_prices.csv' : 'sample_portfolio_returns.csv';

  const download = () => {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Button variant="ghost" size="sm" onClick={download} className="text-xs text-muted-foreground h-7 gap-1">
      <Download className="h-3 w-3" />
      Download sample CSV
    </Button>
  );
}
