import React from 'react';
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  ArrowUp,
  FileText
} from 'lucide-react';
import { SERVICES_LIST } from '../data/servicesData';
import { CompanyLogo } from './CompanyLogo';

import { ServiceId } from '../types';

interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenQuote: (serviceSlug?: ServiceId | 'multiple') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenQuote }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid: 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-slate-800">
          
          {/* Col 1: Company Profile (2 spans on desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <button
              onClick={() => { onNavigate('/'); scrollToTop(); }}
              className="text-left block focus:outline-none py-1 group"
              aria-label="Estimation Campus Inc. Home"
            >
              <CompanyLogo variant="footer" loading="lazy" alt="Estimation Campus Inc logo" />
            </button>

            <p className="text-sm text-slate-400 leading-relaxed pr-6">
              Estimation Campus Inc. delivers comprehensive preconstruction solutions across the United States—from building permit drawings and detailed CSI cost estimates to CPM scheduling, photorealistic 3D renderings, and fabrication shop drawings.
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#F59E0B] shrink-0" />
                <span>US Nationwide Coverage · Commercial, Residential & Industrial</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#F59E0B] shrink-0" />
                <span>Prompt Proposal Turnaround (Typically 24–48 Hours)</span>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="pt-3 flex items-center gap-3">
              <span className="text-xs text-slate-400 font-medium">Follow Us:</span>
              <a 
                href="https://www.facebook.com/estimationcampusinc/" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Estimation Campus Inc. on Facebook"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-[#1877F2] text-slate-400 hover:text-white flex items-center justify-center transition-colors shadow-xs"
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
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-[#0A66C2] text-slate-400 hover:text-white flex items-center justify-center transition-colors shadow-xs"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Five Core Services */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Core Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              {SERVICES_LIST.map((srv) => (
                <li key={srv.id}>
                  <button
                    onClick={() => {
                      onNavigate(`/services/${srv.slug}`);
                      scrollToTop();
                    }}
                    className="text-slate-400 hover:text-white transition-colors text-left"
                  >
                    {srv.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    onNavigate('/services');
                    scrollToTop();
                  }}
                  className="text-xs font-semibold text-[#1976D2] hover:text-blue-400 transition-colors pt-1 block"
                >
                  All Services Overview →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Resources */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => { onNavigate('/projects'); scrollToTop(); }} className="text-slate-400 hover:text-white transition-colors">
                  Featured Projects
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigate('/about'); scrollToTop(); }} className="text-slate-400 hover:text-white transition-colors">
                  About Our Team
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigate('/resources'); scrollToTop(); }} className="text-slate-400 hover:text-white transition-colors">
                  Preconstruction Resources
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigate('/contact'); scrollToTop(); }} className="text-slate-400 hover:text-white transition-colors">
                  Contact Office
                </button>
              </li>
              <li>
                <button onClick={() => { onOpenQuote(); }} className="text-amber-400 hover:text-amber-300 font-semibold transition-colors">
                  Request a Free Quote
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Inquiries */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Contact & Inquiries
            </h4>
            <div className="space-y-3.5 text-sm text-slate-400">
              {/* United States Operations - Retained exactly */}
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white font-medium text-xs">United States Operations</strong>
                  <span className="text-xs text-slate-400 leading-snug">
                    Supporting commercial, residential, and industrial builders in all 50 states.
                  </span>
                </div>
              </div>

              {/* Direct Phone & Email */}
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <a href="tel:+17138933927" className="hover:text-white transition-colors text-slate-300 font-medium">
                  +1 713 893 3927
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <a href="mailto:info@estimationcampusinc.com" className="hover:text-white transition-colors">
                  info@estimationcampusinc.com
                </a>
              </div>

              {/* Two Business Addresses */}
              <div className="pt-2 border-t border-slate-800 space-y-2.5 text-xs">
                <div>
                  <span className="font-semibold text-slate-300 block">Houston, Texas</span>
                  <address className="not-italic text-slate-400 leading-snug">
                    2401 Fountain View Dr, Ste 312<br />
                    Houston, TX 77057<br />
                    United States
                  </address>
                </div>
                <div>
                  <span className="font-semibold text-slate-300 block">Sheridan, Wyoming</span>
                  <address className="not-italic text-slate-400 leading-snug">
                    30 N Gould St, #49628<br />
                    Sheridan, WY 82801<br />
                    United States
                  </address>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onOpenQuote()}
                  className="w-full py-2.5 px-4 text-xs font-bold text-white bg-[#0D47A1] hover:bg-[#1976D2] rounded-lg transition-colors text-center"
                >
                  Submit Project Plans
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Legal Disclaimer & Compliance */}
        <div className="py-8 border-b border-slate-800 text-xs text-slate-400 leading-relaxed space-y-2">
          <p>
            <strong className="text-slate-300">Professional Services Disclaimer:</strong> Estimation Campus Inc. provides construction cost estimating, material takeoffs, project scheduling, architectural drafting, 3D visualization, and fabrication detailing services. Any engineering or architectural design services requiring professional state licensure are coordinated with or performed by appropriately licensed and registered professionals where mandated by law.
          </p>
          <p>
            Permit issuance is determined solely by the local authority having jurisdiction (AHJ). Estimation Campus Inc. prepares submittal-ready documents in accordance with applicable model building codes and provides plan-check response revisions to achieve municipal compliance.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span>© {new Date().getFullYear()} Estimation Campus Inc. All rights reserved.</span>
            <span aria-hidden="true" className="hidden sm:inline text-slate-700">·</span>
            <span className="text-slate-300 font-medium">Powered By: Estimation Campus LLC</span>
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => { onNavigate('/privacy'); scrollToTop(); }} 
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <button 
              onClick={() => { onNavigate('/terms'); scrollToTop(); }} 
              className="hover:text-white transition-colors"
            >
              Terms of Use
            </button>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <button 
              onClick={() => { onNavigate('/sitemap'); scrollToTop(); }} 
              className="hover:text-white transition-colors"
            >
              Sitemap
            </button>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <button 
              onClick={scrollToTop} 
              className="flex items-center gap-1 hover:text-white transition-colors text-slate-400"
              aria-label="Scroll to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
