"use client";

import { useState, useEffect } from 'react';
import { WifiOff, Loader2 } from 'lucide-react';
import { PWADebug } from '@/components/pwa-debug';

export default function Home() {
  const [isOnline, setIsOnline] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline === undefined) {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-background text-foreground">
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
            <div className="mt-8">
              <PWADebug />
            </div>
        </div>
    )
  }

  if (isOnline) {
    return (
      <iframe
        src="https://barakonlinestore.in"
        className="w-full h-screen border-0"
        title="Barak Online Shop"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      />
    );
  }

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-background text-foreground p-4">
      <WifiOff className="h-16 w-16 text-muted-foreground mb-4" />
      <h1 className="text-2xl font-bold mb-2 font-headline">You're Offline</h1>
      <p className="text-muted-foreground text-center">
        Please check your internet connection to view Barak Online Shop.
      </p>
    </div>
  );
}
