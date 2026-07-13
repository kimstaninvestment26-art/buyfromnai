// app/admin/products/edit/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const categories = ['Food', 'Fashion', 'Electronics', 'Other'];

interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number | null;
  whatsappNumber: string;
  image: string;
  availability: boolean;
}

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Food',
    price: '',
    whatsappNumber: '',
    availability: true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Unwrap params using React.use()
  const unwrappedParams = params instanceof Promise ? params : Promise.resolve(params);
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { id } = await unwrappedParams;
        const response = await fetch(`/api/admin/products/${id}`);
        const data = await response.json();

        if (data.success) {
          const product = data.product;
          setProduct(product);
          setFormData({
            name: product.name,
            description: product.description,
            category: product.category,
            price: product.price?.toString() || '',
            whatsappNumber: product.whatsappNumber || '',
            availability: product.availability,
          });
          setImagePreview(product.image);
        } else {
          alert('Product not found');
          router.push('/admin/products');
        }
      } catch (error) {
        alert('Error fetching product');
        router.push('/admin/products');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [router, unwrappedParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { id } = await unwrappedParams;
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('whatsappNumber', formData.whatsappNumber);
      formDataToSend.append('availability', String(formData.availability));
      
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }

      const response = await fetch(`/api/admin/products/${id}`, {
        method: 'PUT',
        body: formDataToSend,
      });

      const data = await response.json();

      if (data.success) {
        alert('Product updated successfully!');
        router.push('/admin/products');
      } else {
        alert(data.error || 'Failed to update product');
      }
    } catch (error) {
      alert('An error occurred while updating the product');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-primary/10">
        <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Edit Product
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Product Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-primary/20 bg-white/5 focus:outline-none focus:border-primary transition-colors"
              placeholder="e.g., Fresh Organic Tomatoes"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-primary/20 bg-white/5 focus:outline-none focus:border-primary transition-colors resize-none"
              placeholder="Describe your product..."
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-primary/20 bg-white/5 focus:outline-none focus:border-primary transition-colors"
            >
              {categories.map(cat => (
                <option key={cat} value={cat} className="bg-dark text-white">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Price (Optional)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              step="0.01"
              min="0"
              className="w-full px-4 py-3 rounded-lg border border-primary/20 bg-white/5 focus:outline-none focus:border-primary transition-colors"
              placeholder="e.g., 2500"
            />
          </div>

          {/* WhatsApp Number */}
          <div>
            <label className="block text-sm font-medium mb-2">
              WhatsApp Number (for inquiries)
            </label>
            <input
              type="tel"
              name="whatsappNumber"
              value={formData.whatsappNumber}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border border-primary/20 bg-white/5 focus:outline-none focus:border-primary transition-colors"
              placeholder="e.g., 2348012345678 (country code + number)"
            />
          </div>

          {/* Availability */}
          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="availability"
                checked={formData.availability}
                onChange={handleInputChange}
                className="w-5 h-5 text-primary border-primary/20 rounded focus:ring-primary"
              />
              <span className="text-sm font-medium">Product is available</span>
            </label>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Product Image
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-48 rounded-lg border-2 border-dashed border-primary/30 bg-white/5 hover:border-primary transition-colors cursor-pointer">
                {imagePreview ? (
                  <div className="relative w-full h-full">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-full object-contain p-4"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setImageFile(null);
                        setImagePreview(null);
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-10 h-10 mb-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="mb-2 text-sm text-muted">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted">
                      PNG, JPG, JPEG (Max 5MB)
                    </p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => router.push('/admin/products')}
              className="flex-1 py-3 rounded-full font-semibold bg-gray-500/20 hover:bg-gray-500/30 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className={`flex-1 py-3 rounded-full font-semibold text-white transition-all ${
                saving 
                  ? 'bg-gray-500 cursor-not-allowed' 
                  : 'bg-primary hover:bg-primary-dark shadow-lg hover:shadow-xl'
              }`}
            >
              {saving ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                'Update Product'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}