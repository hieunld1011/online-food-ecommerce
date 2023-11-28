import prisma from '../utils/prismadb.utils';
import menu from '../data/menu.json';

const pushProduct = async () => {
  try {
    await prisma.product.deleteMany();
    await prisma.product.createMany({
      data: menu,
    });
  } catch (error) {
    console.log(error);
  }
};

pushProduct();
