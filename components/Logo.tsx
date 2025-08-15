import { cn } from "@/lib/utils";

const Logo = ({ className }: { className?: string }) => (
  <div className={cn('flex items-center gap-2', className)}>
    <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
      <span className="text-primary-foreground font-bold text-sm">L</span>
    </div>
    <span className="font-semibold text-lg">LogoName</span>
  </div>
);