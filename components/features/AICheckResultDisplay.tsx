// components/features/AICheckResultDisplay.tsx
import React from 'react';
import { AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AICheckResultDisplayProps {
  result: {
    hasSafetyConcern?: boolean;
    clarityFeedback?: string;
    safetyFeedback?: string;
    suggestions?: string[];
  } | null;
  isLoading: boolean;
  error: string | null;
}

export default function AICheckResultDisplay({ result, isLoading, error }: AICheckResultDisplayProps) {
  if (isLoading) {
    return <p className="text-xs text-muted-foreground animate-pulse mt-2">Prüfung läuft...</p>;
  }
  if (error) {
    return <p className="text-xs text-destructive mt-2">{error}</p>;
  }
  if (!result) {
    return null; // Don't show anything if no result yet (or after closing)
  }

  const hasSuggestions = result.suggestions && result.suggestions.length > 0;

  return (
    <div className="mt-3 p-3 border rounded-md bg-muted/30 text-xs space-y-2">
        {/* Safety Feedback */}
        <div className={cn(
                "flex items-start gap-2",
                result.hasSafetyConcern ? "text-destructive" : "text-green-700"
            )}>
             {result.hasSafetyConcern ? (
                <AlertTriangle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
             ) : (
                 <CheckCircle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
             )}
             <p><strong>Sicherheit:</strong> {result.safetyFeedback}</p>
        </div>

        {/* Clarity Feedback */}
        {result.clarityFeedback && (
            <p><strong>Klarheit:</strong> {result.clarityFeedback}</p>
        )}

        {/* Suggestions */}
        {hasSuggestions && (
            <div className="pt-2 border-t border-muted/50">
                <p className="font-medium mb-1 flex items-center gap-1"><Lightbulb className='h-3.5 w-3.5'/> Vorschläge:</p>
                <ul className="list-disc list-inside pl-2 space-y-0.5 text-muted-foreground">
                    {result.suggestions?.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
            </div>
        )}
         {/* Disclaimer */}
         <p className="text-muted-foreground/80 pt-2 border-t border-muted/50">
             KI-Assistent: Vorschläge stets prüfen. Sie tragen die Verantwortung.
         </p>
    </div>
  );
}