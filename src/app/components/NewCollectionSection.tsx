"use client";
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function NewCollectionSection() {
  const handleScroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="novidades" className="relative py-24 px-6 overflow-hidden">
      {/* Background with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#1a0033] to-black" />
      
      {/* Purple Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#6A0DAD] rounded-full blur-[150px] opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#6A0DAD]/30 to-transparent z-10" />
              
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1510853851847-5c02796e8c8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwc3RyZWV0d2VhciUyMGx1eHVyeSUyMGNsb3RoaW5nfGVufDF8fHx8MTc4MTA0NTI5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="New Collection"
                className="w-full h-[700px] object-cover"
              />

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute top-8 right-8 backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-6 py-3"
              >
                <p className="text-white font-bold tracking-wider">PRIMAVERA 2026</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm tracking-[0.3em] text-[#9D4EDD]"
            >
              NOVA COLEÇÃO
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-wider"
              style={{
                background: 'linear-gradient(135deg, #FFFFFF 0%, #9D4EDD 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Coleção Shadow Dynasty
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-[#B8B8B8] leading-relaxed"
            >
              Experimente o auge do streetwear de luxo. Nossa coleção Shadow Dynasty une a estética da alta-costura com a vanguarda contemporânea, confeccionada com os materiais mais nobres para quem se recusa a passar despercebido.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-6 pt-4"
            >
              {[
                { label: 'Edição Limitada', value: '100 Peças' },
                { label: 'Artesanato', value: 'Feito à Mão' },
                { label: 'Material', value: 'Tecido Premium' },
              ].map((item, index) => (
                <div key={index} className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-4 min-w-[140px]">
                  <p className="text-xs text-[#B8B8B8] mb-1">{item.label}</p>
                  <p className="text-white font-semibold">{item.value}</p>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="pt-6"
            >
              <motion.button
                onClick={() => handleScroll('colecoes')}
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(157, 78, 221, 0.6)' }}
                whileTap={{ scale: 0.95 }}
                className="group px-10 py-4 bg-gradient-to-r from-[#6A0DAD] to-[#9D4EDD] rounded-full text-white font-bold tracking-wider flex items-center gap-3 transition-all duration-300"
              >
                DESCUBRA AGORA
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
