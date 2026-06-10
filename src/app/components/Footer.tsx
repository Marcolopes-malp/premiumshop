"use client";
import { motion } from 'motion/react';
import { Instagram, Twitter, Facebook, Mail, Youtube } from 'lucide-react';
import { toast } from 'sonner';

export function Footer() {
  const footerLinks = {
    Loja: ['Novidades', 'Coleções', 'Lookbook', 'Promoção'],
    Sobre: ['Nossa História', 'Sustentabilidade', 'Carreiras', 'Imprensa'],
    Suporte: ['Fale Conosco', 'Envio', 'Devoluções', 'Guia de Tamanhos'],
    Legal: ['Política de Privacidade', 'Termos de Serviço', 'Política de Cookies'],
  };

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Mail, href: '#', label: 'Email' },
  ];

  return (
    <footer id="sobre-nos" className="relative bg-black border-t border-white/10 pt-20 pb-10 px-6">
      {/* Purple Glow at Bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-32 bg-[#6A0DAD] rounded-full blur-[100px] opacity-10" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl font-bold tracking-[0.3em] text-white mb-4"
            >
              SHOFERS
            </motion.h3>
            <p className="text-[#B8B8B8] mb-6 leading-relaxed">
              Redefinindo o streetwear de luxo com designs exclusivos que incorporam sofisticação e elegância moderna.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(157, 78, 221, 0.2)' }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-white/5 border border-white/10 rounded-full hover:border-[#9D4EDD] transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-[#B8B8B8]" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold tracking-wider mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[#B8B8B8] hover:text-[#9D4EDD] transition-colors duration-300 text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="backdrop-blur-sm bg-gradient-to-r from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-8 mb-12"
        >
          <div className="max-w-2xl mx-auto text-center">
            <h4 className="text-2xl font-bold text-white mb-3 tracking-wide">
              Junte-se ao Clube Exclusivo
            </h4>
            <p className="text-[#B8B8B8] mb-6">
              Inscreva-se para obter acesso antecipado a novas coleções, ofertas exclusivas e insights de estilo.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Digite seu e-mail"
                className="flex-1 px-6 py-3 bg-white/5 border border-white/20 rounded-full text-white placeholder-[#B8B8B8] focus:outline-none focus:border-[#9D4EDD] transition-colors"
              />
              <motion.button
                onClick={() => toast('Inscrição realizada com sucesso!')}
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(157, 78, 221, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-[#6A0DAD] to-[#9D4EDD] rounded-full text-white font-semibold tracking-wider whitespace-nowrap"
              >
                INSCREVER-SE
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10">
          <p className="text-[#B8B8B8] text-sm">
            © 2026 SHOFERS. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-[#B8B8B8] hover:text-white text-sm transition-colors">
              Privacidade
            </a>
            <a href="#" className="text-[#B8B8B8] hover:text-white text-sm transition-colors">
              Termos
            </a>
            <a href="#" className="text-[#B8B8B8] hover:text-white text-sm transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
