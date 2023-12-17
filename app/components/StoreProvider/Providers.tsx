'use client';

import { Provider } from 'react-redux';
import { store } from '../../stores/store';
import BarProvider from '../../context/BarContext';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <BarProvider>{children}</BarProvider>
    </Provider>
  );
};

export default Providers;
