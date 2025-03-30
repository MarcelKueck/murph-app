// components/core/TrustBadge.tsx
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Use Card for structure

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
    <Card className="w-full sm:w-64 text-center shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader className="items-center pb-2">
        <div className={`mb-3 rounded-full bg-primary/10 p-3 ${iconColor}`}>
           <Icon className={`h-8 w-8`} />
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default TrustBadge;