import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SERVICES_LIST } from '../data/servicesData';
import { RESOURCES_DATA } from '../data/resourcesData';
import { PROJECTS_DATA } from '../data/projectsData';

interface SitemapPageProps {
  onNavigate: (path: string) => void;
}

export const SitemapPage: React.FC<SitemapPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ label: 'HTML Sitemap' }]} onNavigate={onNavigate} />

      <div className="space-y-3">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          Website Sitemap & Architecture
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Complete indexed listing of pages, services, case studies, and preconstruction resources.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm sm:text-base">
        
        {/* Main Pages */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-3">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Primary Pages
          </h2>
          <ul className="space-y-2 text-slate-600">
            <li><button onClick={() => onNavigate('/')} className="hover:text-[#0D47A1] underline">Home</button></li>
            <li><button onClick={() => onNavigate('/services')} className="hover:text-[#0D47A1] underline">Services Overview</button></li>
            <li><button onClick={() => onNavigate('/projects')} className="hover:text-[#0D47A1] underline">Featured Projects</button></li>
            <li><button onClick={() => onNavigate('/about')} className="hover:text-[#0D47A1] underline">About Estimation Campus</button></li>
            <li><button onClick={() => onNavigate('/resources')} className="hover:text-[#0D47A1] underline">Resources & Preconstruction Guides</button></li>
            <li><button onClick={() => onNavigate('/contact')} className="hover:text-[#0D47A1] underline">Contact Office</button></li>
            <li><button onClick={() => onNavigate('/quote')} className="hover:text-[#0D47A1] underline">Request a Free Quote</button></li>
          </ul>
        </div>

        {/* Five Services */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-3">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Five Core Services
          </h2>
          <ul className="space-y-2 text-slate-600">
            {SERVICES_LIST.map((srv) => (
              <li key={srv.id}>
                <button onClick={() => onNavigate(`/services/${srv.slug}`)} className="hover:text-[#0D47A1] underline">
                  {srv.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-3">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Preconstruction Articles & Guides
          </h2>
          <ul className="space-y-2 text-slate-600">
            {RESOURCES_DATA.map((res) => (
              <li key={res.id}>
                <button onClick={() => onNavigate(`/resources/${res.slug}`)} className="hover:text-[#0D47A1] underline">
                  {res.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal & Policy */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-3">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Legal & Policy
          </h2>
          <ul className="space-y-2 text-slate-600">
            <li><button onClick={() => onNavigate('/privacy')} className="hover:text-[#0D47A1] underline">Privacy Policy</button></li>
            <li><button onClick={() => onNavigate('/terms')} className="hover:text-[#0D47A1] underline">Terms of Use & Disclaimers</button></li>
          </ul>
        </div>

      </div>
    </div>
  );
};
