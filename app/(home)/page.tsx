import { Suspense } from 'react';

import AboutHome from './_components/AboutHome';
import DeliveryHome from './_components/DeliveryHome';
import FeatureHome from './_components/FeatureHome';
import HeroHome from './_components/HeroHome';
import MenuHome from './_components/MenuHome';
import OfferHome from './_components/OfferHome';
import TestimonialHome from './_components/TestimonialHome';
import Loading from './loading';

const Home = () => {
  return (
    <>
      <HeroHome />
      <FeatureHome />
      <AboutHome />
      <OfferHome />
      <Suspense fallback={<Loading />}>
        <MenuHome />
      </Suspense>
      <TestimonialHome />
      <DeliveryHome />
    </>
  );
};

export default Home;
