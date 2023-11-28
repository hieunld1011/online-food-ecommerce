import prisma from '@/app/utils/prismadb.utils';
import { NextApiRequest } from 'next';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const menu = await prisma.product.findMany({
      include:{
        reviews:true,
        orders:true
      }
  });

    if(!menu){
        return new NextResponse("Can't get product", {
            status: 402,
        });
    }

    return NextResponse.json({menu},{status:200})
    
  } catch (error) {
    return new NextResponse('Internal Error: ' + error, { status: 500 });
  }
}

// export async function POST(req:Request){
//   try {
//     const {

//     } 
    
//   } catch (error) {
    
//   }
// }