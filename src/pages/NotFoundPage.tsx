import React from 'react';
import { Building2, ArrowLeft } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#0D47A1] flex items-center justify-center mx-auto">
        <Building2 className="w-8 h-8" />
      </div>
      
      <span className="text-xs font-bold text-[#0D47A1] uppercase tracking-wider block">
        404 Page Not Found
      </span>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
        The requested page could not be found
      </h1>

      <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
        The construction page or resource you are looking for may have moved or been updated. Please return to the homepage or explore our core preconstruction services.
      </p>

      <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={() => onNavigate('/')}
          className="px-6 py-3 text-xs font-bold text-white bg-[#0D47A1] hover:bg-[#1976D2] rounded-lg shadow-sm transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </button>
        <button
          onClick={() => onNavigate('/services')}
          className="px-6 py-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
        >
          Explore 5 Core Services
        </button>
      </div>
    </div>
  );
};
