import getUser from "@/app/actions/getUser";
import prisma from "@/app/utils/prismadb.utils";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    try {
        const body =await req.json()
        const user = await getUser()

        const {email,password,phone,username,oldPassword,image}=body

        if(!user){
            return NextResponse.json({error:"Can't find current user"}, { status: 404 });
        }

        const comparePassword = await bcrypt.compare(oldPassword,user.password!)

        if(!comparePassword){
            return NextResponse.json({error:"Old password has to be matched"},{status:403})
        }

        const hashedPassword = await bcrypt.hash(password,12)

        const updatedUser = await prisma.user.update({
            where:{
                id:user.id as string
            },
            data:{
                name:username,
                password:hashedPassword,
                email:email,
                phone:phone,
                image:image
            }
        })

        return NextResponse.json({updatedUser,msg:'Profile updated successfully'},{status:200})

    } catch (error) {
        return new NextResponse('Internal Error: ' + error, { status: 500 });
    }
}