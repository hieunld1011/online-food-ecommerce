import prisma from '@/app/utils/prismadb.utils';
import { NextApiRequest } from 'next';
import { NextRequest, NextResponse } from 'next/server';

interface IParams{
  productId?:string
}

export async function DELETE(request:Request,{params}:{params:IParams}){
    try {
      const {productId}=params
  
      const isProductExist = prisma.product.findUnique({
        where:{
          id:productId as string
        }
      })
  
      if(!isProductExist){
        return new NextResponse("Product not found", {
            status: 402,
        });
      }
  
      const deletedProduct = prisma.product.delete({
        where:{
          id:productId
        }
      })
  
      return NextResponse.json({status:200})
  
    } catch (error) {
      return new NextResponse('Internal Error: ' + error, { status: 500 });
    }
}

export async function GET(request:Request,{params}:{params:IParams}){
    try {
        const {productId}=params
    
        const isProductExist =await prisma.product.findUnique({
          where:{
            id:productId as string
          },
          include:{
            reviews:true
          }
        })
    
        if(!isProductExist){
          return new NextResponse("Product not found", {
              status: 402,
          });
        }
    
        return NextResponse.json(isProductExist,{status:200})
    
      } catch (error) {
        return new NextResponse('Internal Error: ' + error, { status: 500 });
    }
}

export async function PATCH(req:Request,{params}:{params:IParams}){
  try {
    const body =await req.json()
    const {productId}=params

    const {product,price}=body

    const isProductExist =await prisma.product.findUnique({
      where:{
        id:productId as string
      },
    })

    if(!isProductExist){
      return new NextResponse("Product not found", {
          status: 402,
      });
    }

    const productUpdated = await prisma.product.update({
      where:{
        id:productId
      },
      data:{
        productName:product,
        price:price
      }
    })

    return NextResponse.json(productUpdated,{status:200})

  } catch (error) {
    return new NextResponse('Internal Error: ' + error, { status: 500 });
  }
}