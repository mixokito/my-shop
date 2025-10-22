import { NextResponse } from 'next/server';

const categories = [
  {
    id: 'electronics',
    name: 'อิเล็กทรอนิกส์',
    path: 'electronics'
  },
  {
    id: 'clothing',
    name: 'เสื้อผ้า',
    path: 'clothing'
  },
  {
    id: 'jewelery',
    name: 'เครื่องประดับ',
    path: 'jewelery'
  }
];

export async function GET() {
  try {
    return NextResponse.json({ categories });
  } catch (error) {
    console.error('Error in GET /api/products/categories:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: error.message },
      { status: 500 }
    );
  }
}