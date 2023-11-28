import { PATH_SHOP } from '@/app/routes/router.path';
import { Product } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

const ProductRecommend = ({ otherProducts }: { otherProducts: Product[] }) => {
  const lastIndex = Math.ceil(Math.random() * 9 + 4);
  const firstIndex = lastIndex - 4;

  return (
    <div className='pb-24'>
      <div className='container mx-auto'>
        <div className='-mt-1 mb-7 text-center'>
          <h2 className='text-[40px] font-bold text-[#333]'>
            Related Products
          </h2>
        </div>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
          {otherProducts.slice(firstIndex, lastIndex).map((product) => (
            <div
              className='group flex flex-col items-center rounded-[20px] border border-transparent p-4 shadow-[0px_6px_15px_rgb(1_15_28_/_6%)] hover:border-yellowColor'
              key={product.id}
            >
              <Link
                href={`${PATH_SHOP}/${product.id}`}
                className='translate-x-2'
              >
                <Image
                  src={product.picture[0]}
                  alt={product.productName}
                  width={130}
                  className='max-[130px] aspect-square transition-all duration-500 group-hover:scale-110'
                  height={130}
                />
              </Link>
              <span className='my-2 capitalize text-[#333]'>
                {product.category}
              </span>
              <div className='flex items-center'>
                {[1, 2, 3, 4, 5].map((index) =>
                  index < Math.ceil(product?.ratings || 0) ? (
                    <FaStar key={index} className='text-yellowColor' />
                  ) : index === Math.ceil(product?.ratings || 0) ? (
                    <FaStarHalfAlt key={index} className='text-yellowColor' />
                  ) : (
                    <FaRegStar key={index} className='text-yellowColor' />
                  )
                )}
                <span className='ml-2'>({product.ratings?.toFixed(2)})</span>
              </div>
              <h3 className='my-2 text-lg font-semibold text-yellowColor'>
                {product.productName}
              </h3>
              <span className='pb-3 font-semibold'>
                ${product.price.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductRecommend;
