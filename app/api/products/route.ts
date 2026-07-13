// import { NextResponse } from 'next/server';
// import { connectToDatabase } from '@/lib/mongodb';
// import { Product } from '@/models/Product';

// export async function GET(request: Request) {
//   try {
//     await connectToDatabase();
//     const { searchParams } = new URL(request.url);
//     const category = searchParams.get('category');
    
//     let query = {};
//     if (category && category !== 'All') {
//       query = { category };
//     }
    
//     const products = await Product.find(query).sort({ createdAt: -1 });
//     return NextResponse.json({ success: true, products });
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, error: 'Failed to fetch products' },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Product } from '@/models/Product';

export async function GET(request: Request) {
  console.log('\n========== GET /api/products ==========');

  try {
    console.log('🔄 Connecting to MongoDB...');
    await connectToDatabase();
    console.log('✅ Connected to MongoDB');

    console.log('🌐 Request URL:', request.url);

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    console.log('📂 Category received:', category);

    let query = {};

    if (category && category !== 'All') {
      query = { category };
      console.log('🔍 Filtering products by category:', category);
    } else {
      console.log('📦 Fetching all products');
    }

    console.log('📝 MongoDB Query:', query);

    const products = await Product.find(query).sort({ createdAt: -1 });

    console.log(`✅ Found ${products.length} product(s)`);

    if (products.length > 0) {
      console.log('📌 First product:', {
        id: products[0]._id,
        name: products[0].name,
        category: products[0].category,
        createdAt: products[0].createdAt,
      });
    } else {
      console.log('⚠️ No products matched the query.');
    }

    console.log('========== END GET /api/products ==========\n');

    return NextResponse.json({
      success: true,
      products,
    });
  } catch (error) {
    console.error('❌ Error fetching products');
    console.error(error);

    if (error instanceof Error) {
      console.error('Message:', error.message);
      console.error('Stack:', error.stack);
    }

    console.log('========== END GET /api/products ==========\n');

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch products',
      },
      { status: 500 }
    );
  }
}