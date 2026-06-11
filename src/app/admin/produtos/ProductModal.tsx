'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/lib/data';
import { createProduct, updateProduct } from '@/actions/productActions';
import { X, UploadCloud } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';
import { toast } from 'sonner';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  productToEdit?: Product | null;
}

export function ProductModal({ isOpen, onClose, productToEdit }: ProductModalProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: 0,
    image: '',
    images: [] as string[],
    description: '',
    sizes: [] as string[],
    inStock: true,
  });

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        name: productToEdit.name,
        category: productToEdit.category,
        price: productToEdit.price,
        image: productToEdit.image,
        images: productToEdit.images || [],
        description: productToEdit.description,
        sizes: productToEdit.sizes || [],
        inStock: productToEdit.inStock,
      });
    } else {
      setFormData({
        name: '',
        category: '',
        price: 0,
        image: '',
        images: [],
        description: '',
        sizes: ['P', 'M', 'G'],
        inStock: true,
      });
    }
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      setFormData(prev => ({ ...prev, image: downloadURL, images: [downloadURL] }));
      toast.success('Imagem enviada com sucesso!');
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
      toast.error('Erro ao fazer upload da imagem.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image) {
      toast.error('É obrigatório adicionar uma imagem do produto.');
      return;
    }

    setIsSubmitting(true);

    try {
      if (productToEdit) {
        await updateProduct(productToEdit.id, formData);
        toast.success('Produto atualizado!');
      } else {
        await createProduct(formData);
        toast.success('Produto criado!');
      }
      onClose();
      router.refresh();
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Erro ao salvar produto.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const availableSizes = ['P', 'M', 'G', 'GG', '38', '39', '40', '41', '42', '43'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-[#111] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-[#111] border-b border-white/10 p-6 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold tracking-wider">
            {productToEdit ? 'Editar Produto' : 'Novo Produto'}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 tracking-wider">NOME DO PRODUTO</label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#9D4EDD] transition-colors"
                placeholder="Ex: Obsidian Jacket"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 tracking-wider">CATEGORIA</label>
              <input
                required
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#9D4EDD] transition-colors"
                placeholder="Ex: CASACOS"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400 tracking-wider">PREÇO (R$)</label>
            <input
              required
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#9D4EDD] transition-colors"
              min="0"
              step="0.01"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400 tracking-wider">FOTO DO PRODUTO (Upload via Firebase)</label>
            <div className="flex items-center space-x-4">
              {formData.image && (
                <img src={formData.image} alt="Preview" className="w-16 h-16 rounded-xl object-cover border border-white/10" />
              )}
              <label className="flex-1 cursor-pointer flex flex-col items-center justify-center p-4 border-2 border-dashed border-white/20 rounded-xl hover:bg-white/5 hover:border-[#9D4EDD] transition-colors">
                <UploadCloud className="w-6 h-6 text-gray-400 mb-2" />
                <span className="text-sm text-gray-400">{isUploading ? 'Enviando...' : 'Clique para escolher a foto'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={isUploading}
                />
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400 tracking-wider">DESCRIÇÃO</label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#9D4EDD] transition-colors h-32 resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400 tracking-wider">TAMANHOS DISPONÍVEIS</label>
            <div className="flex flex-wrap gap-2">
              {availableSizes.map(size => (
                <button
                  key={size}
                  type="button"
                  onClick={() => {
                    const newSizes = formData.sizes.includes(size)
                      ? formData.sizes.filter(s => s !== size)
                      : [...formData.sizes, size];
                    setFormData({ ...formData, sizes: newSizes });
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    formData.sizes.includes(size)
                      ? 'bg-[#9D4EDD] text-white'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-3 pt-4">
            <input
              type="checkbox"
              id="inStock"
              checked={formData.inStock}
              onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
              className="w-5 h-5 rounded border-white/20 bg-white/5 text-[#9D4EDD] focus:ring-[#9D4EDD] focus:ring-offset-black"
            />
            <label htmlFor="inStock" className="text-sm font-medium text-white tracking-wider cursor-pointer">
              PRODUTO EM ESTOQUE
            </label>
          </div>

          <div className="sticky bottom-0 -mx-6 -mb-6 p-6 bg-[#111] border-t border-white/10 mt-8 flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting || isUploading}
              className="px-6 py-3 rounded-lg font-semibold text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              CANCELAR
            </button>
            <button
              type="submit"
              disabled={isSubmitting || isUploading}
              className="px-6 py-3 rounded-lg font-semibold text-white bg-[#9D4EDD] hover:bg-[#9D4EDD]/80 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'SALVANDO...' : 'SALVAR PRODUTO'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
