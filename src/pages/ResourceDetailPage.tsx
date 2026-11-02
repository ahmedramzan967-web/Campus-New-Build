import React from 'react';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Share2, 
  BookOpen, 
  ArrowRight 
} from 'lucide-react';
import { RESOURCES_DATA } from '../data/resourcesData';
import { Breadcrumbs } from '../components/Breadcrumbs';

interface ResourceDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
  onOpenQuote: () => void;
}

export const ResourceDetailPage: React.FC<ResourceDetailPageProps> = ({ slug, onNavigate, onOpenQuote }) => {
  const article = RESOURCES_DATA.find((r) => r.slug === slug) || RESOURCES_DATA[0];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Breadcrumb */}
      <Breadcrumbs 
        items={[
          { label: 'Resources', path: '/resources' },
          { label: article.category }
        ]} 
        onNavigate={onNavigate} 
      />

      <article className="space-y-8 bg-white">
        
        {/* Article Header */}
        <header className="space-y-4 pb-6 border-b border-slate-200">
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="font-bold text-[#0D47A1] uppercase tracking-wider">{article.category}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
            <span aria-hidden="true">·</span>
            <span>Published {article.publishDate}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {article.title}
          </h1>

          <p className="text-base text-slate-600 leading-relaxed font-medium">
            {article.excerpt}
          </p>
        </header>

        {/* Article Body */}
        <div className="space-y-6 text-base sm:text-lg text-slate-800 leading-relaxed">
          {article.content.map((paragraph, index) => (
            <p key={index} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Checklist if present */}
        {article.checklist && (
          <div className="my-8 p-6 sm:p-8 bg-blue-50/50 border border-blue-200 rounded-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-[#0D47A1]" />
              Recommended Quality Audit Checklist
            </h3>
            <ul className="space-y-3 text-base text-slate-700">
              {article.checklist.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#0D47A1] mt-2 shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Author / Preconstruction Notice */}
        <div className="p-6 sm:p-8 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-sm text-slate-700 leading-relaxed">
          <p className="font-bold text-slate-900">About Estimation Campus Technical Insights:</p>
          <p>
            Published by the preconstruction and architectural drafting team at Estimation Campus Inc. We assist contractors across the US in submitting clean permit drawings, accurate CSI quantity takeoffs, and professional CPM schedules.
          </p>
        </div>

        {/* CTA Box */}
        <div className="bg-[#0D47A1] text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-1.5">
            <h4 className="text-xl font-bold">Need assistance with your drawings or takeoffs?</h4>
            <p className="text-sm text-blue-100 leading-relaxed">
              Our team reviews plans and provides fee proposals within 24 to 48 hours.
            </p>
          </div>
          <button
            onClick={() => onOpenQuote()}
            className="px-7 py-3 text-sm font-bold text-slate-900 bg-white hover:bg-blue-50 rounded-lg whitespace-nowrap shadow transition-colors"
          >
            Request Free Quote
          </button>
        </div>

        {/* Back Link */}
        <div className="pt-4">
          <button
            onClick={() => onNavigate('/resources')}
            className="text-sm font-bold text-[#0D47A1] hover:underline flex items-center gap-2 py-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Resources</span>
          </button>
        </div>

      </article>

    </div>
  );
};
