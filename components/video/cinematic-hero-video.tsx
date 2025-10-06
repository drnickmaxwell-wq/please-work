'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw } from 'lucide-react';

// Brand Colors: Magenta #C2185B, Turquoise #40C4B4, Gold #D4AF37
// Fonts: Montserrat headings, Lora body text

interface CinematicHeroVideoProps {
  videoSrc: string;
  posterSrc: string;
  title: string;
  subtitle: string;
  description?: string;
  ctaText?: string;
  ctaAction?: () => void;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  className?: string;
}

export default function CinematicHeroVideo({
  videoSrc,
  posterSrc,
  title,
  subtitle,
  description,
  ctaText = "Book Free Consultation",
  ctaAction,
  autoplay = true,
  muted = true,
  loop = true,
  className = ''
}: CinematicHeroVideoProps) {
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isMuted, setIsMuted] = useState(muted);
  const [showControls, setShowControls] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 0.7]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => setIsLoaded(true);
    const handleTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const resetVideo = () => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    setProgress(0);
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      video.requestFullscreen();
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`relative h-screen overflow-hidden ${className}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Video Background */}
      <motion.div
        style={{ scale: videoScale }}
        className="absolute inset-0 w-full h-full"
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          poster={posterSrc}
          autoPlay={autoplay}
          muted={muted}
          loop={loop}
          playsInline
        >
          <source src={videoSrc} type="video/mp4" />
          <source src={videoSrc.replace('.mp4', '.webm')} type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </motion.div>

      {/* Brand Gradient Overlay */}
      <motion.div 
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-gradient-to-br from-pink-900/40 via-teal-900/40 to-yellow-900/40"
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-3 h-3 rounded-full ${
              i % 3 === 0 ? 'bg-pink-400/20' : 
              i % 3 === 1 ? 'bg-teal-400/20' : 'bg-yellow-400/20'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              scale: [1, 1.8, 1],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center text-white max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-bold mb-6 leading-tight"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
              animate={{
                textShadow: [
                  '0 0 20px rgba(194, 24, 91, 0.5)',
                  '0 0 30px rgba(64, 196, 180, 0.5)',
                  '0 0 20px rgba(212, 175, 55, 0.5)',
                  '0 0 20px rgba(194, 24, 91, 0.5)'
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              {title}
            </motion.h1>
            
            <motion.h2 
              className="text-2xl md:text-4xl font-light mb-8 bg-gradient-to-r from-pink-300 via-teal-300 to-yellow-300 bg-clip-text text-transparent"
              style={{ fontFamily: 'Lora, serif' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              {subtitle}
            </motion.h2>

            {description && (
              <motion.p 
                className="text-lg md:text-xl mb-12 text-white/90 max-w-2xl mx-auto leading-relaxed"
                style={{ fontFamily: 'Lora, serif' }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.1 }}
              >
                {description}
              </motion.p>
            )}

            <motion.button
              onClick={ctaAction}
              className="group relative px-12 py-4 bg-gradient-to-r from-pink-500 via-teal-500 to-yellow-500 text-white font-bold text-lg rounded-full overflow-hidden"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-pink-600 via-teal-600 to-yellow-600"
                initial={{ x: '-100%' }}
                whileHover={{ x: '0%' }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10">{ctaText}</span>
              
              {/* Shimmer Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Video Controls */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-8 left-8 right-8 z-20"
          >
            <div className="bg-black/30 backdrop-blur-lg rounded-2xl p-4">
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-pink-500 via-teal-500 to-yellow-500"
                    style={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <motion.button
                    onClick={togglePlay}
                    className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6 text-white" />
                    ) : (
                      <Play className="w-6 h-6 text-white" />
                    )}
                  </motion.button>

                  <motion.button
                    onClick={toggleMute}
                    className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isMuted ? (
                      <VolumeX className="w-6 h-6 text-white" />
                    ) : (
                      <Volume2 className="w-6 h-6 text-white" />
                    )}
                  </motion.button>

                  <motion.button
                    onClick={resetVideo}
                    className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <RotateCcw className="w-6 h-6 text-white" />
                  </motion.button>
                </div>

                <motion.button
                  onClick={toggleFullscreen}
                  className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Maximize className="w-6 h-6 text-white" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading State */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-br from-pink-900 via-teal-900 to-yellow-900 flex items-center justify-center z-30"
          >
            <div className="text-center text-white">
              <motion.div
                className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full mx-auto mb-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <p className="text-xl font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Loading Luxury Experience...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

