import React from 'react';
import { Rocket, Fish } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full bg-gradient-to-b from-emerald-600 to-emerald-500 text-white">
      <div className="max-w-6xl mx-auto px-6 py-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/10 rounded-lg">
            <Fish className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">AquacultureAI Sumbar</h1>
            <p className="text-sm text-emerald-50">Intelligent business planning for fish farming in West Sumatra</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 text-emerald-50">
          <Rocket className="h-5 w-5" />
          <span className="text-sm">From concept to launch with AI</span>
        </div>
      </div>
    </header>
  );
}
