import { getProducts } from '@/lib/data';
import { ProdutosClient } from './ProdutosClient';

export default async function AdminProdutosPage() {
  const products = await getProducts();

  return <ProdutosClient initialProducts={products} />;
}
