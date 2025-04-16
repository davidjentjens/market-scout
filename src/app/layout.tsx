// src/app/layout.tsx
import { ReactNode } from 'react';
import Link from 'next/link';
import './globals.css';
import Image from 'next/image';
import { Inter, Playfair_Display, Nunito_Sans } from 'next/font/google';

// Configure the fonts
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700']
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['400', '600', '700']
});

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito-sans',
  weight: ['400', '500', '600', '700']
});

export const metadata = {
  title: 'Market Scout',
  description: 'Find local farmers markets near you',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${nunitoSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body>
        <div className="flex flex-col min-h-screen">
          <header className="bg-white shadow-sm">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
              <Link href="/">
                <div className="flex items-center">
                  <Image src="/icons/tomato.png" alt="Market Scout Logo" width={1024} height={1024} className="h-12 w-12 mr-1" />
                  <h3 className='font-sans text-2xl text-primary-600 font-bold'>Market Scout</h3>
                </div>
              </Link>
              <nav className="hidden md:flex space-x-6">
                <Link href="/markets" className="font-medium text-gray-700 hover:text-primary-500 transition">
                  Markets
                </Link>
                <Link href="/vendors" className="font-medium text-gray-700 hover:text-primary-500 transition">
                  Vendors
                </Link>
                <Link href="/calendar" className="font-medium text-gray-700 hover:text-primary-500 transition">
                  Seasonal Guide
                </Link>
                <Link href="/community" className="font-medium text-gray-700 hover:text-primary-500 transition">
                  Community
                </Link>
              </nav>
              <button className="md:hidden">
                {/* Mobile menu icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </header>
          
          <main className="flex-grow">
            {children}
          </main>
          
          <footer className="bg-earth-900 text-white py-8">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="font-display text-xl mb-4">Market Scout</h3>
                  <p className="text-earth-100 text-sm">Connecting you with local farmers markets and fresh produce in your area.</p>
                </div>
                <div>
                  <h4 className="font-medium mb-4">Quick Links</h4>
                  <ul className="space-y-2 text-sm">
                    <li><Link href="/markets" className="text-earth-100 hover:text-primary-300">Find Markets</Link></li>
                    <li><Link href="/calendar" className="text-earth-100 hover:text-primary-300">Seasonal Guide</Link></li>
                    <li><Link href="/community" className="text-earth-100 hover:text-primary-300">Community</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-4">Follow Us</h4>
                  <div className="flex space-x-4">
                    {/* Social media icons here */}
                  </div>
                </div>
              </div>
              <div className="border-t border-earth-700 mt-8 pt-4 text-center text-sm text-earth-300">
                <p>© {new Date().getFullYear()} Market Scout. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}