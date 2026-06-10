import { Package } from 'lucide-react';
import { getProducts } from '@/lib/data';
import { SeedButton } from './components/SeedButton';

export default async function AdminDashboardPage() {
  const products = await getProducts();
  const totalProducts = products.length;
  const inStockProducts = products.filter(p => p.inStock).length;

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-wider">Dashboard</h1>
          <p className="text-gray-400 mt-2">Visão geral da sua loja premium.</p>
        </div>
        <SeedButton />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 tracking-wider">TOTAL DE PRODUTOS</p>
              <h2 className="text-4xl font-bold mt-2">{totalProducts}</h2>
            </div>
            <div className="p-4 bg-[#9D4EDD]/10 rounded-xl text-[#9D4EDD]">
              <Package className="w-8 h-8" />
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 tracking-wider">EM ESTOQUE</p>
              <h2 className="text-4xl font-bold mt-2">{inStockProducts}</h2>
            </div>
            <div className="p-4 bg-green-500/10 rounded-xl text-green-500">
              <Package className="w-8 h-8" />
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 tracking-wider">FORA DE ESTOQUE</p>
              <h2 className="text-4xl font-bold mt-2">{totalProducts - inStockProducts}</h2>
            </div>
            <div className="p-4 bg-red-500/10 rounded-xl text-red-500">
              <Package className="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

