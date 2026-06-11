'use client';

import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Lock, Mail, User } from 'lucide-react';
import { toast } from 'sonner';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Aqui você poderia salvar o nome do usuário no Firestore se desejasse
      toast.success('Conta criada com sucesso!');
      router.push('/admin');
    } catch (error: any) {
      console.error(error);
      if (error.code === 'auth/email-already-in-use') {
        toast.error('Este e-mail já está em uso.');
      } else {
        toast.error('Erro ao criar conta. Verifique os dados.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-[#9D4EDD]/10 to-transparent pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl relative z-10">
          <div className="text-center mb-8">
            <Link href="/" className="text-3xl font-bold tracking-[0.3em] text-white hover:text-[#9D4EDD] transition-colors">
              SHOFERS
            </Link>
            <p className="text-gray-400 mt-2 tracking-widest text-sm uppercase">Tornar-se Membro</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-400 tracking-wider">NOME COMPLETO</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-black/50 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-[#9D4EDD] transition-colors"
                  placeholder="Seu Nome"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-400 tracking-wider">E-MAIL</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-black/50 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-[#9D4EDD] transition-colors"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-400 tracking-wider">SENHA</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full bg-black/50 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-[#9D4EDD] transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black font-bold tracking-widest py-4 rounded-xl hover:bg-[#9D4EDD] hover:text-white transition-all duration-300 disabled:opacity-50"
            >
              {loading ? 'CRIANDO...' : 'CRIAR CONTA'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Já possui uma conta?{' '}
              <Link href="/login" className="text-[#9D4EDD] hover:text-white transition-colors">
                Fazer login
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
