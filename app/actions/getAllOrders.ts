import prisma from "@/app/utils/prismadb.utils";

const getAllOrders = async ()=>{
    try {
        const orders = await prisma.order.findMany({
            include:{
                userOrder:true,
                productOrder:true
            }
        })

        if(!orders)return []

        return orders

    } catch (error) {
        console.log(error)
        return []
    }
}

export default getAllOrders