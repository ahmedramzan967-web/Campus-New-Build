export type ServiceId = 
  | 'permit-drawings'
  | 'construction-estimating'
  | 'project-scheduling'
  | '3d-renderings'
  | 'shop-drawings';

export interface ServiceItem {
  id: ServiceId;
  slug: string;
  name: string;
  shortDescription: string;
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  heroImage: string;
  keyOfferings: string[];
  deliverables: string[];
  targetAudience: string[];
  projectTypes: string[];
  processSteps: {
    title: string;
    description: string;
  }[];
  benefits: {
    title: string;
    description: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: ServiceId;
  categoryName: string;
  location: string;
  scopeSummary: string;
  deliverableType: string;
  image: string;
  details: string[];
}

export interface ResourceArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishDate: string;
  content: string[];
  checklist?: string[];
}

export interface QuoteFormData {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  projectLocation: string;
  serviceRequired: ServiceId | 'multiple';
  projectType: string;
  timeline: string;
  projectDescription: string;
  fileLink: string;
  termsAccepted: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  service: string;
  message: string;
}
