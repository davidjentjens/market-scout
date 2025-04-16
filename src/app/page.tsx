// src/app/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { markets } from './data/markets';
import MarketCard from './components/market/MarketCard';
import ParticleBackground from './components/common/ParticleBackground';
import EnsureVisibility from './components/home/EnsureVisibility';

export default function HomePage() {
  // Get the first 3 markets to display as featured
  const featuredMarkets = markets.slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Add this component to ensure visibility when navigating back */}
      <EnsureVisibility />
      
      {/* Hero Section with Particle Background */}
      <section className="relative bg-primary-600 py-20 overflow-hidden">
        <ParticleBackground />
        <div className="container mx-auto px-4 relative z-10">
          {/* Tag text above title */}
          <div className="inline-block bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full mb-6 animate-fade-in">
            <p className="text-white text-sm font-medium flex items-center">
              <span className="mr-2">✨</span> Discover the freshest local produce
            </p>
          </div>
          
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
              Where <span className="text-earth-300">Fresh</span> Meets <span className="text-earth-300">Local</span>
            </h1>
            <p className="text-white text-xl mb-8 animate-fade-in-delay-1" >
              Find farmers markets, seasonal produce, and local vendors all in one place.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in-delay-2">
              <Link href="/markets" className="btn btn-secondary">
                <span className="flex items-center">
                  <span className="mr-2">🔍</span> Find Markets
                </span>
              </Link>
              <Link href="/calendar" className="btn btn-outline bg-white">
                <span className="flex items-center">
                  <span className="mr-2">🌱</span> Seasonal Guide
                </span>
              </Link>
            </div>
          </div>
        </div>
        {/* Decorative element with slide-in animation */}
        <div className="absolute bottom-0 right-0 w-1/3 h-full hidden lg:block hero-image">
          <div className="relative w-full h-full">
            <Image 
              src="/images/hero-decorative.png" 
              alt="Decorative" 
              fill 
              priority={true}
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      {/* Featured Markets Section */}
      <section className="py-16 bg-white scroll-reveal">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-center mb-12 scroll-reveal-item">Featured Markets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredMarkets.map((market, index) => (
              <div key={market.id} className={`scroll-reveal-item delay-${index}`}>
                <MarketCard market={market} />
              </div>
            ))}
          </div>
          <div className="text-center mt-10 scroll-reveal-item delay-3">
            <Link href="/markets" className="btn btn-primary">
              <span className="flex items-center justify-center">
                <span className="mr-2">👁️</span> View All Markets
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 bg-earth-100 scroll-reveal">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-center mb-12 scroll-reveal-item">How Market Scout Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center scroll-reveal-item delay-1">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 transition-transform hover:scale-110 duration-300">
                <span className="font-display text-2xl font-bold text-primary-600">1</span>
              </div>
              <h3 className="font-display text-xl font-bold mb-2">Discover Markets</h3>
              <p className="text-gray-600">Find farmers markets near you with our interactive map.</p>
            </div>
            <div className="text-center scroll-reveal-item delay-2">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 transition-transform hover:scale-110 duration-300">
                <span className="font-display text-2xl font-bold text-primary-600">2</span>
              </div>
              <h3 className="font-display text-xl font-bold mb-2">Explore Vendors</h3>
              <p className="text-gray-600">Browse local vendors and discover their seasonal offerings.</p>
            </div>
            <div className="text-center scroll-reveal-item delay-3">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 transition-transform hover:scale-110 duration-300">
                <span className="font-display text-2xl font-bold text-primary-600">3</span>
              </div>
              <h3 className="font-display text-xl font-bold mb-2">Plan Your Visit</h3>
              <p className="text-gray-600">Check market hours and see what&apos;s in season before you go.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Seasonal Highlight Section */}
      <section className="py-16 bg-white scroll-reveal">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="lg:w-1/2 scroll-reveal-item">
              <h2 className="font-display text-3xl font-bold mb-4">What&apos;s in Season Now</h2>
              <p className="text-gray-700 mb-6">
                Eating seasonally means enjoying produce at its peak flavor, nutrition, and affordability.
                Discover what local fruits and vegetables are fresh this month.
              </p>
              <Link href="/calendar" className="btn btn-primary">
                <span className="flex items-center">
                  <span className="mr-2">🗓️</span> View Seasonal Guide
                </span>
              </Link>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              <div className="bg-primary-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 scroll-reveal-item delay-1">
                <h3 className="font-display text-xl font-bold text-primary-600 mb-2">April Highlights</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="bg-primary-100 rounded-full w-2 h-2 mr-2"></span>
                    Spring Greens
                  </li>
                  <li className="flex items-center">
                    <span className="bg-primary-100 rounded-full w-2 h-2 mr-2"></span>
                    Asparagus
                  </li>
                  <li className="flex items-center">
                    <span className="bg-primary-100 rounded-full w-2 h-2 mr-2"></span>
                    Radishes
                  </li>
                  <li className="flex items-center">
                    <span className="bg-primary-100 rounded-full w-2 h-2 mr-2"></span>
                    Rhubarb
                  </li>
                </ul>
              </div>
              <div className="bg-earth-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 scroll-reveal-item delay-2">
                <h3 className="font-display text-xl font-bold text-earth-600 mb-2">Coming Soon</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="bg-earth-100 rounded-full w-2 h-2 mr-2"></span>
                    Strawberries
                  </li>
                  <li className="flex items-center">
                    <span className="bg-earth-100 rounded-full w-2 h-2 mr-2"></span>
                    Peas
                  </li>
                  <li className="flex items-center">
                    <span className="bg-earth-100 rounded-full w-2 h-2 mr-2"></span>
                    Spring Onions
                  </li>
                  <li className="flex items-center">
                    <span className="bg-earth-100 rounded-full w-2 h-2 mr-2"></span>
                    New Potatoes
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}