import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function migrate() {
  console.log('Starting migration...');
  const dataPath = path.join(process.cwd(), 'data', 'products.json');
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  
  let count = 0;
  for (const p of data) {
    await setDoc(doc(db, 'products', p.id), p);
    count++;
    console.log(`Migrated: ${p.name}`);
  }
  
  console.log(`Successfully migrated ${count} products to Firestore!`);
  process.exit(0);
}

migrate().catch(console.error);
