'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Star,
  Quote,
  Play,
  ChevronLeft,
  ChevronRight,
  Heart,
  Award,
  Users,
  Calendar,
  MapPin
} from 'lucide-react';

const PatientStoriesPage = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Mitchell",
      age: 34,
      treatment: "Porcelain Veneers",
      location: "Brighton",
      rating: 5,
      quote: "The transformation has been life-changing. Dr. Smith's attention to detail and the luxury coastal setting made the entire experience feel like a spa retreat rather than a dental visit.",
      story: "I was always self-conscious about my smile due to gaps and discoloration. The team at St Mary's House made me feel completely at ease from the first consultation. The 3D visualization showed me exactly what my new smile would look like, and the results exceeded my expectations.",
      image: "/patients/sarah-mitchell.jpg",
      videoThumbnail: "/patients/sarah-video-thumb.jpg",
      beforeAfter: {
        before: "/before-after/sarah-before.jpg",
        after: "/before-after/sarah-after.jpg"
      },
      date: "March 2024"
    },
    {
      id: 2,
      name: "James Thompson",
      age: 42,
      treatment: "Dental Implants",
      location: "Hove",
      rating: 5,
      quote: "After years of avoiding social situations due to missing teeth, I finally have my confidence back. The implant process was completely painless thanks to The Wand system.",
      story: "I lost several teeth in an accident and thought I'd never smile properly again. The team's expertise with 3D digital dentistry meant the implants fit perfectly. The whole process was explained clearly, and I felt supported every step of the way.",
      image: "/patients/james-thompson.jpg",
      videoThumbnail: "/patients/james-video-thumb.jpg",
      beforeAfter: {
        before: "/before-after/james-before.jpg",
        after: "/before-after/james-after.jpg"
      },
      date: "February 2024"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      age: 28,
      treatment: "Anxiety-Free Dentistry",
      location: "Worthing",
      rating: 5,
      quote: "I hadn't been to a dentist in 10 years due to severe anxiety. The team's gentle approach and sedation options made it possible for me to get the care I needed.",
      story: "My dental phobia was so severe I would have panic attacks just thinking about dental visits. The anxiety-free approach at St Mary's House, combined with their beautiful coastal setting, helped me overcome my fears. Now I actually look forward to my check-ups!",
      image: "/patients/emma-rodriguez.jpg",
      videoThumbnail: "/patients/emma-video-thumb.jpg",
      beforeAfter: {
        before: "/before-after/emma-before.jpg",
        after: "/before-after/emma-after.jpg"
      },
      date: "January 2024"
    }
  ];

  const beforeAfterCases = [
    {
      id: 1,
      title: "Complete Smile Makeover",
      treatment: "Porcelain Veneers + Whitening",
      duration: "3 weeks",
      before: "/gallery/case1-before.jpg",
      after: "/gallery/case1-after.jpg",
      description: "Comprehensive smile transformation addressing spacing, color, and shape issues."
    },
    {
      id: 2,
      title: "Dental Implant Restoration",
      treatment: "3D Digital Implants",
      duration: "4 months",
      before: "/gallery/case2-before.jpg",
      after: "/gallery/case2-after.jpg",
      description: "Full mouth reconstruction using advanced 3D planning and immediate loading."
    },
    {
      id: 3,
      title: "Orthodontic Correction",
      treatment: "Clear Aligners",
      duration: "8 months",
      before: "/gallery/case3-before.jpg",
      after: "/gallery/case3-after.jpg",
      description: "Discreet alignment correction with minimal lifestyle disruption."
    }
  ];

  const stats = [
    { number: "2,500+", label: "Happy Patients", icon: Users },
    { number: "98%", label: "Satisfaction Rate", icon: Heart },
    { number: "15+", label: "Years Experience", icon: Award },
    { number: "24/7", label: "Emergency Care", icon: Calendar }
  ];

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-pink-50"
      style={{
        backgroundImage: 'url(/waves-bg-2560.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/80" />

      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-pink-200 mb-6">
              <Heart className="w-5 h-5 text-pink-500 mr-2" />
              <span className="text-sm font-semibold text-slate-700">Real Patient Stories</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
                Patient Stories
              </span>
              <br />
              <span className="text-slate-800">That Inspire</span>
            </h1>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Discover how our luxury coastal dental care has transformed lives. 
              Real patients, real results, real stories of confidence restored.
            </p>
          </motion.div>

          {/* Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
          >
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-slate-800 mb-2">{stat.number}</div>
                  <div className="text-slate-600">{stat.label}</div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Featured Testimonials */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Featured Patient Journeys
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              In-depth stories of transformation, from initial consultation to life-changing results.
            </p>
          </motion.div>

          <div className="relative">
            {/* Testimonial Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Patient Story */}
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-pink-100">
                  {/* Quote */}
                  <div className="flex items-start mb-6">
                    <Quote className="w-8 h-8 text-pink-500 mr-4 flex-shrink-0 mt-1" />
                    <p className="text-xl text-slate-700 leading-relaxed italic">
                      “{testimonials[activeTestimonial].quote}”
                    </p>
                  </div>

                  {/* Patient Info */}
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-teal-500 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-bold text-lg">
                        {testimonials[activeTestimonial].name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">
                        {testimonials[activeTestimonial].name}
                      </h3>
                      <div className="flex items-center text-slate-600 text-sm">
                        <span>{testimonials[activeTestimonial].treatment}</span>
                        <span className="mx-2">•</span>
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{testimonials[activeTestimonial].location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                    <span className="ml-2 text-slate-600">5.0 • {testimonials[activeTestimonial].date}</span>
                  </div>

                  {/* Full Story */}
                  <p className="text-slate-600 leading-relaxed">
                    {testimonials[activeTestimonial].story}
                  </p>

                  {/* Video Testimonial */}
                  <div className="mt-6">
                    <button className="flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-teal-500 text-white rounded-full hover:from-pink-600 hover:to-teal-600 transition-colors">
                      <Play className="w-5 h-5 mr-2" />
                      Watch Video Testimonial
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Before/After Gallery */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-pink-100">
                  <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">
                    Transformation Results
                  </h3>
                  
                  {/* Before/After Slider */}
                  <div className="relative mb-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <div className="aspect-square bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl flex items-center justify-center">
                          <span className="text-slate-500">Before</span>
                        </div>
                        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          Before
                        </div>
                      </div>
                      <div className="relative">
                        <div className="aspect-square bg-gradient-to-br from-pink-200 to-teal-200 rounded-2xl flex items-center justify-center">
                          <span className="text-slate-600">After</span>
                        </div>
                        <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          After
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Treatment Details */}
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Treatment:</span>
                      <span className="font-semibold text-slate-800">
                        {testimonials[activeTestimonial].treatment}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Duration:</span>
                      <span className="font-semibold text-slate-800">3 weeks</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Satisfaction:</span>
                      <span className="font-semibold text-green-600">Excellent</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center mt-12 space-x-4">
              <button
                onClick={() => setActiveTestimonial(prev => prev > 0 ? prev - 1 : testimonials.length - 1)}
                className="p-3 bg-white/80 backdrop-blur-sm rounded-full border border-pink-200 hover:bg-pink-50 transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-slate-600" />
              </button>
              
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === activeTestimonial 
                        ? 'bg-pink-500' 
                        : 'bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={() => setActiveTestimonial(prev => prev < testimonials.length - 1 ? prev + 1 : 0)}
                className="p-3 bg-white/80 backdrop-blur-sm rounded-full border border-pink-200 hover:bg-pink-50 transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-slate-600" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Gallery */}
      <section className="relative py-20 px-6 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Before & After Gallery
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              See the remarkable transformations achieved through our advanced 3D dentistry and luxury care.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beforeAfterCases.map((case_, index) => (
              <motion.div
                key={case_.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-pink-100 hover:shadow-2xl transition-shadow"
              >
                <h3 className="text-xl font-bold text-slate-800 mb-4">{case_.title}</h3>
                
                {/* Before/After Images */}
                <div className="relative mb-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="aspect-square bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl flex items-center justify-center">
                      <span className="text-slate-500 text-sm">Before</span>
                    </div>
                    <div className="aspect-square bg-gradient-to-br from-pink-200 to-teal-200 rounded-xl flex items-center justify-center">
                      <span className="text-slate-600 text-sm">After</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Treatment:</span>
                    <span className="font-semibold text-slate-800">{case_.treatment}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Duration:</span>
                    <span className="font-semibold text-slate-800">{case_.duration}</span>
                  </div>
                </div>

                <p className="text-slate-600 text-sm mt-4 leading-relaxed">
                  {case_.description}
                </p>

                <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-pink-500 to-teal-500 text-white rounded-xl hover:from-pink-600 hover:to-teal-600 transition-colors text-sm font-semibold">
                  View Full Case Study
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-6 bg-gradient-to-r from-pink-600 to-teal-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your Story?
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Join thousands of satisfied patients who have transformed their smiles 
              with our luxury coastal dental care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-pink-600 font-bold rounded-xl hover:bg-slate-50 transition-colors shadow-lg">
                Book Free Consultation
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-pink-600 transition-colors">
                Try AI Smile Quiz
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PatientStoriesPage;

