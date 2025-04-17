// src/app/layout.tsx with integrated mobile menu user profile
"use client";

import { ReactNode, useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import './globals.css';
import Image from 'next/image';
import { Inter, Playfair_Display, Nunito_Sans } from 'next/font/google';
import ScrollReveal from './components/home/ScrollReveal';

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

// Mock user data - in a real app, this would come from an API or context
const mockUser = {
  name: "Jamie Smith",
  email: "jamie.smith@example.com",
  avatar: "/icons/user-avatar.png", // You'll need to add this image
  favorites: 12,
  lastVisit: "Greenfield Farmers Market"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Close profile dropdown if mobile menu is toggled
    if (profileOpen) setProfileOpen(false);
  };

  const toggleProfile = () => {
    setProfileOpen(!profileOpen);
  };

  // Close profile dropdown when clicking outside (desktop only)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileRef]);

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${nunitoSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body>
        <div className="flex flex-col min-h-screen">
          <header className="bg-white shadow-sm relative z-30">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
              <Link href="/">
                <div className="flex items-center">
                  <Image src="/icons/binoculars.png" alt="Market Scout Logo" width={512} height={512} className="h-10 w-10 mr-2" />
                  <h3 className='font-sans text-2xl text-primary-600 font-bold'>Market Scout</h3>
                </div>
              </Link>
              
              <nav className="hidden md:flex space-x-6 items-center">
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
                
                {/* User Profile Icon - Desktop */}
                <div className="relative" ref={profileRef}>
                  <button 
                    onClick={toggleProfile}
                    className="ml-4 flex items-center justify-center h-10 w-10 rounded-full bg-primary-100 hover:bg-primary-200 transition"
                    aria-label="User profile"
                  >
                    <Image 
                      src={mockUser.avatar} 
                      alt="User Avatar" 
                      width={40} 
                      height={40} 
                      className="h-9 w-9 rounded-full object-cover cursor-pointer"
                    />
                  </button>
                  
                  {/* Profile Dropdown - Desktop */}
                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl py-2 z-30">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="font-medium text-gray-800">{mockUser.name}</p>
                        <p className="text-sm text-gray-500">{mockUser.email}</p>
                      </div>
                      <div className="px-4 py-2 text-sm">
                        <div className="flex justify-between py-1">
                          <span className="text-gray-600">Favorite Markets:</span>
                          <span className="font-medium">{mockUser.favorites}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-gray-600">Last Visit:</span>
                          <span className="font-medium">{mockUser.lastVisit}</span>
                        </div>
                      </div>
                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <Link 
                          href="/profile" 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          View Profile
                        </Link>
                        <Link 
                          href="/settings" 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          Settings
                        </Link>
                        <button 
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </nav>
              
              <div className="md:hidden flex">
                {/* Mobile Menu Toggle Button */}
                <button 
                  className="focus:outline-none"
                  onClick={toggleMobileMenu}
                  aria-label="Toggle mobile menu"
                >
                  {mobileMenuOpen ? (
                    // X icon for closing
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    // Hamburger icon for opening
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            
            {/* Mobile menu with integrated user profile */}
            {mobileMenuOpen && (
              <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-20">
                <div className="container mx-auto px-4 py-3">
                  {/* User profile section in mobile menu */}
                  <div className="border-b border-gray-100 pb-4 mb-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <Image 
                        src={mockUser.avatar} 
                        alt="User Avatar" 
                        width={48} 
                        height={48} 
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-800">{mockUser.name}</p>
                        <p className="text-sm text-gray-500">{mockUser.email}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                      <div className="bg-gray-50 p-2 rounded">
                        <span className="block text-gray-500">Favorite Markets</span>
                        <span className="font-medium">{mockUser.favorites}</span>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <span className="block text-gray-500">Last Visit</span>
                        <span className="font-medium truncate">{mockUser.lastVisit}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Navigation links in mobile menu */}
                  <nav className="flex flex-col space-y-2">
                    <Link 
                      href="/markets" 
                      className="font-medium text-gray-700 hover:text-primary-500 transition py-2 px-4 hover:bg-gray-50 rounded-md"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Markets
                    </Link>
                    <Link 
                      href="/vendors" 
                      className="font-medium text-gray-700 hover:text-primary-500 transition py-2 px-4 hover:bg-gray-50 rounded-md"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Vendors
                    </Link>
                    <Link 
                      href="/calendar" 
                      className="font-medium text-gray-700 hover:text-primary-500 transition py-2 px-4 hover:bg-gray-50 rounded-md"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Seasonal Guide
                    </Link>
                    <Link 
                      href="/community" 
                      className="font-medium text-gray-700 hover:text-primary-500 transition py-2 px-4 hover:bg-gray-50 rounded-md"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Community
                    </Link>
                    
                    {/* User profile actions integrated into mobile menu */}
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <Link 
                        href="/profile" 
                        className="font-medium text-gray-700 hover:text-primary-500 transition py-2 px-4 hover:bg-gray-50 rounded-md flex items-center cursor-pointer"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        View Profile
                      </Link>
                      <Link 
                        href="/settings" 
                        className="font-medium text-gray-700 hover:text-primary-500 transition py-2 px-4 hover:bg-gray-50 rounded-md flex items-center"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Settings
                      </Link>
                      <button 
                        className="w-full text-left font-medium text-red-600 hover:text-red-700 transition py-2 px-4 hover:bg-gray-50 rounded-md flex items-center cursor-pointer"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign Out
                      </button>
                    </div>
                  </nav>
                </div>
              </div>
            )}
          </header>
          
          <main className="flex-grow">
            {children}
            <ScrollReveal />
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