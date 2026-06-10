"use client";
import { motion } from 'motion/react';
import { Clock, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export function ExclusiveAccessBanner() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 45,
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-20 px-6 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#6A0DAD] via-[#9D4EDD] to-[#6A0DAD] bg-[length:200%_100%] animate-[gradient_8s_ease_infinite]" />
      
      {/* Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />

      {/* Animated Stars */}
      <div className="absolute inset-0 overflow-hidden">
        {isMounted && [...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              scale: 0,
              opacity: 0,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          >
            <Star className="w-4 h-4 text-white fill-white" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-black/30 backdrop-blur-md border border-white/30 rounded-full mb-6"
        >
          <Star className="w-4 h-4 text-white fill-white" />
          <span className="text-sm font-semibold text-white tracking-wider">
            OFERTA EXCLUSIVA
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-wide"
        >
          Acesso Antecipado VIP
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto"
        >
          Seja um dos primeiros 100 a desbloquear acesso exclusivo à pré-venda da nossa Coleção Shadow Dynasty com 30% de DESCONTO
        </motion.p>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center gap-4 md:gap-6 mb-10"
        >
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="text-center">
              <div className="backdrop-blur-md bg-white/20 border border-white/30 rounded-2xl p-4 md:p-6 min-w-[80px] md:min-w-[100px]">
                <div className="text-3xl md:text-5xl font-bold text-white tabular-nums">
                  {value.toString().padStart(2, '0')}
                </div>
              </div>
              <p className="text-sm text-white/80 mt-2 uppercase tracking-wider">
                {unit === 'hours' ? 'horas' : unit === 'minutes' ? 'minutos' : 'segundos'}
              </p>
            </div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            onClick={() => toast('Cadastro VIP será liberado em breve!')}
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0, 0, 0, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            className="group px-10 py-4 bg-black border-2 border-white rounded-full text-white font-bold tracking-wider flex items-center gap-3 transition-all duration-300"
          >
            <Clock className="w-5 h-5" />
            GARANTIR ACESSO VIP
          </motion.button>
          
          <p className="text-sm text-white/80">
            Apenas <span className="font-bold text-white">47 vagas</span> restantes
          </p>
        </motion.div>
      </div>

      <style>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </section>
  );
}
