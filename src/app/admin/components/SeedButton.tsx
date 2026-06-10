'use client';

import { useState } from 'react';
import { seedFromFakeStore } from '@/actions/productActions';
import { DownloadCloud } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function SeedButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSeed = async () => {
    setIsLoading(true);
    try {
      const res = await seedFromFakeStore();
      if (res.success) {
        alert(`Sucesso! ${res.count} produtos novos foram importados da FakeStoreAPI.`);
        router.refresh();
      } else {
        alert('Erro ao importar produtos.');
      }
    } catch (error) {
      console.error(error);
      alert('Erro de conexão ao importar.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleSeed}
      disabled={isLoading}
      className="flex items-center space-x-2 px-6 py-3 bg-[#111] hover:bg-white/10 border border-white/20 text-white rounded-lg font-semibold tracking-wide transition-all disabled:opacity-50"
    >
      <DownloadCloud className="w-5 h-5 text-[#9D4EDD]" />
      <span>{isLoading ? 'IMPORTANDO...' : 'IMPORTAR FAKESTORE'}</span>
    </button>
  );
}
