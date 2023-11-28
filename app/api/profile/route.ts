import getUser from "@/app/actions/getUser";
import prisma from "@/app/utils/prismadb.utils";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    try {
        const body =await req.json()
        const user = await getUser()

        const {email,password,phone,username,oldPassword}=body

        if(!user){
            return new NextResponse("Can't find current user", { status: 404 });
        }

        const comparePassword = await bcrypt.compare(oldPassword,user.password!)

        if(!comparePassword){
            return new NextResponse("Wrong password",{status:403})
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
                phone:phone
            }
        })

        return NextResponse.json(updatedUser)

    } catch (error) {
        return new NextResponse('Internal Error: ' + error, { status: 500 });
    }
}