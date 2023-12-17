import { PATH_CONTACT, PATH_SHOP } from '@/app/routes/router.path';
import Image from 'next/image';
import Link from '../../components/Link/Link';

import heroImg1 from '../../assets/home/hero_img.png';
import backdrop from '../../assets/home/backdrop_img.png';

const HeroHome = () => {
  return (
    <section className='relative'>
      <div
        className='flex 
      min-h-[calc(100vh_-_100px)] items-center justify-center bg-[url(/images/slider_bg.png)] bg-cover bg-center bg-no-repeat'
      >
        <div className='container sm:px-6'>
          <div className='flex flex-col items-center justify-center md:flex-row'>
            <div className='flex-1 px-4'>
              <h1 className='text-[20px] font-bold uppercase text-white sm:text-[42px] md:text-[38px] lg:text-[65px]'>
                <span className='clip-parallelogram mr-3 bg-yellowColor px-4 text-[30px] font-light text-black sm:text-[42px] md:text-[57px]'>
                  New
                </span>
                Burgers
              </h1>
              <h1 className='text-[20px] font-bold uppercase text-white sm:text-[42px] md:text-[38px] lg:text-[65px]'>
                Best Fast Food
              </h1>
              <p className='mb-4 pb-5 pt-4 text-white'>
                We pride ourselves on sourcing incredible ingredients from
                ranchers, farmers, bakers, and food purveyors who all share our
                values.
              </p>
              <div className='flex gap-5'>
                <Link
                  href={PATH_SHOP}
                  primary
                  pad='sm:py-4 sm:px-9 px-4 py-2'
                  classLink='font-semibold close'
                >
                  Our Menu
                </Link>
                <Link
                  href={PATH_CONTACT}
                  primary
                  pad='sm:py-4 sm:px-9 px-4 py-2'
                  classLink='font-semibold close'
                >
                  Our Contact
                </Link>
              </div>
            </div>
            <div className='flex-1 px-4'>
              <div className='relative -ml-9 mr-4 mt-28 md:mt-0'>
                <Image src={heroImg1} alt='hero' />
                <div className='absolute -top-[7%] left-[34%] right-[45%] max-h-[108px] max-w-[108px] animate-float-bob overflow-hidden rounded-full bg-yellowColor'>
                  <div className='flex aspect-square flex-col items-center justify-center px-4 py-4 lg:py-8'>
                    <h5 className='text-sm uppercase text-white'>Offer</h5>
                    <span className='text-2xl font-semibold text-black md:text-lg lg:text-2xl'>
                      $12.4
                    </span>
                  </div>
                </div>
                <div className='absolute -top-20 opacity-[0.01]'>
                  <Image src={backdrop} alt='backdrop' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroHome;
