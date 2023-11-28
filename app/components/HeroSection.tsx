import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';
import Link from 'next/link';
import { PATH_HOME } from '@/app/routes/router.path';

const HeroSection = ({ title }: { title: String }) => {
  return (
    <div
      className='relative z-[1] bg-[url("/images/heroProducts.jpg")] bg-cover bg-center
        bg-no-repeat py-32 before:absolute before:left-0 before:top-0 before:-z-[1]
        before:h-full before:w-full before:bg-[rgb(0,0,0.6)] before:opacity-60'
    >
      <div className='container mx-auto'>
        <div className='flex flex-col items-center justify-center'>
          <h1 className='pb-3 text-6xl font-bold uppercase text-white'>
            {title}
          </h1>
          <div className='flex text-white'>
            <Link
              href={PATH_HOME}
              className='flex items-center transition-all duration-300 hover:text-yellowColor'
            >
              Home
              <MdOutlineKeyboardDoubleArrowRight
                size={20}
                className='text-yellowColor'
              />
            </Link>
            <span>{title}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
