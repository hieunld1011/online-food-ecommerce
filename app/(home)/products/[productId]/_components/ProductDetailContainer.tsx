'use client';

import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

import { IoMdAdd, IoMdRemove, IoMdClose } from 'react-icons/io';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import { Fragment, useEffect, useState, useCallback } from 'react';
import { User } from '@prisma/client';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Dialog, Transition } from '@headlessui/react';

import { ProductDetailsType } from '@/app/types/products.types';
import { useAppDispatch } from '@/app/stores/store';
import { addToCart } from '@/app/stores/cartSlices';
import { PATH_LOGIN } from '@/app/routes/router.path';
import { Rating } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import handleAxiosError from '@/app/utils/axiosError';

interface IParams {
  productId: string;
}

const productDetailInit = {
  id: '',
  productName: '',
  category: '',
  price: 0.0,
  description: '',
  ratings: 0.0,
  created_at: new Date(Date.now()),
  updated_at: new Date(Date.now()),
  picture: [],
  reviews: [
    {
      id: '',
      user: {
        name: '',
      },
      comment: '',
      rating: 0,
      created_at: new Date(Date.now()),
      updated_at: new Date(Date.now()),
      product_id: '',
      user_id: '',
    },
  ],
  orderIds: [],
};

const ProductDetailContainer = ({
  // productDetail,
  params,
  user,
}: {
  // productDetail: ProductDetailsType;
  user: User;
  params: IParams;
}) => {
  const closedTime = 22,
    openedTime = 6;
  const currentTime = new Date().getHours();

  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState<number>(0);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);
  const [rating, setRating] = useState<number | null>(0);
  const [productDetail, setProductDetail] =
    useState<ProductDetailsType>(productDetailInit);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      comment: '',
      rating: 0,
    },
  });

  const fetchData = useCallback(async () => {
    await axios
      .get(`/api/products/${params.productId}`)
      .then((res) => {
        const { data } = res;
        setProductDetail(data);
      })
      .catch((err) => handleAxiosError(err));
  }, [params.productId]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    await axios
      .post('/api/review', {
        ...data,
        productId: productDetail.id,
      })
      .then((res) => {
        if (res.status === 200) toast.success('User updated successfully');
      })
      .catch((err) => handleAxiosError(err));
    setValue('rating', 0);
    setValue('comment', '');
    setRating(0);
    await fetchData();
  };

  const handleAddButton = () => {
    if (quantity == 0) return;
    dispatch(addToCart({ product: productDetail, count: quantity }));
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className='py-24'>
      <section className='container mx-auto'>
        <div className='flex flex-col items-center justify-center gap-y-6 md:flex-row md:items-start'>
          <div className='w-2/5 gap-x-8'>
            <Link
              href={'/'}
              className='flex items-center justify-center rounded-xl border-0 md:border'
            >
              <Image
                src={productDetail?.picture[0]}
                alt={productDetail?.productName}
                width={250}
                height={250}
                className='min-w-[150px]'
              />
            </Link>
          </div>
          <div className='flex flex-1 flex-col pl-7'>
            <h3 className='mb-2 text-2xl font-semibold text-yellowColor md:text-4xl'>
              {productDetail?.productName}
            </h3>
            <span className='mb-2 font-bold'>
              $ <span className='text-yellowColor'>{productDetail?.price}</span>
            </span>
            <span className='mb-2 flex items-center text-yellowColor'>
              {[1, 2, 3, 4, 5].map((index) =>
                index < Math.ceil(productDetail?.ratings || 0) ? (
                  <FaStar key={index} />
                ) : index === Math.ceil(productDetail?.ratings || 0) ? (
                  <FaStarHalfAlt key={index} />
                ) : (
                  <FaRegStar key={index} />
                )
              )}
              <span className='ml-3 translate-y-[2px] text-sm text-black'>
                {productDetail?.ratings || 0} Ratings
              </span>
            </span>
            <p className='mb-4 opacity-70'>{productDetail?.description}</p>
            <span className='mb-2 font-medium'>
              Availability:{' '}
              <span
                className={clsx(
                  `font-semibold`,
                  currentTime < openedTime || currentTime > closedTime
                    ? 'text-redColor'
                    : 'text-greenColor'
                )}
              >
                {currentTime < openedTime || currentTime > closedTime
                  ? 'Closed'
                  : 'In Stock'}
              </span>
            </span>
            <span className='mb-4'>
              Category:{' '}
              <span className='font-semibold capitalize text-yellowColor'>
                {productDetail?.category}
              </span>
            </span>
            <div className='mt-5 flex'>
              <div
                className='flex h-full max-w-[150px] items-center
                        border bg-[#fafafa] font-medium'
              >
                <div
                  className='flex h-full flex-1 cursor-pointer items-center justify-center p-1 md:p-3'
                  onClick={() => {
                    if (quantity === 0) return;
                    setQuantity(quantity - 1);
                  }}
                >
                  <IoMdRemove size={25} />
                </div>
                <div className='flex h-full items-center justify-center border-x p-1 md:px-4 md:py-3'>
                  {quantity}
                </div>
                <div
                  className='flex h-full flex-1 cursor-pointer items-center justify-center p-1 md:p-3'
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <IoMdAdd size={25} />
                </div>
              </div>
              <button
                type='button'
                onClick={handleAddButton}
                className='ml-5 rounded border border-yellowColor bg-yellowColor px-2 text-lg font-semibold text-white transition-all
                    duration-300 hover:border-black hover:bg-white hover:text-black md:px-6 md:py-2'
              >
                Add To Cart
              </button>
            </div>
            {user ? (
              <div className='mt-6'>
                <button
                  className=' rounded-3xl bg-yellowColor px-10 py-3 text-left text-white hover:bg-opacity-70'
                  type='button'
                  onClick={() => setIsReviewModalOpen(true)}
                >
                  Submit your review
                </button>
              </div>
            ) : (
              <Link
                href={PATH_LOGIN}
                className='mt-10 rounded-lg border border-red-400 bg-red-100 p-4'
              >
                Login to post your review.
              </Link>
            )}
          </div>
        </div>
        <div className='mt-10 flex w-full flex-col items-center justify-center px-4 md:w-3/4 md:items-start md:justify-start md:px-0'>
          <h3 className='text-3xl font-medium'>Reviews</h3>
          <hr className='py-2' />
          {productDetail.reviews.map((product) => {
            return (
              <div className='my-4 w-full' key={product.id}>
                <div className='mb-2 mr-2 flex text-yellowColor'>
                  {[1, 2, 3, 4, 5].map((index) =>
                    index <= (product.rating || 0) ? (
                      <FaStar key={index} />
                    ) : index === Math.ceil(product.rating || 0) ? (
                      <FaStarHalfAlt key={index} />
                    ) : (
                      <FaRegStar key={index} />
                    )
                  )}
                </div>
                <p className='mb-4 text-sm text-[#777]'>
                  By #{product.user.name}
                </p>
                <p className='mb-2'>{product.comment}</p>
                <hr className='py-2' />
              </div>
            );
          })}
        </div>
      </section>
      <Transition appear show={isReviewModalOpen} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-10'
          onClose={() => setIsReviewModalOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black/25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='div'
                    className='flex items-center justify-between border-b py-4'
                  >
                    <h4 className='text-xl font-medium leading-6'>
                      Submit Review
                    </h4>
                    <button
                      type='button'
                      onClick={() => setIsReviewModalOpen(false)}
                      className='px-2 text-right hover:opacity-70'
                    >
                      <IoMdClose size={20} />
                    </button>
                  </Dialog.Title>
                  <form className='mt-6' onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-4 flex items-center'>
                      <input
                        type='number'
                        value={rating!}
                        {...register('rating', { required: true })}
                        hidden
                        readOnly
                      />
                      <Rating
                        name='rating'
                        value={rating}
                        onChange={(event, value) => {
                          setRating(value);
                          setValue('rating', value);
                        }}
                        precision={0.5}
                      />
                    </div>
                    <textarea
                      className='min-h-[100px] w-full rounded border p-2 text-sm outline-none'
                      id='comment'
                      {...register('comment', { required: true })}
                    />

                    <div className='mt-4'>
                      <button
                        type='submit'
                        className='inline-flex justify-center rounded-md border border-yellowColor bg-yellowColor px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-white hover:text-yellowColor focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                        onClick={() => setIsReviewModalOpen(false)}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default ProductDetailContainer;
