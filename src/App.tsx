/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';

// Pages
import { HomePage } from './pages/HomePage';
import { ServicesOverviewPage } from './pages/ServicesOverviewPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { AboutPage } from './pages/AboutPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { ResourceDetailPage } from './pages/ResourceDetailPage';
import { ContactPage } from './pages/ContactPage';
import { QuotePage } from './pages/QuotePage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { SitemapPage } from './pages/SitemapPage';
import { NotFoundPage } from './pages/NotFoundPage';

import { SERVICES_DATA } from './data/servicesData';
import { ServiceId } from './types';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteInitialService, setQuoteInitialService] = useState<ServiceId | 'multiple'>('permit-drawings');

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update dynamic document title and meta description based on route
  useEffect(() => {
    let pageTitle = 'Estimation Campus Inc. — Construction Design & Preconstruction Services';
    let metaDesc = 'Professional construction design, permit drawings, quantity takeoffs, project scheduling, 3D renderings, and shop drawings for US builders and contractors.';

    if (currentPath === '/') {
      pageTitle = 'Estimation Campus Inc. — Construction Design & Preconstruction Services';
    } else if (currentPath === '/services') {
      pageTitle = 'Five Core Construction Preconstruction Services | Estimation Campus';
      metaDesc = 'Permit drawings, construction estimating, CPM scheduling, 3D renderings, and shop drawings for US contractors and architects.';
    } else if (currentPath.startsWith('/services/')) {
      const slug = currentPath.replace('/services/', '');
      const srv = SERVICES_DATA[slug];
      if (srv) {
        pageTitle = srv.metaTitle;
        metaDesc = srv.metaDescription;
      }
    } else if (currentPath === '/projects') {
      pageTitle = 'Featured Projects & Case Studies | Estimation Campus';
      metaDesc = 'Explore representative permit drawings, CSI cost estimates, CPM schedules, and 3D architectural renders.';
    } else if (currentPath === '/about') {
      pageTitle = 'About Us & Standard of Care | Estimation Campus Inc.';
      metaDesc = 'Dedicated preconstruction consulting partner for US general contractors, builders, and architects.';
    } else if (currentPath === '/resources') {
      pageTitle = 'Preconstruction Guides & Checklists | Estimation Campus';
      metaDesc = 'Technical guides on building permit submittals, CSI MasterFormat takeoffs, and CPM construction scheduling.';
    } else if (currentPath === '/contact') {
      pageTitle = 'Contact Us | Scope Inquiries | Estimation Campus';
      metaDesc = 'Submit your construction drawings or schedule consultation with our preconstruction engineering team.';
    } else if (currentPath === '/quote') {
      pageTitle = 'Request a Free Quote | Estimation Campus Inc.';
      metaDesc = 'Receive a fixed-fee proposal and deliverable timeline for your construction drawings, takeoffs, or schedules within 24-48 hours.';
    } else if (currentPath === '/privacy') {
      pageTitle = 'Privacy Policy | Estimation Campus Inc.';
    } else if (currentPath === '/terms') {
      pageTitle = 'Terms of Use & Disclaimers | Estimation Campus Inc.';
    }

    document.title = pageTitle;

    const metaDescriptionTag = document.querySelector('meta[name="description"]');
    if (metaDescriptionTag) {
      metaDescriptionTag.setAttribute('content', metaDesc);
    }
  }, [currentPath]);

  // Navigate handler with pushState
  const navigate = (path: string) => {
    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Open Quote Modal
  const handleOpenQuote = (serviceSlug?: ServiceId | 'multiple') => {
    if (serviceSlug) {
      setQuoteInitialService(serviceSlug);
    }
    setIsQuoteModalOpen(true);
  };

  // Render current page content
  const renderPage = () => {
    if (currentPath === '/' || currentPath === '') {
      return <HomePage onNavigate={navigate} onOpenQuote={handleOpenQuote} />;
    }

    if (currentPath === '/services') {
      return <ServicesOverviewPage onNavigate={navigate} onOpenQuote={handleOpenQuote} />;
    }

    if (currentPath.startsWith('/services/')) {
      const slug = currentPath.replace('/services/', '');
      return <ServiceDetailPage slug={slug} onNavigate={navigate} onOpenQuote={handleOpenQuote} />;
    }

    if (currentPath === '/projects') {
      return <ProjectsPage onNavigate={navigate} onOpenQuote={handleOpenQuote} />;
    }

    if (currentPath === '/about') {
      return <AboutPage onNavigate={navigate} onOpenQuote={() => handleOpenQuote()} />;
    }

    if (currentPath === '/resources') {
      return <ResourcesPage onNavigate={navigate} onOpenQuote={() => handleOpenQuote()} />;
    }

    if (currentPath.startsWith('/resources/')) {
      const slug = currentPath.replace('/resources/', '');
      return <ResourceDetailPage slug={slug} onNavigate={navigate} onOpenQuote={() => handleOpenQuote()} />;
    }

    if (currentPath === '/contact') {
      return <ContactPage onNavigate={navigate} onOpenQuote={() => handleOpenQuote()} />;
    }

    if (currentPath === '/quote') {
      return <QuotePage onNavigate={navigate} serviceParam={quoteInitialService} />;
    }

    if (currentPath === '/privacy') {
      return <PrivacyPage onNavigate={navigate} />;
    }

    if (currentPath === '/terms') {
      return <TermsPage onNavigate={navigate} />;
    }

    if (currentPath === '/sitemap') {
      return <SitemapPage onNavigate={navigate} />;
    }

    return <NotFoundPage onNavigate={navigate} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800">
      {/* 3-Zone Top Bar */}
      <Navbar 
        currentPath={currentPath} 
        onNavigate={navigate} 
        onOpenQuote={handleOpenQuote} 
      />

      {/* Main View Container */}
      <main className="flex-1">
        {renderPage()}
      </main>

      {/* Corporate Footer */}
      <Footer 
        onNavigate={navigate} 
        onOpenQuote={handleOpenQuote} 
      />

      {/* Fast Quote Overlay Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        initialService={quoteInitialService}
      />
    </div>
  );
}
