import Link from 'next/link';
import { Package, LayoutDashboard, Settings } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-black text-white font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-black/50 backdrop-blur-xl flex flex-col hidden md:flex">
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="text-xl font-bold tracking-widest text-white">
            PREMIUM<span className="text-[#9D4EDD]">.</span>
          </Link>
          <p className="text-xs text-gray-400 mt-1 tracking-widest uppercase">Admin Panel</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link
            href="/admin"
            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium tracking-wide">Dashboard</span>
          </Link>
          <Link
            href="/admin/produtos"
            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Package className="w-5 h-5" />
            <span className="font-medium tracking-wide">Produtos</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
            <Settings className="w-5 h-5" />
            <span className="font-medium tracking-wide">Configurações</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#9D4EDD]/5 to-transparent pointer-events-none" />
        <div className="relative z-10 p-8 min-h-full">
          {children}
        </div>
      </main>
    </div>
  );
}
