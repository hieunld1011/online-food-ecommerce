import prisma from '@/app/utils/prismadb.utils';
import {  NextResponse } from 'next/server';

interface IParams{
  productId?:string
}

export async function DELETE(request:Request,{params}:{params:IParams}){
    try {
      const {productId}=params
  
      const isProductExist =await prisma.product.findUnique({
        where:{
          id:productId as string
        }
      })
  
      if(!isProductExist){
        return NextResponse.json({error:"Product not found"}, {
            status: 402,
        });
      }
  
      const deletedProduct =await prisma.product.delete({
        where:{
          id:productId
        }
      })
  
      return NextResponse.json({status:200})
  
    } catch (error) {
      return NextResponse.json({error:'Internal Error: ' + error}, { status: 500 });
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
            reviews:{
              include:{
                user:{
                  select:{
                    name:true
                  }
                }
              }
            }
          }
        })
    
        if(!isProductExist){
          return NextResponse.json({error:"Product not found"}, {
              status: 402,
          });
        }
    
        return NextResponse.json(isProductExist,{status:200})
    
      } catch (error) {
        return NextResponse.json({error:'Internal Error: ' + error}, { status: 500 });
    }
}

export async function PATCH(req:Request,{params}:{params:IParams}){
  try {
    const body =await req.json()
    const {productId}=params

    const {product,price,category}=body

    const isProductExist =await prisma.product.findUnique({
      where:{
        id:productId as string
      },
    })

    if(!isProductExist){
      return NextResponse.json({error:"Product not found"}, {
          status: 402,
      });
    }

    const productUpdated = await prisma.product.update({
      where:{
        id:productId
      },
      data:{
        productName:product,
        price:price,
        category:category
      }
    })

    return NextResponse.json(productUpdated,{status:200})

  } catch (error) {
    return NextResponse.json({error:'Internal Error: ' + error}, { status: 500 });
  }
}