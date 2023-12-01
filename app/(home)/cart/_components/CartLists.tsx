'use client';

import { useAppSelector } from '@/app/stores/store';
import React from 'react';
import CartListItems from './CartListItems';
import { totalPriceSelector } from '@/app/stores/cartSlices';
import Link from 'next/link';
import { PATH_CART, PATH_CHECKOUT } from '@/app/routes/router.path';

const CartLists = () => {
  const cart = useAppSelector((state) => state.cart);
  const total = useAppSelector((state) => totalPriceSelector(state));

  return (
    <div className='py-24'>
      <div className='container mx-auto overflow-hidden'>
        <div className='flex flex-col gap-x-4 gap-y-8 lg:flex-row'>
          <div className='flex w-full flex-col lg:w-3/5'>
            <div className='overflow-x-auto'>
              <table className='w-full '>
                <thead>
                  <tr>
                    <th
                      scope='col'
                      className='border border-[#eaedff] p-2 font-semibold'
                    >
                      Product
                    </th>
                    <th
                      scope='col'
                      className='border border-[#eaedff] p-2 font-semibold'
                    >
                      Name
                    </th>
                    <th
                      scope='col'
                      className='border border-[#eaedff] p-2 font-semibold'
                    >
                      Unit Price
                    </th>
                    <th
                      scope='col'
                      className='border border-[#eaedff] p-2 font-semibold'
                    >
                      Quanity
                    </th>
                    <th
                      scope='col'
                      className='border border-[#eaedff] p-2 font-semibold'
                    >
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cart.cartItems.map((item) => (
                    <CartListItems key={item.product.id} item={item} />
                  ))}
                </tbody>
              </table>
            </div>
            <Link
              href={PATH_CART}
              className=' mt-6 max-w-[200px] rounded border bg-yellowColor py-3 text-center capitalize 
              text-white transition-all duration-300 hover:border-black hover:bg-white hover:text-black'
            >
              Continue Shopping
            </Link>
          </div>
          <div className='max-h-[370px] w-full border border-[#eaedff] p-5 lg:w-2/5'>
            <h3 className='mb-6 text-2xl font-bold text-yellowColor'>
              Cart Totals
            </h3>
            <div className='mb-10 flex flex-col'>
              <div className='relative border border-b-0 border-[#eaedff] px-4 py-3 font-semibold'>
                Subtotal
                <span className='absolute right-4 font-normal opacity-70'>
                  ${total}
                </span>
              </div>
              <div className='relative border border-b-0 border-[#eaedff] px-4 py-3 font-semibold'>
                Shipping
                <span className='absolute right-4 font-normal opacity-70'>
                  $30
                </span>
              </div>
              <div className='relative border border-b-0 border-[#eaedff] px-4 py-3 font-semibold'>
                Coupon
                <span className='absolute right-4 font-normal opacity-70'>
                  - $20
                </span>
              </div>
              <div className='relative border border-[#eaedff] px-4 py-3 font-semibold'>
                Total
                <span className='absolute right-4 font-normal opacity-70'>
                  ${total + 10}
                </span>
              </div>
            </div>
            <Link
              href={PATH_CHECKOUT}
              className='rounded border bg-yellowColor px-6 py-3 capitalize text-white transition-all 
              duration-300 hover:border-black hover:bg-white hover:text-black'
            >
              Proceed to checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartLists;
