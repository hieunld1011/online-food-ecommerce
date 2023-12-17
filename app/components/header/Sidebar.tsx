import { IoMdArrowForward } from 'react-icons/io';
import { FiTrash2 } from 'react-icons/fi';

import { useAppDispatch, useAppSelector } from '@/app/stores/store';
import Link from 'next/link';
import { PATH_CART } from '@/app/routes/router.path';
import { useRef, useEffect } from 'react';
import clsx from 'clsx';
import CartItems from '../CartItems/CartItems';
import {
  clearCart,
  totalCartItemSelector,
  totalPriceSelector,
} from '@/app/stores/cartSlices';
import { useSidebarContext } from '@/app/context/BarContext';
import useOutsideClose from '@/app/hooks/useOutsideClose';

const Sidebar = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebarContext();
  const clickRef = useRef<HTMLDivElement>(null);
  useOutsideClose(clickRef);

  const cart = useAppSelector((state) => state.cart);
  const total = useAppSelector((state) => totalPriceSelector(state));
  const quantity = useAppSelector((state) => totalCartItemSelector(state));
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isSidebarOpen]);

  return (
    <div
      className={clsx(
        ` fixed top-0 z-20 h-full w-full
        overflow-y-auto bg-white px-4 shadow-2xl transition-all
        duration-300 md:w-[35vw] lg:px-[35px] xl:max-w-[30vw]`,
        isSidebarOpen ? 'right-0' : '-right-full'
      )}
      ref={clickRef}
    >
      <div className='flex items-center justify-between border-b py-6'>
        <div className='text-sm font-semibold uppercase'>
          Shopping Bag ({quantity})
        </div>
        <div
          className='flex h-8 w-8 cursor-pointer items-center justify-center'
          onClick={() => setIsSidebarOpen(false)}
        >
          <IoMdArrowForward className='text-2xl' />
        </div>
      </div>
      <div className='flex-col gap-y-2 overflow-x-hidden border-b'>
        {cart.cartItems.map((item) => {
          return (
            <CartItems
              key={item.product.id}
              item={item.product}
              quantity={item.quantity}
            />
          );
        })}
      </div>
      <div className='mt-4 flex w-full flex-col gap-y-3 py-4'>
        <div className='flex w-full items-center justify-between'>
          <div className='font-semibold uppercase'>
            <span className='mr-2'>Total:</span>${total.toFixed(2)}
          </div>
          <div
            className='flex h-12 w-12 cursor-pointer items-center justify-center
                      bg-red-500 py-4 text-xl text-white'
            onClick={() => dispatch(clearCart())}
          >
            <FiTrash2 />
          </div>
        </div>
        <Link
          href={PATH_CART}
          className='bg-primary flex w-full items-center justify-center 
                      bg-gray-200 p-4 font-medium transition-all duration-300
                      hover:bg-black hover:text-white'
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
