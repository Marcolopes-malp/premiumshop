import { ParticlesBackground } from './components/ParticlesBackground';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { ProductsSection } from './components/ProductsSection';
import { ExclusiveAccessBanner } from './components/ExclusiveAccessBanner';
import { NewCollectionSection } from './components/NewCollectionSection';
import { LookbookSection } from './components/LookbookSection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {/* Particles Background Effect */}
      <ParticlesBackground />

      {/* Main Content */}
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <FeaturesSection />
        <ProductsSection />
        <ExclusiveAccessBanner />
        <NewCollectionSection />
        <LookbookSection />
        <Footer />
      </div>

      {/* Gradient Overlays for Depth */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
    </div>
  );
}