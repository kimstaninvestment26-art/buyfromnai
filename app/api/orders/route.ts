import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Order } from '@/models/Order';
import { Product } from '@/models/Product';

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { productId, customerName, customerPhone, quantity, whatsappMessage } = body;
    
    // Get product details
    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }
    
    const totalPrice = product.price ? product.price * quantity : null;
    
    const order = await Order.create({
      productId,
      productName: product.name,
      customerName,
      customerPhone,
      quantity,
      totalPrice,
      whatsappMessage,
      status: 'Pending',
    });
    
    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const orders = await Order.find().sort({ orderDate: -1 });
    return NextResponse.json({ success: true, orders });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}