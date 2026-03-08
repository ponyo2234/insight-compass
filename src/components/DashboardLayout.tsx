import { ReactNode } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { useAppStore } from '@/store/useAppStore';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { settings, updateSettings } = useAppStore();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-12 flex items-center justify-between border-b border-border px-4 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
              <div className="h-4 w-px bg-border" />
              <span className="text-xs text-muted-foreground font-mono">
                {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Label htmlFor="demo-mode" className="text-xs text-muted-foreground">Demo</Label>
                <Switch
                  id="demo-mode"
                  checked={settings.demoMode}
                  onCheckedChange={(v) => updateSettings({ demoMode: v })}
                  className="data-[state=checked]:bg-primary"
                />
              </div>
              <div className="text-xs font-mono text-muted-foreground">
                {settings.baseCurrency} | {settings.confidenceLevel}% CL
              </div>
            </div>
          </header>
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
