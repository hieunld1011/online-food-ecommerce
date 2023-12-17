import HeroSection from '@/app/components/Hero&Title/HeroSection';
import ProductDetailContainer from './_components/ProductDetailContainer';
import getUser from '@/app/actions/getUser';
import ProductRecommend from './_components/ProductRecommend';
import getOtherProducts from '@/app/actions/getOtherProducts';

interface IParams {
  productId: string;
}

const ProductDetails = async ({ params }: { params: IParams }) => {
  const otherProducts = await getOtherProducts(params.productId);
  const user = await getUser();

  return (
    <>
      <HeroSection title={'Shop Details'} />
      <ProductDetailContainer params={params} user={user!} />
      <ProductRecommend otherProducts={otherProducts!} />
    </>
  );
};

export default ProductDetails;
