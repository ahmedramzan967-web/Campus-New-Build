import React, { useState } from 'react';
import { 
  Building, 
  Home, 
  Store, 
  Factory, 
  CheckCircle, 
  Clock, 
  FileSpreadsheet, 
  Layers, 
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import { ServiceId } from '../types';

interface ScopeEstimatorToolProps {
  onOpenQuoteWithScope: (service: ServiceId | 'multiple', details: string) => void;
}

export const ScopeEstimatorTool: React.FC<ScopeEstimatorToolProps> = ({ onOpenQuoteWithScope }) => {
  const [projectType, setProjectType] = useState<'residential' | 'commercial' | 'multifamily' | 'industrial'>('commercial');
  const [squareFootage, setSquareFootage] = useState<'under5k' | '5k-25k' | '25k-100k' | 'over100k'>('5k-25k');
  const [selectedServices, setSelectedServices] = useState<ServiceId[]>([
    'permit-drawings',
    'construction-estimating'
  ]);

  const toggleService = (id: ServiceId) => {
    if (selectedServices.includes(id)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== id));
      }
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  // Turnaround and sheet calculation
  const getScopeEstimates = () => {
    let sheetEstimate = '12–18 Sheets';
    let turnaround = '5 to 7 Business Days';
    let divisions = 'Divisions 02–16 (Full Core Trades)';

    if (projectType === 'residential') {
      sheetEstimate = squareFootage === 'under5k' ? '8–14 Sheets' : '15–24 Sheets';
      turnaround = '4 to 6 Business Days';
      divisions = 'Lumber, Drywall, Concrete, MEP & Finishes';
    } else if (projectType === 'commercial') {
      sheetEstimate = squareFootage === 'under5k' ? '12–18 Sheets' : squareFootage === '5k-25k' ? '20–35 Sheets' : '40+ Sheets';
      turnaround = '6 to 9 Business Days';
      divisions = 'CSI MasterFormat 16/50 Divisions';
    } else if (projectType === 'multifamily') {
      sheetEstimate = '30–50 Sheets';
      turnaround = '8 to 12 Business Days';
      divisions = 'All CSI Divisions + Unit Matrix Breakdown';
    } else {
      sheetEstimate = '25–45 Sheets';
      turnaround = '7 to 10 Business Days';
      divisions = 'Site, Structural Steel, Heavy MEP, Concrete';
    }

    return { sheetEstimate, turnaround, divisions };
  };

  const { sheetEstimate, turnaround, divisions } = getScopeEstimates();

  const handleLaunchQuote = () => {
    const summary = `Selected Project Scope: ${projectType.toUpperCase()} (${squareFootage}), Services: ${selectedServices.join(', ')}`;
    const primaryService = selectedServices.length === 1 ? selectedServices[0] : 'multiple';
    onOpenQuoteWithScope(primaryService, summary);
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm">
      <div className="max-w-3xl mb-8">
        <span className="text-xs font-bold text-[#0D47A1] uppercase tracking-wider">
          Interactive Scope Configurator
        </span>
        <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
          Estimate Your Project Preconstruction Scope
        </h3>
        <p className="text-sm text-slate-600 mt-2">
          Select your project type and desired services to preview typical deliverable packages, CSI trade depth, and turnaround milestones.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Step 1: Project Type */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
              1. Project Classification
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'residential', label: 'Residential', icon: Home },
                { id: 'commercial', label: 'Commercial TI', icon: Store },
                { id: 'multifamily', label: 'Multi-Family', icon: Building },
                { id: 'industrial', label: 'Industrial', icon: Factory }
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = projectType === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setProjectType(item.id as any)}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-center transition-all ${
                      isSelected
                        ? 'bg-blue-50/80 border-[#0D47A1] text-[#0D47A1] font-semibold ring-1 ring-[#0D47A1]'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100/60'
                    }`}
                  >
                    <Icon className="w-5 h-5 text-current" />
                    <span className="text-xs">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Approximate Scale */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
              2. Approximate Square Footage
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'under5k', label: '< 5,000 sq ft' },
                { id: '5k-25k', label: '5,000–25k sq ft' },
                { id: '25k-100k', label: '25k–100k sq ft' },
                { id: 'over100k', label: '100k+ sq ft' }
              ].map((item) => {
                const isSelected = squareFootage === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSquareFootage(item.id as any)}
                    className={`py-2 px-3 rounded-lg border text-xs font-medium text-center transition-all ${
                      isSelected
                        ? 'bg-blue-50/80 border-[#0D47A1] text-[#0D47A1] font-semibold'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100/60'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Required Core Services */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
              3. Required Core Services (Select all that apply)
            </label>
            <div className="space-y-2">
              {[
                { id: 'permit-drawings', label: 'Permit Support, Design & Drawings', desc: 'Code compliance, architectural sheets, zoning & comment responses' },
                { id: 'construction-estimating', label: 'Construction Estimating & Quantity Takeoffs', desc: 'Line-item Excel takeoffs, labor/material rates, marked-up plans' },
                { id: 'project-scheduling', label: 'Project Scheduling (CPM)', desc: 'Primavera P6 / MS Project baselines & 3-week rolling lookaheads' },
                { id: '3d-renderings', label: '3D Renderings & Walkthroughs', desc: 'Photorealistic 4K/8K exterior/interior renders & video presentations' },
                { id: 'shop-drawings', label: 'Shop Drawings & As-Builts', desc: 'Fabrication submittal sets, MEP coordination & closeout records' }
              ].map((srv) => {
                const isChecked = selectedServices.includes(srv.id as ServiceId);
                return (
                  <div
                    key={srv.id}
                    onClick={() => toggleService(srv.id as ServiceId)}
                    className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-colors ${
                      isChecked
                        ? 'bg-white border-[#0D47A1] shadow-sm'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}}
                      className="mt-0.5 w-4 h-4 text-[#0D47A1] rounded border-slate-300 focus:ring-[#0D47A1]"
                    />
                    <div>
                      <p className={`text-xs font-bold ${isChecked ? 'text-[#0D47A1]' : 'text-slate-800'}`}>
                        {srv.label}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {srv.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Output Card (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Scope Summary
              </span>
              <span className="text-xs font-semibold text-[#0D47A1] bg-blue-50 px-2 py-0.5 rounded">
                {selectedServices.length} Service{selectedServices.length > 1 ? 's' : ''} Selected
              </span>
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <span className="text-xs text-slate-400 block">Typical Deliverable Drawing Volume</span>
                <span className="text-base font-bold text-slate-900">{sheetEstimate}</span>
              </div>

              <div>
                <span className="text-xs text-slate-400 block">Estimated Deliverable Turnaround</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <Clock className="w-4 h-4 text-[#0D47A1]" />
                  <span className="text-base font-bold text-slate-900">{turnaround}</span>
                </div>
              </div>

              <div>
                <span className="text-xs text-slate-400 block">Trade & Specification Coverage</span>
                <span className="text-xs font-medium text-slate-700 block mt-0.5">{divisions}</span>
              </div>

              <div className="pt-2">
                <span className="text-xs text-slate-400 block mb-2">Package Deliverables Included:</span>
                <ul className="text-xs text-slate-600 space-y-1.5">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Formatted PDF & layered native source files</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Full internal quality audit prior to submittal</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Revision support aligned with scope specifications</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-100">
            <button
              type="button"
              onClick={handleLaunchQuote}
              className="w-full py-3 px-4 rounded-lg text-xs font-bold text-white bg-[#0D47A1] hover:bg-[#1976D2] transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Get Free Quote for This Scope</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[11px] text-slate-400 text-center mt-2">
              Free, no-obligation proposal delivered in 24–48 hours.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
