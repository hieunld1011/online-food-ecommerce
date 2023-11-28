import React from 'react';
import Header from '../components/header/Header';

import getUser from '../actions/getUser';
import Footer from '../components/footer/Footer';

const layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUser();

  return (
    //// @ts-expect-error Server Component
    <Header user={user!}>
      {children}
      <Footer />
    </Header>
  );
};

export default layout;
