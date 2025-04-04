// components/core/TrustBadge.tsx
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Use Card for structure
import { cn } from '@/lib/utils'; // Import cn

interface TrustBadgeProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor?: string; // Optional color override e.g., 'text-green-600'
}

const TrustBadge: React.FC<TrustBadgeProps> = ({
  icon: Icon,
  title,
  description,
  iconColor = 'text-brand-primary', // Default to primary brand color
}) => {
  return (
    // Added height-full for consistent height in grid/flex layouts
    <Card className="w-full text-center shadow-sm hover:shadow-md transition-shadow duration-200 h-full border bg-card/80 backdrop-blur-sm">
      <CardHeader className="items-center pb-2">
        {/* --- Removed bg-primary/10 from this div --- */}
        <div className={cn("mb-3 rounded-full p-3", iconColor)}>
           <Icon className={`h-8 w-8`} />
        </div>
         {/* --- --- */}
        <CardTitle className="text-lg font-semibold">{title}</CardTitle> {/* Added font-semibold */}
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default TrustBadge;