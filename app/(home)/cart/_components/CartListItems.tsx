'use client';

import Image from 'next/image';
import Link from 'next/link';
import { IoMdAdd, IoMdRemove, IoMdClose } from 'react-icons/io';

import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from '@/app/stores/cartSlices';
import { useAppDispatch } from '@/app/stores/store';
import { CartItem } from '@/app/types/index.types';

const CartListItems = ({ item }: { item: CartItem }) => {
  const dispatch = useAppDispatch();

  return (
    <tr key={item.product.id}>
      <td className='border border-[#eaedff] p-3'>
        <Link
          href={`/products/${item.product.id}`}
          className='flex items-center justify-center'
        >
          <Image
            src={item.product.picture[0]}
            alt={item.product.productName}
            width={75}
            height={75}
            className='aspect-square max-w-[75px]'
          />
        </Link>
      </td>
      <td className='border border-[#eaedff] p-3 text-center font-semibold'>
        {item.product.productName}
      </td>
      <td className='border border-[#eaedff] p-3 text-center font-semibold'>
        ${item.product.price.toFixed(2)}
      </td>
      <td className='border border-[#eaedff] p-3  text-center font-semibold'>
        <div className='flex items-center justify-center border font-medium'>
          <div
            onClick={() => dispatch(decrementQuantity(item.product))}
            className='flex cursor-pointer items-center justify-center p-2 px-1 shadow-[0_0_20px_3px_rgba(0,0,0,0.05)] hover:opacity-70'
          >
            <IoMdRemove size={20} />
          </div>
          <div className='flex flex-1 items-center justify-center border-x bg-[#f8f8f8] px-2 py-2'>
            {item.quantity}
          </div>
          <div
            onClick={() => dispatch(incrementQuantity(item.product))}
            className='flex cursor-pointer items-center justify-center p-2 px-1 shadow-[0_0_20px_3px_rgba(0,0,0,0.05)] hover:opacity-70'
          >
            <IoMdAdd size={20} />
          </div>
        </div>
      </td>
      <td className='border border-[#eaedff] p-3  text-center font-semibold'>
        <div className='flex items-center justify-center'>
          <span>${(item.quantity * item.product.price).toFixed(2)}</span>
          <span
            className='shadow-[0_0_20px_3px_rgba(0, 0, 0, 0.05)] ml-3 cursor-pointer rounded-full border p-1 hover:opacity-70'
            onClick={() => dispatch(removeFromCart(item.product))}
          >
            <IoMdClose size={16} />
          </span>
        </div>
      </td>
    </tr>
  );
};

export default CartListItems;
