import prisma from "@/app/utils/prismadb.utils";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
      const users = await prisma.user.findMany({
        include:{
            reviews:true,
            orders:true
        }
      });
  
      if(!users){
          return new NextResponse("Can't get users", {
              status: 402,
          });
      }
  
      return NextResponse.json(users,{status:200})
      
    } catch (error) {
      return new NextResponse('Internal Error: ' + error, { status: 500 });
    }
}