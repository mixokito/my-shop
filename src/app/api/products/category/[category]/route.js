import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const category = params.category;
  
  try {
    // ถ้าเป็นหมวดหมู่เสื้อผ้า ให้ดึงทั้งเสื้อผ้าผู้ชายและผู้หญิง
    if (category === 'clothing') {
      const mensClothingResponse = await fetch(`https://fakestoreapi.com/products/category/men's%20clothing`, {
        headers: { 'Content-Type': 'application/json' },
      });
      
      const womensClothingResponse = await fetch(`https://fakestoreapi.com/products/category/women's%20clothing`, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (!mensClothingResponse.ok || !womensClothingResponse.ok) {
        throw new Error('Failed to fetch clothing products');
      }

      const mensClothing = await mensClothingResponse.json();
      const womensClothing = await womensClothingResponse.json();

      // รวมเสื้อผ้าทั้งหมด
      const allClothing = [...mensClothing, ...womensClothing];
      return NextResponse.json({ products: allClothing });
    }

    // หมวดหมู่อื่นๆ ดึงตามปกติ
    const apiResponse = await fetch(`https://fakestoreapi.com/products/category/${category}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!apiResponse.ok) {
      throw new Error('Failed to fetch products for category');
    }

    const productsData = await apiResponse.json();
    return NextResponse.json({ products: productsData });
  } catch (error) {
    console.error(`Error in GET /api/products/category/${category}:`, error);
    return NextResponse.json(
      { message: 'Internal server error', error: error.message },
      { status: 500 }
    );
  }
}