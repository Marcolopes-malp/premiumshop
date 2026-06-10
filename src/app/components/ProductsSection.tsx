"use client";
import { motion } from 'motion/react';
import { ProductCard } from './ProductCard';
import Link from 'next/link';
import { Product } from '@/lib/data';

interface ProductsSectionProps {
  products: Product[];
}

export function ProductsSection({ products }: ProductsSectionProps) {
  return (
    <section id="colecoes" className="relative py-24 px-6">
      {/* Background */}
      <div className="absolute inset-0 bg-black" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
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
            PEÇAS EXCLUSIVAS
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-5xl md:text-6xl font-bold text-white tracking-wider mb-4"
          >
            Coleção em Destaque
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-[#B8B8B8] text-lg max-w-2xl mx-auto"
          >
            Peças selecionadas que definem o streetwear de luxo. Cada item é uma declaração de elegância e exclusividade.
          </motion.p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.slice(0, 4).map((product, index) => (
            <ProductCard
              key={product.id}
              {...product}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <Link href="/produtos">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(157, 78, 221, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 border-2 border-[#9D4EDD] rounded-full text-white font-semibold tracking-wider hover:bg-[#9D4EDD]/10 transition-all duration-300"
            >
              VER TODOS OS PRODUTOS
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
