import prisma from "@/app/utils/prismadb.utils";

export const getProductDetails=async(productId:string)=>{
   try {
    const product = await prisma.product.findUnique({
        where:{
            id:productId as string
        },
        include:{
            reviews:true,
        }
    })

    if(!product)return null

    return product

   } catch (error) {
        console.log(error)
        return null
   }
}

export default getProductDetails