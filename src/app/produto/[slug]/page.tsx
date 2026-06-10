import { notFound } from 'next/navigation';
import { getProductBySlug, products } from '@/lib/data';
import { Navbar } from '@/app/components/Navbar';
import { Footer } from '@/app/components/Footer';
import { ProdutoClient } from '@/app/components/ProdutoClient';

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProdutoPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = getProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <ProdutoClient product={product} />
      <Footer />
    </main>
  );
}
