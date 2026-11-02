import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';

interface PrivacyPageProps {
  onNavigate: (path: string) => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} onNavigate={onNavigate} />

      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-500">
          Last Updated: October 2026 · Estimation Campus Inc.
        </p>
      </div>

      <div className="prose prose-slate max-w-none text-base text-slate-700 space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">1. Information We Collect</h2>
          <p>
            Estimation Campus Inc. collects information provided directly by clients and prospective clients when requesting a service quote, submitting project drawings, or communicating with our office. This information includes names, company affiliations, email addresses, telephone numbers, project site locations, and architectural/engineering drawings, CAD files, or specifications.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Handling of Confidential Construction Documents</h2>
          <p>
            We recognize that architectural plans, structural calculations, property surveys, and construction bid documents contain proprietary and competitive business information. Estimation Campus Inc. treats all submitted project files as strictly confidential. Documents are accessed only by estimators, drafters, and engineers assigned to evaluate your scope and prepare your deliverables. We never sell, rent, or publicly disclose client plans.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. How Information Is Used</h2>
          <p>
            Collected information is utilized exclusively to:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>Review project scope and generate transparent proposals and fee quotes;</li>
            <li>Prepare architectural permit drawings, quantity takeoffs, CPM schedules, 3D renderings, and shop drawings;</li>
            <li>Coordinate revisions, plan-check responses, and project communications;</li>
            <li>Fulfill billing, accounting, and contractual obligations.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">4. Third-Party Disclosures & Security</h2>
          <p>
            Estimation Campus Inc. does not share personal or project data with unrelated third parties. Where project scopes require coordinated professional engineering (PE) review or municipal submittal by a licensed design professional, documents are shared solely with appropriately credentialed professionals under confidentiality obligations.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">5. Contact Regarding Privacy</h2>
          <p>
            If you have questions regarding our data protection standards or wish to request the deletion of non-contractual project files, please contact us at <a href="mailto:info@estimationcampusinc.com" className="text-[#0D47A1] underline">info@estimationcampusinc.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
};
