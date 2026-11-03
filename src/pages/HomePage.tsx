import React from 'react';
import { 
  Building2, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  FileCheck, 
  Compass, 
  Calculator, 
  CalendarClock, 
  Layers, 
  FileText, 
  Users, 
  ChevronRight,
  Sparkles,
  HelpCircle,
  Quote
} from 'lucide-react';
import { SERVICES_LIST } from '../data/servicesData';
import { PROJECTS_DATA } from '../data/projectsData';
import { ScopeEstimatorTool } from '../components/ScopeEstimatorTool';
import { ServiceId } from '../types';

interface HomePageProps {
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

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenQuote }) => {
  const [activeProjectFilter, setActiveProjectFilter] = React.useState<string>('all');

  const filteredProjects = activeProjectFilter === 'all' 
    ? PROJECTS_DATA.slice(0, 6) 
    : PROJECTS_DATA.filter(p => p.category === activeProjectFilter);

  return (
    <div className="space-y-24 sm:space-y-32 pb-20">
      
      {/* SECTION 1: HERO */}
      <section className="relative pt-8 sm:pt-14 pb-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Proposition (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#0D47A1]">
                <span>United States Preconstruction & Design Services</span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-500 font-normal">Commercial & Residential</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]" style={{ textWrap: 'balance' }}>
                Your Trusted Partner in Construction Design & Preconstruction Services
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                From permit drawings and detailed construction estimates to project scheduling, 3D visualization, and shop drawings, Estimation Campus delivers reliable solutions that help bring your construction projects to life.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  onClick={() => onOpenQuote()}
                  className="px-7 py-3.5 text-sm font-bold text-white bg-[#0D47A1] hover:bg-[#1976D2] rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <span>Get a Free Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('/services')}
                  className="px-7 py-3.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-colors text-center"
                >
                  Explore Our Services
                </button>
              </div>

              {/* Proof Strip */}
              <div className="pt-6 border-t border-slate-200 grid grid-cols-3 gap-4 text-xs text-slate-600">
                <div>
                  <span className="font-bold text-slate-900 block text-sm">All 50 States</span>
                  <span className="text-slate-500">US Jurisdiction Support</span>
                </div>
                <div>
                  <span className="font-bold text-slate-900 block text-sm">24–48 Hours</span>
                  <span className="text-slate-500">Proposal Turnaround</span>
                </div>
                <div>
                  <span className="font-bold text-slate-900 block text-sm">IBC / IRC / CSI</span>
                  <span className="text-slate-500">Standard Code Alignment</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-100 aspect-[4/3] lg:aspect-[5/4]">
                <img
                  src="/images/hero_modern_architecture_1792810878037.jpg"
                  alt="Modern architectural glass and steel building structure engineering"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/95 backdrop-blur-md rounded-xl border border-white/60 text-xs sm:text-sm text-slate-800 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">Preconstruction Support</span>
                    <span className="text-emerald-700 font-semibold flex items-center gap-1 text-xs">
                      <CheckCircle2 className="w-4 h-4" /> Full Scope Coverage
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    Permits · Detailed Estimates · CPM Schedules · 3D Visuals · Shop Drawings
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: TRUST & CREDIBILITY */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0D47A1] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Code & Standard Alignment</h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                Drawings and calculations prepared strictly adhering to International Building Codes (IBC), International Residential Code (IRC), and CSI MasterFormat divisions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0D47A1] flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Prompt & Reliable Delivery</h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                We understand construction bid deadlines and municipal submission cutoffs. Scope reviews delivered within 24 to 48 hours with guaranteed milestone schedules.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0D47A1] flex items-center justify-center">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Auditable Takeoffs & CAD</h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                No black-box figures. Every estimate is backed by color-coded plan markups, open Excel formulas, and standard layered AutoCAD / Revit source files.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0D47A1] flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Multi-Disciplinary Team</h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                Experienced construction estimators, architectural drafters, CPM schedulers, and 3D visualization specialists working seamlessly together under one roof.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: OUR FIVE CORE SERVICES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold text-[#0D47A1] uppercase tracking-wider">
            Comprehensive Capabilities
          </span>
          <h2 className="text-3xl font-bold text-slate-900 mt-1">
            Five Core Construction Services
          </h2>
          <p className="text-base sm:text-lg text-slate-700 mt-2 leading-relaxed">
            Estimation Campus provides end-to-end support across the preconstruction and construction lifecycle. Every service is delivered with equal rigor, precision, and dedicated specialist teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_LIST.map((service, index) => {
            const Icon = SERVICE_ICONS[service.id] || FileText;
            return (
              <div 
                key={service.id}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group"
              >
                <div>
                  {/* Card Image */}
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img
                      src={service.heroImage}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm p-2 rounded-lg shadow-sm text-[#0D47A1]">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-3">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0D47A1] transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {service.shortDescription}
                    </p>

                    <div className="pt-3 border-t border-slate-100">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                        Key Deliverables Include:
                      </span>
                      <ul className="text-xs sm:text-sm text-slate-700 space-y-2">
                        {service.deliverables.slice(0, 3).map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#0D47A1] shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Card Action */}
                <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-100 mt-4">
                  <button
                    onClick={() => onNavigate(`/services/${service.slug}`)}
                    className="text-sm font-bold text-[#0D47A1] hover:text-[#1976D2] flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Learn More</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onOpenQuote(service.id)}
                    className="text-sm font-semibold text-slate-700 hover:text-slate-900 underline"
                  >
                    Request Quote
                  </button>
                </div>
              </div>
            );
          })}

          {/* 6th Card: Scope Consultation Callout */}
          <div className="bg-gradient-to-br from-[#0D47A1] to-[#1976D2] text-white rounded-2xl p-8 flex flex-col justify-between shadow-sm">
            <div className="space-y-4">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                Integrated Approach
              </span>
              <h3 className="text-2xl font-bold leading-tight">
                Need Multiple Services For One Project?
              </h3>
              <p className="text-xs text-blue-100 leading-relaxed">
                Bundle permit drawings with quantity takeoffs and project scheduling for synchronized documentation, reduced friction, and seamless subcontractor bidding.
              </p>
              <div className="pt-2 text-xs text-white/90 space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>Single point of preconstruction contact</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>Coordinated drawings matching estimate quantities</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>Cost-effective package discounting</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <button
                onClick={() => onOpenQuote('multiple')}
                className="w-full py-3 px-4 bg-white text-[#0D47A1] font-bold text-xs rounded-xl shadow hover:bg-blue-50 transition-colors text-center"
              >
                Inquire About Full-Scope Support
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 4: INTERACTIVE SCOPE ESTIMATOR TOOL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScopeEstimatorTool onOpenQuoteWithScope={(service, details) => onOpenQuote(service)} />
      </section>

      {/* SECTION 5: WHY CHOOSE ESTIMATION CAMPUS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold text-[#0D47A1] uppercase tracking-wider">
            Operational Excellence
          </span>
          <h2 className="text-3xl font-bold text-slate-900 mt-1">
            Why Contractors & Builders Choose Estimation Campus
          </h2>
          <p className="text-base text-slate-600 mt-2">
            We operate as an extension of your preconstruction department, providing deep technical acumen, meticulous attention to detail, and dependable communication.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-sm space-y-2.5">
            <h4 className="text-base font-bold text-slate-900">01. Attention to Detail</h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              Every drawing line, material takeoff quantity, and CPM schedule link is scrutinized. We catch dimensional discrepancies and addenda revisions before they turn into costly jobsite RFIs.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-sm space-y-2.5">
            <h4 className="text-base font-bold text-slate-900">02. Clear Communication</h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              No guessing or delays. We provide immediate acknowledgment upon file upload, detailed scope clarification questions within 24 hours, and transparent progress updates throughout.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-sm space-y-2.5">
            <h4 className="text-base font-bold text-slate-900">03. Efficient Project Coordination</h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              Whether synchronizing MEP trades with structural framing or coordinating plan check comments with city examiners, we facilitate frictionless workflows across project stakeholders.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-sm space-y-2.5">
            <h4 className="text-base font-bold text-slate-900">04. Professional Documentation</h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              Deliverables are delivered in industry-standard formats: plot-ready Arch D PDFs, fully layered AutoCAD (.dwg), native Primavera P6 (.xer), and formula-enabled Microsoft Excel (.xlsx) files.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-sm space-y-2.5">
            <h4 className="text-base font-bold text-slate-900">05. Reliable Delivery</h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              Construction bidding windows are rigid. When we commit to a deliverable date, your file arrives on or before the agreed milestone so your bid team has ample time for review.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-sm space-y-2.5">
            <h4 className="text-base font-bold text-slate-900">06. Client-Focused Service</h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              We customize title blocks, CSI coding, takeoff formats, and schedule layouts to match your company branding and specific owner contract specifications.
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 6: OUR 4-STEP PROCESS */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold text-[#0D47A1] uppercase tracking-wider">
              Streamlined Workflow
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mt-1">
              How We Deliver Your Projects
            </h2>
            <p className="text-base sm:text-lg text-slate-700 mt-2 leading-relaxed">
              A transparent four-step methodology from initial blueprint submission to finalized deliverables and revisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative">
              <span className="text-2xl font-black text-slate-200 block mb-2">01</span>
              <h4 className="text-base font-bold text-slate-900">Share Your Project Details</h4>
              <p className="text-sm text-slate-700 leading-relaxed mt-2">
                Upload your drawings, sketches, or specifications through our secure quote portal or provide a cloud link.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative">
              <span className="text-2xl font-black text-slate-200 block mb-2">02</span>
              <h4 className="text-base font-bold text-slate-900">Scope Review & Proposal</h4>
              <p className="text-sm text-slate-700 leading-relaxed mt-2">
                Our preconstruction leads review your package and return a transparent, fixed-fee proposal with an exact deliverable schedule in 24–48 hours.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative">
              <span className="text-2xl font-black text-slate-200 block mb-2">03</span>
              <h4 className="text-base font-bold text-slate-900">Project Development</h4>
              <p className="text-sm text-slate-700 leading-relaxed mt-2">
                Our specialized team prepares your drawings, takeoffs, schedules, or renders, executing rigorous internal peer audits along the way.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative">
              <span className="text-2xl font-black text-slate-200 block mb-2">04</span>
              <h4 className="text-base font-bold text-slate-900">Final Deliverables & Support</h4>
              <p className="text-sm text-slate-700 leading-relaxed mt-2">
                Receive completed native source files and PDFs. We remain on standby to assist with plan-check comments, revisions, or bid adjustments.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 7: FEATURED PROJECTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <span className="text-xs font-bold text-[#0D47A1] uppercase tracking-wider">
              Demonstrated Experience
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mt-1">
              Featured Preconstruction Projects
            </h2>
            <p className="text-base text-slate-600 mt-1">
              Representative examples illustrating our documentation standards across all five disciplines.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/projects')}
            className="text-xs font-bold text-[#0D47A1] hover:underline flex items-center gap-1 self-start md:self-end"
          >
            <span>View Complete Portfolio</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-6 border-b border-slate-200 text-xs">
          {[
            { id: 'all', label: 'All Disciplines' },
            { id: 'permit-drawings', label: 'Permit Drawings' },
            { id: 'construction-estimating', label: 'Estimates & Takeoffs' },
            { id: 'project-scheduling', label: 'CPM Schedules' },
            { id: '3d-renderings', label: '3D Renderings' },
            { id: 'shop-drawings', label: 'Shop Drawings' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveProjectFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                activeProjectFilter === tab.id
                  ? 'bg-[#0D47A1] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="h-44 overflow-hidden bg-slate-100 relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 px-2.5 py-1 rounded text-[11px] font-semibold text-slate-800 shadow-sm">
                    {project.location}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <span className="text-[11px] font-semibold text-[#0D47A1] uppercase tracking-wider block">
                    {project.categoryName}
                  </span>
                  <h3 className="text-base font-bold text-slate-900">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {project.scopeSummary}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-100 mt-3 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">{project.deliverableType}</span>
                <button
                  onClick={() => onNavigate('/projects')}
                  className="font-bold text-[#0D47A1] hover:underline"
                >
                  Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 8: CLIENT TESTIMONIALS & FEEDBACK */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold text-[#0D47A1] uppercase tracking-wider">
              Client Feedback
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mt-1">
              Trusted by Contractors & Developers Nationwide
            </h2>
            <p className="text-base text-slate-600 mt-2">
              Authentic feedback from commercial general contractors, trade subcontractors, and builders who rely on Estimation Campus for recurring preconstruction support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-white p-7 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <Quote className="w-8 h-8 text-blue-200" />
                <p className="text-sm text-slate-700 leading-relaxed italic">
                  "Estimation Campus delivered a full CSI Division takeoff for a 45,000 sq ft commercial warehouse tender with only 4 days to bid date. The Excel sheets were organized cleanly and every number was backed by color-coded Bluebeam markups. We secured the project and had zero surprises during procurement."
                </p>
              </div>
              <div className="pt-6 border-t border-slate-100 mt-6">
                <p className="text-sm font-bold text-slate-900">Marcus Sterling</p>
                <p className="text-xs text-slate-500">Chief Estimator · Sterling Commercial Builders (Dallas, TX)</p>
              </div>
            </div>

            <div className="bg-white p-7 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <Quote className="w-8 h-8 text-blue-200" />
                <p className="text-sm text-slate-700 leading-relaxed italic">
                  "Our architectural firm was at full capacity when two major tenant improvement submittals hit at once. Estimation Campus stepped in with drafting permit sets that satisfied the local plan examiners on the first round of review comments. Extremely dependable and responsive team."
                </p>
              </div>
              <div className="pt-6 border-t border-slate-100 mt-6">
                <p className="text-sm font-bold text-slate-900">Elena Rostova, AIA</p>
                <p className="text-xs text-slate-500">Principal Architect · Studio Praxis Architecture (Phoenix, AZ)</p>
              </div>
            </div>

            <div className="bg-white p-7 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <Quote className="w-8 h-8 text-blue-200" />
                <p className="text-sm text-slate-700 leading-relaxed italic">
                  "The Primavera P6 baseline schedule and monthly lookahead reports they created met strict US Army Corps Division 013200 specs to the letter. It saved us from purchasing expensive enterprise software licenses while keeping our project superintendents on track."
                </p>
              </div>
              <div className="pt-6 border-t border-slate-100 mt-6">
                <p className="text-sm font-bold text-slate-900">David Vance</p>
                <p className="text-xs text-slate-500">Project Executive · Apex Infrastructure Group (Atlanta, GA)</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 9: FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold text-[#0D47A1] uppercase tracking-wider">
            Clear Answers
          </span>
          <h2 className="text-3xl font-bold text-slate-900 mt-1">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-slate-700 mt-2 leading-relaxed">
            Answers to common questions regarding project submissions, drawing formats, estimating standards, and turnaround times.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-white p-6 sm:p-7 rounded-xl border border-slate-200 shadow-sm space-y-2.5">
            <h4 className="text-base font-bold text-slate-900">
              How do I submit my plans or project requirements?
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              You can upload PDF drawings, CAD files, or sketches via our online quote request form, or share a Google Drive / Dropbox / OneDrive link. For large file sets over 50MB, email them directly to <a href="mailto:info@estimationcampusinc.com" className="text-[#0D47A1] font-medium hover:underline">info@estimationcampusinc.com</a>.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-7 rounded-xl border border-slate-200 shadow-sm space-y-2.5">
            <h4 className="text-base font-bold text-slate-900">
              What is your typical turnaround time for an estimate or drawing set?
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              Standard trade takeoffs typically deliver in 2 to 4 business days. Permit drawing packages and full-scope commercial estimates range between 5 to 10 business days depending on sheet count and trade complexity. Urgent expedite options are available upon request.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-7 rounded-xl border border-slate-200 shadow-sm space-y-2.5">
            <h4 className="text-base font-bold text-slate-900">
              Are your estimates customizable for our company labor rates?
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              Yes. All our estimates are delivered in Microsoft Excel (.xlsx) with open formulas, allowing you to easily adjust unit labor rates, crew productivity multipliers, equipment rates, and profit markups anytime.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-7 rounded-xl border border-slate-200 shadow-sm space-y-2.5">
            <h4 className="text-base font-bold text-slate-900">
              Do you provide revisions if the building department issues comments?
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              Yes. We support our permit drawing sets through municipal review. When a city or county building department returns plan check notes, we update the drawing set and provide a formal response matrix.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-7 rounded-xl border border-slate-200 shadow-sm space-y-2.5">
            <h4 className="text-base font-bold text-slate-900">
              How do you handle structural engineering calculations?
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              Any engineering or architectural design services requiring state licensure are performed or reviewed by appropriately licensed professional engineers (PE) or registered architects where mandated by law. We coordinate directly with your engineer or partner with licensed professionals.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-7 rounded-xl border border-slate-200 shadow-sm space-y-2.5">
            <h4 className="text-base font-bold text-slate-900">
              Do you work across all states in the US?
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              Yes. Estimation Campus serves clients across all 50 states. We adjust cost estimating indices to your exact project zip code and format drawings in compliance with local municipal amendments.
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 10: FINAL CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-xl border border-slate-800">
          <div className="max-w-2xl relative z-10 space-y-6">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Start Your Project Today
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Let's Bring Your Next Construction Project to Life.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Share your project requirements with Estimation Campus and discover how our specialized team can support your next steps with permit drawings, quantity takeoffs, scheduling, 3D renderings, and shop drawings.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => onOpenQuote()}
                className="px-8 py-4 text-sm font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-xl shadow transition-all flex items-center justify-center gap-2"
              >
                <span>Request Your Free Quote</span>
                <ArrowRight className="w-4 h-4 text-[#0D47A1]" />
              </button>
              <button
                onClick={() => onNavigate('/contact')}
                className="px-8 py-4 text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors text-center"
              >
                Contact Our Office
              </button>
            </div>
          </div>
          <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-10 bg-radial from-blue-400 to-transparent pointer-events-none" />
        </div>
      </section>

    </div>
  );
};
