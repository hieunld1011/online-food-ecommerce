import HeroSection from '@/app/components/Hero&Title/HeroSection';
import CheckoutForm from './_components/CheckoutForm';
import getUser from '@/app/actions/getUser';

const Checkout = async () => {
  const user = await getUser();

  return (
    <>
      <HeroSection title={'Checkout'} />
      <CheckoutForm user={user!} />
    </>
  );
};

export default Checkout;
