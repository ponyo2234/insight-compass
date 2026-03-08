import { AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

export function DemoDataNotice() {
  return (
    <div className="flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-lg px-4 py-2.5 text-sm">
      <AlertTriangle className="h-4 w-4 text-accent shrink-0" />
      <span className="text-accent-foreground">
        Showing demo data —{' '}
        <Link to="/settings" className="underline text-accent hover:text-accent/80">
          add API key in Settings
        </Link>{' '}
        for real data
      </span>
    </div>
  );
}
