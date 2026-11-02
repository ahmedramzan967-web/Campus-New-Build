import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  FileText, 
  HelpCircle, 
  ChevronDown,
  Building2,
  Users,
  Compass,
  Calculator,
  CalendarClock,
  Layers,
  PhoneCall
} from 'lucide-react';
import { SERVICES_DATA, SERVICES_LIST } from '../data/servicesData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ServiceId } from '../types';

interface ServiceDetailPageProps {
  slug: string;
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

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ slug, onNavigate, onOpenQuote }) => {
  const service = SERVICES_DATA[slug] || SERVICES_DATA['permit-drawings'];
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const Icon = SERVICE_ICONS[service.id] || FileText;
  const otherServices = SERVICES_LIST.filter(s => s.id !== service.id);

  return (
    <div className="space-y-16 pb-20">
      
      {/* Top Header & Breadcrumbs */}
      <section className="bg-slate-50 border-b border-slate-200 pt-6 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Breadcrumbs 
            items={[
              { label: 'Services', path: '/services' },
              { label: service.name }
            ]} 
            onNavigate={onNavigate} 
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Header Info (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#0D47A1]">
                <Icon className="w-4 h-4" />
                <span>Dedicated Preconstruction Discipline</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {service.name}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                {service.shortDescription}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onOpenQuote(service.id)}
                  className="px-6 py-3.5 text-sm font-bold text-white bg-[#0D47A1] hover:bg-[#1976D2] rounded-lg shadow-sm transition-colors flex items-center gap-2"
                >
                  <span>Request Free Quote for {service.name.split(',')[0]}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="tel:+17138933927"
                  className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-[#0D47A1] py-3 transition-colors"
                >
                  <PhoneCall className="w-4 h-4 text-[#0D47A1]" />
                  <span>Call +1 713 893 3927</span>
                </a>
              </div>

              <div className="pt-4 flex items-center gap-6 text-sm text-slate-600 border-t border-slate-200">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#0D47A1]" />
                  <span>US Code & Jurisdiction Aligned</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#0D47A1]" />
                  <span>24–48h Proposal Review</span>
                </div>
              </div>
            </div>

            {/* Right Header Visual (5 cols) */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-white aspect-[4/3]">
                <img
                  src={service.heroImage}
                  alt={service.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* SECTION: Key Scope Offerings */}
        <section className="space-y-6">
          <div className="max-w-2xl">
            <span className="text-sm font-bold text-[#0D47A1] uppercase tracking-wider">
              Scope of Work
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              What Is Included in Our {service.name.split(',')[0]} Service
            </h2>
            <p className="text-base text-slate-700 leading-relaxed mt-2">
              Every package is tailored to your exact drawings, trade requirements, and jurisdictional specifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.keyOfferings.map((offering, index) => (
              <div 
                key={index} 
                className="p-5 rounded-xl border border-slate-200 bg-white shadow-xs flex items-start gap-3.5 hover:border-slate-300 transition-colors"
              >
                <div className="w-7 h-7 rounded-md bg-blue-50 text-[#0D47A1] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-base font-medium text-slate-800 leading-relaxed">
                  {offering}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION: Deliverables & Client Benefits */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Deliverables Box (6 cols) */}
          <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
            <span className="text-sm font-bold text-[#0D47A1] uppercase tracking-wider block">
              Deliverable Package Standards
            </span>
            <h3 className="text-2xl font-bold text-slate-900">
              What You Receive Upon Completion
            </h3>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              Clean, professional files ready for bidding, fabrication, or municipal plan check submission.
            </p>

            <ul className="space-y-3.5 pt-2 text-sm sm:text-base text-slate-700">
              {service.deliverables.map((deliv, i) => (
                <li key={i} className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-[#0D47A1] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{deliv}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits Box (6 cols) */}
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
            <span className="text-sm font-bold text-[#0D47A1] uppercase tracking-wider block">
              Client Advantages
            </span>
            <h3 className="text-2xl font-bold text-slate-900">
              Key Benefits for Your Team
            </h3>
            <div className="space-y-5 pt-1">
              {service.benefits.map((benefit, i) => (
                <div key={i} className="space-y-1.5">
                  <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#0D47A1]" />
                    {benefit.title}
                  </h4>
                  <p className="text-sm sm:text-base text-slate-700 pl-4 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* SECTION: Relevant Project Types & Target Audience */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="p-6 rounded-xl border border-slate-200 bg-white space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#0D47A1]" />
              Applicable Project Types
            </h3>
            <p className="text-sm text-slate-600">
              We deliver this service across a diverse spectrum of American construction typologies:
            </p>
            <ul className="space-y-2.5 text-sm sm:text-base text-slate-700 pt-1">
              {service.projectTypes.map((type, i) => (
                <li key={i} className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#0D47A1]/70" />
                  <span>{type}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-xl border border-slate-200 bg-white space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-[#0D47A1]" />
              Who We Work With
            </h3>
            <p className="text-sm text-slate-600">
              This service is specifically tailored to meet the exacting standards of:
            </p>
            <ul className="space-y-2.5 text-sm sm:text-base text-slate-700 pt-1">
              {service.targetAudience.map((audience, i) => (
                <li key={i} className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#0D47A1]/70" />
                  <span>{audience}</span>
                </li>
              ))}
            </ul>
          </div>

        </section>

        {/* SECTION: 4-Step Process Timeline */}
        <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-10 space-y-8">
          <div className="max-w-2xl">
            <span className="text-sm font-bold text-[#0D47A1] uppercase tracking-wider">
              Methodology
            </span>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">
              Our 4-Step Delivery Workflow
            </h3>
            <p className="text-base text-slate-700 leading-relaxed mt-2">
              How we take your project from initial plan upload to verified completion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.processSteps.map((step, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
                <span className="text-2xl font-black text-slate-300 block">
                  0{idx + 1}
                </span>
                <h4 className="text-base font-bold text-slate-900">
                  {step.title}
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION: Frequently Asked Questions */}
        <section className="space-y-6">
          <div className="max-w-2xl">
            <span className="text-sm font-bold text-[#0D47A1] uppercase tracking-wider">
              Common Inquiries
            </span>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">
              Frequently Asked Questions About {service.name.split(',')[0]}
            </h3>
          </div>

          <div className="space-y-3.5">
            {service.faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div 
                  key={index}
                  className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left text-base font-bold text-slate-900 hover:bg-slate-50 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-[#0D47A1]' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-6 text-sm sm:text-base text-slate-700 leading-relaxed border-t border-slate-100 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION: Dedicated Quote CTA */}
        <section className="bg-gradient-to-r from-[#0D47A1] to-[#1976D2] text-white rounded-2xl p-8 sm:p-12 shadow-lg flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-sm font-bold text-amber-300 uppercase tracking-wider">
              Immediate Scope Assistance
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold">
              Need {service.name.split(',')[0]} For Your Next Project?
            </h3>
            <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
              Upload your plans or outline your project requirements. Our preconstruction engineers will deliver an itemized scope proposal within 24 to 48 hours.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={() => onOpenQuote(service.id)}
              className="px-8 py-4 text-sm font-bold text-slate-900 bg-white hover:bg-blue-50 rounded-xl shadow-md transition-colors whitespace-nowrap"
            >
              Get Free Proposal Now
            </button>
          </div>
        </section>

        {/* SECTION: Explore Other Core Services */}
        <section className="pt-8 border-t border-slate-200 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                Full-Scope Capabilities
              </span>
              <h3 className="text-2xl font-bold text-slate-900">
                Explore Our Other Construction Services
              </h3>
            </div>
            <button
              onClick={() => onNavigate('/services')}
              className="text-sm font-bold text-[#0D47A1] hover:underline"
            >
              View All 5 Services →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherServices.map((other) => {
              const OtherIcon = SERVICE_ICONS[other.id] || FileText;
              return (
                <button
                  key={other.id}
                  onClick={() => {
                    onNavigate(`/services/${other.slug}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="p-5 rounded-xl border border-slate-200 bg-white text-left hover:border-[#0D47A1] hover:shadow-sm transition-all group"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#0D47A1] flex items-center justify-center mb-3 group-hover:bg-[#0D47A1] group-hover:text-white transition-colors">
                    <OtherIcon className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#0D47A1] transition-colors leading-snug">
                    {other.name}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-2 mt-1.5 leading-normal">
                    {other.tagline}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
};
