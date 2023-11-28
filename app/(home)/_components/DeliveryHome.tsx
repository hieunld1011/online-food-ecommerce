import Image from 'next/image';
import deliver1 from '../../assets/home/deliver-thumb.png';
import deliver2 from '../../assets/home/delivar-thumb-2.png';

const DeliveryHome = () => {
  return (
    <div className='py-24'>
      <div className='container mx-auto px-4'>
        <div className='rounded-lg bg-[url("/images/delivari-bg.jpg")] bg-cover bg-center bg-no-repeat'>
          <div className='px-[39px] pb-[100px] pt-[95px]'>
            <h1 className='text-5xl font-semibold'>You Order We Deliver</h1>
            <p className='mb-10 mt-6 w-[40%] font-medium'>
              Here at Sway we use only the freshest ingredients and gourmet
              toppings. Order with our mobile app today
            </p>
            <div className='flex gap-5'>
              <Image src={deliver1} alt='thumb-1' />
              <Image src={deliver2} alt='thumb-2' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryHome;
