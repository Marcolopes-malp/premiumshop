"use client";
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowUpRight } from 'lucide-react';
import { toast } from 'sonner';

const lookbookImages = [
  {
    url: 'https://images.unsplash.com/photo-1603189343302-e603f7add05a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmYXNoaW9uJTIwZWRpdG9yaWFsJTIwbW9ub2Nocm9tZXxlbnwxfHx8fDE3ODA5Nzk0NDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    title: 'Shadow Series',
    category: 'OUTONO 2026',
  },
  {
    url: 'https://images.unsplash.com/photo-1554925051-f668ed70d520?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWdoJTIwZW5kJTIwc3RyZWV0d2VhciUyMHVyYmFufGVufDF8fHx8MTc4MTA0NTQ2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    title: 'Urban Elite',
    category: 'STREETWEAR',
  },
  {
    url: 'https://images.unsplash.com/photo-1706212825296-b2bebf3de002?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwZmFzaGlvbiUyMG1vZGVsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzgxMDQ1NDY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    title: 'Noir Elegance',
    category: 'PREMIUM',
  },
];

export function LookbookSection() {
  return (
    <section id="lookbook" className="relative py-24 px-6">
      {/* Background */}
      <div className="absolute inset-0 bg-black" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-16"
        >
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm tracking-[0.3em] text-[#9D4EDD] mb-4"
            >
              NARRATIVA VISUAL
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl md:text-6xl font-bold text-white tracking-wider"
            >
              Lookbook
            </motion.h2>
          </div>
          
          <motion.button
            onClick={() => toast('Galeria completa em desenvolvimento!')}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:flex items-center gap-2 px-6 py-3 border-2 border-white/20 rounded-full text-white hover:border-[#9D4EDD] transition-all duration-300"
          >
            VER TUDO
            <ArrowUpRight className="w-4 h-4" />
          </motion.button>
        </motion.div>

        {/* Lookbook Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {lookbookImages.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer"
            >
              {/* Image */}
              <ImageWithFallback
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

              {/* Purple Glow on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#6A0DAD]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
                  className="transform group-hover:translate-y-0 translate-y-4 transition-transform duration-500"
                >
                  <p className="text-sm text-[#B8B8B8] mb-2 tracking-wider">
                    {item.category}
                  </p>
                  <h3 className="text-3xl font-bold text-white mb-4 tracking-wide">
                    {item.title}
                  </h3>
                  
                  {/* View Button - Appears on Hover */}
                  <motion.button
                    onClick={() => toast('Galeria completa em desenvolvimento!')}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 px-6 py-2 bg-white/10 backdrop-blur-md border border-white/30 rounded-full text-white text-sm font-semibold hover:bg-[#9D4EDD] hover:border-[#9D4EDD] transition-all duration-300"
                  >
                    EXPLORAR
                  </motion.button>
                </motion.div>
              </div>

              {/* Corner Icon */}
              <div className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:rotate-45">
                <ArrowUpRight className="w-5 h-5 text-white" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="md:hidden text-center mt-8"
        >
          <motion.button
            onClick={() => toast('Galeria completa em desenvolvimento!')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 border-2 border-white/20 rounded-full text-white hover:border-[#9D4EDD] transition-all duration-300 mx-auto"
          >
            VER TUDO
            <ArrowUpRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
