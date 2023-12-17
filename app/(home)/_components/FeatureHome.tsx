import SectionTitile from '@/app/components/Hero&Title/SectionTitile';
import { featureOffers } from '@/app/constants/home.constants';
import Image from 'next/image';

const FeatureHome = () => {
  return (
    <div className='pb-28 pt-24'>
      <div className='container mx-auto px-4'>
        <SectionTitile
          title='Take a look at our special menu offers'
          desc={`We pride ourselves on sourcing incredible ingredients from ranchers,
          farmers, bakers, and food purveyors who all share our values.`}
          section='Our Offer'
        />
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {featureOffers.map((offer) => (
            <div key={offer.title} className='flex flex-col items-center px-4'>
              <Image
                src={offer.img}
                alt={offer.title || ''}
                className='h-auto max-h-[253px] w-auto'
              />
              <h3 className='mb-4 mt-7 text-center text-xl font-medium'>
                {offer.title}
              </h3>
              <p className='mx-auto max-w-[70%] text-center opacity-80'>
                {offer.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureHome;
