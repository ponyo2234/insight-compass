import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2 } from 'lucide-react';

interface TickerSearchProps {
  onSearch: (ticker: string) => void;
  loading?: boolean;
  defaultValue?: string;
  placeholder?: string;
}

export function TickerSearch({ onSearch, loading, defaultValue = '', placeholder = 'Enter ticker (e.g. AAPL)' }: TickerSearchProps) {
  const [ticker, setTicker] = useState(defaultValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ticker.trim()) onSearch(ticker.trim().toUpperCase());
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center">
      <div className="relative flex-1 max-w-xs">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={ticker}
          onChange={e => setTicker(e.target.value)}
          placeholder={placeholder}
          className="pl-8 h-9 font-mono uppercase"
        />
      </div>
      <Button type="submit" size="sm" disabled={loading || !ticker.trim()} className="h-9">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Fetch'}
      </Button>
    </form>
  );
}
