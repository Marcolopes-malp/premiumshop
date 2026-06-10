'use server';

import fs from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { Product } from '@/lib/data';

const dataFilePath = path.join(process.cwd(), 'data', 'products.json');

function getProductsArray(): Product[] {
  try {
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(fileContents) as Product[];
  } catch (error) {
    console.error('Error reading products:', error);
    return [];
  }
}

function saveProductsArray(products: Product[]) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(products, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing products:', error);
  }
}

export async function createProduct(productData: Omit<Product, 'id' | 'slug'>) {
  const products = getProductsArray();
  
  // Generate a basic slug from the name
  const slug = productData.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  // Generate a unique ID
  const id = Date.now().toString();

  const newProduct: Product = {
    ...productData,
    id,
    slug,
  };

  products.push(newProduct);
  saveProductsArray(products);

  revalidatePath('/');
  revalidatePath('/produtos');
  revalidatePath('/admin/produtos');

  return { success: true, product: newProduct };
}

export async function updateProduct(id: string, productData: Partial<Product>) {
  const products = getProductsArray();
  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return { success: false, error: 'Product not found' };
  }

  // If name changed, update slug
  let slug = products[index].slug;
  if (productData.name && productData.name !== products[index].name) {
    slug = productData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }

  products[index] = {
    ...products[index],
    ...productData,
    slug,
  };

  saveProductsArray(products);

  revalidatePath('/');
  revalidatePath('/produtos');
  revalidatePath(`/produto/${slug}`);
  revalidatePath('/admin/produtos');

  return { success: true, product: products[index] };
}

export async function deleteProduct(id: string) {
  const products = getProductsArray();
  const filteredProducts = products.filter(p => p.id !== id);

  if (products.length === filteredProducts.length) {
    return { success: false, error: 'Product not found' };
  }

  saveProductsArray(filteredProducts);

  revalidatePath('/');
  revalidatePath('/produtos');
  revalidatePath('/admin/produtos');

  return { success: true };
}
