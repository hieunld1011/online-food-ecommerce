import prisma from '@/app/utils/prismadb.utils';
import {  NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const menu = await prisma.product.findMany({
      include:{
        reviews:true,
        orders:true
      }
  });

    if(!menu){
        return NextResponse.json({error:"Can't get product"}, {
            status: 402,
        });
    }

    return NextResponse.json({menu},{status:200})
    
  } catch (error) {
    return NextResponse.json({error:'Internal Error: ' + error}, { status: 500 });
  }
}

export async function POST(req:Request){
  try {
    const body =await req.json()

    const {product,price,category,description,picture,ratings}=body
    

    const isProductExist =await prisma.product.findFirst({
      where:{
        productName:product as string
      },
    })

    if(isProductExist){
      return NextResponse.json({error:"Product already exists"}, {
          status: 402,
      });
    }

    const productUpdated = await prisma.product.create({
      data:{
        productName:product,
        price:price,
        category:category,
        description:description,
        ratings:ratings,
        created_at:new Date(Date.now()),
        picture:[picture]
      }
    })

    return NextResponse.json(productUpdated,{status:200})

  } catch (error) {
    return NextResponse.json({error:'Internal Error: ' + error}, { status: 500 });
  }
}