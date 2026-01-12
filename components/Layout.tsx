
import React from 'react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 w-8 h-8 rounded-lg flex items-center justify-center">
              <i className="fa-solid fa-camera-retro text-white"></i>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800">ProShot <span className="text-blue-600">AI</span></h1>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-blue-600 transition-colors">How it works</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Samples</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm text-slate-500">© 2024 ProShot AI. Powered by Gemini.</p>
          <p className="text-xs text-slate-400 mt-2">All uploaded photos are processed securely and not stored permanently.</p>
        </div>
      </footer>
    </div>
  );
};
