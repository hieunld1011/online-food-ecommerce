import HeroSection from '@/app/components/Hero&Title/HeroSection';
import ServiceAbout from './_components/ServiceAbout';
import TestimonialHome from '../_components/TestimonialHome';
import DeliveryHome from '../_components/DeliveryHome';
import MembersAbout from './_components/MembersAbout';

const Products = () => {
  return (
    <>
      <HeroSection title={'About Us'} />
      <ServiceAbout />
      <MembersAbout />
      <TestimonialHome />
      <DeliveryHome />
    </>
  );
};

export default Products;
