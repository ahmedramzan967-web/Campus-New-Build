import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { QuoteForm } from './QuoteForm';
import { CompanyLogo } from './CompanyLogo';
import { ServiceId } from '../types';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: ServiceId | 'multiple';
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, initialService }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none"
          aria-label="Close quote modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="mb-3">
            <CompanyLogo variant="modal" alt="Estimation Campus Inc logo" />
          </div>
          <span className="text-xs font-bold text-[#0D47A1] uppercase tracking-wider">
            Fast Scope Review
          </span>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">
            Request a Free Project Proposal
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Submit your construction drawings or scope description for a prompt, competitive fee proposal.
          </p>
        </div>

        <QuoteForm 
          initialService={initialService} 
          isModal={true} 
          onSuccess={() => {}} 
        />
      </div>
    </div>
  );
};
