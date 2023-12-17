import prisma from "@/app/utils/prismadb.utils";
import { NextResponse } from "next/server";

interface IParams {
    userId: string;
}  

export async function DELETE(req:Request,{params}:{params:IParams}){
    try {
        const {userId}=params
        const users = await prisma.user.findUnique({
            where:{
                id:userId
            }
          });
      
          if(!users){
              return NextResponse.json({error:"Can't get user"}, {
                  status: 402,
              });
          }

          const user=await prisma.user.delete({
            where:{
                id:userId
            }
          })
      
          return NextResponse.json({status:200})
    } catch (error) {
      return NextResponse.json({error:'Internal Error: ' + error}, { status: 500 });
    }
}

export async function PATCH(req:Request,{params}:{params:IParams}){
    try {
      const body =await req.json()
      const {userId}=params
  
      const {name,role,phone}=body
  
      const isUserExist =await prisma.user.findUnique({
        where:{
          id:userId as string
        },
      })
  
      if(!isUserExist){
        return NextResponse.json({error:"User not found"}, {
            status: 402,
        });
      }
  
      const userUpdated = await prisma.user.update({
        where:{
          id:userId
        },
        data:{
          name:name,
          role:role,
          phone:phone
        }
      })
  
      return NextResponse.json(userUpdated,{status:200})
  
    } catch (error) {
      return NextResponse.json({error:'Internal Error: ' + error}, { status: 500 });
    }
  }