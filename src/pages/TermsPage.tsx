import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';

interface TermsPageProps {
  onNavigate: (path: string) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ label: 'Terms of Use' }]} onNavigate={onNavigate} />

      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          Terms of Use & Service Disclaimers
        </h1>
        <p className="text-xs text-slate-500">
          Last Updated: October 2026 · Estimation Campus Inc.
        </p>
      </div>

      <div className="prose prose-slate max-w-none text-base text-slate-700 space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">1. Scope of Services</h2>
          <p>
            Estimation Campus Inc. provides construction preconstruction design support, architectural drafting, material quantity takeoffs, cost estimating, CPM scheduling, 3D visualization, and shop drawing preparation. All work is performed on a consulting basis to assist general contractors, trade subcontractors, developers, architects, and owners.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Professional Engineering & Architectural Licensure Disclaimer</h2>
          <p>
            Any engineering calculations, structural designs, or architectural drawing sets requiring registered professional licensure (e.g. state-licensed Professional Engineer [PE] or Registered Architect [RA] stamp and seal) are performed or reviewed by appropriately licensed and registered professionals in the applicable project jurisdiction where mandated by law. Estimation Campus Inc. coordinates with licensed professionals or the client’s engineer of record to deliver compliant submittal documentation.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Building Department Approvals & Permitting</h2>
          <p>
            Permit issuance and plan approvals are within the sole legal discretion of the local Authority Having Jurisdiction (AHJ) and municipal building officials. While Estimation Campus Inc. prepares drawing packages to adhere to model building codes (IBC/IRC) and local guidelines, and provides plan-check response revisions, no guarantee of instantaneous or unconditioned permit issuance is made.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">4. Estimating & Takeoff Disclaimers</h2>
          <p>
            Construction cost estimates and material takeoffs represent professional evaluations based on drawings and specifications provided at the time of estimation. Construction costs fluctuate due to market conditions, supply chain dynamics, fuel prices, and contractor overhead. Clients and contractors are responsible for reviewing final pricing, verifying field conditions, and adjusting margins prior to contract execution or bid submission.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">5. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by applicable law, Estimation Campus Inc. shall not be liable for indirect, incidental, or consequential damages resulting from project delays, municipal examiner processing times, contractor bidding errors, or unforeseen field conditions.
          </p>
        </section>
      </div>
    </div>
  );
};
