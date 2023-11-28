import { Suspense } from 'react';

import AboutHome from './_components/AboutHome';
import DeliveryHome from './_components/DeliveryHome';
import FeatureHome from './_components/FeatureHome';
import HeroHome from './_components/HeroHome';
import MenuHome from './_components/MenuHome';
import OfferHome from './_components/OfferHome';
import TestimonialHome from './_components/TestimonialHome';
import LoadingModal from '../components/LoadingModal';

const Home = () => {
  return (
    <>
      <HeroHome />
      <FeatureHome />
      <AboutHome />
      <OfferHome />
      <Suspense fallback={<LoadingModal />}>
        <MenuHome />
      </Suspense>
      <TestimonialHome />
      <DeliveryHome />
    </>
  );
};

export default Home;
