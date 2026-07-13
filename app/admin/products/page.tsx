// app/admin/products/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number | null;
  whatsappNumber: string;
  image: string;
  availability: boolean;
  createdAt: string;
}

export default function AdminProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [categories] = useState(['All', 'Food', 'Fashion', 'Electronics', 'Other']);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/products');
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.products);
      } else {
        alert('Failed to fetch products');
      }
    } catch (error) {
      alert('Error fetching products');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        setProducts(products.filter(p => p._id !== id));
        alert('Product deleted successfully');
      } else {
        alert(data.error || 'Failed to delete product');
      }
    } catch (error) {
      alert('Error deleting product');
    }
  };

  const handleToggleAvailability = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ availability: !currentStatus }),
      });

      const data = await response.json();

      if (data.success) {
        setProducts(products.map(p => 
          p._id === id ? { ...p, availability: !currentStatus } : p
        ));
      } else {
        alert(data.error || 'Failed to update product');
      }
    } catch (error) {
      alert('Error updating product');
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-primary/10">
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Manage Products
          </h1>
          <Link
            href="/admin"
            className="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors"
          >
            + Add New Product
          </Link>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border border-primary/20 bg-white/5 focus:outline-none focus:border-primary transition-colors"
          />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 rounded-lg border border-primary/20 bg-white/5 focus:outline-none focus:border-primary transition-colors"
          >
            {categories.map(cat => (
              <option key={cat} value={cat} className="bg-dark text-white">
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted text-lg">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white/5 rounded-xl overflow-hidden border border-primary/10 hover:border-primary transition-all"
              >
                <div className="relative h-48">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        product.availability
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                      }`}
                    >
                      {product.availability ? 'Available' : 'Unavailable'}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold line-clamp-1">{product.name}</h3>
                    <span className="text-sm bg-primary/20 text-primary px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                  </div>

                  <p className="text-sm text-muted line-clamp-2 mb-3">
                    {product.description}
                  </p>

                  <div className="flex justify-between items-center mb-3">
                    <span className="text-lg font-bold text-primary">
                      {product.price ? `Ksh ${product.price.toLocaleString()}` : 'Price on request'}
                    </span>
                    <span className="text-xs text-muted">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleToggleAvailability(product._id, product.availability)}
                      className={`flex-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        product.availability
                          ? 'bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30'
                          : 'bg-green-500/20 text-green-500 hover:bg-green-500/30'
                      }`}
                    >
                      {product.availability ? 'Mark Unavailable' : 'Mark Available'}
                    </button>
                    
                    <Link
                      href={`/admin/products/edit/${product._id}`}
                      className="flex-1 px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-500/20 text-blue-500 hover:bg-blue-500/30 transition-colors text-center"
                    >
                      Edit
                    </Link>
                    
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="flex-1 px-3 py-1.5 rounded-lg text-sm font-medium bg-red-500/20 text-red-500 hover:bg-red-500/30 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="mt-8 pt-6 border-t border-primary/10 flex justify-between text-sm text-muted">
          <span>Total Products: {products.length}</span>
          <span>Showing: {filteredProducts.length}</span>
        </div>
      </div>
    </div>
  );
}