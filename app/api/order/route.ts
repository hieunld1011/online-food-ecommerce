import prisma from "@/app/utils/prismadb.utils";
import { NextResponse } from "next/server";

export const POST = async (req:Request)=>{
    try {
        const body = await req.json()

        const {notes,receivedPhone,address,quantity,productIds,userId,total}=body

        if(!quantity){
            return NextResponse.json({error:"Product cant be under 0"},{status:400})
        }

        const newOrder = await prisma.order.create({
            data:{
                notes,
                receivedPhone,
                address,
                quantity,
                total,
                userOrder:{
                    connect:{
                        id:userId
                    }
                },
                productOrder:{
                    connect:[
                        ...productIds.map((product:string)=>{
                            return{
                                id:product
                            }
                        })
                    ]
                }
            },
            include:{
                userOrder:true,
                productOrder:true
            }
        })

        return NextResponse.json(newOrder)
        
    } catch (error) {
        return NextResponse.json({error:'Internal Error: ' + error}, { status: 500 });
    }
}

export const GET = async(req:Request)=>{
    try {
        const orders=await prisma.order.findMany({
            include:{
                userOrder:true
            }
        })

        return NextResponse.json(orders,{status:200})
        
    } catch (error) {
        return NextResponse.json({error:'Internal Error: ' + error}, { status: 500 });
    }
}