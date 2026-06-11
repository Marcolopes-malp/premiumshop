'use server';

import { revalidatePath } from 'next/cache';
import { Product } from '@/lib/data';
import { db } from '@/lib/firebase';
import { collection, doc, setDoc, updateDoc, deleteDoc, getDocs } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';

export async function createProduct(productData: Omit<Product, 'id' | 'slug'>) {
  try {
    const slug = productData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const newDocRef = doc(collection(db, 'products'));
    const id = newDocRef.id;

    const newProduct: Product = {
      ...productData,
      id,
      slug,
    };

    await setDoc(newDocRef, newProduct);

    revalidatePath('/');
    revalidatePath('/produtos');
    revalidatePath('/admin/produtos');

    return { success: true, product: newProduct };
  } catch (error) {
    console.error('Error creating product:', error);
    throw new Error('Failed to create product');
  }
}

export async function updateProduct(id: string, productData: Partial<Product>) {
  try {
    const docRef = doc(db, 'products', id);
    
    // If name changed, we should ideally update slug, but for simplicity let's handle it
    let updatePayload = { ...productData };
    
    if (productData.name) {
      updatePayload.slug = productData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }

    await updateDoc(docRef, updatePayload);

    revalidatePath('/');
    revalidatePath('/produtos');
    revalidatePath(`/produto/${updatePayload.slug || ''}`);
    revalidatePath('/admin/produtos');

    return { success: true };
  } catch (error) {
    console.error('Error updating product:', error);
    throw new Error('Failed to update product');
  }
}

export async function deleteProduct(id: string) {
  try {
    await deleteDoc(doc(db, 'products', id));

    revalidatePath('/');
    revalidatePath('/produtos');
    revalidatePath('/admin/produtos');

    return { success: true };
  } catch (error) {
    console.error('Error deleting product:', error);
    throw new Error('Failed to delete product');
  }
}

export async function seedFromFakeStore() {
  try {
    const res = await fetch('https://fakestoreapi.com/products');
    const fakeProducts = await res.json();

    const clothingProducts = fakeProducts.filter((p: any) => 
      p.category === "men's clothing" || p.category === "women's clothing"
    );

    // Get current products to avoid duplicates
    const snapshot = await getDocs(collection(db, 'products'));
    const existingIds = snapshot.docs.map(d => d.id);

    let addedCount = 0;

    for (const fp of clothingProducts) {
      const fsId = `fs-${fp.id}`;
      
      if (!existingIds.includes(fsId)) {
        const slug = fp.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '');

        const newProduct: Product = {
          id: fsId,
          slug,
          name: fp.title,
          category: fp.category === "men's clothing" ? 'MASCULINO' : 'FEMININO',
          price: fp.price * 5, 
          image: fp.image,
          images: [fp.image],
          description: fp.description,
          sizes: ['P', 'M', 'G'],
          inStock: true,
        };

        await setDoc(doc(db, 'products', fsId), newProduct);
        addedCount++;
      }
    }

    if (addedCount > 0) {
      revalidatePath('/');
      revalidatePath('/produtos');
      revalidatePath('/admin/produtos');
    }

    return { success: true, count: addedCount };
  } catch (error) {
    console.error('Error seeding from FakeStore:', error);
    return { success: false, error: 'Failed to fetch from FakeStoreAPI' };
  }
}

// Temporary function to migrate local JSON to Firestore
export async function migrateJsonToFirestore() {
  try {
    const dataFilePath = path.join(process.cwd(), 'data', 'products.json');
    if (!fs.existsSync(dataFilePath)) {
      return { success: false, error: 'products.json not found' };
    }
    
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const products: Product[] = JSON.parse(fileContents);
    
    let count = 0;
    for (const p of products) {
      await setDoc(doc(db, 'products', p.id), p);
      count++;
    }
    
    revalidatePath('/');
    revalidatePath('/produtos');
    revalidatePath('/admin/produtos');
    
    return { success: true, count };
  } catch (error) {
    console.error('Error migrating data:', error);
    return { success: false, error: 'Migration failed' };
  }
}
