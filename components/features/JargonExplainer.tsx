// components/features/JargonExplainer.tsx
'use client';

import React, { useState, useTransition } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Sparkles, Loader2, AlertTriangle } from 'lucide-react';
import { getAIJargonExplanation } from '@/actions/ai'; // Import the server action
import { toast } from 'sonner';

export default function JargonExplainer() {
  const [term, setTerm] = useState('');
  const [explanation, setExplanation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleExplain = () => {
    if (!term.trim() || isPending) return;

    setError(null);
    setExplanation(null);
    setIsOpen(true); // Open popover to show loading/result

    startTransition(async () => {
      const result = await getAIJargonExplanation(term);
      if (result.success) {
        setExplanation(result.message);
      } else {
        setError(result.message);
        // Optional: Show toast for critical errors
        // toast.error("Fehler bei der Erklärung", { description: result.message });
      }
    });
  };

  // Handle Enter key press in input
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleExplain();
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex items-center gap-2 mt-4 border-t pt-4">
        <Input
          type="text"
          placeholder="Med. Begriff erklären..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow h-9 text-sm"
          disabled={isPending}
        />
        <PopoverTrigger asChild>
            <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={handleExplain}
                disabled={isPending || !term.trim()}
                className="h-9"
            >
                {isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                    <Sparkles className="h-4 w-4 mr-1" />
                )}
                Erklären
            </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent className="w-80" align="end">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Erklärung für: "{term}"</h4>
             {isPending && (
                <div className="flex items-center justify-center p-4">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground"/>
                </div>
             )}
             {error && !isPending && (
                 <div className="text-sm text-destructive flex items-start gap-2">
                     <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0"/>
                     <span>{error}</span>
                 </div>
             )}
             {explanation && !isPending && (
                 <p className="text-sm text-muted-foreground">
                    {explanation}
                 </p>
             )}
          </div>
           {/* AI Disclaimer */}
           <p className="text-xs text-muted-foreground/80 border-t pt-2">
             KI-Assistent: Vorschläge stets prüfen. Sie tragen die Verantwortung.
           </p>
        </div>
      </PopoverContent>
    </Popover>
  );
}