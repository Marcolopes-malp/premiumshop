import { getProducts } from '@/lib/data';
import { ProductCard } from '../components/ProductCard';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export default async function ProdutosPage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      
      <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="text-sm tracking-[0.3em] text-[#9D4EDD] mb-4">
            CATÁLOGO COMPLETO
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-wider">
            Todas as Peças
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              {...product}
              delay={index * 0.05}
            />
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
