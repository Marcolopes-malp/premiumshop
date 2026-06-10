"use client";
import { ShoppingBag, Menu, Search, User } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { useCartStore } from '@/store/cartStore';

export function Navbar() {
  const { openCart, items } = useCartStore();
  const cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const navLinks = [
    { name: 'NOVIDADES', id: 'novidades' },
    { name: 'COLEÇÕES', id: 'colecoes' },
    { name: 'LOOKBOOK', id: 'lookbook' },
    { name: 'SOBRE NÓS', id: 'sobre-nos' },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-5"
    >
      <div className="max-w-7xl mx-auto">
        <div className="backdrop-blur-md bg-black/20 border border-white/10 rounded-2xl px-6 py-4 shadow-2xl">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold tracking-[0.3em] text-white"
            >
              SHOFERS
            </motion.div>

            {/* Navigation Links - Desktop */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((item) => (
                <motion.a
                  key={item.name}
                  href={`#${item.id}`}
                  onClick={(e) => handleScroll(e, item.id)}
                  whileHover={{ scale: 1.1 }}
                  className="text-sm tracking-wider text-[#B8B8B8] hover:text-white transition-colors duration-300"
                >
                  {item.name}
                </motion.a>
              ))}
            </div>

            {/* Icons */}
            <div className="flex items-center gap-5">
              <motion.button
                onClick={() => toast('Busca em desenvolvimento!')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-[#B8B8B8] hover:text-white transition-colors"
              >
                <Search className="w-5 h-5" />
              </motion.button>
              <motion.button
                onClick={() => toast('Área de login em breve!')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-[#B8B8B8] hover:text-white transition-colors"
              >
                <User className="w-5 h-5" />
              </motion.button>
              <motion.button
                onClick={openCart}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative text-[#B8B8B8] hover:text-white transition-colors"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#9D4EDD] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </motion.button>
              <motion.button
                onClick={() => toast('Menu mobile em breve!')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="md:hidden text-[#B8B8B8] hover:text-white transition-colors"
              >
                <Menu className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
