import { Product } from '@prisma/client';
import Link from 'next/link';
import { IoMdAdd, IoMdRemove, IoMdClose } from 'react-icons/io';

import { useAppDispatch } from '../../stores/store';
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from '../../stores/cartSlices';
import Image from 'next/image';

const CartItems = ({ quantity, item }: { quantity: number; item: Product }) => {
  const dispatch = useAppDispatch();

  const { id, productName, picture, price } = item;

  return (
    <div
      className='flex w-full gap-x-4 border-b border-gray-200 
        py-2 font-light text-gray-500 lg:px-6'
    >
      <div className='flex w-full items-center gap-x-4 py-2'>
        <Link
          href={`/products/${id}`}
          className='relative min-h-[70px] min-w-[55px]'
        >
          <Image
            className='max-h-[80px] max-w-[80px]'
            fill
            src={picture[0]}
            alt={productName}
          />
        </Link>
        <div className='flex w-full flex-col'>
          <div className='mb-2 flex justify-between'>
            <Link
              href={`/products/${id}`}
              className='max-w-[240px] font-medium
                        uppercase hover:underline'
            >
              {productName}
            </Link>
            <div
              onClick={() => dispatch(removeFromCart(item))}
              className='cursor-pointer text-xl'
            >
              <IoMdClose className='text-redColor transition-all duration-300 hover:opacity-70' />
            </div>
          </div>
          <div className='flex h-[36px] gap-x-3 text-sm'>
            <div
              className='flex h-full max-w-[100px] flex-1
                        items-center border font-medium'
            >
              <div
                onClick={() => dispatch(decrementQuantity(item))}
                className='flex h-full flex-1 cursor-pointer items-center justify-center px-1'
              >
                <IoMdRemove />
              </div>
              <div className='flex h-full items-center justify-center border-x px-2'>
                {quantity}
              </div>
              <div
                onClick={() => dispatch(incrementQuantity(item))}
                className='flex h-full flex-1 cursor-pointer items-center justify-center px-1'
              >
                <IoMdAdd />
              </div>
            </div>
            <div className='flex flex-1 items-center justify-around'>
              ${price}
            </div>
            <div className='flex flex-1  items-center justify-end font-medium'>
              {`$ ${(price * quantity).toFixed(2)}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
