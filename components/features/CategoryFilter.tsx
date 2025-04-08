// components/features/CategoryFilter.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command" // Using Command components for searchable list
import { Filter, X, Check } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import { Badge } from '../ui/badge';

interface CategoryFilterProps {
  allCategories: readonly string[]; // Use readonly array from constants
  selectedCategories: string[];
}

export default function CategoryFilter({ allCategories, selectedCategories }: CategoryFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Local state to manage checked items within the popover before applying
  const [currentSelection, setCurrentSelection] = useState<string[]>(selectedCategories);
  const [isOpen, setIsOpen] = useState(false);

  // Update local state if the selectedCategories prop changes (e.g., browser back/forward)
  useEffect(() => {
    setCurrentSelection(selectedCategories);
  }, [selectedCategories]);

  const handleCheckedChange = (category: string, checked: boolean | string) => {
    setCurrentSelection(prev =>
      checked ? [...prev, category] : prev.filter(item => item !== category)
    );
  };

  const applyFilters = () => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (currentSelection.length === 0) {
      current.delete('categories');
    } else {
      // Need to delete first if it exists, then append each value
      current.delete('categories');
      currentSelection.forEach(cat => current.append('categories', cat));
    }

    const search = current.toString();
    const query = search ? `?${search}` : "";

    // Use router.push for navigation to update URL and trigger refetch
    router.push(`${pathname}${query}`, { scroll: false }); // scroll: false prevents jumping to top
    setIsOpen(false); // Close popover after applying
  };

  const clearFilters = () => {
      setCurrentSelection([]); // Clear local state first
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      current.delete('categories');
      const search = current.toString();
      const query = search ? `?${search}` : "";
      router.push(`${pathname}${query}`, { scroll: false });
      setIsOpen(false); // Close popover
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
         <Button variant="outline" size="sm" className="relative">
           <Filter className="mr-2 h-4 w-4" />
           Kategorien filtern
           {selectedCategories.length > 0 && (
              <Badge variant="secondary" className="absolute -top-1.5 -right-1.5 h-4 w-4 p-0 flex items-center justify-center rounded-full text-xs">
                  {selectedCategories.length}
              </Badge>
           )}
         </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0" align="end">
        <Command>
          {/* Optional: Add search input if list gets long */}
          {/* <CommandInput placeholder="Kategorie suchen..." /> */}
          <CommandList>
            <CommandEmpty>Keine Kategorien gefunden.</CommandEmpty>
            <CommandGroup>
                <ScrollArea className='h-[200px]'> {/* Limit height */}
                    {allCategories.map((category) => (
                        <CommandItem
                            key={category}
                            onSelect={() => {
                                // Toggle selection when CommandItem is clicked
                                handleCheckedChange(category, !currentSelection.includes(category));
                            }}
                            className='cursor-pointer' // Make it feel clickable
                         >
                        <Checkbox
                            id={`category-${category}`}
                            checked={currentSelection.includes(category)}
                            onCheckedChange={(checked) => handleCheckedChange(category, checked)}
                            className="mr-2"
                            aria-labelledby={`label-category-${category}`}
                        />
                         <Label
                            htmlFor={`category-${category}`}
                            id={`label-category-${category}`}
                            className="flex-1 text-sm font-normal cursor-pointer" // Allow label click
                         >
                            {category}
                         </Label>
                      </CommandItem>
                    ))}
                </ScrollArea>
            </CommandGroup>
          </CommandList>
        </Command>
        <div className="flex justify-between p-2 border-t mt-1 gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            disabled={currentSelection.length === 0}
            className="text-xs"
          >
            <X className='mr-1 h-3 w-3'/> Zurücksetzen
          </Button>
          <Button size="sm" onClick={applyFilters} className="text-xs">
            <Check className='mr-1 h-3 w-3'/> Anwenden
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

// <<< You'll also need to add Checkbox to components/ui/checkbox.tsx >>>
// If you haven't added Checkbox via shadcn CLI yet, run:
// npx shadcn-ui@latest add checkbox command label