import prisma from '@/app/utils/prismadb.utils';

export default async function getUserById(id:string,userId:string) {
    try {
        const getUser = await prisma.review.findUnique(({
            where:{
                id:id,
                user_id:userId
            },
            include:{
                user:true
            }
        }))

        if(!getUser){
            if (process.env.NODE_ENV === 'development')
                console.log("Can't get user");
            return null;
        }

        return getUser
    } catch (error) {
        if (process.env.NODE_ENV === 'development') console.log(error);
        return null;
    }
}