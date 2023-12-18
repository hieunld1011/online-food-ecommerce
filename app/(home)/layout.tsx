import React from 'react';
import Header from '../components/header/Header';

import getUser from '../actions/getUser';
import Footer from '../components/footer/Footer';
import {
  PATH_LOGIN,
  PATH_PROFILE,
  PATH_PROFILE_EDIT,
} from '../routes/router.path';
import SelectedLayout from '../components/SelectedLayout/SelectedLayout';

const layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUser();

  return (
    //// @ts-expect-error Server Component
    <Header user={user!}>
      {children}
      <SelectedLayout
        selectedRoutes={[PATH_PROFILE, PATH_PROFILE_EDIT, PATH_LOGIN]}
      >
        <Footer />
      </SelectedLayout>
    </Header>
  );
};

export default layout;
