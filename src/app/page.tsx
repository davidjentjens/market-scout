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
          {/* Tag text above title - more prominent styling */}
          <div className="inline-flex items-center bg-earth-500/90 backdrop-blur px-6 py-3 rounded-lg mb-8 shadow-lg transform -rotate-1 animate-fade-in">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2 text-white">
              <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813a3.75 3.75 0 002.576-2.576l.813-2.846A.75.75 0 019 4.5z" clipRule="evenodd" />
            </svg>
            <p className="text-white font-semibold tracking-wide text-base">Discover nature&apos;s bounty locally</p>
          </div>
          
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
              Discover <span className="text-earth-300 italic">Fresh</span> Local Produce Near <span className="text-earth-300 italic">You</span>
            </h1>
            <p className="text-white text-xl mb-8 animate-fade-in-delay-1" >
              Connect with farmers markets and artisanal producers to transform your meals with nature&apos;s finest ingredients.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in-delay-2">
              <Link href="/markets" className="btn btn-secondary btn-lg">
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-2">
                    <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
                  </svg>
                  Find Markets
                </span>
              </Link>
              <Link href="/calendar" className="btn btn-outline btn-lg bg-white/90 backdrop-blur-sm hover:bg-white/80">
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-2">
                    <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
                  </svg>
                  Seasonal Guide
                </span>
              </Link>
            </div>
          </div>
        </div>
        {/* Decorative element with slide-in animation */}
        <div className="absolute bottom-0 right-0 w-2/5 h-full hidden lg:block hero-image">
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
            <Link href="/markets" className="btn btn-primary btn-lg">
              View All Markets
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 bg-earth-100 scroll-reveal">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold scroll-reveal-item">
              How <Image src="/icons/binoculars.png" alt="Market Scout Logo" width={32} height={32} className="inline-block h-8 w-8 mx-1 align-middle" /> 
              <span className="text-primary-600">Market Scout</span> Works
            </h2>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 max-w-5xl mx-auto">
            <div className="text-center md:flex-1 scroll-reveal-item delay-1">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 transition-transform hover:scale-110 duration-300 shadow-md">
                <span className="font-display text-2xl font-bold text-primary-600">1</span>
              </div>
              <h3 className="font-display text-xl font-bold mb-2">Discover Markets</h3>
              <p className="text-gray-600">Find farmers markets near you with our interactive map.</p>
            </div>
            <div className="text-center md:flex-1 scroll-reveal-item delay-2">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 transition-transform hover:scale-110 duration-300 shadow-md">
                <span className="font-display text-2xl font-bold text-primary-600">2</span>
              </div>
              <h3 className="font-display text-xl font-bold mb-2">Explore Vendors</h3>
              <p className="text-gray-600">Browse local vendors and discover their seasonal offerings.</p>
            </div>
            <div className="text-center md:flex-1 scroll-reveal-item delay-3">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 transition-transform hover:scale-110 duration-300 shadow-md">
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
              <Link href="/calendar" className="btn btn-primary btn-lg">
                View Seasonal Guide
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