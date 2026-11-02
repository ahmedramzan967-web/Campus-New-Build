import React from 'react';
import { 
  Compass, 
  Calculator, 
  CalendarClock, 
  Layers, 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Clock 
} from 'lucide-react';
import { SERVICES_LIST } from '../data/servicesData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ServiceId } from '../types';

interface ServicesOverviewPageProps {
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

export const ServicesOverviewPage: React.FC<ServicesOverviewPageProps> = ({ onNavigate, onOpenQuote }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      
      {/* Breadcrumb */}
      <Breadcrumbs items={[{ label: 'Services Overview' }]} onNavigate={onNavigate} />

      {/* Hero Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-sm font-bold text-[#0D47A1] uppercase tracking-wider">
          Complete Preconstruction Suite
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Comprehensive Construction Design & Project Support Services
        </h1>
        <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
          Estimation Campus Inc. offers five core, established preconstruction services designed to support general contractors, architects, developers, subcontractors, and property owners across the United States.
        </p>
      </div>

      {/* Five Core Services Detailed Showcase */}
      <div className="space-y-12">
        {SERVICES_LIST.map((service, index) => {
          const Icon = SERVICE_ICONS[service.id] || FileText;
          const isEven = index % 2 === 1;

          return (
            <div 
              key={service.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm`}
            >
              {/* Image Column (5 cols) */}
              <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="relative rounded-xl overflow-hidden shadow aspect-[16/10] bg-slate-100">
                  <img
                    src={service.heroImage}
                    alt={service.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 p-2.5 rounded-lg shadow-sm text-[#0D47A1]">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Content Column (7 cols) */}
              <div className={`lg:col-span-7 space-y-5 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                <div>
                  <span className="text-sm font-bold text-slate-500 uppercase tracking-wider block">
                    Core Discipline 0{index + 1}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                    {service.name}
                  </h2>
                  <p className="text-sm font-semibold text-[#0D47A1] mt-1.5">
                    {service.tagline}
                  </p>
                </div>

                <p className="text-base text-slate-700 leading-relaxed">
                  {service.shortDescription}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-700">
                  {service.keyOfferings.slice(0, 4).map((offering, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#0D47A1] shrink-0 mt-0.5" />
                      <span className="leading-snug">{offering}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => onNavigate(`/services/${service.slug}`)}
                    className="px-6 py-3 text-sm font-bold text-white bg-[#0D47A1] hover:bg-[#1976D2] rounded-lg shadow-sm transition-colors flex items-center gap-2"
                  >
                    <span>View Dedicated Landing Page</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onOpenQuote(service.id)}
                    className="px-6 py-3 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    Request Free Quote
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Integrated Preconstruction Advantage */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12 space-y-6">
        <div className="max-w-2xl">
          <span className="text-sm font-bold text-[#0D47A1] uppercase tracking-wider">
            Integrated Coordination
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Why Unified Preconstruction Saves Money and Prevents Clashes
          </h3>
          <p className="text-base text-slate-700 leading-relaxed mt-2">
            When your permit drawings, quantity takeoffs, project schedule, 3D renderings, and shop drawings are coordinated by the same engineering support firm, discrepancies between plans and estimate numbers disappear.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-2.5">
            <h4 className="text-base font-bold text-slate-900">Synchronized Quantities</h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              Takeoffs are built directly from current drawing sheets, ensuring your material orders and subcontractor scopes reflect the exact plan revision.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-2.5">
            <h4 className="text-base font-bold text-slate-900">Proactive Clash Mitigation</h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              We catch conflicts between architectural partitions, structural framing, and MEP routings before they require expensive field change orders.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-2.5">
            <h4 className="text-base font-bold text-slate-900">Predictable Scheduling</h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              Long-lead fabrication requirements from shop drawings are integrated into your CPM schedule milestones so materials arrive right when crews need them.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-[#0D47A1] text-white rounded-2xl p-8 sm:p-12 text-center space-y-4 shadow-md">
        <h3 className="text-2xl sm:text-3xl font-bold">Ready to Discuss Your Project Scope?</h3>
        <p className="text-base text-blue-100 max-w-xl mx-auto leading-relaxed">
          Contact our preconstruction team today to get a fast, itemized quote tailored to your exact drawings, schedule, or trade requirements.
        </p>
        <div className="pt-3">
          <button
            onClick={() => onOpenQuote()}
            className="px-8 py-3.5 text-sm font-bold text-slate-900 bg-white hover:bg-blue-50 rounded-lg shadow transition-colors"
          >
            Request Your Free Quote
          </button>
        </div>
      </div>

    </div>
  );
};
