import { LucideIcon } from 'lucide-react';

interface AppHeaderProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
}

export const AppHeader = ({ icon: Icon, title, subtitle }: AppHeaderProps) => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="flex h-16 items-center px-6">
        <div className="flex items-center gap-3 max-w-lg mx-auto w-full">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-glow flex-shrink-0">
            <Icon className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">{title}</h1>
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};
