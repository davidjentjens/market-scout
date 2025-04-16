// src/app/page.tsx
"use client";
import Link from 'next/link';
import Image from 'next/image';
import { markets } from './data/markets';
import MarketCard from './components/market/MarketCard';
import ParticleBackground from './components/common/ParticleBackground';
import {EnsureVisibility} from './components/home/EnsureVisibility';

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
            <p className="text-white font-semibold tracking-wide text-base">From Farm to Table, Just Around the Corner</p>
          </div>
          
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
              Connect with <span className="text-earth-300 italic">Local</span> Food & <span className="text-earth-300 italic">Community</span>
            </h1>
            <p className="text-white text-xl mb-8 animate-fade-in-delay-1">
              Discover vibrant farmers markets in your area, meet local producers, and enjoy the freshest seasonal ingredients to transform your meals and support your community.
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
          <div className="flex items-center justify-center mb-12 scroll-reveal-item">
            <div className="bg-primary-100 p-2 rounded-full mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
              </svg>
            </div>
            <h2 className="font-display text-3xl font-bold text-center">Featured Markets</h2>
          </div>
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

      {/* Testimonials Section - New Addition */}
      <section className="py-16 bg-primary-50 scroll-reveal">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-12 scroll-reveal-item">
            <div className="bg-primary-100 p-2 rounded-full mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
              </svg>
            </div>
            <h2 className="font-display text-3xl font-bold text-center">Community Stories</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 scroll-reveal-item">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-primary-700 font-bold text-xl">M</span>
                </div>
                <div>
                  <h4 className="font-bold">Michael T.</h4>
                  <p className="text-sm text-gray-600">Market Shopper</p>
                </div>
              </div>
              <div className="mb-4">
                <svg className="h-8 w-8 text-primary-200 mb-2" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.896 3.456-8.352 9.12-8.352 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="text-gray-700">Market Scout has transformed how I shop for produce. I love being able to easily find which markets are open and what&apos;s in season before heading out. The vendor profiles help me connect with the people growing my food.</p>
              </div>
              <div className="flex text-yellow-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 scroll-reveal-item delay-1">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-earth-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-earth-700 font-bold text-xl">S</span>
                </div>
                <div>
                  <h4 className="font-bold">Sarah J.</h4>
                  <p className="text-sm text-gray-600">Weekly Market Visitor</p>
                </div>
              </div>
              <div className="mb-4">
                <svg className="h-8 w-8 text-primary-200 mb-2" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.896 3.456-8.352 9.12-8.352 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="text-gray-700">The seasonal calendar is a game-changer! I&apos;m eating more diverse fruits and vegetables now that I know what&apos;s in season and at peak flavor. The community events have also helped me meet like-minded food enthusiasts in my area.</p>
              </div>
              <div className="flex text-yellow-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 scroll-reveal-item delay-2">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-secondary-700 font-bold text-xl">D</span>
                </div>
                <div>
                  <h4 className="font-bold">David L.</h4>
                  <p className="text-sm text-gray-600">Local Farmer</p>
                </div>
              </div>
              <div className="mb-4">
                <svg className="h-8 w-8 text-primary-200 mb-2" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.896 3.456-8.352 9.12-8.352 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="text-gray-700">As a vendor, Market Scout has connected me with so many new customers who appreciate locally grown produce. The platform makes it easy to share what we&apos;re bringing to market each week and build relationships with the community.</p>
              </div>
              <div className="flex text-yellow-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10 scroll-reveal-item delay-3">
            <Link href="/testimonials" className="btn btn-outline-primary">
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>
                Read More Community Stories
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary-600 text-white scroll-reveal">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 scroll-reveal-item">
              Ready to Discover Local Markets?
            </h2>
            <p className="text-white opacity-90 text-lg mb-8 scroll-reveal-item delay-1">
              Start exploring the freshest local produce, artisanal foods, and handcrafted goods at farmers markets near you.
            </p>
            <div className="flex flex-wrap justify-center gap-4 scroll-reveal-item delay-2">
              <Link href="/markets" className="btn btn-secondary btn-lg">
                Find Markets
              </Link>
              <Link href="/about" className="btn btn-outline btn-lg border-white text-white hover:bg-white hover:text-primary-600">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Add required CSS for animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          opacity: 0;
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        .animate-fade-in-delay-1 {
          opacity: 0;
          animation: fadeIn 0.6s ease-out 0.2s forwards;
        }
        
        .animate-fade-in-delay-2 {
          opacity: 0;
          animation: fadeIn 0.6s ease-out 0.4s forwards;
        }
        
        .hero-image {
          opacity: 0;
          animation: slideIn 1s ease-out 0.5s forwards;
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .scroll-reveal {
          position: relative;
        }
        
        .scroll-reveal-item {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .scroll-reveal-item.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .scroll-reveal-item.delay-1 {
          transition-delay: 0.2s;
        }
        
        .scroll-reveal-item.delay-2 {
          transition-delay: 0.4s;
        }
        
        .scroll-reveal-item.delay-3 {
          transition-delay: 0.6s;
        }
      `}</style>
    </div>
  );
}