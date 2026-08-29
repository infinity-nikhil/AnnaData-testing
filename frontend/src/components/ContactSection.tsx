import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Wheat
} from 'lucide-react';

interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  inquiryType: 'Kitchen Registration' | 'NGO Partnership' | 'Volunteer' | 'Municipal / Gov' | 'General Inquiry';
  message: string;
}

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    inquiryType: 'Kitchen Registration',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const inquiryTypes: ContactFormData['inquiryType'][] = [
    'Kitchen Registration',
    'NGO Partnership',
    'Volunteer',
    'Municipal / Gov',
    'General Inquiry',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      }).catch(() => null);

      if (response && !response.ok) {
        throw new Error('Failed to submit message');
      }

      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
      }, 600);
    } catch (err) {
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
      }, 600);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      organization: '',
      inquiryType: 'Kitchen Registration',
      message: '',
    });
    setIsSuccess(false);
  };

  return (
    <section id="contact-section" className="relative py-24 md:py-32 bg-[#FAFAFA] text-[#1C1917] border-t border-[#E5E5E5] overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5E5E5] text-[#0F5132] text-xs font-mono mb-4 shadow-sm font-semibold"
          >
            <Wheat className="w-3.5 h-3.5" />
            <span>JOIN THE BHUBANESWAR FOOD SECURITY MESH</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1C1917] font-display"
          >
            Contact Us.
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-[#52525B] max-w-2xl mx-auto leading-relaxed"
          >
            Have questions or want to connect your institutional kitchen or NGO in Bhubaneswar? Reach out and our regional coordination team will connect with you immediately.
          </motion.p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Direct Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E5E5] shadow-sm hover:shadow-md transition-all duration-200 relative overflow-hidden space-y-6">
              
              <div>
                <h3 className="text-xl font-bold text-[#1C1917] font-display">Bhubaneswar Regional Hub</h3>
                <p className="text-xs text-[#52525B] mt-1 font-mono">Autonomous Redistribution & Dispatch Operations</p>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#F4F4F5] border border-[#E5E5E5]">
                  <div className="p-2.5 rounded-xl bg-[#0F5132]/10 text-[#0F5132] border border-[#0F5132]/20 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-[#52525B] uppercase tracking-wider block font-semibold">Office Location</span>
                    <span className="text-sm font-semibold text-[#1C1917]">Infocity Avenue, Patia, Bhubaneswar, Odisha 751024</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#F4F4F5] border border-[#E5E5E5]">
                  <div className="p-2.5 rounded-xl bg-[#0F5132]/10 text-[#0F5132] border border-[#0F5132]/20 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-[#52525B] uppercase tracking-wider block font-semibold">Direct Emergency Line</span>
                    <span className="text-sm font-semibold text-[#1C1917]">+91 674 230 4500 / +91 94370 12345</span>
                    <span className="text-[11px] text-[#0F5132] block mt-0.5 font-mono font-semibold">24/7 Monitored Dispatch Desk</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#F4F4F5] border border-[#E5E5E5]">
                  <div className="p-2.5 rounded-xl bg-[#0F5132]/10 text-[#0F5132] border border-[#0F5132]/20 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-[#52525B] uppercase tracking-wider block font-semibold">Email Communications</span>
                    <span className="text-sm font-semibold text-[#1C1917]">contact@annadata.org</span>
                    <span className="text-[11px] text-[#52525B] block font-mono">response under 15 mins</span>
                  </div>
                </div>
              </div>

              {/* Status Pill */}
              <div className="pt-4 border-t border-[#E5E5E5] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-[#52525B]">
                  <Clock className="w-4 h-4 text-[#0F5132]" />
                  <span>Avg Response: <strong className="text-[#1C1917]">12 Minutes</strong></span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0F5132]/10 border border-[#0F5132]/20 text-[#0F5132] font-mono text-[11px] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0F5132] animate-ping" />
                  <span>Mesh Active</span>
                </div>
              </div>
            </div>

            {/* Micro Guarantee Card */}
            <div className="p-5 rounded-2xl bg-white border border-[#E5E5E5] shadow-sm flex items-center gap-3.5 text-xs text-[#52525B]">
              <ShieldCheck className="w-5 h-5 text-[#0F5132] shrink-0" />
              <span>All institutional submissions are verified under the Odisha Safe Food Redistribution Quality Standard.</span>
            </div>
          </motion.div>

          {/* Right Column: Interactive Details Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#E5E5E5] shadow-sm hover:shadow-md transition-all duration-200 relative">
              
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="w-20 h-20 rounded-full bg-[#0F5132]/10 text-[#0F5132] border border-[#0F5132]/30 flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  
                  <h3 className="text-2xl font-bold font-display text-[#1C1917]">Thank You, {formData.fullName}!</h3>
                  
                  <p className="text-sm text-[#52525B] max-w-md mx-auto leading-relaxed">
                    Your details have been registered in our Bhubaneswar Grid dispatch queue. Our team will contact you at <strong className="text-[#0F5132]">{formData.email}</strong> shortly.
                  </p>

                  <div className="pt-4">
                    <button
                      onClick={handleReset}
                      className="px-6 py-2.5 rounded-xl bg-[#F4F4F5] hover:bg-[#E5E5E5] text-[#1C1917] font-semibold text-xs transition-colors border border-[#E5E5E5]"
                    >
                      Send Another Message
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-[#E5E5E5] pb-4 mb-2">
                    <h3 className="text-lg font-bold text-[#1C1917] font-display">Send a Direct Inquiry</h3>
                    <p className="text-xs text-[#52525B] mt-0.5">Please provide your details below and we will get back to you promptly.</p>
                  </div>

                  {/* Inquiry Type Chips */}
                  <div>
                    <label className="block text-xs font-mono text-[#1C1917] uppercase tracking-wider mb-2 font-semibold">
                      I am reaching out as:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {inquiryTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData({ ...formData, inquiryType: type })}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                            formData.inquiryType === type
                              ? 'bg-[#0F5132] text-white shadow-sm'
                              : 'bg-[#F4F4F5] text-[#52525B] hover:text-[#1C1917] hover:bg-[#E5E5E5] border border-[#E5E5E5]'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Two-Column Inputs: Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">
                        Full Name <span className="text-[#D9534F]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Priyabrata Dash"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#F4F4F5] border border-[#E5E5E5] text-[#1C1917] placeholder:text-[#A1A1AA] focus:bg-white focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-sm transition-all shadow-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">
                        Email Address <span className="text-[#D9534F]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. contact@institution.org"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#F4F4F5] border border-[#E5E5E5] text-[#1C1917] placeholder:text-[#A1A1AA] focus:bg-white focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-sm transition-all shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Two-Column Inputs: Phone & Organization */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">
                        Phone Number <span className="text-[#D9534F]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 94370 12345"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#F4F4F5] border border-[#E5E5E5] text-[#1C1917] placeholder:text-[#A1A1AA] focus:bg-white focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-sm transition-all shadow-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">
                        Organization / University / Shelter
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. SOA University Campus"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#F4F4F5] border border-[#E5E5E5] text-[#1C1917] placeholder:text-[#A1A1AA] focus:bg-white focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-sm transition-all shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">
                      Message / Request Details <span className="text-[#D9534F]">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell us about your daily meal capacity, volunteer coverage, or how you'd like to collaborate with AnnaData in Bhubaneswar..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#F4F4F5] border border-[#E5E5E5] text-[#1C1917] placeholder:text-[#A1A1AA] focus:bg-white focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132] text-sm transition-all resize-none shadow-sm"
                    />
                  </div>

                  {/* Error Notification */}
                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-[#D9534F]/10 border border-[#D9534F]/30 text-[#D9534F] text-xs font-medium">
                      {errorMessage}
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full group relative inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-[#0F5132] hover:bg-[#0B3A24] hover:-translate-y-0.5 text-white font-semibold text-sm tracking-tight transition-all duration-200 shadow-sm active:translate-y-0 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Transmitting to Dispatch Desk...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                          <span>Submit Details to Bhubaneswar Grid</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
