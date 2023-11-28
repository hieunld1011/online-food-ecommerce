import prisma from "@/app/utils/prismadb.utils";

const getOtherProducts = async (productId:string)=>{
   try {
    const currentProduct = await prisma.product.findUnique({
        where:{
            id:productId as string
        }
    })

    const products = await prisma.product.findMany({
        where:{
            category:currentProduct?.category,
            NOT:{
                id:productId as string
            }
        }
    })

    if(!products)return []

    return products

   } catch (error) {
        console.log(error)
        return []
   }
}

export default getOtherProducts 