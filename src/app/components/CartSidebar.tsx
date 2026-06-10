"use client";
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function CartSidebar() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, getTotal } = useCartStore();
  const [isMounted, setIsMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const handleCheckout = () => {
    if (items.length === 0) return;

    let message = "Olá! Gostaria de finalizar o seguinte pedido:\n\n";
    items.forEach((item) => {
      message += `- ${item.quantity}x ${item.name} (Tam: ${item.selectedSize}) - R$ ${(item.price * item.quantity).toLocaleString('pt-BR')}\n`;
    });
    message += `\n*Total:* R$ ${getTotal().toLocaleString('pt-BR')}`;
    
    // Replace with the actual WhatsApp number of the store
    const whatsappNumber = "5511999999999"; 
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-[70] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-white" />
                <h2 className="text-xl font-bold text-white tracking-wider">SEU CARRINHO</h2>
              </div>
              <button
                onClick={closeCart}
                className="p-2 text-[#B8B8B8] hover:text-white transition-colors rounded-full hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 text-[#B8B8B8]" />
                  </div>
                  <p className="text-[#B8B8B8]">Seu carrinho está vazio.</p>
                  <button
                    onClick={closeCart}
                    className="text-[#9D4EDD] hover:text-white transition-colors text-sm font-semibold tracking-wider"
                  >
                    CONTINUAR COMPRANDO
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                    <div className="w-24 h-24 rounded-xl overflow-hidden bg-white/10 flex-shrink-0">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="text-white font-semibold text-sm line-clamp-1">{item.name}</h3>
                          <button
                            onClick={() => removeItem(item.id, item.selectedSize)}
                            className="text-[#B8B8B8] hover:text-red-400 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-[#B8B8B8] mt-1">Tam: {item.selectedSize}</p>
                        <p className="text-[#9D4EDD] font-bold mt-1">R$ {item.price.toLocaleString('pt-BR')}</p>
                      </div>

                      <div className="flex items-center gap-3 mt-3 bg-black/40 w-fit rounded-lg border border-white/10 p-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                          className="p-1 text-[#B8B8B8] hover:text-white transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-white text-sm font-medium w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                          className="p-1 text-[#B8B8B8] hover:text-white transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-[#0a0a0a]">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[#B8B8B8] tracking-wider">TOTAL</span>
                  <span className="text-2xl font-bold text-white">R$ {getTotal().toLocaleString('pt-BR')}</span>
                </div>
                
                <button
                  onClick={handleCheckout}
                  className="w-full py-4 bg-gradient-to-r from-[#6A0DAD] to-[#9D4EDD] rounded-full text-white font-bold tracking-wider hover:shadow-[0_0_30px_rgba(157,78,221,0.4)] transition-all duration-300"
                >
                  FINALIZAR PEDIDO VIA WHATSAPP
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
