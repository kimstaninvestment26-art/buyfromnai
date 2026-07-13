/*'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Product } from '@/types/product';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [showOrderForm, setShowOrderForm] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [params.id]);

  const fetchProduct = async () => {
    const response = await fetch(`/api/products/${params.id}`);
    const data = await response.json();
    if (data.success) {
      setProduct(data.product);
    }
    setLoading(false);
  };

  const handleWhatsAppInquiry = () => {
    const message = `Hi! I'm interested in ${product?.name}. I'd like to know more about this product.`;
    const whatsappUrl = `https://wa.me/${product?.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const orderData = {
      productId: product?._id,
      customerName,
      customerPhone,
      quantity,
      whatsappMessage: `Order inquiry for ${product?.name} - Quantity: ${quantity}`,
    };
    
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });
    
    const data = await response.json();
    if (data.success) {
      // Send WhatsApp message with order details
      const message = `Hi! I would like to place an order:\n\nProduct: ${product?.name}\nQuantity: ${quantity}\nName: ${customerName}\nPhone: ${customerPhone}\n\nOrder ID: ${data.order._id}`;
      const whatsappUrl = `https://wa.me/${product?.whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      
      router.push(`/order/confirmation/${data.order._id}`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold mb-4">Product not found</h2>
        <Link href="/" className="text-primary hover:underline">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center text-primary hover:underline mb-6">
        ← Back to Products
      </Link>
      
      <div className="grid md:grid-cols-2 gap-12">
        {/* Product Image *
        <div className="rounded-xl overflow-hidden shadow-xl">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto object-cover"
          />
        </div>
        
        {/* Product Info *
        <div>
          <div className="mb-6">
            <span className="inline-block bg-primary/20 text-primary px-3 py-1 rounded-full text-sm mb-3">
              {product.category}
            </span>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            {product.price && (
              <p className="text-3xl text-primary font-bold">
                ₦{product.price.toLocaleString()}
              </p>
            )}
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-muted leading-relaxed">{product.description}</p>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Availability:</span>
              <span className={product.availability ? 'text-secondary' : 'text-red-500'}>
                {product.availability ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>
          
          {product.availability && (
            <div className="space-y-4">
              {!showOrderForm ? (
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowOrderForm(true)}
                    className="flex-1 bg-primary text-white py-3 rounded-full font-semibold hover:bg-primary-dark transition-colors"
                  >
                    Place Order
                  </button>
                  <WhatsAppButton
                    phoneNumber={product.whatsappNumber}
                    productName={product.name}
                    variant="outline"
                  />
                </div>
              ) : (
                <form onSubmit={handleOrderSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Quantity</label>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                      className="w-full px-4 py-2 rounded-lg border border-primary/20 bg-white/5 focus:outline-none focus:border-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Name</label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-primary/20 bg-white/5 focus:outline-none focus:border-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Phone Number</label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-primary/20 bg-white/5 focus:outline-none focus:border-primary"
                      required
                    />
                  </div>
                  
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="flex-1 bg-primary text-white py-2 rounded-full font-semibold hover:bg-primary-dark transition-colors"
                    >
                      Submit Order
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowOrderForm(false)}
                      className="flex-1 bg-gray-500 text-white py-2 rounded-full font-semibold hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}*/

'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
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

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [params.id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${params.id}`);
      const data = await response.json();
      if (data.success) {
        setProduct(data.product);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppInquiry = () => {
    if (!product) return;
    const message = `Hi! I'm interested in ${product.name}. Can you please provide more information?`;
    const whatsappUrl = `https://wa.me/${product.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-semibold mb-4">Product not found</h2>
        <Link href="/" className="text-primary hover:underline">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Link href="/" className="inline-flex items-center text-primary hover:underline mb-6">
        ← Back to Products
      </Link>
      
      <div className="grid md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="rounded-xl overflow-hidden shadow-xl bg-gradient-to-br from-primary/5 to-accent/5">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto object-cover"
          />
        </div>
        
        {/* Product Info */}
        <div className="flex flex-col justify-center">
          <div className="mb-6">
            <span className="inline-block bg-primary/20 text-primary px-3 py-1 rounded-full text-sm mb-3">
              {product.category}
            </span>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            {product.price && (
              <p className="text-3xl text-primary font-bold">
                Ksh {product.price.toLocaleString()}
              </p>
            )}
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-muted leading-relaxed">{product.description}</p>
          </div>
          
          <div className="mb-8">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Availability:</span>
              <span className={product.availability ? 'text-secondary' : 'text-red-500'}>
                {product.availability ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>
          
          {product.availability && (
            <button
              onClick={handleWhatsAppInquiry}
              className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white py-4 rounded-full font-semibold transition-colors shadow-lg hover:shadow-xl text-lg"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.588 2.034.898 3.149.899 3.18 0 5.766-2.587 5.766-5.767 0-3.18-2.586-5.767-5.766-5.767zm0 10.305c-1.049 0-2.078-.285-2.97-.822l-.212-.125-1.316.346.352-1.274-.137-.216c-.518-.828-.791-1.77-.792-2.732 0-2.657 2.162-4.819 4.822-4.819 2.66 0 4.822 2.162 4.822 4.819 0 2.659-2.162 4.822-4.822 4.822zm2.636-3.95c-.144-.072-.852-.421-.984-.469-.132-.048-.228-.072-.324.072-.096.144-.372.469-.456.565-.084.096-.168.108-.312.036-.144-.072-.608-.224-1.158-.714-.426-.38-.714-.85-.798-1.053-.084-.204-.012-.3.064-.384s.144-.156.192-.24c.048-.084.072-.144.108-.24.036-.096.018-.18-.012-.252-.03-.072-.324-.78-.444-1.068-.108-.264-.216-.228-.3-.24-.084-.012-.18-.012-.276-.012-.096 0-.252.036-.384.18-.132.144-.504.492-.504 1.2 0 .708.516 1.392.588 1.488.072.096.996 1.596 2.448 2.244 1.452.648 1.452.432 1.716.396s.9-.372 1.02-.732c.12-.36.12-.672.084-.732-.036-.06-.132-.096-.264-.168z"/>
              </svg>
              Inquire on WhatsApp
            </button>
          )}
        </div>
      </div>
    </div>
  );
}