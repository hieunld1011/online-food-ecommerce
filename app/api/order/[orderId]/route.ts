import prisma from "@/app/utils/prismadb.utils";
import { NextResponse } from "next/server";

interface IParams {
    orderId: string;
}  

export async function DELETE(req:Request,{params}:{params:IParams}){
    try {
        const {orderId}=params
        const orders = await prisma.order.findUnique({
            where:{
                id:orderId
            }
          });
      
          if(!orders){
              return NextResponse.json({error:"Can't get order"}, {
                  status: 402,
              });
          }

          const order=await prisma.order.delete({
            where:{
                id:orderId
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
      const {orderId}=params
  
      const {status,delivered,receivedPhone}=body
  
      const isOrderExist =await prisma.order.findUnique({
        where:{
          id:orderId as string
        },
      })
  
      if(!isOrderExist){
        return NextResponse.json({error:"Order not found"}, {
            status: 402,
        });
      }
  
      const orderUpdated = await prisma.order.update({
        where:{
          id:orderId
        },
        data:{
          status:status,
          deliveredTime:delivered,
          receivedPhone:receivedPhone
        }
      })
  
      return NextResponse.json(orderUpdated,{status:200})
  
    } catch (error) {
      return NextResponse.json({error:'Internal Error: ' + error}, { status: 500 });
    }
  }