import React, { useState, useRef } from 'react';
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Lock, 
  Clock, 
  UploadCloud, 
  FileText, 
  X, 
  Paperclip,
  Check,
  ShieldCheck
} from 'lucide-react';
import { QuoteFormData, ServiceId } from '../types';

interface QuoteFormProps {
  initialService?: ServiceId | 'multiple';
  onSuccess?: () => void;
  isModal?: boolean;
}

const ALLOWED_EXTENSIONS = ['pdf', 'dwg', 'dxf', 'xlsx', 'xls', 'docx', 'doc', 'jpg', 'jpeg', 'png', 'zip'];
const MAX_TOTAL_SIZE = 15 * 1024 * 1024; // 15MB

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

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Calculate total attachment size
  const totalAttachmentBytes = selectedFiles.reduce((acc, f) => acc + f.size, 0);
  const totalAttachmentMB = (totalAttachmentBytes / (1024 * 1024)).toFixed(2);
  const isOverSizeLimit = totalAttachmentBytes > MAX_TOTAL_SIZE;

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const incomingFiles = Array.from(e.target.files);
    const validFiles: File[] = [];
    const invalidNames: string[] = [];

    incomingFiles.forEach((file) => {
      const ext = file.name.split('.').pop()?.toLowerCase() || '';
      if (ALLOWED_EXTENSIONS.includes(ext)) {
        validFiles.push(file);
      } else {
        invalidNames.push(file.name);
      }
    });

    if (invalidNames.length > 0) {
      setErrors((prev) => ({
        ...prev,
        files: `Unsupported file type: ${invalidNames.join(', ')}. Please upload PDF, DWG, DXF, XLSX, DOCX, JPG, PNG, or ZIP.`
      }));
    } else {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.files;
        return copy;
      });
    }

    // Combine without duplicates (by filename and size)
    const combined = [...selectedFiles];
    validFiles.forEach((vf) => {
      if (!combined.some((cf) => cf.name === vf.name && cf.size === vf.size)) {
        if (combined.length < 5) {
          combined.push(vf);
        }
      }
    });

    setSelectedFiles(combined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

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
    if (isOverSizeLimit) {
      newErrors.files = `Total attachment size (${totalAttachmentMB} MB) exceeds the 15MB limit. Please upload via a cloud link (Google Drive / OneDrive / Dropbox) instead.`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError(null);

    if (!validate()) {
      // Scroll to top of form if errors
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('fullName', formData.fullName.trim());
      formDataToSend.append('companyName', formData.companyName.trim());
      formDataToSend.append('email', formData.email.trim());
      formDataToSend.append('phone', formData.phone.trim());
      formDataToSend.append('projectLocation', formData.projectLocation.trim());
      formDataToSend.append('serviceRequired', formData.serviceRequired);
      formDataToSend.append('projectType', formData.projectType);
      formDataToSend.append('timeline', formData.timeline);
      formDataToSend.append('projectDescription', formData.projectDescription.trim());
      formDataToSend.append('fileLink', formData.fileLink.trim());
      formDataToSend.append('website_url', honeypot); // Honeypot spam trap

      // Append files
      selectedFiles.forEach((file) => {
        formDataToSend.append('attachments', file, file.name);
      });

      const response = await fetch('/api/quote', {
        method: 'POST',
        body: formDataToSend
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setReferenceId(data.referenceId || `EC-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`);
        setIsSubmitted(true);
        setSubmissionError(null);
        if (onSuccess) onSuccess();
      } else {
        setSubmissionError(
          data.message || 
          "We couldn't submit your inquiry at this time. Please try again or email us directly at info@estimationcampusinc.com."
        );
      }
    } catch (err: any) {
      console.error('Submission request failed:', err);
      setSubmissionError(
        "We couldn't submit your inquiry at this time. Please try again or email us directly at info@estimationcampusinc.com."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-sm text-center animate-in fade-in duration-300">
        <div className="w-16 h-16 bg-blue-50 text-[#0D47A1] rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner">
          <CheckCircle2 className="w-9 h-9 text-[#0D47A1]" />
        </div>
        
        {/* Exact required confirmation heading & message */}
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Inquiry Submitted Successfully
        </h3>
        
        <p className="text-base text-slate-700 mt-3 max-w-xl mx-auto leading-relaxed font-medium">
          Thank you for contacting Estimation Campus Inc. Your inquiry has been submitted successfully. Our team will review your information and get back to you.
        </p>

        <div className="my-6 p-5 bg-slate-50 border border-slate-200 rounded-xl text-left max-w-lg mx-auto space-y-2.5">
          <div className="flex justify-between items-center text-xs text-slate-500 pb-2 border-b border-slate-200">
            <span className="font-medium">Reference Tracking ID:</span>
            <span className="font-mono font-bold text-[#0D47A1] text-sm">{referenceId}</span>
          </div>
          <div className="flex justify-between text-xs text-slate-500">
            <span>Official Recipient:</span>
            <span className="font-semibold text-slate-800">info@estimationcampusinc.com</span>
          </div>
          <div className="flex justify-between text-xs text-slate-500">
            <span>Primary Service:</span>
            <span className="font-semibold text-slate-800 capitalize">{formData.serviceRequired.replace('-', ' ')}</span>
          </div>
          <div className="flex justify-between text-xs text-slate-500">
            <span>Contact Email:</span>
            <span className="font-semibold text-slate-800">{formData.email}</span>
          </div>
          <div className="flex justify-between text-xs text-slate-500">
            <span>Attached Files:</span>
            <span className="font-semibold text-slate-800">
              {selectedFiles.length > 0 ? `${selectedFiles.length} file(s) (${totalAttachmentMB} MB)` : 'Cloud link / none'}
            </span>
          </div>
          <div className="flex justify-between text-xs text-slate-500 pt-1">
            <span>Proposal Response Time:</span>
            <span className="font-semibold text-emerald-700">24 to 48 Business Hours</span>
          </div>
        </div>

        <div className="text-sm text-slate-600 max-w-md mx-auto space-y-2 leading-relaxed">
          <p>
            If you need to provide additional large drawing sets (over 50MB) or architectural addenda, you may email them directly to{' '}
            <a href={`mailto:info@estimationcampusinc.com?subject=Additional Plans - ${referenceId}`} className="font-semibold text-[#0D47A1] underline">
              info@estimationcampusinc.com
            </a>{' '}
            citing reference number <strong className="font-mono text-slate-900">{referenceId}</strong>.
          </p>
        </div>

        <div className="mt-8 pt-4 border-t border-slate-100">
          <button
            onClick={() => {
              setIsSubmitted(false);
              setSelectedFiles([]);
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
            className="text-xs font-bold text-[#0D47A1] hover:text-[#1976D2] hover:underline uppercase tracking-wider"
          >
            Submit Another Project Scope
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* Honeypot field (hidden from real users, caught by spam bots) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website_url_check">Leave this field empty</label>
        <input
          id="website_url_check"
          type="text"
          name="website_url"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {/* Submission Error Alert */}
      {submissionError && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-3 animate-in fade-in">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold">{submissionError}</p>
            <p className="text-xs text-red-700">
              Direct line: <a href="tel:+17138933927" className="font-bold underline">+1 713 893 3927</a> | Email: <a href="mailto:info@estimationcampusinc.com" className="font-bold underline">info@estimationcampusinc.com</a>
            </p>
          </div>
        </div>
      )}

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
            placeholder="(713) 893-3927"
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
            placeholder="Houston, TX"
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

      {/* Direct File Upload & Project Link */}
      <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <Paperclip className="w-4 h-4 text-[#0D47A1]" />
              <span>Attach Project Drawings & Specifications (Optional)</span>
            </label>
            <span className="text-xs text-slate-500 font-medium">Max 15MB total</span>
          </div>

          <div className="flex items-center gap-3">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileChange}
              accept=".pdf,.dwg,.dxf,.xlsx,.xls,.docx,.doc,.jpg,.jpeg,.png,.zip"
              className="hidden"
              id="file-attachment-input"
            />
            <label
              htmlFor="file-attachment-input"
              className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 hover:border-[#0D47A1] hover:bg-blue-50/50 rounded-lg text-xs font-bold text-slate-700 transition-colors shadow-sm"
            >
              <UploadCloud className="w-4 h-4 text-[#0D47A1]" />
              <span>Choose Files (PDF, DWG, DXF, XLSX, ZIP)</span>
            </label>

            {selectedFiles.length > 0 && (
              <span className="text-xs text-slate-600 font-medium">
                {selectedFiles.length} file{selectedFiles.length > 1 ? 's' : ''} ({totalAttachmentMB} MB)
              </span>
            )}
          </div>

          {errors.files && (
            <p className="text-xs text-red-500 mt-2 font-medium">{errors.files}</p>
          )}

          {/* Attached Files List */}
          {selectedFiles.length > 0 && (
            <div className="mt-3 space-y-1.5 max-h-40 overflow-y-auto pr-1">
              {selectedFiles.map((file, idx) => (
                <div
                  key={`${file.name}-${idx}`}
                  className="flex items-center justify-between p-2 bg-white rounded-lg border border-slate-200 text-xs text-slate-700"
                >
                  <div className="flex items-center gap-2 truncate pr-2">
                    <FileText className="w-3.5 h-3.5 text-[#0D47A1] shrink-0" />
                    <span className="truncate font-medium">{file.name}</span>
                    <span className="text-slate-400 shrink-0">({(file.size / (1024 * 1024)).toFixed(2)} MB)</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(idx)}
                    className="p-1 text-slate-400 hover:text-red-500 rounded transition-colors"
                    aria-label={`Remove ${file.name}`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cloud Link for Large Sets */}
        <div className="pt-2 border-t border-slate-200/80">
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Or Share Cloud Link (Google Drive / OneDrive / Dropbox / Box)
          </label>
          <div className="relative">
            <input
              type="url"
              value={formData.fileLink}
              onChange={(e) => setFormData({ ...formData, fileLink: e.target.value })}
              placeholder="https://drive.google.com/... or Dropbox / OneDrive / Box link"
              className="w-full pl-9 pr-4 py-2.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#0D47A1]"
            />
            <UploadCloud className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Recommended for large plan sets over 15MB. All project documents are treated with strict confidentiality.
          </p>
        </div>
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
              <span>Transmitting Inquiry & Attachments to Estimation Campus...</span>
            </>
          ) : (
            <>
              <span>Submit Project Scope & Request Free Proposal</span>
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
