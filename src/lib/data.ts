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

export const products: Product[] = [
  {
    id: '1',
    slug: 'obsidian-jacket',
    name: 'Obsidian Jacket',
    category: 'CASACOS',
    price: 2899,
    image: 'https://images.unsplash.com/photo-1727515546577-f7d82a47b51d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBibGFjayUyMGphY2tldCUyMGRlc2lnbmVyfGVufDF8fHx8MTc4MTA0NTI5MXww&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1727515546577-f7d82a47b51d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBibGFjayUyMGphY2tldCUyMGRlc2lnbmVyfGVufDF8fHx8MTc4MTA0NTI5MXww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWF0aGVyJTIwamFja2V0fGVufDF8fHx8MTc4MTA1MjkxMHww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    description: 'A Obsidian Jacket redefine o conceito de agasalho de luxo. Construída com tecidos italianos de alta durabilidade e um design minimalista marcante, esta peça é perfeita para noites frias onde o estilo não pode ser comprometido.',
    sizes: ['P', 'M', 'G', 'GG'],
    inStock: true,
  },
  {
    id: '2',
    slug: 'midnight-hoodie',
    name: 'Midnight Hoodie',
    category: 'STREETWEAR',
    price: 1599,
    image: 'https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwZmFzaGlvbiUyMGhvb2RpZSUyMHN0cmVldHdlYXJ8ZW58MXx8fHwxNzgxMDQ1MjkxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwZmFzaGlvbiUyMGhvb2RpZSUyMHN0cmVldHdlYXJ8ZW58MXx8fHwxNzgxMDQ1MjkxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'O Midnight Hoodie é a essência do conforto elevado. Feito com algodão egípcio de altíssima gramatura, oferece um caimento impecável e um toque incrivelmente macio. O design escuro profundo garante versatilidade para qualquer ocasião urbana.',
    sizes: ['P', 'M', 'G', 'GG'],
    inStock: true,
  },
  {
    id: '3',
    slug: 'noir-edition-sneakers',
    name: 'Noir Edition Sneakers',
    category: 'CALÇADOS',
    price: 1899,
    image: 'https://images.unsplash.com/photo-1771775735982-8fb350cec7a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMHNob2VzJTIwbHV4dXJ5JTIwYnJhbmR8ZW58MXx8fHwxNzgxMDQ1MjkxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1771775735982-8fb350cec7a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMHNob2VzJTIwbHV4dXJ5JTIwYnJhbmR8ZW58MXx8fHwxNzgxMDQ1MjkxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'O Noir Edition Sneakers combina o conforto do streetwear moderno com a silhueta sofisticada do luxo. Fabricado com couro premium, possui detalhes reflexivos discretos e uma sola projetada para durabilidade e leveza suprema.',
    sizes: ['38', '39', '40', '41', '42', '43'],
    inStock: true,
  },
  {
    id: '4',
    slug: 'shadow-ensemble',
    name: 'Shadow Ensemble',
    category: 'CONJUNTO PREMIUM',
    price: 3499,
    image: 'https://images.unsplash.com/photo-1603189343302-e603f7add05a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWdoJTIwZmFzaGlvbiUyMGRhcmslMjBjbG90aGluZyUyMGVkaXRvcmlhbHxlbnwxfHx8fDE3ODEwNDUyOTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1603189343302-e603f7add05a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWdoJTIwZmFzaGlvbiUyMGRhcmslMjBjbG90aGluZyUyMGVkaXRvcmlhbHxlbnwxfHx8fDE3ODEwNDUyOTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'Para quem busca uma declaração completa de estilo, o Shadow Ensemble é o ápice da nossa coleção. Um conjunto perfeitamente harmonizado que transmite autoridade, poder e mistério. Edição extremamente limitada.',
    sizes: ['M', 'G'],
    inStock: false,
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}
