import prisma from '@/app/utils/prismadb.utils';
// import { useCookies } from "next-client-cookies";

import getSession from './getSession';

export default async function getUser() {
  try {
    const session = await getSession();
    // const cookies=useCookies();

    if (!session?.user?.email) {
      if (process.env.NODE_ENV === 'development')
        console.log("Session doesn't exist");
      return null;
    }

    // if(cookies.get('accessToken')){
    //     const loggedUser = await prisma.account.findFirst({
    //         where:{
    //             access_token:cookies.get('accessToken') as string,
    //         },
    //         include:{
    //             user:true
    //         }
    //     })

    //     if(!loggedUser){
    //         if (process.env.NODE_ENV === 'development')
    //             console.log("User doesn't exist");
    //         return null
    //     }

    //     return loggedUser
    // }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      if (process.env.NODE_ENV === 'development')
        console.log("User doesn't exist");
      return null;
    }

    return currentUser;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') console.log(error);
    return null;
  }
}
