import { useCallback, useState, ReactNode } from 'react';
import Papa from 'papaparse';
import { Upload } from 'lucide-react';

interface CsvUploaderProps {
  onData: (data: any[]) => void;
  children?: ReactNode;
  accept?: string;
}

export function CsvUploader({ onData, children, accept = '.csv' }: CsvUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFile = useCallback((file: File) => {
    setFileName(file.name);
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        onData(results.data);
      },
    });
  }, [onData]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer
        ${isDragging ? 'border-primary bg-primary/5' : 'border-border hover:border-muted-foreground'}`}
    >
      <input
        type="file"
        accept={accept}
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        className="hidden"
        id="csv-upload"
      />
      <label htmlFor="csv-upload" className="cursor-pointer">
        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
        {fileName ? (
          <p className="text-sm text-primary font-mono">{fileName}</p>
        ) : (
          <>
            <p className="text-sm text-muted-foreground">Drag & drop CSV or click to upload</p>
            {children}
          </>
        )}
      </label>
    </div>
  );
}
