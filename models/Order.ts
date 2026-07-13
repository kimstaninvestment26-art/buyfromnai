import mongoose, { Schema, models } from 'mongoose';

const orderSchema = new Schema({
  customerName: {
    type: String,
    required: [true, 'Customer name is required'],
  },
  customerPhone: {
    type: String,
    required: [true, 'Customer phone is required'],
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  totalPrice: {
    type: Number,
    default: null,
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending',
  },
  whatsappMessage: {
    type: String,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

orderSchema.pre('save', function(next) {
  this.updatedAt = new Date();
 
});

export const Order = models.Order || mongoose.model('Order', orderSchema);