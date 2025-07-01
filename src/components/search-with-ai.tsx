"use client";

import { useState, useEffect, useTransition } from 'react';
import { Search, Loader } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { getAiSuggestions } from '@/app/actions';

export function SearchWithAI() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (searchTerm.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const timerId = setTimeout(() => {
      startTransition(async () => {
        const result = await getAiSuggestions({
          searchTerm: searchTerm,
          storeInventoryUrl: "https://barakonlinestore.in",
        });
        setSuggestions(result);
      });
    }, 500); // Debounce time

    return () => clearTimeout(timerId);
  }, [searchTerm]);

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="AI Search..."
          className="w-full pl-9"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {isPending && (
            <Loader className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
        )}
      </div>
      {suggestions.length > 0 && (
        <Card className="absolute top-full mt-2 w-full z-10 shadow-lg">
          <CardContent className="p-2">
            <ul>
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="px-3 py-2 text-sm rounded-md cursor-pointer hover:bg-accent"
                  onClick={() => {
                    setSearchTerm(suggestion);
                    setSuggestions([]);
                  }}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
