"use client";
import { motion } from 'motion/react';
import { Truck, Shield, Sparkles, Award } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Envio para Todo o Mundo',
    description: 'Entrega expressa para mais de 100 países com embalagem premium.',
  },
  {
    icon: Shield,
    title: 'Autenticidade Garantida',
    description: 'Cada peça acompanha um certificado de autenticidade.',
  },
  {
    icon: Sparkles,
    title: 'Designs Exclusivos',
    description: 'Peças de edição limitada criadas por designers mundialmente renomados.',
  },
  {
    icon: Award,
    title: 'Experiência VIP',
    description: 'Acesso prioritário, personal styling e eventos exclusivos para membros.',
  },
];

export function FeaturesSection() {
  return (
    <section className="relative py-24 px-6">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0014] to-black" />
      
      {/* Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#6A0DAD] rounded-full blur-[120px] opacity-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#9D4EDD] rounded-full blur-[120px] opacity-10" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm tracking-[0.3em] text-[#9D4EDD] mb-4"
          >
            O COMPROMISSO SHOFERS
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-white tracking-wide"
          >
            Luxo Incomparável
          </motion.h2>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative backdrop-blur-sm bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-8 hover:border-[#9D4EDD]/50 transition-all duration-500 h-full">
                {/* Icon Container */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 bg-gradient-to-br from-[#6A0DAD] to-[#9D4EDD] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-[#6A0DAD]/20 group-hover:shadow-[#9D4EDD]/40 transition-all duration-500"
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3 tracking-wide">
                  {feature.title}
                </h3>
                <p className="text-[#B8B8B8] leading-relaxed">
                  {feature.description}
                </p>

                {/* Glow Effect on Hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#6A0DAD]/0 to-[#9D4EDD]/0 group-hover:from-[#6A0DAD]/5 group-hover:to-[#9D4EDD]/5 transition-all duration-500 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
