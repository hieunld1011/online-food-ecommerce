import SectionTitile from '@/app/components/Hero&Title/SectionTitile';
import { PATH_SHOP } from '@/app/routes/router.path';
import Link from '@/app/components/Link/Link';

const OfferHome = () => {
  return (
    <div className='pb-14 pt-24'>
      <div className='container mx-auto overflow-hidden px-4'>
        <SectionTitile
          section='Our Offer'
          title='Take a look at our special menu offers'
          desc={`We pride ourselves on sourcing incredible ingredients from ranchers, farmers, bakers, and food purveyors who all share our values.`}
        />
        <div className='-mx-4 flex flex-col flex-wrap md:flex-row'>
          <div
            className='bg-[url("/images/serviceImg/service1.jpg")] 
          bg-cover bg-center bg-no-repeat pb-[34px] pl-10 pr-[90px] pt-[60px] md:w-1/2 md:flex-[0_0_50%] lg:w-1/3 lg:flex-[0_0_calc(100%/3)]'
          >
            <h3 className='max-w-[210px] text-2xl font-bold text-white'>
              Best Orange juice premium
            </h3>
            <p className='mb-4 w-[70%] pt-5 text-[#919191]'>
              Everything you order will be quickly delivered To your door.
            </p>
            <span className='text-2xl font-bold text-greenColor'>$10.00</span>
            <h4 className='mt-4 text-white'>Sale 60%</h4>
          </div>
          <div
            className='bg-[url("/images/serviceImg/service2.jpg")] bg-cover 
          bg-center bg-no-repeat pb-[34px] pl-10 pr-[90px] pt-[60px] md:w-1/2 md:flex-[0_0_50%] lg:w-1/3 lg:flex-[0_0_calc(100%/3)]'
          >
            <h3 className='text-2xl font-bold tracking-wide text-white'>
              The Big Burger premium
            </h3>
            <p className='mb-4 w-[70%] pt-5 text-white'>
              Everything you order will be quickly delivered To your door.
            </p>
            <span className='text-2xl font-bold text-yellowColor'>$10.00</span>
            <h4 className='mt-4 text-white'>Sale 60%</h4>
          </div>
          <div
            className='bg-[url("/images/serviceImg/service3.jpg")] bg-cover 
          bg-center bg-no-repeat pb-[34px] pl-10 pr-[90px] pt-[60px] md:w-1/2 md:flex-[0_0_50%] lg:w-1/3 lg:flex-[0_0_calc(100%/3)]'
          >
            <h3 className='text-2xl font-bold tracking-wide text-white'>
              The BIg Pizza premium
            </h3>
            <p className='mb-4 w-[70%] pt-5 text-[#919191]'>
              Everything you order will be quickly delivered To your door.
            </p>
            <span className='text-2xl font-bold text-greenColor'>$10.00</span>
            <h4 className='mt-4 text-white'>Sale 60%</h4>
          </div>
          <div
            className='bg-yellowColor bg-cover bg-center bg-no-repeat
            pb-[34px] pl-10 pr-[90px] pt-[60px] md:w-1/2 md:flex-[0_0_50%] lg:w-1/3 lg:flex-[0_0_calc(100%/3)]'
          >
            <h3 className='text-2xl font-bold tracking-wide text-black'>
              The Best Explore Fast Food
            </h3>
            <p className='mb-4 w-[70%] pt-5 text-[#919191]'>
              Order Your Favouriate Food to day
            </p>
            <Link
              href={PATH_SHOP}
              secondary
              pad='py-2 px-4'
              classLink='uppercase'
            >
              View more
            </Link>
          </div>
          <div
            className='flex-1 bg-[url("/images/serviceImg/service_two.jpg")] bg-cover 
          bg-center bg-no-repeat px-10 pb-[34px] pt-[60px]'
          >
            <div className='flex flex-col items-center justify-center'>
              <h3 className='text-center text-2xl font-bold tracking-wide text-black'>
                The Best Combo <br /> Fast Food
              </h3>
              <p className='mb-4 pt-5 text-center'>
                Order Your Favouriate <br /> Food to day
              </p>
              <Link
                href={PATH_SHOP}
                secondary
                pad='py-2 px-4'
                classLink='uppercase hover:text-black hover:bg-yellowColor'
              >
                View more
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferHome;
