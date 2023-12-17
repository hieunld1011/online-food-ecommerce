import getUser from "@/app/actions/getUser";
import prisma from "@/app/utils/prismadb.utils";
import { NextResponse } from "next/server";

export const POST = async (req:Request)=>{
    try {
        const user = await getUser()
        const body = await req.json()

        const {comment,rating,productId}=body

        const isUserReview = await prisma.review.findFirst({
            where:{
                user_id:user?.id,
                product_id:productId
            }
        })
        
        if(isUserReview)return NextResponse.json({error:"You have already post a review"}, {
            status: 403,
        });

        const newReview = await prisma.review.create({
            data:{
                rating,
                comment,
                user:{
                    connect:{
                        id:user?.id
                    }
                },
                product:{
                    connect:{
                        id:productId
                    }
                }
            },
            include:{
                user:true,
                product:true
            }
        })

        const updatedProduct = await prisma.product.update({
            where:{
                id:productId
            },
            data:{
                reviews:{
                    connect:{
                        id:newReview.id
                    }
                }
            }
        })

        return NextResponse.json(newReview)
        
    } catch (error) {
        return NextResponse.json({error:'Internal Error: ' + error}, { status: 500 });
    }
}