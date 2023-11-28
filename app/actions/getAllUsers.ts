import prisma from "@/app/utils/prismadb.utils";

const getAllUsers = async ()=>{
    try {
        const users = await prisma.user.findMany({
            include:{
                orders:true,
                reviews:true
            }
        })

        if(!users)return []

        return users

    } catch (error) {
        console.log(error)
        return []
    }
}

export default getAllUsers