"use client";
import { motion } from 'motion/react';
import { ShoppingBag, Heart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { Product } from '@/lib/data';

interface ProductCardProps extends Product {
  delay?: number;
}

export function ProductCard({ delay = 0, ...product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    if (!product.inStock) {
      toast.error('Este produto está esgotado.');
      return;
    }
    // Default size is the first available or empty
    addItem(product, product.sizes[0] || '');
    toast.success('Adicionado ao carrinho!');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Action Buttons */}
          <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <motion.button
              onClick={handleAddToCart}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-4 bg-white/20 backdrop-blur-md rounded-full border border-white/30 hover:bg-[#9D4EDD] transition-all duration-300"
            >
              <ShoppingBag className="w-5 h-5 text-white" />
            </motion.button>
            <motion.button
              onClick={() => toast('Adicionado aos favoritos!')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-4 bg-white/20 backdrop-blur-md rounded-full border border-white/30 hover:bg-[#9D4EDD] transition-all duration-300"
            >
              <Heart className="w-5 h-5 text-white" />
            </motion.button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-5">
          <p className="text-sm text-[#B8B8B8] mb-1 tracking-wider">{product.category}</p>
          <h3 className="text-xl font-semibold text-white mb-3 tracking-wide line-clamp-1">{product.name}</h3>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-white">R$ {product.price.toLocaleString('pt-BR')}</p>
            <Link href={`/produto/${product.slug}`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-[#6A0DAD] to-[#9D4EDD] rounded-full text-sm font-semibold text-white tracking-wider"
              >
                VER
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
