import SectionTitle from '@/app/components/Hero&Title/SectionTitile';
import Image from 'next/image';
import { FaQuoteRight } from 'react-icons/fa';
import { IoMdStar, IoMdStarOutline } from 'react-icons/io';

import { customerReviewLists } from '../../constants/home.constants';

const TestimonialHome = () => {
  return (
    <div className='bg-[#f8f8f8] py-24'>
      <div className='container mx-auto px-4'>
        <SectionTitle
          section='TESTIMONIAL'
          title='What our clients say ?'
          desc={`We pride ourselves on sourcing incredible ingredients from ranchers, farmers, bakers, and food purveyor`}
        />
        <div className='grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2 lg:grid-cols-3'>
          {customerReviewLists.map((customer) => (
            <div
              className='bg-white pb-6 pl-6 pr-10 pt-[38px]'
              key={customer.name}
            >
              <div className='flex flex-col'>
                <div className='relative flex items-center'>
                  <Image src={customer.img} alt='customer' />
                  <div className='relative ml-5 flex flex-1 flex-col'>
                    <h4 className='font-bold'>{customer.name}</h4>
                    <span>{customer.address}</span>
                  </div>
                  <FaQuoteRight
                    size={22}
                    className='absolute right-10 top-3 text-[#fceec7]'
                  />
                </div>
                <h5 className='mt-7 font-bold'>{customer.review}</h5>
                <p className='mb-8 mt-5'>{customer.desc}</p>
                <hr />
                <div className='mt-4 flex items-center'>
                  <IoMdStar className='text-yellowColor' size={24} />
                  <IoMdStar className='text-yellowColor' size={24} />
                  <IoMdStar className='text-yellowColor' size={24} />
                  <IoMdStar className='text-yellowColor' size={24} />
                  <IoMdStarOutline className='text-yellowColor' size={24} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialHome;
