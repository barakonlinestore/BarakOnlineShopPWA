"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export function PWADebug() {
  const [pwaStatus, setPwaStatus] = useState<{
    manifest: boolean;
    serviceWorker: boolean;
    https: boolean;
    installable: boolean;
    errors: string[];
  }>({
    manifest: false,
    serviceWorker: false,
    https: false,
    installable: false,
    errors: [],
  });

  useEffect(() => {
    const checkPWAStatus = async () => {
      const errors: string[] = [];
      let manifest = false;
      let serviceWorker = false;
      let https = false;
      let installable = false;

      // Check HTTPS
      if (window.location.protocol === 'https:' || window.location.hostname === 'localhost') {
        https = true;
      } else {
        errors.push('HTTPS is required for PWA');
      }

      // Check Manifest
      try {
        const manifestResponse = await fetch('/manifest.webmanifest');
        if (manifestResponse.ok) {
          const manifestData = await manifestResponse.json();
          console.log('Manifest found:', manifestData);
          manifest = true;
          
          // Check if manifest has required fields
          if (!manifestData.name || !manifestData.short_name) {
            errors.push('Manifest missing required fields (name, short_name)');
          }
          if (!manifestData.icons || manifestData.icons.length === 0) {
            errors.push('Manifest missing icons');
          }
        } else {
          errors.push('Manifest not found or not accessible');
        }
      } catch (error) {
        errors.push(`Manifest error: ${error}`);
      }

      // Check Service Worker
      if ('serviceWorker' in navigator) {
        try {
          const registration = await navigator.serviceWorker.getRegistration();
          if (registration) {
            console.log('Service Worker registered:', registration);
            serviceWorker = true;
          } else {
            errors.push('Service Worker not registered');
          }
        } catch (error) {
          errors.push(`Service Worker error: ${error}`);
        }
      } else {
        errors.push('Service Worker not supported');
      }

      // Check if installable
      if (manifest && https && serviceWorker) {
        installable = true;
      }

      setPwaStatus({
        manifest,
        serviceWorker,
        https,
        installable,
        errors,
      });
    };

    checkPWAStatus();
  }, []);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          PWA Status Check
          {pwaStatus.installable ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <AlertCircle className="h-5 w-5 text-yellow-500" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span>HTTPS/Localhost</span>
          <Badge variant={pwaStatus.https ? "default" : "destructive"}>
            {pwaStatus.https ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <span>Web Manifest</span>
          <Badge variant={pwaStatus.manifest ? "default" : "destructive"}>
            {pwaStatus.manifest ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <span>Service Worker</span>
          <Badge variant={pwaStatus.serviceWorker ? "default" : "destructive"}>
            {pwaStatus.serviceWorker ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <span>Installable</span>
          <Badge variant={pwaStatus.installable ? "default" : "destructive"}>
            {pwaStatus.installable ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
          </Badge>
        </div>

        {pwaStatus.errors.length > 0 && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <h4 className="font-medium text-red-800 mb-2">Issues Found:</h4>
            <ul className="text-sm text-red-700 space-y-1">
              {pwaStatus.errors.map((error, index) => (
                <li key={index}>• {error}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 