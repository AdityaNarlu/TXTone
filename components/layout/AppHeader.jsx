import React from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            src="https://media.base44.com/images/public/69c97af0a3c75f23e7ad1e3c/212147d9c_txt.png"
            alt="TXTone"
            className="h-14 w-auto"
          />
        </Link>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => base44.auth.logout()}
          className="text-muted-foreground hover:text-foreground gap-2"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Sign out</span>
        </Button>
      </div>
    </header>
  );
}
