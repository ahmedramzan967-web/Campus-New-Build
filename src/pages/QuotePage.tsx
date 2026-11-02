import React from 'react';
import { 
  ShieldCheck, 
  Clock, 
  FileCheck, 
  Building2, 
  CheckCircle2 
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { QuoteForm } from '../components/QuoteForm';
import { ServiceId } from '../types';

interface QuotePageProps {
  onNavigate: (path: string) => void;
  serviceParam?: ServiceId | 'multiple';
}

export const QuotePage: React.FC<QuotePageProps> = ({ onNavigate, serviceParam = 'permit-drawings' }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Breadcrumb */}
      <Breadcrumbs items={[{ label: 'Request a Free Quote' }]} onNavigate={onNavigate} />

      {/* Header */}
      <div className="space-y-3">
        <span className="text-sm font-bold text-[#0D47A1] uppercase tracking-wider">
          Transparent Scope Proposals
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Request a Project Proposal & Scope Review
        </h1>
        <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
          Provide your project drawings, sketches, or scope requirements. Our preconstruction engineers will evaluate your documents and provide a clear, fixed-fee proposal with an exact deliverable schedule.
        </p>
      </div>

      {/* Trust Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700">
        <div className="flex items-center gap-2.5">
          <Clock className="w-5 h-5 text-[#0D47A1] shrink-0" />
          <span><strong className="text-slate-900">24–48h</strong> Proposal Turnaround</span>
        </div>
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-[#0D47A1] shrink-0" />
          <span><strong className="text-slate-900">100% Confidential</strong> Plan Handling</span>
        </div>
        <div className="flex items-center gap-2.5">
          <FileCheck className="w-5 h-5 text-[#0D47A1] shrink-0" />
          <span><strong className="text-slate-900">Fixed-Fee</strong> Itemized Pricing</span>
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm">
        <QuoteForm initialService={serviceParam} isModal={false} />
      </div>

    </div>
  );
};
