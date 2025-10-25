'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  User,
  Search,
  Filter,
  ArrowRight,
  BookOpen
} from 'lucide-react';

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Articles', count: 24 },
    { id: '3d-dentistry', name: '3D Dentistry', count: 8 },
    { id: 'anxiety-free', name: 'Anxiety-Free Care', count: 6 },
    { id: 'cosmetic', name: 'Cosmetic Dentistry', count: 7 },
    { id: 'oral-health', name: 'Oral Health', count: 5 },
    { id: 'emergency', name: 'Emergency Care', count: 4 }
  ];

  const featuredArticles = [
    {
      id: 1,
      title: "The Future of Dentistry: How 3D Technology is Revolutionizing Smile Makeovers",
      excerpt: "Discover how our advanced 3D digital dentistry technology creates perfect smiles with unprecedented precision and comfort.",
      category: "3d-dentistry",
      author: "Dr. Sarah Smith",
      date: "2024-09-01",
      readTime: "8 min read",
      image: "/blog/3d-dentistry-future.jpg",
      featured: true,
      tags: ["3D Technology", "Digital Dentistry", "Smile Makeover", "Innovation"]
    },
    {
      id: 2,
      title: "Overcoming Dental Anxiety: Your Guide to Stress-Free Dental Care",
      excerpt: "Learn about our anxiety-free approach, sedation options, and how we create a calming coastal environment for nervous patients.",
      category: "anxiety-free",
      author: "Dr. Michael Johnson",
      date: "2024-08-28",
      readTime: "6 min read",
      image: "/blog/anxiety-free-care.jpg",
      featured: true,
      tags: ["Dental Anxiety", "Sedation", "Patient Comfort", "Relaxation"]
    },
    {
      id: 3,
      title: "Porcelain Veneers vs. Teeth Whitening: Which is Right for You?",
      excerpt: "Compare cosmetic dentistry options and discover which treatment will give you the perfect smile you've always wanted.",
      category: "cosmetic",
      author: "Dr. Emily Chen",
      date: "2024-08-25",
      readTime: "5 min read",
      image: "/blog/veneers-vs-whitening.jpg",
      featured: false,
      tags: ["Porcelain Veneers", "Teeth Whitening", "Cosmetic Dentistry", "Smile Design"]
    }
  ];

  const articles = [
    {
      id: 4,
      title: "The Complete Guide to Dental Implants: Everything You Need to Know",
      excerpt: "From consultation to recovery, learn everything about our advanced 3D-guided dental implant procedures.",
      category: "3d-dentistry",
      author: "Dr. Sarah Smith",
      date: "2024-08-22",
      readTime: "10 min read",
      image: "/blog/dental-implants-guide.jpg",
      tags: ["Dental Implants", "3D Planning", "Oral Surgery", "Tooth Replacement"]
    },
    {
      id: 5,
      title: "Emergency Dental Care: When to Seek Immediate Treatment",
      excerpt: "Recognize dental emergencies and learn how our 24/7 emergency service can save your smile.",
      category: "emergency",
      author: "Dr. Michael Johnson",
      date: "2024-08-20",
      readTime: "4 min read",
      image: "/blog/emergency-dental-care.jpg",
      tags: ["Emergency Dentistry", "Urgent Care", "Dental Trauma", "Pain Relief"]
    },
    {
      id: 6,
      title: "The Wand System: Pain-Free Injections for Comfortable Dentistry",
      excerpt: "Discover how our revolutionary Wand system eliminates injection pain and anxiety.",
      category: "anxiety-free",
      author: "Dr. Emily Chen",
      date: "2024-08-18",
      readTime: "3 min read",
      image: "/blog/wand-system.jpg",
      tags: ["The Wand", "Pain-Free", "Injection Technology", "Patient Comfort"]
    },
    {
      id: 7,
      title: "Maintaining Your Oral Health: Daily Habits for a Lifetime of Smiles",
      excerpt: "Expert tips for maintaining optimal oral health between dental visits.",
      category: "oral-health",
      author: "Dr. Sarah Smith",
      date: "2024-08-15",
      readTime: "7 min read",
      image: "/blog/oral-health-habits.jpg",
      tags: ["Oral Hygiene", "Prevention", "Daily Care", "Healthy Habits"]
    },
    {
      id: 8,
      title: "Smile Design: Creating Your Perfect Smile with Digital Technology",
      excerpt: "Learn how we use advanced digital smile design to plan your perfect smile transformation.",
      category: "cosmetic",
      author: "Dr. Michael Johnson",
      date: "2024-08-12",
      readTime: "6 min read",
      image: "/blog/smile-design.jpg",
      tags: ["Smile Design", "Digital Planning", "Cosmetic Dentistry", "Aesthetics"]
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
              <BookOpen className="w-5 h-5 text-pink-500 mr-2" />
              <span className="text-sm font-semibold text-slate-700">Dental Health Blog</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
                Dental Health
              </span>
              <br />
              <span className="text-slate-800">Insights & Tips</span>
            </h1>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Expert advice, latest innovations, and comprehensive guides from our team of 
              dental professionals. Stay informed about the latest in luxury coastal dental care.
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto mb-16"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-pink-100">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>

                {/* Category Filter */}
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="pl-10 pr-8 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent appearance-none bg-white"
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name} ({category.count})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Articles */}
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
              Featured Articles
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our most popular and comprehensive guides to dental health and advanced treatments.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Main Featured Article */}
            <motion.article
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <Link href={`/blog/${featuredArticles[0].id}`}>
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl border border-pink-100 hover:shadow-2xl transition-shadow group">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    <div className="aspect-video lg:aspect-square bg-gradient-to-br from-pink-200 to-teal-200 flex items-center justify-center">
                      <span className="text-slate-600">Featured Article Image</span>
                    </div>
                    <div className="p-8 flex flex-col justify-center">
                      <div className="flex items-center mb-4">
                        <span className="px-3 py-1 bg-gradient-to-r from-pink-500 to-teal-500 text-white rounded-full text-sm font-semibold">
                          Featured
                        </span>
                        <span className="ml-3 px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-semibold">
                          {categories.find(c => c.id === featuredArticles[0].category)?.name}
                        </span>
                      </div>
                      
                      <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4 group-hover:text-pink-600 transition-colors">
                        {featuredArticles[0].title}
                      </h3>
                      
                      <p className="text-slate-600 mb-6 leading-relaxed">
                        {featuredArticles[0].excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-slate-500">
                          <User className="w-4 h-4 mr-1" />
                          <span className="mr-4">{featuredArticles[0].author}</span>
                          <Calendar className="w-4 h-4 mr-1" />
                          <span className="mr-4">{featuredArticles[0].date}</span>
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{featuredArticles[0].readTime}</span>
                        </div>
                        
                        <ArrowRight className="w-5 h-5 text-pink-500 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>

            {/* Secondary Featured Articles */}
            {featuredArticles.slice(1).map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={`/blog/${article.id}`}>
                  <div className="bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl border border-pink-100 hover:shadow-2xl transition-shadow group h-full">
                    <div className="aspect-video bg-gradient-to-br from-pink-200 to-teal-200 flex items-center justify-center">
                      <span className="text-slate-600">Article Image</span>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center mb-3">
                        <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-semibold">
                          {categories.find(c => c.id === article.category)?.name}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-pink-600 transition-colors">
                        {article.title}
                      </h3>
                      
                      <p className="text-slate-600 mb-4 leading-relaxed text-sm">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <div className="flex items-center">
                          <User className="w-3 h-3 mr-1" />
                          <span className="mr-3">{article.author}</span>
                          <Clock className="w-3 h-3 mr-1" />
                          <span>{article.readTime}</span>
                        </div>
                        
                        <ArrowRight className="w-4 h-4 text-pink-500 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* All Articles */}
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
              Latest Articles
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Stay up-to-date with the latest dental health insights, treatment innovations, and expert advice.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={`/blog/${article.id}`}>
                  <div className="bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl border border-pink-100 hover:shadow-2xl transition-shadow group h-full">
                    <div className="aspect-video bg-gradient-to-br from-pink-200 to-teal-200 flex items-center justify-center">
                      <span className="text-slate-600">Article Image</span>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center mb-3">
                        <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-semibold">
                          {categories.find(c => c.id === article.category)?.name}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-pink-600 transition-colors">
                        {article.title}
                      </h3>
                      
                      <p className="text-slate-600 mb-4 leading-relaxed text-sm">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 rounded-full text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <div className="flex items-center">
                          <User className="w-3 h-3 mr-1" />
                          <span className="mr-3">{article.author}</span>
                          <Clock className="w-3 h-3 mr-1" />
                          <span>{article.readTime}</span>
                        </div>
                        
                        <ArrowRight className="w-4 h-4 text-pink-500 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {/* Load More */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <button className="px-8 py-4 bg-gradient-to-r from-pink-500 to-teal-500 text-white rounded-xl font-bold hover:from-pink-600 hover:to-teal-600 transition-colors shadow-lg">
              Load More Articles
            </button>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="relative py-20 px-6 bg-gradient-to-r from-pink-600 to-teal-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Stay Informed
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Subscribe to our newsletter for the latest dental health tips, 
              treatment innovations, and exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl border-0 focus:ring-2 focus:ring-white/50"
              />
              <button className="px-6 py-3 bg-white text-pink-600 font-bold rounded-xl hover:bg-slate-50 transition-colors">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;

