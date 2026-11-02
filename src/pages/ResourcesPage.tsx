import React from 'react';
import { 
  FileText, 
  ArrowRight, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  BookOpen 
} from 'lucide-react';
import { RESOURCES_DATA } from '../data/resourcesData';
import { Breadcrumbs } from '../components/Breadcrumbs';

interface ResourcesPageProps {
  onNavigate: (path: string) => void;
  onOpenQuote: () => void;
}

export const ResourcesPage: React.FC<ResourcesPageProps> = ({ onNavigate, onOpenQuote }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Breadcrumb */}
      <Breadcrumbs items={[{ label: 'Resources & Guides' }]} onNavigate={onNavigate} />

      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-bold text-[#0D47A1] uppercase tracking-wider">
          Preconstruction Knowledge Center
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Industry Guides, Checklists & Technical Articles
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Practical preconstruction resources to help general contractors, architects, estimators, and project owners navigate municipal permits, CSI takeoffs, CPM scheduling, and shop drawings.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {RESOURCES_DATA.map((article) => (
          <article
            key={article.id}
            className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <span className="font-semibold text-[#0D47A1]">{article.category}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {article.readTime}
                </span>
                <span aria-hidden="true">·</span>
                <span>{article.publishDate}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 hover:text-[#0D47A1] transition-colors cursor-pointer leading-snug" onClick={() => onNavigate(`/resources/${article.slug}`)}>
                {article.title}
              </h2>

              <p className="text-base text-slate-700 leading-relaxed">
                {article.excerpt}
              </p>

              {article.checklist && (
                <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5">
                  <span className="text-sm font-bold text-slate-800 uppercase tracking-wider block">
                    Featured Checklist Preview
                  </span>
                  <ul className="space-y-2 text-sm text-slate-700">
                    {article.checklist.slice(0, 3).map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#0D47A1] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between">
              <button
                onClick={() => onNavigate(`/resources/${article.slug}`)}
                className="text-sm font-bold text-[#0D47A1] hover:underline flex items-center gap-2 py-1"
              >
                <span>Read Full Technical Guide</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Free Plan Review Box */}
      <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-2.5 max-w-xl">
          <span className="text-sm font-bold text-amber-400 uppercase tracking-wider">
            Plan Review Assistance
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold">Have blueprints that need review?</h3>
          <p className="text-base text-slate-300 leading-relaxed">
            Send us your current drawing set for a complimentary initial scope breakdown and deliverable timeline estimate.
          </p>
        </div>
        <button
          onClick={() => onOpenQuote()}
          className="px-8 py-3.5 text-sm font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-lg whitespace-nowrap shadow transition-colors"
        >
          Request Free Plan Review
        </button>
      </div>

    </div>
  );
};
