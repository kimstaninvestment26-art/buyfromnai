// app/api/admin/products/[id]/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Product } from '@/models/Product';
import mongoose from 'mongoose';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const formData = await request.formData();
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const price = formData.get('price') as string;
    const whatsappNumber = formData.get('whatsappNumber') as string;
    const availability = formData.get('availability') === 'true';
    const image = formData.get('image') as File | null;

    // Validate required fields
    if (!name || !description || !category) {
      return NextResponse.json(
        { success: false, error: 'Name, description, and category are required' },
        { status: 400 }
      );
    }

    // Check if product exists
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    // Prepare update data
    const updateData: any = {
      name,
      description,
      category,
      price: price ? parseFloat(price) : null,
      whatsappNumber: whatsappNumber || '',
      availability,
      updatedAt: new Date(),
    };

    // Upload new image if provided
    if (image) {
      try {
        const { uploadToCloudinary } = await import('@/lib/cloudinary');
        const uploadResult: any = await uploadToCloudinary(image);
        updateData.image = uploadResult.secure_url;
      } catch (uploadError) {
        return NextResponse.json(
          { success: false, error: 'Failed to upload image to Cloudinary' },
          { status: 500 }
        );
      }
    }

    // Update product
    const product = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    return NextResponse.json({
      success: true,
      product,
      message: 'Product updated successfully'
    });

  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const body = await request.json();
    const { availability } = body;

    if (typeof availability !== 'boolean') {
      return NextResponse.json(
        { success: false, error: 'Availability must be a boolean' },
        { status: 400 }
      );
    }

    const product = await Product.findByIdAndUpdate(
      id,
      { 
        availability, 
        updatedAt: new Date() 
      },
      { new: true, runValidators: true }
    );

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      product,
      message: 'Product availability updated successfully'
    });
  } catch (error) {
    console.error('Error updating product availability:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update product availability' },
      { status: 500 }
    );
  }
}