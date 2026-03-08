import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface MetricCardProps {
  label: string;
  value: string;
  subValue?: string;
  variant?: 'default' | 'positive' | 'negative' | 'warning';
  icon?: ReactNode;
}

const variantClasses = {
  default: 'border-border',
  positive: 'border-positive/30 glow-green',
  negative: 'border-negative/30 glow-red',
  warning: 'border-warning/30',
};

export function MetricCard({ label, value, subValue, variant = 'default', icon }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-card border rounded-lg p-4 ${variantClasses[variant]}`}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-muted-foreground uppercase tracking-wider">{label}</span>
        {icon && <span className="text-muted-foreground">{icon}</span>}
      </div>
      <div className="font-mono text-2xl font-semibold text-foreground">{value}</div>
      {subValue && <div className="text-xs text-muted-foreground mt-1 font-mono">{subValue}</div>}
    </motion.div>
  );
}
