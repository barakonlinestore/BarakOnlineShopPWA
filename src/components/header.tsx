"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, ShoppingCart, User, Bell, Menu, Package2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SearchWithAI } from "./search-with-ai";
import { useToast } from "@/hooks/use-toast";

export function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  const handleNotifications = async () => {
    if (!('Notification' in window) || !('serviceWorker' in navigator)) {
      toast({
        title: "Unsupported Browser",
        description: "Push notifications are not supported by your browser.",
        variant: "destructive",
      });
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      toast({
        title: "Notifications Enabled",
        description: "You will now receive updates on promotions.",
      });
    } else {
      toast({
        title: "Notifications Blocked",
        description: "Please enable notifications in your browser settings.",
        variant: "destructive",
      });
    }
  };


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Package2 className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline">Barak Online Shop</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="#products" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Products
            </Link>
          </nav>
        </div>
        
        <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium mt-6">
              <Link href="/" className="flex items-center gap-2 text-lg font-semibold" onClick={() => setMobileMenuOpen(false)}>
                <Package2 className="h-6 w-6" />
                <span>Barak Shop</span>
              </Link>
              <Link href="#products" className="text-muted-foreground" onClick={() => setMobileMenuOpen(false)}>
                Products
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        <div className="flex flex-1 items-center justify-end gap-4">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <SearchWithAI />
          </div>
          <Button variant="ghost" size="icon" onClick={handleNotifications}>
            <Bell className="h-5 w-5" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
          <Button variant="ghost" size="icon">
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Shopping Cart</span>
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
            <span className="sr-only">User Profile</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
