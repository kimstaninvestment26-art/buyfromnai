'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-primary/10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            BuyFromNai
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            {/*<Link href="/orders/track" className="hover:text-primary transition-colors">Track Order</Link>
            <Link href="/admin" className="hover:text-primary transition-colors">Admin</Link>*/}
          </div>
          
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link href="/" className="block hover:text-primary transition-colors">Home</Link>
            {/*<Link href="/orders/track" className="block hover:text-primary transition-colors">Track Order</Link>
            <Link href="/admin" className="block hover:text-primary transition-colors">Admin</Link>*/}
          </div>
        )}
      </div>
    </nav>
  );
}