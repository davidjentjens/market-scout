// src/app/page.tsx
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-primary-400 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
              Discover Fresh Local Produce Near You
            </h1>
            <p className="text-white text-xl mb-8 animate-fade-in" style={{ animationDelay: "100ms" }}>
              Find farmers markets, seasonal produce, and local vendors all in one place.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "200ms" }}>
              <Link href="/markets" className="btn btn-secondary">
                Find Markets
              </Link>
              <Link href="/calendar" className="btn btn-outline bg-white">
                Seasonal Guide
              </Link>
            </div>
          </div>
        </div>
        {/* Decorative element */}
        <div className="absolute bottom-0 right-0 w-1/3 h-full hidden lg:block">
          {/* We'll add an image here later */}
          <Image src="/images/hero-decorative.png" alt="Decorative" layout="fill" objectFit="cover" className="opacity-30" />
        </div>
      </section>

      {/* Featured Markets Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-center mb-12">Featured Markets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* We'll add market cards here */}
            <div className="card h-80">Featured market 1</div>
            <div className="card h-80">Featured market 2</div>
            <div className="card h-80">Featured market 3</div>
          </div>
          <div className="text-center mt-10">
            <Link href="/markets" className="btn btn-primary">
              View All Markets
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 bg-earth-100">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-center mb-12">How Market Scout Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="font-display text-2xl font-bold text-primary-600">1</span>
              </div>
              <h3 className="font-display text-xl font-bold mb-2">Discover Markets</h3>
              <p className="text-gray-600">Find farmers markets near you with our interactive map.</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="font-display text-2xl font-bold text-primary-600">2</span>
              </div>
              <h3 className="font-display text-xl font-bold mb-2">Explore Vendors</h3>
              <p className="text-gray-600">Browse local vendors and discover their seasonal offerings.</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="font-display text-2xl font-bold text-primary-600">3</span>
              </div>
              <h3 className="font-display text-xl font-bold mb-2">Plan Your Visit</h3>
              <p className="text-gray-600">Check market hours and see what&apos;s in season before you go.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}