import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  FileCheck, 
  ArrowRight, 
  CheckCircle2, 
  X, 
  ExternalLink 
} from 'lucide-react';
import { PROJECTS_DATA } from '../data/projectsData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProjectItem, ServiceId } from '../types';

interface ProjectsPageProps {
  onNavigate: (path: string) => void;
  onOpenQuote: (serviceSlug?: ServiceId | 'multiple') => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onNavigate, onOpenQuote }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filteredProjects = activeCategory === 'all'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Breadcrumb */}
      <Breadcrumbs items={[{ label: 'Projects & Portfolio' }]} onNavigate={onNavigate} />

      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-bold text-[#0D47A1] uppercase tracking-wider">
          Portfolio & Case Studies
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Representative Preconstruction Projects
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Explore representative examples illustrating our documentation standards across building permit plan sets, CSI MasterFormat cost estimates, CPM baseline schedules, 3D architectural renders, and fabrication shop drawings.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2.5 border-b border-slate-200 text-sm">
        {[
          { id: 'all', label: 'All Disciplines' },
          { id: 'permit-drawings', label: 'Permit Drawings' },
          { id: 'construction-estimating', label: 'Estimating & Takeoffs' },
          { id: 'project-scheduling', label: 'CPM Schedules' },
          { id: '3d-renderings', label: '3D Renderings' },
          { id: 'shop-drawings', label: 'Shop Drawings' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`px-4 py-2.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeCategory === tab.id
                ? 'bg-[#0D47A1] text-white shadow-xs font-semibold'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
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
            className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between group"
          >
            <div>
              <div className="h-52 overflow-hidden bg-slate-100 relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-md text-xs font-semibold text-slate-800 shadow-xs flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#0D47A1]" />
                  <span>{project.location}</span>
                </div>
              </div>

              <div className="p-6 space-y-3">
                <span className="text-xs font-bold text-[#0D47A1] uppercase tracking-wider block">
                  {project.categoryName}
                </span>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0D47A1] transition-colors leading-snug">
                  {project.title}
                </h3>
                <p className="text-sm text-slate-700 line-clamp-3 leading-relaxed">
                  {project.scopeSummary}
                </p>

                <div className="pt-2 text-sm text-slate-600">
                  <span className="font-semibold text-slate-800">Deliverable: </span>
                  {project.deliverableType}
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-slate-100 mt-3 flex items-center justify-between">
              <button
                onClick={() => setSelectedProject(project)}
                className="text-sm font-bold text-[#0D47A1] hover:underline flex items-center gap-1.5 py-2"
              >
                <span>View Scope Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onOpenQuote(project.category)}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 py-2"
              >
                Request Similar Scope
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div 
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64 bg-slate-100">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 text-slate-700 hover:bg-white shadow transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-sm text-white px-3.5 py-1.5 rounded-md text-sm font-medium">
                {selectedProject.location}
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <span className="text-sm font-bold text-[#0D47A1] uppercase tracking-wider block">
                  {selectedProject.categoryName}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                  {selectedProject.title}
                </h2>
                <p className="text-sm font-semibold text-slate-700 mt-1.5">
                  Deliverable Format: {selectedProject.deliverableType}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Project Scope Overview
                </h4>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {selectedProject.scopeSummary}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                  Key Scope Execution Highlights
                </h4>
                <ul className="space-y-2.5 text-sm sm:text-base text-slate-700">
                  {selectedProject.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#0D47A1] shrink-0 mt-1" />
                      <span className="leading-relaxed">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={() => {
                    const cat = selectedProject.category;
                    setSelectedProject(null);
                    onOpenQuote(cat);
                  }}
                  className="w-full sm:w-auto px-7 py-3.5 text-sm font-bold text-white bg-[#0D47A1] hover:bg-[#1976D2] rounded-lg shadow-sm transition-colors text-center"
                >
                  Request Quote for Similar Project
                </button>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-sm font-semibold text-slate-600 hover:text-slate-900 py-2"
                >
                  Close Window
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-900">Have a custom or complex project requirement?</h3>
          <p className="text-base text-slate-700 mt-1.5 leading-relaxed">
            Send us your drawings or specifications for a prompt review and tailored proposal.
          </p>
        </div>
        <button
          onClick={() => onOpenQuote()}
          className="px-7 py-3.5 text-sm font-bold text-white bg-[#0D47A1] hover:bg-[#1976D2] rounded-lg transition-colors whitespace-nowrap shadow-sm"
        >
          Submit Project For Free Quote
        </button>
      </div>

    </div>
  );
};
