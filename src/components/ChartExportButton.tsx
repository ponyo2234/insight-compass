import { useRef, useCallback } from 'react';
import { toPng } from 'html-to-image';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChartExportButtonProps {
  targetRef: React.RefObject<HTMLDivElement>;
  filename?: string;
}

export function ChartExportButton({ targetRef, filename = 'chart' }: ChartExportButtonProps) {
  const handleExport = useCallback(async () => {
    if (!targetRef.current) return;
    try {
      const dataUrl = await toPng(targetRef.current, { backgroundColor: '#111318' });
      const link = document.createElement('a');
      link.download = `${filename}.png`;
      link.href = dataUrl;
      link.click();
    } catch (e) {
      console.error('Export failed', e);
    }
  }, [targetRef, filename]);

  return (
    <Button variant="ghost" size="sm" onClick={handleExport} className="text-muted-foreground hover:text-foreground">
      <Download className="h-4 w-4 mr-1" />
      Export
    </Button>
  );
}
