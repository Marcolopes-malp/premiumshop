"use client";
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function HeroSection() {
  const handleScroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#1a0033] to-black" />
      
      {/* Purple Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#6A0DAD] rounded-full blur-[120px] opacity-20" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#9D4EDD] rounded-full blur-[120px] opacity-20" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left - Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-[0.2em] mb-6"
            style={{
              background: 'linear-gradient(135deg, #FFFFFF 0%, #9D4EDD 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            SHOFERS
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-[#B8B8B8] mb-8 tracking-wide"
          >
            Luxo Redefinido. Exclusividade Elevada.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              onClick={() => handleScroll('colecoes')}
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(157, 78, 221, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 bg-gradient-to-r from-[#6A0DAD] to-[#9D4EDD] rounded-full text-white font-semibold tracking-wider flex items-center justify-center gap-2 transition-all duration-300"
            >
              EXPLORAR COLEÇÃO
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <motion.button
              onClick={() => handleScroll('lookbook')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-white/20 rounded-full text-white font-semibold tracking-wider backdrop-blur-sm hover:border-[#9D4EDD] transition-all duration-300"
            >
              VER LOOKBOOK
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right - Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1634826260499-7d97a6049913?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmYXNoaW9uJTIwbW9kZWwlMjBibGFjayUyMG91dGZpdHxlbnwxfHx8fDE3ODA5NTE5NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Modelo de Moda de Luxo"
              className="w-full h-[600px] object-cover"
            />
          </div>
          
          {/* Glassmorphism Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="absolute bottom-6 left-6 z-20 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl overflow-hidden"
          >
            <p className="text-sm text-[#B8B8B8] mb-1">A PARTIR DE</p>
            <p className="text-3xl font-bold text-white">R$ 2.499</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
