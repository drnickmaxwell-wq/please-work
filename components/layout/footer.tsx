'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { footer as footerNavigation } from '@/config/navigation.mirrored';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

// Brand Colors: Magenta #C2185B, Turquoise #40C4B4, Gold #D4AF37
// Fonts: Montserrat headings, Lora body text

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const contactInfo = [
    {
      icon: <Phone className="w-5 h-5" />,
      label: 'Phone',
      value: '01273 453109',
      link: 'tel:01273453109'
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: 'Email',
      value: 'info@stmaryshousedental.co.uk',
      link: 'mailto:info@stmaryshousedental.co.uk'
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: 'Address',
      value: '1 St Mary\'s House, Shoreham-by-Sea, West Sussex BN43 5ZA',
      link: 'https://maps.google.com/?q=Shoreham-by-Sea+Dental+Practice'
    }
  ];

  const openingHours = [
    { day: 'Monday - Thursday', hours: '9:00 AM - 5:00 PM' },
    { day: 'Friday', hours: '9:00 AM - 4:00 PM' },
    { day: 'Saturday', hours: '9:00 AM - 1:00 PM' },
    { day: 'Sunday', hours: 'Closed' }
  ];
  const footerSections = footerNavigation;
  const quickLinksSection = footerSections.find((section) => section.key === 'practice') ?? footerSections[0];
  const quickLinks = quickLinksSection?.items ?? [];
  const treatmentsSection = footerSections.find((section) => section.key === 'services');
  const treatments = treatmentsSection?.items ?? [];
  const legalSection = footerSections.find((section) => section.key === 'legal');
  const legalLinks = legalSection?.items ?? [];

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: '#', label: 'Facebook' },
    { icon: <Instagram className="w-5 h-5" />, href: '#', label: 'Instagram' },
    { icon: <Twitter className="w-5 h-5" />, href: '#', label: 'Twitter' }
  ];

  return (
    <footer 
      className="relative bg-slate-900 text-white overflow-hidden"
      style={{
        backgroundImage: 'url(/waves-bg-2560.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Brand Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-900/90 via-slate-900/95 to-teal-900/90" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full ${
              i % 3 === 0 ? 'bg-pink-400/30' : 
              i % 3 === 1 ? 'bg-teal-400/30' : 'bg-yellow-400/30'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Practice Information */}
          <div className="space-y-6">
            <div>
              <h3 
                className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-teal-400 bg-clip-text text-transparent mb-4"
                style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
              >
                St Mary’s House Dental Care
              </h3>
              <p 
                className="text-slate-300 leading-relaxed"
                style={{ fontFamily: 'var(--font-inter), system-ui, Arial' }}
              >
                Experience luxury coastal dentistry with our AI-powered 3D treatments, 
                award-winning patient care, and stunning seaside location.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-gradient-to-r from-pink-500 to-teal-500 rounded-full flex items-center justify-center text-white hover:from-pink-600 hover:to-teal-600 transition-all duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h4 
              className="text-lg font-semibold text-white mb-6"
              style={{ fontFamily: 'var(--font-inter), system-ui, Arial' }}
            >
              Contact Information
            </h4>
            <div className="space-y-4">
              {contactInfo.map((info) => (
                <motion.a
                  key={info.label}
                  href={info.link}
                  className="flex items-start space-x-3 text-slate-300 hover:text-white transition-colors duration-200 group"
                  whileHover={{ x: 5 }}
                >
                  <div className="text-pink-400 group-hover:text-teal-400 transition-colors duration-200 mt-0.5">
                    {info.icon}
                  </div>
                  <div>
                    <div 
                      className="font-medium text-white"
                      style={{ fontFamily: 'var(--font-inter), system-ui, Arial' }}
                    >
                      {info.label}
                    </div>
                    <div 
                      className="text-sm"
                      style={{ fontFamily: 'var(--font-inter), system-ui, Arial' }}
                    >
                      {info.value}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 
              className="text-lg font-semibold text-white mb-6 flex items-center"
              style={{ fontFamily: 'var(--font-inter), system-ui, Arial' }}
            >
              <Clock className="w-5 h-5 text-yellow-400 mr-2" />
              Opening Hours
            </h4>
            <div className="space-y-3">
              {openingHours.map((schedule, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span 
                    className="text-slate-300"
                    style={{ fontFamily: 'var(--font-inter), system-ui, Arial' }}
                  >
                    {schedule.day}
                  </span>
                  <span 
                    className="text-white font-medium"
                    style={{ fontFamily: 'var(--font-inter), system-ui, Arial' }}
                  >
                    {schedule.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 
              className="text-lg font-semibold text-white mb-6"
              style={{ fontFamily: 'var(--font-inter), system-ui, Arial' }}
            >
              Quick Links
            </h4>
            <div className="space-y-2">
              {quickLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.path}
                  className="block text-slate-300 hover:text-white transition-colors duration-200"
                  style={{ fontFamily: 'var(--font-inter), system-ui, Arial' }}
                  whileHover={{ x: 5 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Treatment Links */}
        <div className="border-t border-slate-700 pt-8 mb-8">
          <h4 
            className="text-lg font-semibold text-white mb-6 text-center"
            style={{ fontFamily: 'var(--font-inter), system-ui, Arial' }}
          >
            Our Treatments
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {treatments.map((treatment) => (
              <motion.a
                key={treatment.label}
                href={treatment.path}
                className="text-center p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span
                  className="text-sm text-slate-300 hover:text-white"
                  style={{ fontFamily: 'var(--font-inter), system-ui, Arial' }}
                >
                  {treatment.label}
                </span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div 
            className="text-slate-400 text-sm"
            style={{ fontFamily: 'var(--font-inter), system-ui, Arial' }}
          >
            © {currentYear} St Mary’s House Dental Care. All rights reserved.
          </div>
          
          <div className="flex space-x-6 text-sm">
            {legalLinks.map((link) => (
              <a
                key={link.path}
                href={link.path}
                className="text-slate-400 hover:text-white transition-colors duration-200"
                style={{ fontFamily: 'var(--font-inter), system-ui, Arial' }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Emergency Contact Banner */}
        <motion.div
          className="mt-8 bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-4 text-center"
          animate={{
            boxShadow: [
              '0 0 0 0 rgba(220, 38, 38, 0.4)',
              '0 0 0 10px rgba(220, 38, 38, 0)',
              '0 0 0 0 rgba(220, 38, 38, 0)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p 
            className="text-white font-semibold"
            style={{ fontFamily: 'var(--font-inter), system-ui, Arial' }}
          >
            Dental Emergency? Call us 24/7: 
            <a 
              href="tel:01273453109" 
              className="ml-2 underline hover:no-underline"
            >
              01273 453109
            </a>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

