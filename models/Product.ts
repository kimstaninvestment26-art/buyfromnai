import mongoose, { Schema, models } from 'mongoose';

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
  },
  price: {
    type: Number,
    default: null,
  },
  image: {
    type: String,
    required: [true, 'Product image is required'],
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
  },
  availability: {
    type: Boolean,
    default: true,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Food', 'Fashion', 'Electronics', 'Other'],
  },
  whatsappNumber: {
    type: String,
    required: [true, 'WhatsApp number is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

productSchema.pre('save', function(next) {
  this.updatedAt = new Date();

});

export const Product = models.Product || mongoose.model('Product', productSchema);