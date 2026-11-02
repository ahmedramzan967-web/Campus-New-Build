import React, { useState, useEffect, useRef } from 'react';
import { 
  Building2, 
  ChevronDown, 
  Menu, 
  X, 
  FileText, 
  Calculator, 
  CalendarClock, 
  Layers, 
  Compass, 
  ArrowRight,
  PhoneCall
} from 'lucide-react';
import { SERVICES_LIST } from '../data/servicesData';

import { ServiceId } from '../types';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenQuote: (serviceSlug?: ServiceId | 'multiple') => void;
}

const SERVICE_ICONS: Record<string, React.ElementType> = {
  'permit-drawings': Compass,
  'construction-estimating': Calculator,
  'project-scheduling': CalendarClock,
  '3d-renderings': Layers,
  'shop-drawings': FileText,
};

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate, onOpenQuote }) => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on navigate
  const handleNav = (path: string) => {
    onNavigate(path);
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-[88px] gap-8">
          
          {/* Brand Logo */}
          <button 
            onClick={() => handleNav('/')}
            className="flex items-center text-left group shrink-0 focus:outline-none py-1"
            aria-label="Estimation Campus Inc. Home"
          >
            <img
              src="/logo.png"
              alt="Estimation Campus Inc. — Construction Design & Preconstruction Services"
              className="h-[48px] md:h-[64px] w-auto object-contain transition-opacity group-hover:opacity-90"
            />
          </button>

          {/* Zone 2: 4-5 concise single-line nav links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700">
            <button 
              onClick={() => handleNav('/')}
              className={`hover:text-[#0D47A1] transition-colors whitespace-nowrap ${currentPath === '/' ? 'text-[#0D47A1] font-semibold' : ''}`}
            >
              Home
            </button>

            {/* Services Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className={`flex items-center gap-1.5 hover:text-[#0D47A1] transition-colors whitespace-nowrap py-2 ${currentPath.startsWith('/services') ? 'text-[#0D47A1] font-semibold' : ''}`}
                aria-expanded={isServicesOpen}
              >
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180 text-[#0D47A1]' : 'text-slate-400'}`} />
              </button>

              {isServicesOpen && (
                <div className="absolute top-full left-0 w-96 mt-2 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Five Core Services</span>
                    <button 
                      onClick={() => handleNav('/services')}
                      className="text-xs font-semibold text-[#0D47A1] hover:underline"
                    >
                      View All
                    </button>
                  </div>
                  <div className="py-1">
                    {SERVICES_LIST.map((srv) => {
                      const Icon = SERVICE_ICONS[srv.id] || FileText;
                      return (
                        <button
                          key={srv.id}
                          onClick={() => handleNav(`/services/${srv.slug}`)}
                          className="w-full flex items-start gap-3 p-3 rounded-lg text-left hover:bg-slate-50 transition-colors group"
                        >
                          <div className="w-8 h-8 rounded-md bg-blue-50 text-[#0D47A1] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#0D47A1] group-hover:text-white transition-colors">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900 group-hover:text-[#0D47A1] transition-colors">
                              {srv.name}
                            </p>
                            <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                              {srv.tagline}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <button 
              onClick={() => handleNav('/projects')}
              className={`hover:text-[#0D47A1] transition-colors whitespace-nowrap ${currentPath === '/projects' ? 'text-[#0D47A1] font-semibold' : ''}`}
            >
              Projects
            </button>

            <button 
              onClick={() => handleNav('/about')}
              className={`hover:text-[#0D47A1] transition-colors whitespace-nowrap ${currentPath === '/about' ? 'text-[#0D47A1] font-semibold' : ''}`}
            >
              About Us
            </button>

            <button 
              onClick={() => handleNav('/resources')}
              className={`hover:text-[#0D47A1] transition-colors whitespace-nowrap ${currentPath.startsWith('/resources') ? 'text-[#0D47A1] font-semibold' : ''}`}
            >
              Resources
            </button>

            <button 
              onClick={() => handleNav('/contact')}
              className={`hover:text-[#0D47A1] transition-colors whitespace-nowrap ${currentPath === '/contact' ? 'text-[#0D47A1] font-semibold' : ''}`}
            >
              Contact
            </button>
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="hidden lg:flex items-center gap-5 shrink-0">
            <a 
              href="tel:+17138933927" 
              className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-[#0D47A1] transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-[#0D47A1]" />
              <span>+1 713 893 3927</span>
            </a>
            <button 
              onClick={() => onOpenQuote()}
              className="px-6 py-2.5 text-sm font-bold text-white bg-[#0D47A1] hover:bg-[#1976D2] rounded-lg shadow-sm transition-all whitespace-nowrap tracking-wide"
            >
              Get a Free Quote
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => onOpenQuote()}
              className="px-3 py-1.5 text-xs font-bold text-white bg-[#0D47A1] rounded-md mr-1"
            >
              Quote
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-3 duration-200">
          <button
            onClick={() => handleNav('/')}
            className={`w-full text-left py-2.5 px-3 rounded-md text-sm font-medium ${currentPath === '/' ? 'bg-blue-50 text-[#0D47A1] font-bold' : 'text-slate-700 hover:bg-slate-50'}`}
          >
            Home
          </button>

          <div>
            <button
              onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
              className="w-full flex items-center justify-between py-2.5 px-3 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <span>Our Services</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isMobileServicesOpen ? 'rotate-180 text-[#0D47A1]' : 'text-slate-400'}`} />
            </button>

            {isMobileServicesOpen && (
              <div className="pl-4 pr-2 py-1 space-y-1 bg-slate-50 rounded-lg my-1">
                <button
                  onClick={() => handleNav('/services')}
                  className="w-full text-left py-2 text-xs font-bold text-[#0D47A1] border-b border-slate-200"
                >
                  Overview — All 5 Core Services →
                </button>
                {SERVICES_LIST.map((srv) => {
                  const Icon = SERVICE_ICONS[srv.id] || FileText;
                  return (
                    <button
                      key={srv.id}
                      onClick={() => handleNav(`/services/${srv.slug}`)}
                      className="w-full flex items-center gap-2 py-2 text-xs text-slate-700 hover:text-[#0D47A1]"
                    >
                      <Icon className="w-3.5 h-3.5 text-[#0D47A1]" />
                      <span className="truncate">{srv.name}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <button
            onClick={() => handleNav('/projects')}
            className={`w-full text-left py-2.5 px-3 rounded-md text-sm font-medium ${currentPath === '/projects' ? 'bg-blue-50 text-[#0D47A1] font-bold' : 'text-slate-700 hover:bg-slate-50'}`}
          >
            Projects & Portfolio
          </button>

          <button
            onClick={() => handleNav('/about')}
            className={`w-full text-left py-2.5 px-3 rounded-md text-sm font-medium ${currentPath === '/about' ? 'bg-blue-50 text-[#0D47A1] font-bold' : 'text-slate-700 hover:bg-slate-50'}`}
          >
            About Us
          </button>

          <button
            onClick={() => handleNav('/resources')}
            className={`w-full text-left py-2.5 px-3 rounded-md text-sm font-medium ${currentPath.startsWith('/resources') ? 'bg-blue-50 text-[#0D47A1] font-bold' : 'text-slate-700 hover:bg-slate-50'}`}
          >
            Resources & Guides
          </button>

          <button
            onClick={() => handleNav('/contact')}
            className={`w-full text-left py-2.5 px-3 rounded-md text-sm font-medium ${currentPath === '/contact' ? 'bg-blue-50 text-[#0D47A1] font-bold' : 'text-slate-700 hover:bg-slate-50'}`}
          >
            Contact
          </button>

          <div className="pt-4 border-t border-slate-200 flex flex-col gap-3">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full py-3 text-center text-sm font-bold text-white bg-[#0D47A1] hover:bg-[#1976D2] rounded-lg shadow-sm"
            >
              Get a Free Quote
            </button>
            <div className="text-center text-sm text-slate-600">
              Direct Phone: <a href="tel:+17138933927" className="text-slate-900 font-bold underline">+1 713 893 3927</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
