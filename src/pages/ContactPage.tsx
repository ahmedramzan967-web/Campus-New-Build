import React, { useState } from 'react';
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  UploadCloud, 
  CheckCircle2, 
  Send,
  HelpCircle 
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { QuoteForm } from '../components/QuoteForm';

interface ContactPageProps {
  onNavigate: (path: string) => void;
  onOpenQuote: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate, onOpenQuote }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      
      {/* Breadcrumb */}
      <Breadcrumbs items={[{ label: 'Contact Us' }]} onNavigate={onNavigate} />

      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-bold text-[#0D47A1] uppercase tracking-wider">
          Direct Coordination
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Contact Estimation Campus Inc.
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Whether you need a permit drawing set drafted, an urgent CSI cost estimate, a CPM baseline schedule, or photorealistic 3D visuals, our team is ready to assist.
        </p>
      </div>

      {/* Main Grid: Form (7 cols) + Direct Info (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left: Interactive Inquiry Form (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900">
              Submit Your Project Scope
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Complete the form below to receive a formal scope review and competitive fee proposal.
            </p>
          </div>

          <QuoteForm isModal={false} />
        </div>

        {/* Right: Office Channels & Direct Submission (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Channel Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
            <h3 className="text-base font-bold text-slate-900">
              Office Information
            </h3>

            <div className="space-y-5 text-sm text-slate-700">
              {/* United States Operations - Retained exactly */}
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#0D47A1] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-bold">United States Operations</strong>
                  <span className="text-slate-600 text-sm leading-relaxed">
                    Supporting commercial, residential, and industrial builders in all 50 states.
                  </span>
                </div>
              </div>

              {/* Two U.S. Business Addresses */}
              <div className="pt-2 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-bold text-sm">Houston, Texas</strong>
                    <address className="not-italic text-slate-600 text-sm leading-snug mt-0.5">
                      2401 Fountain View Dr, Ste 312<br />
                      Houston, TX 77057<br />
                      United States
                    </address>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-bold text-sm">Sheridan, Wyoming</strong>
                    <address className="not-italic text-slate-600 text-sm leading-snug mt-0.5">
                      30 N Gould St, #49628<br />
                      Sheridan, WY 82801<br />
                      United States
                    </address>
                  </div>
                </div>
              </div>

              {/* Direct Phone */}
              <div className="pt-2 border-t border-slate-200 flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#0D47A1] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-bold text-sm">Direct Phone</strong>
                  <a href="tel:+17138933927" className="text-slate-900 hover:text-[#0D47A1] transition-colors font-semibold text-sm">
                    +1 713 893 3927
                  </a>
                  <p className="text-xs text-slate-500 mt-0.5">Monday – Friday: 8:00 AM – 6:00 PM (EST/CST/PST)</p>
                </div>
              </div>

              {/* Email Inquiries */}
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#0D47A1] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-bold text-sm">Email Inquiries</strong>
                  <a href="mailto:info@estimationcampusinc.com" className="text-slate-900 hover:text-[#0D47A1] transition-colors font-semibold text-sm">
                    info@estimationcampusinc.com
                  </a>
                </div>
              </div>

              {/* Proposal Response Time */}
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#0D47A1] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-bold text-sm">Proposal Response Time</strong>
                  <span className="text-slate-600 text-sm leading-relaxed">
                    Most project scopes are reviewed and proposals returned within 24–48 business hours.
                  </span>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Connect With Us:
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href="https://www.facebook.com/estimationcampusinc/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Estimation Campus Inc. on Facebook"
                    className="w-9 h-9 rounded-lg bg-white border border-slate-200 hover:bg-[#1877F2] text-slate-600 hover:text-white flex items-center justify-center transition-colors shadow-xs"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/estimationcampusinc"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Estimation Campus Inc. on LinkedIn"
                    className="w-9 h-9 rounded-lg bg-white border border-slate-200 hover:bg-[#0A66C2] text-slate-600 hover:text-white flex items-center justify-center transition-colors shadow-xs"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Large Plan Submission Instructions */}
          <div className="bg-blue-50/50 border border-blue-200 rounded-2xl p-6 sm:p-7 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0D47A1] uppercase tracking-wider">
              <UploadCloud className="w-4 h-4" />
              <span>Large Plan Set Instructions</span>
            </div>
            <h4 className="text-base font-bold text-slate-900">
              Have files over 50MB?
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              If your drawing sets, geotechnical reports, or structural packages exceed standard email attachment limits, you can share a link via Google Drive, Dropbox, Box, or OneDrive, or email us at <a href="mailto:info@estimationcampusinc.com" className="text-[#0D47A1] font-semibold hover:underline">info@estimationcampusinc.com</a> to receive a direct upload invitation.
            </p>
          </div>

          {/* Privacy & Confidentiality Guarantee */}
          <div className="p-6 sm:p-7 bg-white border border-slate-200 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-[#0D47A1]" />
              <span>Confidentiality Guarantee</span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              All plans, project budgets, and proprietary client documents are treated with strict confidentiality. Non-Disclosure Agreements (NDAs) can be executed upon request prior to document upload.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
