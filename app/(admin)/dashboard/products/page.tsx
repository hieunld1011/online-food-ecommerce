import React from 'react';
import DashboardContainer from '../_components/DashboardContainer';
import theme from '../../../theme/themeConfig';
import { ConfigProvider } from 'antd';
import DashboardProducts from './_components/DashboardProducts';

const Products = async () => {
  return (
    <ConfigProvider theme={theme}>
      <DashboardContainer title='Products'>
        <DashboardProducts />
      </DashboardContainer>
    </ConfigProvider>
  );
};

export default Products;
