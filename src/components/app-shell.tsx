"use client";

import { useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(
          (registration) => {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
          },
          (err) => {
            console.error('ServiceWorker registration failed: ', err);
            toast({
              title: "Offline support disabled",
              description: "Could not register service worker.",
              variant: "destructive",
            });
          }
        );
      });
    }
  }, [toast]);

  return <>{children}</>;
}
