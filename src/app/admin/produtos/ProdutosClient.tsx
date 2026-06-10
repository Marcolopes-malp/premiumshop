'use client';

import { useState } from 'react';
import { Product } from '@/lib/data';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';
import { ProductModal } from './ProductModal';
import { deleteProduct } from '@/actions/productActions';
import { useRouter } from 'next/navigation';

export function ProdutosClient({ initialProducts }: { initialProducts: Product[] }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [search, setSearch] = useState('');
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const filteredProducts = initialProducts.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (product: Product) => {
    setProductToEdit(product);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setProductToEdit(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;
    
    setIsDeleting(id);
    try {
      await deleteProduct(id);
      router.refresh();
    } catch (error) {
      console.error('Error deleting:', error);
      alert('Erro ao excluir o produto.');
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-wider">Produtos</h1>
          <p className="text-gray-400 mt-2">Gerencie o catálogo da loja.</p>
        </div>
        <button
          onClick={handleAddNew}
          className="flex items-center space-x-2 px-6 py-3 bg-[#9D4EDD] hover:bg-[#9D4EDD]/80 text-white rounded-lg font-semibold tracking-wide transition-all shadow-[0_0_20px_rgba(157,78,221,0.3)] hover:shadow-[0_0_30px_rgba(157,78,221,0.5)]"
        >
          <Plus className="w-5 h-5" />
          <span>NOVO PRODUTO</span>
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
        <div className="flex items-center space-x-3 mb-6 bg-black/50 border border-white/10 rounded-lg px-4 py-2 w-full max-w-md">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nome ou categoria..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-white focus:outline-none placeholder-gray-500"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 text-sm tracking-wider">
                <th className="pb-4 font-medium">PRODUTO</th>
                <th className="pb-4 font-medium">CATEGORIA</th>
                <th className="pb-4 font-medium">PREÇO</th>
                <th className="pb-4 font-medium">ESTOQUE</th>
                <th className="pb-4 font-medium text-right">AÇÕES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-white/5 transition-colors group">
                  <td className="py-4">
                    <div className="flex items-center space-x-4">
                      <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                      <span className="font-medium">{product.name}</span>
                    </div>
                  </td>
                  <td className="py-4 text-gray-300">{product.category}</td>
                  <td className="py-4 font-medium text-[#9D4EDD]">
                    R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium tracking-wider ${
                      product.inStock 
                        ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
                        : 'bg-red-500/10 text-red-500 border border-red-500/20'
                    }`}>
                      {product.inStock ? 'DISPONÍVEL' : 'ESGOTADO'}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                        title="Editar"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        disabled={isDeleting === product.id}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                        title="Excluir"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-500">
                    Nenhum produto encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        productToEdit={productToEdit} 
      />
    </div>
  );
}
