import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  image: string;
  images: string[];
  description: string;
  sizes: string[];
  inStock: boolean;
}

export async function getProducts(): Promise<Product[]> {
  try {
    const productsRef = collection(db, 'products');
    const snapshot = await getDocs(productsRef);
    const products: Product[] = [];
    
    snapshot.forEach(doc => {
      products.push({ id: doc.id, ...doc.data() } as Product);
    });

    return products;
  } catch (error) {
    console.error('Error fetching products from Firestore:', error);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find(p => p.slug === slug);
}

