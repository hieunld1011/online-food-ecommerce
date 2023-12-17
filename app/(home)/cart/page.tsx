import HeroSection from '@/app/components/Hero&Title/HeroSection';
import CartLists from './_components/CartLists';

const Cart = () => {
  return (
    <>
      <HeroSection title={'Cart'} />
      <CartLists />
    </>
  );
};

export default Cart;
