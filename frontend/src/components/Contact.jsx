import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, GraduationCap, Send, CheckCircle2, AlertCircle, Loader2, Sparkles, Database } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from './SocialIcons';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);
  const [backendHealth, setBackendHealth] = useState(null);

  // Check FastAPI backend health on mount
  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
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
    if (!formData.subject.trim() || formData.subject.trim().length < 2) {
      errs.subject = 'Please enter a subject topic';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setSubmitResult(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || null,
          subject: formData.subject.trim(),
          message: formData.message.trim()
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Failed to submit form to backend');
      }

      setSubmitResult({
        success: true,
        message: data.message || 'Your message has been successfully stored in our database!',
        contactId: data.contact_id
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
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

              {/* Phone */}
              <div className="bg-[#FAF6F1] p-4 rounded-xl border border-[#A67C64]/20 flex items-center gap-4 hover:border-[#882B34] transition-colors">
                <div className="w-10 h-10 rounded-lg bg-[#EAE0D6] text-[#705044] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-[#705044] uppercase tracking-wider block font-semibold">
                    Direct Phone / WhatsApp
                  </span>
                  <a
                    href="tel:+919075919023"
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

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#FAF6F1] border-2 border-[#A67C64]/25 rounded-2xl p-6 sm:p-8 shadow-xl relative">
              
              <div className="pb-4 mb-6 border-b border-[#A67C64]/20 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#352923]">
                    Send a Message
                  </h3>
                  <p className="text-xs text-[#78685D] mt-0.5">
                    Messages are validated via Pydantic and persisted directly to PostgreSQL.
                  </p>
                </div>
                <div className="w-8 h-8 rounded-lg bg-[#882B34] text-[#F5EEE7] flex items-center justify-center font-serif text-xs font-bold">
                  KR
                </div>
              </div>

              {/* Feedback Alert if submitted */}
              {submitResult && (
                <div
                  className={`p-4 rounded-xl mb-6 flex items-start gap-3 border ${
                    submitResult.success
                      ? 'bg-[#EAF7EE] border-[#4BB543]/40 text-[#1B612C]'
                      : 'bg-[#FDF2F2] border-[#E05252]/40 text-[#9B2C2C]'
                  }`}
                >
                  {submitResult.success ? (
                    <CheckCircle2 className="w-5 h-5 text-[#4BB543] shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-[#E05252] shrink-0 mt-0.5" />
                  )}
                  <div className="text-xs sm:text-sm">
                    <strong className="block font-semibold">
                      {submitResult.success ? 'Message Delivered!' : 'Submission Notice'}
                    </strong>
                    <span>{submitResult.message}</span>
                    {submitResult.contactId && (
                      <span className="block font-mono text-[11px] text-[#78685D] mt-1">
                        Database Message Reference ID: #{submitResult.contactId}
                      </span>
                    )}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                
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
                      Subject <span className="text-[#882B34]">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Internship Inquiry / Web Project"
                      disabled={submitting}
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-[#FFFFFF] border text-sm text-[#352923] placeholder-[#9F8F84] focus:outline-none focus:ring-2 transition-all ${
                        errors.subject
                          ? 'border-[#E05252] focus:ring-[#E05252]/30'
                          : 'border-[#A67C64]/30 focus:border-[#882B34] focus:ring-[#882B34]/20'
                      }`}
                    />
                    {errors.subject && (
                      <p className="text-[11px] text-[#E05252] mt-1 font-mono">{errors.subject}</p>
                    )}
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

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#9B4B52] hover:bg-[#705044] text-[#F5EEE7] text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Writing to Database...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message to Kanvesh</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-[#78685D] font-mono mt-2">
                  Protected with Pydantic validation &amp; SQLAlchemy PostgreSQL storage.
                </p>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
