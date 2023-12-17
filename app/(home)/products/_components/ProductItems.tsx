'use client';

import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

import { categoProps, categoryLists } from '@/app/constants/products.constants';
import { IoCart } from 'react-icons/io5';
import { useAppDispatch } from '@/app/stores/store';
import { incrementQuantity } from '@/app/stores/cartSlices';
import clsx from 'clsx';
import handleAxiosError from '@/app/utils/axiosError';

const initialProduct = {
  id: '',
  productName: '',
  price: 0.0,
  category: '',
  description: '',
  picture: [],
  ratings: 0.0,
  created_at: new Date(Date.now()),
  updated_at: new Date(Date.now()),
  orderIds: [],
};

const ProductItems = () => {
  const [catego, setCatego] = useState<categoProps>('all');
  const [products, setProducts] = useState([initialProduct]);
  const [filteredProduct, setFilteredProducts] = useState([initialProduct]);
  const [pagination, setPagination] = useState<number>(1);
  const [value1, setValue1] = useState<number[]>([0, 50]);
  const dispatch = useAppDispatch();

  const minDistance = 10;
  let productPerPage = 9;
  let lastIndex = pagination * productPerPage,
    firstIndex = lastIndex - productPerPage;

  const getProducts = async () => {
    await axios
      .get('/api/products')
      .then((res) => {
        const { data } = res;
        setProducts(data.menu);
        setFilteredProducts(data.menu);
      })
      .catch((err) => handleAxiosError(err));
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    lastIndex = pagination * productPerPage;
    firstIndex = lastIndex - productPerPage;
  }, [lastIndex, firstIndex]);

  useEffect(() => {
    if (catego === 'all')
      setFilteredProducts(
        products.filter(
          (product) => product.price <= value1[1] && product.price >= value1[0]
        )
      );
    if (catego === 'beverage')
      setFilteredProducts(
        products.filter(
          (product) =>
            product.category === 'beverage' &&
            product.price <= value1[1] &&
            product.price >= value1[0]
        )
      );
    if (catego === 'burger')
      setFilteredProducts(
        products.filter(
          (product) =>
            product.category === 'burger' &&
            product.price <= value1[1] &&
            product.price >= value1[0]
        )
      );
  }, [catego, value1[0], value1[1]]);

  const prevPaginationHandler = () => {
    if (pagination === 1) return;
    setPagination(pagination - 1);
  };

  const nextPaginationHandler = () => {
    if (pagination === Math.ceil(filteredProduct.length / productPerPage))
      return;
    setPagination(pagination + 1);
  };

  const numberPaginationHandler = (e: number) => {
    setPagination(e);
  };

  const handleChange1 = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
  };

  const valuetext = (value: number) => {
    return `$${value}`;
  };

  return (
    <div className='py-24'>
      <div className='container mx-auto flex flex-col md:flex-row'>
        <div className='mr-5 flex w-full flex-col md:w-1/4 md:max-w-[230px]'>
          <h3
            className='relative mb-8 border-b border-[#d6d6d6] pb-3 text-2xl font-bold before:absolute before:-bottom-[1px] before:left-0 
            before:h-[2px] before:w-28 before:bg-yellowColor'
          >
            Our Category
          </h3>
          {categoryLists.map((category) => (
            <div className='group mb-3' key={category.title}>
              <div
                onClick={() => setCatego(`${category.filterCate}`)}
                className='flex h-20 cursor-pointer
                    items-center bg-[#F4F6F3] transition-all duration-500 group-hover:shadow-[0px_0px_10px_0px_rgba(0,0,0,0.15)]'
              >
                <category.icon size={65} className={'pl-2 lg:mr-5 lg:pl-5'} />
                <span className='text-xl uppercase tracking-wider group-hover:text-yellowColor'>
                  {category.title}
                </span>
                <div className='flex flex-1 justify-end'>
                  <Image
                    src={category.img}
                    alt={category.title}
                    className='h-[75px] w-[75px]'
                  />
                </div>
              </div>
            </div>
          ))}
          <h3
            className='relative mb-8 mt-10 border-b border-[#d6d6d6] pb-3 text-2xl font-bold before:absolute before:-bottom-[1px] before:left-0 
            before:h-[2px] before:w-28 before:bg-yellowColor'
          >
            Filter by Price
          </h3>
          <div className='mt-4 flex w-full items-center justify-center md:w-[90%]'>
            <Box sx={{ width: 230 }} className='w-full'>
              <Slider
                getAriaLabel={() => 'Minimum distance'}
                value={value1}
                onChange={handleChange1}
                valueLabelDisplay='on'
                getAriaValueText={valuetext}
                disableSwap
                min={0}
                max={100}
              />
            </Box>
          </div>
        </div>
        <div className='flex flex-col'>
          <div className='grid flex-1 grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3'>
            {filteredProduct.slice(firstIndex, lastIndex).map((product) => (
              <div
                className='group relative z-10 border border-[#e5e5e5] p-4 hover:shadow-[0px_0px_15px_0px_rgba(0,0,0,0.08)]'
                key={product.id}
              >
                <Link
                  href={`/products/${product.id}`}
                  className='flex items-center justify-center py-4 transition-all duration-300 group-hover:opacity-50'
                >
                  <Image
                    src={product?.picture[0]}
                    alt='product'
                    width={130}
                    height={130}
                  />
                </Link>
                <div className='flex flex-col'>
                  <div className='flex flex-col transition-all duration-300 group-hover:-translate-y-10'>
                    <Link
                      href={`/products/${product.id}`}
                      className='pl-5 text-lg font-semibold capitalize hover:text-yellowColor'
                    >
                      {product.productName}
                    </Link>
                    <span className='mt-1 pl-5 text-xs'>
                      {product.description}
                    </span>
                    <span className='mb-3 mt-1 pl-5 text-xl font-semibold text-yellowColor'>
                      ${product.price}
                    </span>
                  </div>
                  <div
                    className='absolute bottom-0 flex w-[90%] items-center justify-center opacity-0 transition-all 
                        duration-300 group-hover:-translate-y-3 group-hover:opacity-100'
                  >
                    <button
                      onClick={() => dispatch(incrementQuantity(product))}
                      className='flex w-[90%] items-center justify-center rounded-3xl bg-yellowColor py-3
                          text-sm uppercase text-white hover:bg-black hover:text-yellowColor'
                    >
                      <IoCart size={16} className='mr-1' />
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='mt-5 flex gap-1'>
            <div
              className='hove cursor-pointer border border-[#eee] px-4 py-2 text-sm
             transition-all duration-300 hover:bg-yellowColor hover:text-white'
              onClick={prevPaginationHandler}
            >
              Prev
            </div>
            {[
              ...Array(
                Math.ceil(filteredProduct.length / productPerPage)
              ).keys(),
            ].map((page: number, index) => (
              <div
                key={index}
                className={clsx(
                  `hove cursor-pointer border border-[#eee] px-4 py-2 text-sm
             transition-all duration-300 hover:bg-yellowColor hover:text-white`,
                  pagination === page + 1 ? 'bg-yellowColor text-white' : ''
                )}
                onClick={() => numberPaginationHandler(page + 1)}
              >
                {page + 1}
              </div>
            ))}
            <div
              className='hove cursor-pointer border border-[#eee] px-4 py-2 text-sm
             transition-all duration-300 hover:bg-yellowColor hover:text-white'
              onClick={nextPaginationHandler}
            >
              Next
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItems;
