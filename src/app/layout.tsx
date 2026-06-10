import type { Metadata } from 'next'
import '../styles/index.css'
import { Toaster } from 'sonner'
import { CartSidebar } from './components/CartSidebar'

export const metadata: Metadata = {
  title: 'Template de Roupas de Luxo',
  description: 'Apresente moda de luxo com uma loja online elegante e responsiva, projetada para roupas de alta-costura, oferecendo uma experiência de compra sofisticada.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <CartSidebar />
        <Toaster theme="dark" position="bottom-right" />
      </body>
    </html>
  )
}
