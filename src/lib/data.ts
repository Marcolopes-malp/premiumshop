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

import fs from 'fs';
import path from 'path';

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

const dataFilePath = path.join(process.cwd(), 'data', 'products.json');

// Read products from the JSON file
export async function getProducts(): Promise<Product[]> {
  try {
    const fileContents = await fs.promises.readFile(dataFilePath, 'utf8');
    return JSON.parse(fileContents) as Product[];
  } catch (error) {
    console.error('Error reading products:', error);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find(p => p.slug === slug);
}
