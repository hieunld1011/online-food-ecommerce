import {
  PATH_ABOUT,
  PATH_CART,
  PATH_CONTACT,
  PATH_HOME,
  PATH_SHOP,
} from '@/app/routes/router.path';

export const headerLinks = [
  {
    href: PATH_HOME as string,
    label: 'Home' as string,
  },
  {
    href: PATH_SHOP as string,
    label: 'Shop' as string,
  },
  {
    href: PATH_CART as string,
    label: 'Cart' as string,
  },
  {
    href: PATH_ABOUT as string,
    label: 'About' as string,
  },
  {
    href: PATH_CONTACT as string,
    label: 'Contact' as string,
  },
];
