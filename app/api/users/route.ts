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
          return NextResponse.json({error:"Can't get users"}, {
              status: 402,
          });
      }
  
      return NextResponse.json(users,{status:200})
      
    } catch (error) {
      return NextResponse.json({error:'Internal Error: ' + error}, { status: 500 });
    }
}