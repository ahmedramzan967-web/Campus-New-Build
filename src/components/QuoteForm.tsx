import React, { useState } from 'react';
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Lock, 
  FileCheck, 
  Clock, 
  UploadCloud,
  ExternalLink
} from 'lucide-react';
import { QuoteFormData, ServiceId } from '../types';

interface QuoteFormProps {
  initialService?: ServiceId | 'multiple';
  onSuccess?: () => void;
  isModal?: boolean;
}

export const QuoteForm: React.FC<QuoteFormProps> = ({ 
  initialService = 'permit-drawings', 
  onSuccess,
  isModal = false 
}) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    projectLocation: '',
    serviceRequired: initialService,
    projectType: 'Commercial',
    timeline: 'Within 1-2 weeks',
    projectDescription: '',
    fileLink: '',
    termsAccepted: true
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Please provide a valid 10-digit phone number';
    }
    if (!formData.projectLocation.trim()) newErrors.projectLocation = 'City and State are required';
    if (!formData.projectDescription.trim() || formData.projectDescription.length < 15) {
      newErrors.projectDescription = 'Please provide a brief description of the scope (min 15 characters)';
    }
    if (!formData.termsAccepted) {
      newErrors.terms = 'Please accept the terms to submit your project requirements';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate real secure API submission
    setTimeout(() => {
      setIsSubmitting(false);
      const generatedRef = `EC-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
      setReferenceId(generatedRef);
      setIsSubmitted(true);
      if (onSuccess) onSuccess();
    }, 700);
  };

  if (isSubmitted) {
    return (
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center">
        <div className="w-16 h-16 bg-blue-50 text-[#0D47A1] rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-[#0D47A1]" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900">
          Quote Request Received
        </h3>
        <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto">
          Thank you for providing your project details. Our preconstruction coordination team is reviewing your scope.
        </p>

        <div className="my-6 p-4 bg-slate-50 border border-slate-200 rounded-xl text-left max-w-md mx-auto space-y-2">
          <div className="flex justify-between text-xs text-slate-500">
            <span>Reference Tracking Number:</span>
            <span className="font-mono font-bold text-slate-900">{referenceId}</span>
          </div>
          <div className="flex justify-between text-xs text-slate-500">
            <span>Service Scope:</span>
            <span className="font-semibold text-slate-800 capitalize">{formData.serviceRequired.replace('-', ' ')}</span>
          </div>
          <div className="flex justify-between text-xs text-slate-500">
            <span>Estimated Proposal Turnaround:</span>
            <span className="font-semibold text-slate-800">24 to 48 Hours</span>
          </div>
        </div>

        <div className="text-sm text-slate-600 max-w-md mx-auto space-y-1.5 leading-relaxed">
          <p>A confirmation email has been logged to <strong className="text-slate-900">{formData.email}</strong>.</p>
          <p>If you have additional large plan sets (over 50MB), you can email them directly to <a href="mailto:info@estimationcampusinc.com" className="font-semibold text-[#0D47A1] underline">info@estimationcampusinc.com</a> with your reference number.</p>
        </div>

        <div className="mt-8">
          <button
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                fullName: '',
                companyName: '',
                email: '',
                phone: '',
                projectLocation: '',
                serviceRequired: initialService,
                projectType: 'Commercial',
                timeline: 'Within 1-2 weeks',
                projectDescription: '',
                fileLink: '',
                termsAccepted: true
              });
            }}
            className="text-xs font-semibold text-[#0D47A1] hover:underline"
          >
            Submit Another Project Scope
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* Service Selection */}
      <div>
        <label className="block text-sm font-bold text-slate-800 uppercase tracking-wider mb-2.5">
          Service Required <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {[
            { id: 'permit-drawings', label: 'Permit Support, Design & Drawings' },
            { id: 'construction-estimating', label: 'Construction Estimating & Takeoffs' },
            { id: 'project-scheduling', label: 'Project Scheduling (CPM)' },
            { id: '3d-renderings', label: '3D Renderings & Walkthroughs' },
            { id: 'shop-drawings', label: 'Shop Drawings & As-Builts' },
            { id: 'multiple', label: 'Multiple Services / Comprehensive' }
          ].map((srv) => (
            <label
              key={srv.id}
              className={`flex items-center gap-3 p-3.5 rounded-lg border text-sm font-medium cursor-pointer transition-colors ${
                formData.serviceRequired === srv.id 
                  ? 'bg-blue-50/70 border-[#0D47A1] text-[#0D47A1] font-semibold' 
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <input
                type="radio"
                name="serviceRequired"
                value={srv.id}
                checked={formData.serviceRequired === srv.id}
                onChange={() => setFormData({ ...formData, serviceRequired: srv.id as any })}
                className="w-4 h-4 text-[#0D47A1] focus:ring-[#0D47A1]"
              />
              <span>{srv.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Row 1: Contact Name & Company */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-slate-800 mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            placeholder="John Miller"
            className={`w-full px-4 py-3 text-sm rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-[#0D47A1] ${
              errors.fullName ? 'border-red-500' : 'border-slate-300'
            }`}
          />
          {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-800 mb-1.5">
            Company Name
          </label>
          <input
            type="text"
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            placeholder="Apex Builders LLC"
            className="w-full px-4 py-3 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#0D47A1]"
          />
        </div>
      </div>

      {/* Row 2: Email & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-slate-800 mb-1.5">
            Work Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="john@apexbuilders.com"
            className={`w-full px-4 py-3 text-sm rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-[#0D47A1] ${
              errors.email ? 'border-red-500' : 'border-slate-300'
            }`}
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-800 mb-1.5">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="(555) 123-4567"
            className={`w-full px-4 py-3 text-sm rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-[#0D47A1] ${
              errors.phone ? 'border-red-500' : 'border-slate-300'
            }`}
          />
          {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
        </div>
      </div>

      {/* Row 3: Location, Project Type & Timeline */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-bold text-slate-800 mb-1.5">
            Project Location <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.projectLocation}
            onChange={(e) => setFormData({ ...formData, projectLocation: e.target.value })}
            placeholder="Dallas, TX"
            className={`w-full px-4 py-3 text-sm rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-[#0D47A1] ${
              errors.projectLocation ? 'border-red-500' : 'border-slate-300'
            }`}
          />
          {errors.projectLocation && <p className="text-xs text-red-500 mt-1">{errors.projectLocation}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-800 mb-1.5">
            Project Type
          </label>
          <select
            value={formData.projectType}
            onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
            className="w-full px-4 py-3 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#0D47A1]"
          >
            <option value="Commercial">Commercial / Retail</option>
            <option value="Residential">Residential / Custom Home</option>
            <option value="Multi-Family">Multi-Family Apartments</option>
            <option value="Industrial">Industrial & Warehouse</option>
            <option value="Institutional">Healthcare & Institutional</option>
            <option value="Civil">Civil / Site Development</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-800 mb-1.5">
            Target Timeline
          </label>
          <select
            value={formData.timeline}
            onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
            className="w-full px-4 py-3 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#0D47A1]"
          >
            <option value="Urgent (24-48 Hours)">Urgent (24–48 Hours)</option>
            <option value="Within 1-2 weeks">Standard (1–2 weeks)</option>
            <option value="Within 1 month">Planning (Within 1 month)</option>
            <option value="Budgeting Stage">Conceptual / Early Budget</option>
          </select>
        </div>
      </div>

      {/* Project Description */}
      <div>
        <label className="block text-sm font-bold text-slate-800 mb-1.5">
          Project Description & Scope Details <span className="text-red-500">*</span>
        </label>
        <textarea
          rows={3}
          value={formData.projectDescription}
          onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
          placeholder="Please describe project square footage, trades needed, drawing status, or specific municipal permit requirements..."
          className={`w-full px-4 py-3 text-sm rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-[#0D47A1] leading-relaxed ${
            errors.projectDescription ? 'border-red-500' : 'border-slate-300'
          }`}
        />
        {errors.projectDescription && <p className="text-xs text-red-500 mt-1">{errors.projectDescription}</p>}
      </div>

      {/* Secure Plan Link */}
      <div>
        <label className="block text-sm font-bold text-slate-800 mb-1.5">
          Project Files / Blueprint Link (Optional)
        </label>
        <div className="relative">
          <input
            type="url"
            value={formData.fileLink}
            onChange={(e) => setFormData({ ...formData, fileLink: e.target.value })}
            placeholder="https://drive.google.com/... or Dropbox / OneDrive / Box link"
            className="w-full pl-10 pr-4 py-3 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#0D47A1]"
          />
          <UploadCloud className="w-5 h-5 text-slate-400 absolute left-3 top-3.5" />
        </div>
        <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
          Share a secure link to your architectural drawings, specifications, or addenda. You can also email files directly after submission.
        </p>
      </div>

      {/* Privacy & Terms Checkbox */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.termsAccepted}
            onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
            className="w-4 h-4 mt-1 text-[#0D47A1] rounded border-slate-300 focus:ring-[#0D47A1]"
          />
          <span className="text-sm text-slate-700 leading-relaxed">
            I agree that Estimation Campus Inc. may review my submitted materials to prepare a project scope proposal and contact me regarding this request. We never sell or share confidential construction documents.
          </span>
        </label>
        {errors.terms && <p className="text-xs text-red-500 mt-1">{errors.terms}</p>}
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 px-6 rounded-lg text-sm font-bold text-white bg-[#0D47A1] hover:bg-[#1976D2] shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Analyzing Scope & Preparing Proposal Request...</span>
            </>
          ) : (
            <>
              <span>Request Free Scope Review & Quote</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      <div className="flex items-center justify-center gap-4 text-xs text-slate-400 pt-1">
        <div className="flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5" />
          <span>Strict Confidentiality Guaranteed</span>
        </div>
        <span>·</span>
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          <span>24–48 Hour Proposal Guarantee</span>
        </div>
      </div>

    </form>
  );
};
