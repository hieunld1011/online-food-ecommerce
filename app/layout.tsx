import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.scss';
import 'react-toastify/dist/ReactToastify.css';
import StyledComponentsRegistry from './utils/AntdRegistry';
import { ToastContainer } from 'react-toastify';

import AuthContext from './context/AuthContext';
import Providers from './components/StoreProvider/Providers';

const roboto = Roboto({ weight: '400', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Online Food Ecommerce',
  description: 'Online Food Ecommerce where you can buy food',
  icons: [
    {
      url: '/favicon.ico',
      rel: 'icon',
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={roboto.className}>
        <AuthContext>
          <Providers>
            <StyledComponentsRegistry>
              {children}
              <ToastContainer autoClose={3000} />
            </StyledComponentsRegistry>
          </Providers>
        </AuthContext>
      </body>
    </html>
  );
}
