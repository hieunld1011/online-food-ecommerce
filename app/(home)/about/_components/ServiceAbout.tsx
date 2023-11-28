import Image from 'next/image';
import Link from 'next/link';
import { BsTelephone } from 'react-icons/bs';

import aboutImg from '../../../assets/home/about/about.png';
import aboutBackdrop from '../../../assets/home/about/about-shape.png';
import aboutThumb from '../../../assets/home/about/about-box-thumb.png';
import { PATH_CONTACT } from '@/app/routes/router.path';

const ServiceAbout = () => {
  return (
    <div className='bg-[#eee] py-24'>
      <div className='container mx-auto px-4'>
        <div className='-mr-4 flex flex-col items-center lg:flex-row'>
          <div className='relative flex-1 px-4'>
            <h3 className='absolute -left-1 top-0 z-10 uppercase [writing-mode:vertical-lr] lg:-left-[6px]'>
              Read the story
            </h3>
            <div className='relative z-10 ml-4 lg:ml-7'>
              <Image src={aboutImg} alt='about' />
              <div className='absolute -left-16 top-52 -z-10 animate-float-bob'>
                <Image src={aboutBackdrop} alt='aboutBackdrop' />
              </div>
            </div>
          </div>
          <div className='flex-1 px-4'>
            <div className='mb-2 flex items-center'>
              <h4 className='text-lg font-semibold uppercase'>Our services</h4>
              <span className='ml-4 h-4 w-4 rounded-full bg-yellowColor' />
              <span className='ml-2 h-1 w-12 rounded-[30px] bg-yellowColor' />
            </div>
            <h3 className='py-4 text-3xl font-semibold lg:text-[46px]'>
              Free Delivery Services?
            </h3>
            <p className='mb-6 max-w-[90%] opacity-75'>
              Celery potato scallion desert raisin horseradish spinach carrot
              soko. Lotus root water spinach fennel kombu maize bamboo shoot
              green bean swiss chard seakale pumpkin onion chickpea gram corn
              nuts salsify bunya pie sprout coriander water.
            </p>
            <div className='-mx-4 mb-10 flex flex-col gap-3 md:flex-row md:items-center md:gap-0'>
              <div className='flex-1 px-4'>
                <div className='flex'>
                  <div className='mr-4'>
                    <Image src={aboutThumb} alt='about thumb' sizes={'60'} />
                  </div>
                  <div className='flex flex-col justify-center'>
                    <h4 className='font-semibold'>Phillip William</h4>
                    <h5 className='text-sm opacity-80'>Founder</h5>
                  </div>
                </div>
              </div>
              <div className='flex-1 px-4'>
                <div className='md:-ml-12'>
                  <button
                    type='button'
                    className='flex items-center rounded-[30px] border-yellowColor bg-yellowColor 
                    px-4 py-2 text-lg font-medium text-black
                    transition-all duration-300 hover:opacity-70'
                  >
                    <BsTelephone size={14} className='mr-1' />
                    Order Now 0800-825-1234
                  </button>
                </div>
              </div>
            </div>
            <Link
              href={PATH_CONTACT}
              className='rounded border border-yellowColor bg-yellowColor px-7 py-3 text-lg text-black
              transition-all duration-500 hover:bg-white'
            >
              Our Service
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceAbout;
