import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Compass, 
  CheckCircle2, 
  Target, 
  Clock, 
  Award, 
  Users, 
  ArrowRight,
  FileSpreadsheet
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';

interface AboutPageProps {
  onNavigate: (path: string) => void;
  onOpenQuote: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenQuote }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      
      {/* Breadcrumb */}
      <Breadcrumbs items={[{ label: 'About Us' }]} onNavigate={onNavigate} />

      {/* Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-5">
          <span className="text-xs font-bold text-[#0D47A1] uppercase tracking-wider">
            About Estimation Campus Inc.
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Comprehensive Construction Design & Preconstruction Partner
          </h1>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
            Estimation Campus Inc. was built with a clear purpose: to bridge the critical gap between conceptual architectural design, regulatory municipal permitting, accurate cost estimating, and field-ready construction documentation.
          </p>
          <p className="text-base text-slate-700 leading-relaxed">
            While our roots began with rigorous construction estimating, today we operate as a full-service preconstruction consulting partner for general contractors, architects, specialty trade subcontractors, and developers across all 50 US states.
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <button
              onClick={() => onOpenQuote()}
              className="px-6 py-3 text-sm font-bold text-white bg-[#0D47A1] hover:bg-[#1976D2] rounded-lg shadow-sm transition-colors"
            >
              Request a Free Quote
            </button>
            <button
              onClick={() => onNavigate('/services')}
              className="px-6 py-3 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Explore Our 5 Services
            </button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-slate-100 aspect-[4/3]">
            <img
              src="/src/assets/images/about_studio_clean_1792810902790.jpg"
              alt="Estimation Campus architectural design studio and conference room"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Core Principles & Standard of Care */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12 space-y-8">
        <div className="max-w-2xl">
          <span className="text-xs font-bold text-[#0D47A1] uppercase tracking-wider">
            Our Standard of Care
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Built on Rigorous Preconstruction Discipline
          </h2>
          <p className="text-base text-slate-700 mt-2 leading-relaxed">
            Construction is an industry where a missed dimension or an overlooked specification clause can cost thousands of dollars. We treat every sheet and takeoff cell with uncompromising precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 sm:p-7 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0D47A1] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Standard of Accuracy</h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              We never perform arbitrary lump-sum guessing. Every takeoff is visually auditable; every drawing sheet is checked against International Building Code standards before release.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-7 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0D47A1] flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Deadline Accountability</h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              In construction bidding, 2:00 PM bid deadlines are absolute. When we agree to a delivery schedule, your completed files arrive on time, every time.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-7 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0D47A1] flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">True Partnership</h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              We operate not as an anonymous vendor, but as an integrated preconstruction department that understands your company margins, preferred sub trades, and presentation style.
            </p>
          </div>
        </div>
      </div>

      {/* Professional Licensing & Engineering Statement */}
      <div className="border border-slate-200 rounded-2xl p-6 sm:p-8 bg-white shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-[#0D47A1] uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Professional Licensure & Ethics Disclosure</span>
        </div>
        <h3 className="text-xl font-bold text-slate-900">
          Commitment to Ethical Compliance & State Regulations
        </h3>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Estimation Campus Inc. provides architectural drafting, permit preparation support, construction cost estimating, CPM scheduling, 3D architectural rendering, and fabrication detailing. In jurisdictions where building departments or state statutes mandate registered architectural seals or professional engineering (PE) structural calculations, our drawing packages are coordinated directly with or reviewed by appropriately licensed professional engineers and architects registered in the state of project jurisdiction.
        </p>
        <p className="text-xs sm:text-sm text-slate-600 italic">
          We maintain transparent documentation standards and collaborate with your engineer of record or connect you with licensed professionals across relevant states.
        </p>
      </div>

      {/* US Nationwide Scope */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <span className="text-xs font-bold text-[#0D47A1] uppercase tracking-wider">
            Nationwide Coverage
          </span>
          <h2 className="text-2xl font-bold text-slate-900">
            Serving General Contractors, Architects & Owners Coast to Coast
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            From seismic considerations on the West Coast to hurricane wind-load requirements in Florida and heavy snow-load engineering in the Mountain West, our technical team understands regional construction variances and building department submittal processes.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-slate-700">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#0D47A1]" />
              <span>West Coast & Pacific NW</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#0D47A1]" />
              <span>Texas & Southwest</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#0D47A1]" />
              <span>Midwest & Great Lakes</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#0D47A1]" />
              <span>Southeast & Mid-Atlantic</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8 space-y-4">
          <h3 className="text-base font-bold text-slate-900">
            Preconstruction Software Ecosystem
          </h3>
          <p className="text-xs text-slate-600">
            We work natively in the software tools your team and architects already use:
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs font-medium text-slate-800">
            <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-center">AutoCAD & Revit</div>
            <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-center">Bluebeam Revu</div>
            <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-center">Planswift Takeoff</div>
            <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-center">Primavera P6 & MS Project</div>
            <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-center">3ds Max & V-Ray</div>
            <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-center">RSMeans Cost Data</div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 text-center space-y-4">
        <h3 className="text-2xl font-bold">Partner with Estimation Campus On Your Next Build</h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Experience the confidence of dependable preconstruction deliverables. Reach out today for a prompt consultation and fee proposal.
        </p>
        <div className="pt-2">
          <button
            onClick={() => onOpenQuote()}
            className="px-7 py-3 text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-lg transition-colors"
          >
            Request Your Free Quote
          </button>
        </div>
      </div>

    </div>
  );
};
