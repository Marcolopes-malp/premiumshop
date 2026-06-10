"use client";
import { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Heart, ArrowLeft, Star, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { useCartStore } from '@/store/cartStore';
import { Product } from '@/lib/data';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function ProdutoClient({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || '');
  const [activeImage, setActiveImage] = useState<string>(product.image);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    if (!product.inStock) {
      toast.error('Este produto está esgotado no momento.');
      return;
    }
    addItem(product, selectedSize);
    toast.success('Adicionado ao carrinho!');
  };

  const handleFavorite = () => {
    toast.success('Adicionado aos favoritos!');
  };

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-[#B8B8B8] mb-8">
        <Link href="/" className="hover:text-white transition-colors">Início</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/produtos" className="hover:text-white transition-colors">Produtos</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-white">{product.name}</span>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Left - Images */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="aspect-[4/5] rounded-3xl overflow-hidden bg-white/5 border border-white/10"
          >
            <ImageWithFallback
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          {product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                    activeImage === img ? 'border-[#9D4EDD]' : 'border-transparent opacity-50 hover:opacity-100'
                  }`}
                >
                  <ImageWithFallback src={img} alt={`${product.name} ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right - Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col"
        >
          <div className="mb-8">
            <p className="text-sm tracking-[0.3em] text-[#9D4EDD] mb-2">{product.category}</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-wider mb-4">{product.name}</h1>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-white">R$ {product.price.toLocaleString('pt-BR')}</span>
              {!product.inStock && (
                <span className="px-3 py-1 bg-red-500/20 text-red-400 border border-red-500/30 rounded-full text-xs font-bold tracking-wider">
                  ESGOTADO
                </span>
              )}
            </div>
            <p className="text-[#B8B8B8] leading-relaxed text-lg">
              {product.description}
            </p>
          </div>

          <div className="mb-8 border-t border-white/10 pt-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-semibold tracking-wider">TAMANHO</h3>
              <button className="text-sm text-[#B8B8B8] underline hover:text-white transition-colors">Guia de Medidas</button>
            </div>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-14 h-14 rounded-xl flex items-center justify-center text-sm font-bold transition-all ${
                    selectedSize === size
                      ? 'bg-[#9D4EDD] text-white shadow-[0_0_20px_rgba(157,78,221,0.4)]'
                      : 'bg-white/5 text-[#B8B8B8] border border-white/10 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4 mt-auto">
            <motion.button
              onClick={handleAddToCart}
              whileHover={{ scale: product.inStock ? 1.02 : 1 }}
              whileTap={{ scale: product.inStock ? 0.98 : 1 }}
              disabled={!product.inStock}
              className={`flex-1 py-4 rounded-full font-bold tracking-wider flex items-center justify-center gap-3 transition-all ${
                product.inStock 
                  ? 'bg-white text-black hover:bg-gray-200 shadow-lg' 
                  : 'bg-white/10 text-white/40 cursor-not-allowed'
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              {product.inStock ? 'ADICIONAR AO CARRINHO' : 'INDISPONÍVEL'}
            </motion.button>
            
            <motion.button
              onClick={handleFavorite}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-14 h-14 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <Heart className="w-5 h-5 text-white" />
            </motion.button>
          </div>

          {/* Feature List */}
          <div className="mt-12 space-y-4">
            <div className="flex items-center gap-3 text-[#B8B8B8] bg-white/5 p-4 rounded-2xl border border-white/5">
              <Star className="w-5 h-5 text-[#9D4EDD]" />
              <span className="text-sm">Edição Premium Limitada</span>
            </div>
            <div className="flex items-center gap-3 text-[#B8B8B8] bg-white/5 p-4 rounded-2xl border border-white/5">
              <ShoppingBag className="w-5 h-5 text-[#9D4EDD]" />
              <span className="text-sm">Envio expresso para todo o Brasil</span>
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
