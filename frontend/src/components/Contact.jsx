import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, GraduationCap, Send, CheckCircle2, AlertCircle, Loader2, Sparkles, Database } from 'lucide-react';
import { LinkedinIcon, GithubIcon, WhatsAppIcon } from './SocialIcons';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
const WHATSAPP_NUMBER = (import.meta.env.VITE_WHATSAPP_NUMBER || '919075919023').replace(/[^0-9]/g, '');

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    website: '' // Anti-spam honeypot
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);
  const [submittedData, setSubmittedData] = useState(null);
  const [backendHealth, setBackendHealth] = useState(null);

  // Check FastAPI backend health on mount
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/health`)
      .then(res => {
        if (!res.ok) throw new Error('Offline');
        return res.json();
      })
      .then(data => setBackendHealth(data))
      .catch(() => setBackendHealth({ status: 'offline', database_engine: 'local' }));
  }, []);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Please enter your name (at least 2 characters)';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please enter a message of at least 10 characters';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const generateWhatsAppMessage = (data) => {
    const name = data.name?.trim() || '';
    const email = data.email?.trim() || '';
    const subject = data.subject?.trim() || 'Project Inquiry';
    const message = data.message?.trim() || '';

    return `Hello Kanvesh!\nMy name is ${name}.\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}\n\nI would like to contact you regarding this inquiry.`;
  };

  const openWhatsAppChat = (data) => {
    const text = generateWhatsAppMessage(data);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Option 1: Send Message (Saves to PostgreSQL database via FastAPI)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setSubmitResult(null);

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim() || null,
      subject: formData.subject.trim() || null,
      message: formData.message.trim(),
      website: formData.website || null
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const rawText = await response.text();
      let data = null;
      if (rawText && rawText.trim().length > 0) {
        try {
          data = JSON.parse(rawText);
        } catch {
          data = null;
        }
      }

      if (!response.ok) {
        let errorMsg = data?.detail;
        if (!errorMsg) {
          if (response.status === 502 || response.status === 503 || response.status === 504) {
            errorMsg = 'FastAPI backend server is not reachable. Please ensure the backend is running on http://127.0.0.1:8000 (uvicorn backend.main:app --port 8000).';
          } else {
            errorMsg = `Server response error (${response.status}${response.statusText ? ` ${response.statusText}` : ''}). Please check backend server.`;
          }
        }
        throw new Error(errorMsg);
      }

      if (!data) {
        throw new Error('Backend returned an empty response. Please verify FastAPI backend status.');
      }

      setSubmittedData({ ...payload });
      setSubmitResult({
        success: true,
        message: data.message || 'Your message has been saved successfully!',
        contactId: data.contact_id
      });

      // Clear the form fields after successful persistence
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        website: ''
      });
    } catch (err) {
      console.error('Contact submission error:', err);
      setSubmitResult({
        success: false,
        message: err.message || 'Could not connect to FastAPI server. Please check your network or email directly.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Option 2: Contact Me on WhatsApp (Direct click-to-chat without database persistence)
  const handleDirectWhatsApp = (e) => {
    e.preventDefault();

    const errs = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Please enter your name before opening WhatsApp';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address';
    }
    if (!formData.message.trim() || formData.message.trim().length < 5) {
      errs.message = 'Please enter your message before opening WhatsApp';
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    openWhatsAppChat(formData);
  };

  const handleResetForm = () => {
    setSubmitResult(null);
    setSubmittedData(null);
    setErrors({});
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#FAF6F1]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          
          {/* Left Column: Direct Info & Socials */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#9B4B52] font-semibold flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                07 / Connect
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#352923] mt-2">
                Let's build something <span className="text-[#882B34] italic">meaningful.</span>
              </h2>
              <p className="text-base sm:text-lg text-[#78685D] mt-3 leading-relaxed">
                I am actively seeking software engineering internship opportunities, practical development projects, and technical collaborations. Reach out via the form or my direct channels below.
              </p>
            </div>

            {/* Contact Details List */}
            <div className="space-y-3 pt-2">
              
              {/* Email */}
              <div className="bg-[#FAF6F1] p-4 rounded-xl border border-[#A67C64]/20 flex items-center gap-4 hover:border-[#882B34] transition-colors">
                <div className="w-10 h-10 rounded-lg bg-[#EAE0D6] text-[#882B34] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-[#705044] uppercase tracking-wider block font-semibold">
                    Email Address
                  </span>
                  <a
                    href="mailto:kanveshraut9640@gmail.com"
                    className="text-sm font-semibold text-[#882B34] hover:underline"
                  >
                    kanveshraut9640@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone / WhatsApp */}
              <div className="bg-[#FAF6F1] p-4 rounded-xl border border-[#A67C64]/20 flex items-center gap-4 hover:border-[#882B34] transition-colors">
                <div className="w-10 h-10 rounded-lg bg-[#EAE0D6] text-[#705044] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-[#705044] uppercase tracking-wider block font-semibold">
                    Direct Phone / WhatsApp
                  </span>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-[#352923] hover:text-[#882B34]"
                  >
                    +91 9075919023
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="bg-[#FAF6F1] p-4 rounded-xl border border-[#A67C64]/20 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#EAE0D6] text-[#9B4B52] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-[#705044] uppercase tracking-wider block font-semibold">
                    Current Location
                  </span>
                  <span className="text-sm font-medium text-[#352923]">
                    Pune, Maharashtra, India
                  </span>
                </div>
              </div>

              {/* College */}
              <div className="bg-[#FAF6F1] p-4 rounded-xl border border-[#A67C64]/20 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#EAE0D6] text-[#705044] flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-[#705044] uppercase tracking-wider block font-semibold">
                    Institution
                  </span>
                  <span className="text-sm font-medium text-[#352923]">
                    G H Raisoni College of Engineering and Management
                  </span>
                </div>
              </div>

            </div>

            {/* Social Links */}
            <div>
              <span className="font-mono text-[11px] text-[#705044] uppercase tracking-wider block font-semibold mb-3">
                Verified Developer Profiles
              </span>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.linkedin.com/in/kanvesh-raut-2a5050407/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FAF6F1] hover:bg-[#FFFFFF] border border-[#A67C64]/25 text-xs font-semibold text-[#352923] hover:text-[#882B34] transition-all duration-200 shadow-2xs hover:shadow-xs"
                >
                  <LinkedinIcon className="w-4 h-4 text-[#0077B5]" />
                  <span>LinkedIn Profile</span>
                </a>

                <a
                  href="https://github.com/kanveshraut1021-collab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FAF6F1] hover:bg-[#FFFFFF] border border-[#A67C64]/25 text-xs font-semibold text-[#352923] hover:text-[#882B34] transition-all duration-200 shadow-2xs hover:shadow-xs"
                >
                  <GithubIcon className="w-4 h-4 text-[#221714]" />
                  <span>GitHub (@kanveshraut1021-collab)</span>
                </a>
              </div>
            </div>

            {/* Backend Database Status Badge */}
            <div className="bg-[#FAF6F1] p-3 rounded-xl border border-[#A67C64]/25 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${backendHealth?.status === 'healthy' ? 'bg-[#4BB543] animate-pulse' : 'bg-[#E5A83B]'}`} />
                <span className="text-[#705044]">
                  {backendHealth?.status === 'healthy' ? 'FastAPI API & PostgreSQL Online' : 'FastAPI Local Dev Server'}
                </span>
              </div>
              <span className="text-[#882B34] font-semibold flex items-center gap-1">
                <Database className="w-3 h-3" />
                SQLAlchemy
              </span>
            </div>

          </div>

          {/* Right Column: Interactive Form & WhatsApp Options */}
          <div className="lg:col-span-7">
            {submitResult && submitResult.success ? (
              /* Success View */
              <div className="bg-[#FAF6F1] border-2 border-[#A67C64]/25 rounded-2xl p-6 sm:p-8 shadow-xl relative animate-in fade-in duration-300">
                <div className="text-center py-4">
                  <div className="w-16 h-16 rounded-2xl bg-[#EAF7EE] text-[#1B612C] flex items-center justify-center mx-auto mb-4 border border-[#4BB543]/30 shadow-xs">
                    <CheckCircle2 className="w-9 h-9 text-[#2E7D32]" />
                  </div>
                  
                  <span className="font-mono text-xs uppercase tracking-widest text-[#2E7D32] font-semibold block mb-1">
                    Database Record Created
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#352923] mb-2">
                    Your message has been saved successfully!
                  </h3>
                  <p className="text-sm text-[#78685D] max-w-md mx-auto mb-6">
                    Thank you for reaching out, <strong className="text-[#352923]">{submittedData?.name || 'there'}</strong>. Your inquiry has been stored securely in PostgreSQL.
                    {submitResult.contactId && (
                      <span className="block font-mono text-xs text-[#9B4B52] mt-1 font-semibold">
                        Database Message ID: #{submitResult.contactId}
                      </span>
                    )}
                  </p>

                  {/* Section: Would you like to contact me on WhatsApp too? */}
                  <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[#A67C64]/25 max-w-lg mx-auto text-left shadow-xs mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
                      <h4 className="font-serif text-base font-bold text-[#352923]">
                        Would you like to contact me on WhatsApp too?
                      </h4>
                    </div>
                    <p className="text-xs text-[#78685D] mb-4 leading-relaxed">
                      Prefer real-time chat? Click below to open WhatsApp with your message already pre-filled. You can review it before sending.
                    </p>
                    
                    <button
                      type="button"
                      onClick={() => openWhatsAppChat(submittedData)}
                      className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-[#FFFFFF] text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
                    >
                      <WhatsAppIcon className="w-4 h-4 text-[#FFFFFF]" />
                      <span>Contact Me on WhatsApp</span>
                    </button>
                  </div>

                  {/* Reset Form Option */}
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[#78685D] hover:text-[#9B4B52] underline underline-offset-4 transition-colors cursor-pointer"
                  >
                    <span>&larr; Send another message</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Idle / Editing / Error View */
              <div className="bg-[#FAF6F1] border-2 border-[#A67C64]/25 rounded-2xl p-6 sm:p-8 shadow-xl relative">
                
                <div className="pb-4 mb-6 border-b border-[#A67C64]/20 flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#352923]">
                      Send a Message
                    </h3>
                    <p className="text-xs text-[#78685D] mt-0.5">
                      Choose between saving to PostgreSQL database or connecting directly via WhatsApp.
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-[#882B34] text-[#F5EEE7] flex items-center justify-center font-serif text-xs font-bold">
                    KR
                  </div>
                </div>

                {/* Error Banner */}
                {submitResult && !submitResult.success && (
                  <div className="p-4 rounded-xl mb-6 flex items-start gap-3 border bg-[#FDF2F2] border-[#E05252]/40 text-[#9B2C2C]">
                    <AlertCircle className="w-5 h-5 text-[#E05252] shrink-0 mt-0.5" />
                    <div className="text-xs sm:text-sm">
                      <strong className="block font-semibold">
                        Submission Error
                      </strong>
                      <span>{submitResult.message}</span>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  
                  {/* Honeypot field (hidden from genuine users) */}
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                    style={{ display: 'none' }}
                    aria-hidden="true"
                  />

                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-mono font-semibold text-[#705044] mb-1">
                        Your Name <span className="text-[#882B34]">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Alex Morgan"
                        disabled={submitting}
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-[#FFFFFF] border text-sm text-[#352923] placeholder-[#9F8F84] focus:outline-none focus:ring-2 transition-all ${
                          errors.name
                            ? 'border-[#E05252] focus:ring-[#E05252]/30'
                            : 'border-[#A67C64]/30 focus:border-[#882B34] focus:ring-[#882B34]/20'
                        }`}
                      />
                      {errors.name && (
                        <p className="text-[11px] text-[#E05252] mt-1 font-mono">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-mono font-semibold text-[#705044] mb-1">
                        Email Address <span className="text-[#882B34]">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. alex@company.com"
                        disabled={submitting}
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-[#FFFFFF] border text-sm text-[#352923] placeholder-[#9F8F84] focus:outline-none focus:ring-2 transition-all ${
                          errors.email
                            ? 'border-[#E05252] focus:ring-[#E05252]/30'
                            : 'border-[#A67C64]/30 focus:border-[#882B34] focus:ring-[#882B34]/20'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-[11px] text-[#E05252] mt-1 font-mono">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Phone & Subject Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-xs font-mono font-semibold text-[#705044] mb-1">
                        Phone Number <span className="text-[#9F8F84] font-normal">(Optional)</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. +91 9876543210"
                        disabled={submitting}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#A67C64]/30 text-sm text-[#352923] placeholder-[#9F8F84] focus:outline-none focus:border-[#882B34] focus:ring-2 focus:ring-[#882B34]/20 transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-xs font-mono font-semibold text-[#705044] mb-1">
                        Subject <span className="text-[#9F8F84] font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="e.g. Project Inquiry / Collaboration"
                        disabled={submitting}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#A67C64]/30 text-sm text-[#352923] placeholder-[#9F8F84] focus:outline-none focus:border-[#882B34] focus:ring-2 focus:ring-[#882B34]/20 transition-all"
                      />
                    </div>
                  </div>

                  {/* Message Body */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-mono font-semibold text-[#705044] mb-1">
                      Your Message <span className="text-[#882B34]">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Hello Kanvesh, I saw your portfolio and project showcase and would love to connect regarding..."
                      disabled={submitting}
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-[#FFFFFF] border text-sm text-[#352923] placeholder-[#9F8F84] focus:outline-none focus:ring-2 transition-all resize-y ${
                        errors.message
                          ? 'border-[#E05252] focus:ring-[#E05252]/30'
                          : 'border-[#A67C64]/30 focus:border-[#882B34] focus:ring-[#882B34]/20'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-[11px] text-[#E05252] mt-1 font-mono">{errors.message}</p>
                    )}
                  </div>

                  {/* Two Contact Options */}
                  <div className="pt-2 space-y-3">
                    <div className="flex flex-col sm:flex-row gap-3">
                      
                      {/* Option 1: Send Message (PostgreSQL) */}
                      <button
                        type="submit"
                        disabled={submitting}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#9B4B52] hover:bg-[#705044] text-[#F5EEE7] text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Saving to Database...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </button>

                      {/* Option 2: Contact Me on WhatsApp (Direct) */}
                      <button
                        type="button"
                        onClick={handleDirectWhatsApp}
                        disabled={submitting}
                        className="inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl bg-[#FFFFFF] hover:bg-[#F2FAF4] border-2 border-[#25D366]/40 hover:border-[#25D366] text-[#1E7E34] hover:text-[#155724] text-sm font-semibold transition-all duration-200 shadow-2xs hover:shadow-xs cursor-pointer"
                      >
                        <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                        <span>Contact Me on WhatsApp</span>
                      </button>

                    </div>

                    {/* Explanatory notes */}
                    <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#78685D] font-mono gap-1 pt-1">
                      <span>• Send Message saves to PostgreSQL database.</span>
                      <span>• WhatsApp opens chat directly without saving to database.</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-center text-[#78685D] font-mono mt-3">
                    Validated with Pydantic &amp; stored securely in PostgreSQL via SQLAlchemy.
                  </p>

                </form>

              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}

