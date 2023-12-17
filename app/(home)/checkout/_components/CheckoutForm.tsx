'use client';

import { PATH_SHOP } from '@/app/routes/router.path';
import {
  clearCart,
  totalCartItemSelector,
  totalPriceSelector,
} from '@/app/stores/cartSlices';
import { useAppDispatch, useAppSelector } from '@/app/stores/store';
import handleAxiosError from '@/app/utils/axiosError';
import { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

const CheckoutForm = ({ user }: { user: User }) => {
  const cart = useAppSelector((state) => state.cart);
  const total = useAppSelector((state) => totalPriceSelector(state));
  const quantity = useAppSelector((state) => totalCartItemSelector(state));
  const regExpNumber = new RegExp(
    /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/g
  );
  const dispatch = useAppDispatch();

  const router = useRouter();
  const listProducts = cart.cartItems.map((item) => item.product.id) || [];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const onSubmitHandler: SubmitHandler<FieldValues> = (data) => {
    axios
      .post('/api/order', {
        ...data,
        quantity: quantity,
        userId: user.id,
        productIds: listProducts,
        total: parseFloat((total + 10).toFixed(2)),
      })
      .then((res) => {
        if (res.status === 200) {
          router.push(PATH_SHOP);
          dispatch(clearCart());
        }
      })
      .catch((err) => handleAxiosError(err));
  };

  return (
    <div className='py-24'>
      <div className='container mx-auto'>
        <form
          className='flex flex-col gap-8 md:flex-row'
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <div className='max-h-[585px] flex-1 border p-7'>
            <h3 className='mb-5 text-xl font-semibold text-yellowColor'>
              Details Information
            </h3>
            <div className='flex flex-col'>
              <div className='mb-5 flex flex-col'>
                <label htmlFor='address' className='mb-2 font-semibold'>
                  Address
                  <span className='text-redColor'>*</span>
                </label>
                <input
                  type='text'
                  id='address'
                  className='border px-4 py-2 outline-none'
                  placeholder='Enter your Address'
                  {...register('address', { required: true })}
                />
                <div className='absolute bottom-[calc(70%)] right-0 mt-1 text-right text-xs text-invalidColor'>
                  {errors['address']?.message as string}
                </div>
              </div>
              <div className='relative mb-5 flex flex-col'>
                <label htmlFor='receivedPhone' className='mb-2 font-semibold'>
                  Phone
                  <span className='text-redColor'>*</span>
                </label>
                <input
                  type='text'
                  id='receivedPhone'
                  className='border px-4 py-2 outline-none'
                  placeholder='Enter your phone number'
                  {...register('receivedPhone', {
                    required: true,
                    pattern: regExpNumber,
                  })}
                />
                <div className='absolute bottom-[calc(70%)] right-0 mt-1 text-right text-xs text-invalidColor'>
                  {errors['receivedPhone']?.message as string}
                </div>
              </div>
              <textarea
                className='mt-4 min-h-[150px] border px-4 py-2 text-sm outline-none'
                id='notes'
                placeholder='Order Notes'
                {...register('notes')}
              />
            </div>
          </div>
          <div className='flex-1 border p-7'>
            <h3 className='mb-5 text-xl font-semibold text-yellowColor'>
              Your Order
            </h3>
            <table className='w-full text-left'>
              <thead>
                <tr>
                  <th scope='col' className='border px-5 py-4 text-lg'>
                    Product Name
                  </th>
                  <th scope='col' className='border px-5 text-lg'>
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {cart.cartItems.map((item) => (
                  <tr key={item.product.id}>
                    <td className='border px-5 py-3'>
                      {item.product.productName}
                    </td>
                    <td className='border px-5 py-3'>
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className='border px-5 py-3 font-semibold'>
                    Cart Subtotal
                  </td>
                  <td className='border px-5 py-3 font-semibold'>
                    ${total.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className='border px-5 py-3 font-semibold'>Shipping</td>
                  <td className='border px-5 py-3 font-semibold text-redColor'>
                    $30.00
                  </td>
                </tr>
                <tr>
                  <td className='border px-5 py-3 font-semibold'>Coupon</td>
                  <td className='border px-5 py-3 font-semibold text-greenColor'>
                    -$20.00
                  </td>
                </tr>
                <tr>
                  <td className='border px-5 py-3 text-lg font-semibold'>
                    Order Total
                  </td>
                  <td className='border px-5 py-3 text-lg font-semibold'>
                    ${(total + 10).toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              type='submit'
              className='mt-6 w-full rounded border bg-yellowColor px-6 py-3 capitalize 
              text-white transition-all duration-300 hover:border-black hover:bg-white hover:text-black'
            >
              Confirm Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
