// import { NextResponse } from 'next/server';
// import { connectToDatabase } from '@/lib/mongodb';
// import { Product } from '@/models/Product';
// import { uploadToCloudinary } from '@/lib/cloudinary';

// export async function POST(request: Request) {
//   try {
//     await connectToDatabase();
    
//     const formData = await request.formData();
//     const name = formData.get('name') as string;
//     const description = formData.get('description') as string;
//     const category = formData.get('category') as string;
//     const price = formData.get('price') as string;
//     const whatsappNumber = formData.get('whatsappNumber') as string;
//     const image = formData.get('image') as File;

//     // Validate required fields
//     if (!name || !description || !category || !image) {
//       return NextResponse.json(
//         { success: false, error: 'Name, description, category, and image are required' },
//         { status: 400 }
//       );
//     }

//     // Upload image to Cloudinary
//     let imageUrl = '';
//     try {
//       const uploadResult: any = await uploadToCloudinary(image);
//       imageUrl = uploadResult.secure_url;
//     } catch (uploadError) {
//       return NextResponse.json(
//         { success: false, error: 'Failed to upload image to Cloudinary' },
//         { status: 500 }
//       );
//     }

//     // Create product
//     const product = await Product.create({
//       name,
//       description,
//       category,
//       price: price ? parseFloat(price) : null,
//       whatsappNumber: whatsappNumber || '',
//       image: imageUrl,
//       availability: true,
//     });

//     return NextResponse.json({ 
//       success: true, 
//       product,
//       message: 'Product created successfully'
//     }, { status: 201 });

//   } catch (error) {
//     console.error('Error creating product:', error);
//     return NextResponse.json(
//       { success: false, error: 'Failed to create product' },
//       { status: 500 }
//     );
//   }
// }

// app/api/admin/products/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Product } from '@/models/Product';

export async function GET() {
  try {
    await connectToDatabase();
    
    const products = await Product.find().sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      products,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const price = formData.get('price') as string;
    const whatsappNumber = formData.get('whatsappNumber') as string;
    const image = formData.get('image') as File;

    // Validate required fields
    if (!name || !description || !category || !image) {
      return NextResponse.json(
        { success: false, error: 'Name, description, category, and image are required' },
        { status: 400 }
      );
    }

    // Upload image to Cloudinary
    let imageUrl = '';
    try {
      const { uploadToCloudinary } = await import('@/lib/cloudinary');
      const uploadResult: any = await uploadToCloudinary(image);
      imageUrl = uploadResult.secure_url;
    } catch (uploadError) {
      return NextResponse.json(
        { success: false, error: 'Failed to upload image to Cloudinary' },
        { status: 500 }
      );
    }

    // Create product
    const product = await Product.create({
      name,
      description,
      category,
      price: price ? parseFloat(price) : null,
      whatsappNumber: whatsappNumber || '',
      image: imageUrl,
      availability: true,
    });

    return NextResponse.json({ 
      success: true, 
      product,
      message: 'Product created successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    );
  }
}