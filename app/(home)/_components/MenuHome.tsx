'use client';

import SectionTitile from '@/app/components/Hero&Title/SectionTitile';
import { menuListButton } from '@/app/constants/home.constants';
import { PATH_HOME } from '@/app/routes/router.path';
import handleAxiosError from '@/app/utils/axiosError';
import axios from 'axios';
import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const initialProduct = {
  id: '',
  name: '',
  price: 0.0,
  category: '',
  description: '',
  picture: [],
  ratings: 0.0,
  created_at: new Date(Date.now()),
  updated_at: new Date(Date.now()),
};

const MenuHome = () => {
  const [products, setProducts] = useState([initialProduct]);
  const [pagination, setPagination] = useState<number>(1);
  let productPerPage = 6;
  let lastIndex = pagination * productPerPage,
    firstIndex = lastIndex - productPerPage;

  const getProducts = async () => {
    await axios
      .get('/api/products')
      .then((res) => {
        const { data } = res;
        setProducts(data.menu);
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

  return (
    <div className='bg-white pb-28 pt-24 drop-shadow-[-8px_0_125px_rgba(0,0,0,0.15)]'>
      <div className='container mx-auto px-4'>
        <SectionTitile
          section='Best Pricing'
          title='Special Price Combo'
          desc={`We pride ourselves on sourcing incredible ingredients from ranchers, farmers, bakers, and food purveyor`}
        />
        <div>
          <div className='flex items-center justify-center'>
            {menuListButton.map((menu) => {
              return (
                <button
                  key={menu.number}
                  className={clsx(
                    `cursor-pointer border px-5 py-2 text-lg font-semibold transition-all duration-300`,
                    pagination === menu.number
                      ? `bg-${menu.color} border-${menu.color} text-white`
                      : 'border-black text-black'
                  )}
                  type='button'
                  onClick={() => setPagination(menu.number)}
                >
                  {menu.title}
                </button>
              );
            })}
          </div>
          <div className='grid grid-cols-1 pb-7 pt-14 md:grid-cols-2'>
            {products.slice(firstIndex, lastIndex).map((product) => (
              <div className='mb-7 flex' key={product?.id}>
                <Image
                  src={product?.picture[0] || PATH_HOME}
                  alt={product.name || ''}
                  width={100}
                  height={100}
                  className='mr-2 aspect-square max-h-[100px]'
                />
                <div className='flex flex-col'>
                  <h5
                    className={clsx(
                      `h-5 w-16 text-center font-semibold text-white`,
                      pagination % 2 !== 0 ? 'bg-greenColor' : 'bg-yellowColor'
                    )}
                  >
                    Hot
                  </h5>
                  <h3 className='py-2 text-2xl font-semibold'>
                    {product.name}......................${product.price}
                  </h3>
                  <p className='mb-4 w-[70%]'>{product.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuHome;
