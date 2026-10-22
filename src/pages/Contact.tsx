import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock, Send, Hash, Building2 } from 'lucide-react';
import { getContact, SCHOOL, STAFF } from '../lib/store';

interface ContactInfo {
  address: string;
  postal: string;
  phone: string;
  email: string;
  emis?: string;
  monThu: string;
  friday: string;
}

export const Contact = () => {
  const [info, setInfo] = useState<ContactInfo>(getContact());

  useEffect(() => {
    setInfo(getContact());
  }, []);

  return (
    <div className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="section-title">Contact Us</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <h2 className="text-2xl font-bold text-[#1E3A5F] mb-8">Get in Touch</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#EBF5FF] text-[#DAA520] rounded-xl">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Physical Address</h3>
                  <p className="text-gray-600">{info.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#EBF5FF] text-[#DAA520] rounded-xl">
                  <Building2 size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Postal Address</h3>
                  <p className="text-gray-600">{info.postal}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#EBF5FF] text-[#DAA520] rounded-xl">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Telephone</h3>
                  <p className="text-gray-600">{info.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#EBF5FF] text-[#DAA520] rounded-xl">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Email</h3>
                  <p className="text-gray-600 break-words">{info.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#EBF5FF] text-[#DAA520] rounded-xl">
                  <Hash size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">EMIS Number</h3>
                  <p className="text-gray-600">{info.emis || SCHOOL.emis}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#EBF5FF] text-[#DAA520] rounded-xl">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Office Hours</h4>
                  <p className="text-gray-600">Monday - Thursday: {info.monThu}</p>
                  <p className="text-gray-600">Friday: {info.friday}</p>
                </div>
              </div>
            </div>

            {/* Leadership contacts */}
            <div className="mt-10">
              <h2 className="text-2xl font-bold text-[#1E3A5F] mb-6">School Management</h2>
              <div className="space-y-3">
                {STAFF.leadership.map(({ name, role, cell }) => (
                  <div
                    key={role}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 rounded-xl border border-gray-100 bg-gray-50 px-5 py-4"
                  >
                    <div>
                      <p className="font-bold text-gray-900">{name}</p>
                      <p className="text-sm text-gray-500">{role}</p>
                    </div>
                    <a href={`tel:${cell.replace(/\s/g, '')}`} className="text-sm font-semibold text-[#1E3A5F]">
                      {cell}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="bg-gray-50 p-6 sm:p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm"
          >
            <h2 className="text-2xl font-bold text-[#1E3A5F] mb-8">Send us a Message</h2>
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Full Name</label>
                <input
                  type="text"
                  className="w-full p-4 rounded-xl bg-white border border-gray-200 focus:ring-2 focus:ring-[#DAA520]/20 outline-none"
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Email Address</label>
                <input
                  type="email"
                  className="w-full p-4 rounded-xl bg-white border border-gray-200 focus:ring-2 focus:ring-[#DAA520]/20 outline-none"
                  placeholder="Your email"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Subject</label>
                <input
                  type="text"
                  className="w-full p-4 rounded-xl bg-white border border-gray-200 focus:ring-2 focus:ring-[#DAA520]/20 outline-none"
                  placeholder="What is this regarding?"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Message</label>
                <textarea
                  rows={4}
                  className="w-full p-4 rounded-xl bg-white border border-gray-200 focus:ring-2 focus:ring-[#DAA520]/20 outline-none resize-none"
                  placeholder="Your message..."
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-colors"
                style={{ background: '#DAA520' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#B8860B' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#DAA520' }}
              >
                <Send size={18} /> Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
