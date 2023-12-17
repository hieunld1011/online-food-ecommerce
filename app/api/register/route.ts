import { NextResponse } from 'next/server';
import prisma from '@/app/utils/prismadb.utils';
import bcrypt from 'bcrypt';

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    const { name, phone, password, email } = body;

    if (!name || !phone || !password || !email) {
      return NextResponse.json({error:'Missing info, please fill all the input'}, {
        status: 400,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email: email,
        phone: phone,
        password: hashedPassword,
        name: name,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({error:'Internal Error: ' + error}, { status: 500 });
  }
};
