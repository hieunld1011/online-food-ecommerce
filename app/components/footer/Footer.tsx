'use client';

import Image from 'next/image';
import Link from 'next/link';

import { mediaLinks } from '../../constants/home.constants';
import FooterLogo from '../../assets/home/footer-logo.png';
import thumb1 from '../../assets/home/footer-thumb.png';
import thumb2 from '../../assets/home/footer-thumb-2.png';
import clsx from 'clsx';

const Footer = () => {
  return (
    <div className={clsx(`bg-[#1a1a1b] pb-1 pt-24`)}>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-4'>
          <div className='flex flex-col'>
            <Image src={FooterLogo} alt='Logo' />
            <p className='mb-6 mt-11 text-lg text-[#919191]'>
              Our feet are on the ground, but our ambitions are above the
              clouds. Here is how we move from the getting to know you
            </p>
            <div className='flex'>
              {mediaLinks.map((media, index) => (
                <Link
                  href={media.href}
                  key={index}
                  className='mr-2 border border-white bg-white p-2 transition-all duration-500 hover:bg-black hover:text-white'
                >
                  <media.icon size={18} />
                </Link>
              ))}
            </div>
          </div>
          <div className='flex flex-col'>
            <h3 className='h-[25px] text-2xl font-semibold uppercase text-white'>
              BOOK A TABLE
            </h3>
            <p className='mb-2 mt-[43px] text-lg text-[#919191]'>
              Save time with proper planning
            </p>
            <span className='text-3xl text-yellowColor'>934 595 876</span>
          </div>
          <div className='flex flex-col'>
            <h3 className='h-[25px] text-2xl font-semibold uppercase text-white'>
              NEWSLETTER
            </h3>
            <p className='mb-6 mt-[43px] text-lg text-[#919191]'>
              Newsletter Exclusive Discount
            </p>
            <form className='relative'>
              <input
                type='email'
                placeholder='your email'
                className='h-[40px] w-full px-2 py-1 outline-none'
                required
                pattern='/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/'
              />
              <button
                type='button'
                className='absolute right-0 top-0 h-[40px] cursor-pointer bg-yellowBg px-5 text-black'
              >
                Gmail
              </button>
            </form>
          </div>
          <div className='flex flex-col'>
            <h3 className='h-[25px] text-2xl font-semibold uppercase text-white'>
              Galary
            </h3>
            <p className='mb-4 mt-[43px] text-lg text-[#919191]'>
              Newsletter Exclusive
            </p>
            <div className='flex gap-6'>
              <Image src={thumb1} alt='thumb' width={100} height={100} />
              <Image src={thumb2} alt='thumb' width={100} height={100} />
            </div>
          </div>
        </div>
        <div className='mt-6 lg:-mt-9'>
          <p className='mb-4 text-center text-[#919191]'>
            467 Avenue New York / dream IT office@example / com Phone:
            01-800-81200
          </p>
          <hr className='mx-auto w-full md:w-[80%] lg:w-[48%]' />
          <p className='my-4 text-center text-lg text-[#919191]'>
            Copyright Bold DRThemes 2023
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
