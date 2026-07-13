/*'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Product } from '@/types/product';


const categories = ['All', 'Food', 'Fashion', 'Electronics'];

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const fetchProducts = async () => {
    setLoading(true);
    const url = selectedCategory === 'All' 
      ? '/api/products' 
      : `/api/products?category=${selectedCategory}`;
    
    const response = await fetch(url);
    const data = await response.json();
    if (data.success) {
      setProducts(data.products);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section *
      <section className="relative bg-gradient-to-br from-primary/10 to-accent/20 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Browse. Inquire. Get it
            </h1>
            <p className="text-xl text-foreground/70 mb-8">
              Discover amazing products. We connect you to products fast.
            </p>
            {/*<div className="flex gap-4 justify-center">
              <Link
                href="#products"
                className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-dark transition-colors shadow-lg"
              >
                Browse Products
              </Link>
              <Link
                href="/orders/track"
                className="bg-white/10 backdrop-blur-sm border border-primary/20 text-foreground px-8 py-3 rounded-full font-semibold hover:bg-white/20 transition-colors"
              >
                Track Order
              </Link>
            </div>*
          </div>
        </div>
      </section>

      {/* Categories *
      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-white/10 hover:bg-white/20 text-foreground'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Products Grid *
      <section id="products" className="container mx-auto px-4 pb-20">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link key={product._id} href={`/product/${product._id}`}>
                <div className="group bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {!product.availability && (
                      <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                        Out of Stock
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold">{product.name}</h3>
                      {product.price && (
                        <span className="text-primary font-bold">
                          ₦{product.price.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <p className="text-muted mb-4 line-clamp-2">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm bg-primary/20 text-primary px-3 py-1 rounded-full">
                        {product.category}
                      </span>
                      <span className="text-sm text-muted">
                        {product.availability ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}*/

/*'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Product {
  _id: string;
  name: string;
  price: number | null;
  image: string;
  description: string;
  availability: boolean;
  category: string;
  whatsappNumber: string;
  createdAt: string;
}

const categories = ['All', 'Food', 'Fashion', 'Electronics'];

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const fetchProducts = async () => {
    setLoading(true);
    const url = selectedCategory === 'All' 
      ? '/api/products' 
      : `/api/products?category=${selectedCategory}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppInquiry = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    const message = `Hi! I'm interested in ${product.name}. Can you please provide more information?`;
    const whatsappUrl = `https://wa.me/${product.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section *
      <section className="relative bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/5 py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Browse. Inquire. Get it
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-foreground/70 mb-6 sm:mb-8">
              Discover amazing products. We connect you to products fast.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Filter *
      <section className="container mx-auto px-4 py-6 sm:py-10">
        <div className="relative">
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto scrollbar-hide px-2 py-2 scroll-smooth">
            {categories.map((category) => {
              const isActive = selectedCategory === category;

              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`
                    whitespace-nowrap px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium
                    transition-all duration-300 shrink-0
                    border
                    ${
                      isActive
                        ? "bg-primary text-white border-primary shadow-lg scale-105"
                        : "bg-white/10 hover:bg-white/20 border-white/10 text-foreground"
                    }
                  `}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products Grid - Two by Two on Small and Extra Small Screens *
      <section id="products" className="container mx-auto px-3 sm:px-4 pb-16 sm:pb-20">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-primary"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 sm:py-20">
            <p className="text-lg sm:text-xl text-muted">No products available in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
            {products.map((product) => (
              <Link key={product._id} href={`/product/${product._id}`}>
                <div className="group bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl overflow-hidden hover:transform hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300 shadow-md sm:shadow-lg hover:shadow-xl border border-primary/5">
                  <div className="relative aspect-square sm:aspect-[4/3] md:aspect-square overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {!product.availability && (
                      <div className="absolute top-1.5 sm:top-3 right-1.5 sm:right-3 bg-red-500 text-white px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-xs font-medium">
                        Out of Stock
                      </div>
                    )}
                    {product.price && (
                      <div className="absolute bottom-1.5 sm:bottom-3 left-1.5 sm:left-3 bg-black/60 backdrop-blur-sm text-white px-1.5 sm:px-4 py-0.5 sm:py-1.5 rounded-full text-[10px] sm:text-sm font-bold">
                        Ksh {product.price.toLocaleString()}
                      </div>
                    )}
                  </div>
                  <div className="p-1.5 sm:p-2 md:p-3 lg:p-4">
                    <div className="flex justify-between items-start mb-0.5 sm:mb-1 md:mb-2">
                      <h3 className="text-[10px] sm:text-xs md:text-sm lg:text-base font-semibold line-clamp-1">
                        {product.name}
                      </h3>
                    </div>
                    <p className="text-[8px] sm:text-[10px] md:text-xs text-muted mb-1 sm:mb-1.5 md:mb-2 lg:mb-3 line-clamp-1 sm:line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-[6px] sm:text-[8px] md:text-[10px] lg:text-xs bg-primary/20 text-primary px-1 sm:px-2 md:px-3 py-0.5 rounded-full">
                        {product.category}
                      </span>
                      <button
                        onClick={(e) => handleWhatsAppInquiry(e, product)}
                        className="flex items-center gap-0.5 sm:gap-1 text-[6px] sm:text-[8px] md:text-[10px] lg:text-xs bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white px-1 sm:px-2 md:px-3 py-0.5 rounded-full transition-colors"
                      >
                        <svg className="w-2 sm:w-2.5 md:w-3 h-2 sm:h-2.5 md:h-3" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.588 2.034.898 3.149.899 3.18 0 5.766-2.587 5.766-5.767 0-3.18-2.586-5.767-5.766-5.767zm0 10.305c-1.049 0-2.078-.285-2.97-.822l-.212-.125-1.316.346.352-1.274-.137-.216c-.518-.828-.791-1.77-.792-2.732 0-2.657 2.162-4.819 4.822-4.819 2.66 0 4.822 2.162 4.822 4.819 0 2.659-2.162 4.822-4.822 4.822zm2.636-3.95c-.144-.072-.852-.421-.984-.469-.132-.048-.228-.072-.324.072-.096.144-.372.469-.456.565-.084.096-.168.108-.312.036-.144-.072-.608-.224-1.158-.714-.426-.38-.714-.85-.798-1.053-.084-.204-.012-.3.064-.384s.144-.156.192-.24c.048-.084.072-.144.108-.24.036-.096.018-.18-.012-.252-.03-.072-.324-.78-.444-1.068-.108-.264-.216-.228-.3-.24-.084-.012-.18-.012-.276-.012-.096 0-.252.036-.384.18-.132.144-.504.492-.504 1.2 0 .708.516 1.392.588 1.488.072.096.996 1.596 2.448 2.244 1.452.648 1.452.432 1.716.396s.9-.372 1.02-.732c.12-.36.12-.672.084-.732-.036-.06-.132-.096-.264-.168z"/>
                        </svg>
                        <span className="hidden xs:inline">Inquire</span>
                        <span className="xs:hidden">Inquire</span>
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}*/


'use client';

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
  _id: string;
  name: string;
  price: number | null;
  image: string;
  description: string;
  availability: boolean;
  category: string;
  whatsappNumber: string;
  createdAt: string;
}

const categories = ['All', 'Food', 'Fashion', 'Electronics'];

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const fetchProducts = async () => {
    setLoading(true);
    const url = selectedCategory === 'All' 
      ? '/api/products' 
      : `/api/products?category=${selectedCategory}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppInquiry = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    const message = `Hi! I'm interested in ${product.name}. Can you please provide more information?`;
    const whatsappUrl = `https://wa.me/${product.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Full Cover Image on Small Screens */}
      <section className="relative bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/5 py-12 sm:py-16 md:py-20 overflow-hidden">
        {/* Background Image - Visible on small and extra small screens */}
        <div className="absolute inset-0 md:hidden">
          <Image
            src="/hero-image.png"
            alt="Hero"
            fill
            className="object-contain"
            priority
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/0"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px] md:min-h-0">
            {/* Text Content - Visible on all screens */}
            <div className="hidden md:block text-center max-w-3xl mx-auto">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white md:text-transparent md:bg-gradient-to-r from-primary to-secondary md:bg-clip-text">
                Browse. Inquire. Get it
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-white/90 md:text-foreground/70 mb-6 sm:mb-8">
                Discover amazing products. We connect you to products fast.
              </p>
            </div>
          </div>
        </div>

        {/* Decorative background for larger screens */}
        <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-3/4 opacity-10">
          <div className="relative w-full h-full">
            <Image
              src="/hero-image.png"
              alt="Background"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="container mx-auto px-4 py-6 sm:py-10">
        <div className="relative">
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto scrollbar-hide px-2 py-2 scroll-smooth">
            {categories.map((category) => {
              const isActive = selectedCategory === category;

              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`
                    whitespace-nowrap px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium
                    transition-all duration-300 shrink-0
                    border
                    ${
                      isActive
                        ? "bg-primary text-white border-primary shadow-lg scale-105"
                        : "bg-white/10 hover:bg-white/20 border-white/10 text-foreground"
                    }
                  `}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products Grid - Two by Two on Small and Extra Small Screens */}
      <section id="products" className="container mx-auto px-3 sm:px-4 pb-16 sm:pb-20">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-primary"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 sm:py-20">
            <p className="text-lg sm:text-xl text-muted">No products available in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
            {products.map((product) => (
              <Link key={product._id} href={`/product/${product._id}`}>
                <div className="group bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl overflow-hidden hover:transform hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300 shadow-md sm:shadow-lg hover:shadow-xl border border-primary/5">
                  <div className="relative aspect-square sm:aspect-[4/3] md:aspect-square overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {!product.availability && (
                      <div className="absolute top-1.5 sm:top-3 right-1.5 sm:right-3 bg-red-500 text-white px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-xs font-medium">
                        Out of Stock
                      </div>
                    )}
                    {product.price && (
                      <div className="absolute bottom-1.5 sm:bottom-3 left-1.5 sm:left-3 bg-black/60 backdrop-blur-sm text-white px-1.5 sm:px-4 py-0.5 sm:py-1.5 rounded-full text-[10px] sm:text-sm font-bold">
                        Ksh {product.price.toLocaleString()}
                      </div>
                    )}
                  </div>
                  <div className="p-1.5 sm:p-2 md:p-3 lg:p-4">
                    <div className="flex justify-between items-start mb-0.5 sm:mb-1 md:mb-2">
                      <h3 className="text-[10px] sm:text-xs md:text-sm lg:text-base font-semibold line-clamp-1">
                        {product.name}
                      </h3>
                    </div>
                    <p className="text-[8px] sm:text-[10px] md:text-xs text-muted mb-1 sm:mb-1.5 md:mb-2 lg:mb-3 line-clamp-1 sm:line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-[6px] sm:text-[8px] md:text-[10px] lg:text-xs bg-primary/20 text-primary px-1 sm:px-2 md:px-3 py-0.5 rounded-full">
                        {product.category}
                      </span>
                      <button
                        onClick={(e) => handleWhatsAppInquiry(e, product)}
                        className="flex items-center gap-0.5 sm:gap-1 text-[6px] sm:text-[8px] md:text-[10px] lg:text-xs bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white px-1 sm:px-2 md:px-3 py-0.5 rounded-full transition-colors"
                      >
                        <svg className="w-2 sm:w-2.5 md:w-3 h-2 sm:h-2.5 md:h-3" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.588 2.034.898 3.149.899 3.18 0 5.766-2.587 5.766-5.767 0-3.18-2.586-5.767-5.766-5.767zm0 10.305c-1.049 0-2.078-.285-2.97-.822l-.212-.125-1.316.346.352-1.274-.137-.216c-.518-.828-.791-1.77-.792-2.732 0-2.657 2.162-4.819 4.822-4.819 2.66 0 4.822 2.162 4.822 4.819 0 2.659-2.162 4.822-4.822 4.822zm2.636-3.95c-.144-.072-.852-.421-.984-.469-.132-.048-.228-.072-.324.072-.096.144-.372.469-.456.565-.084.096-.168.108-.312.036-.144-.072-.608-.224-1.158-.714-.426-.38-.714-.85-.798-1.053-.084-.204-.012-.3.064-.384s.144-.156.192-.24c.048-.084.072-.144.108-.24.036-.096.018-.18-.012-.252-.03-.072-.324-.78-.444-1.068-.108-.264-.216-.228-.3-.24-.084-.012-.18-.012-.276-.012-.096 0-.252.036-.384.18-.132.144-.504.492-.504 1.2 0 .708.516 1.392.588 1.488.072.096.996 1.596 2.448 2.244 1.452.648 1.452.432 1.716.396s.9-.372 1.02-.732c.12-.36.12-.672.084-.732-.036-.06-.132-.096-.264-.168z"/>
                        </svg>
                        <span className="hidden xs:inline">Inquire</span>
                        <span className="xs:hidden">Inquire</span>
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}