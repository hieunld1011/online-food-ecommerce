import React from 'react';
import DashboardContainer from '../_components/DashboardContainer';
import theme from '../../../theme/themeConfig';
import { ConfigProvider } from 'antd';
import DashboardOrders from './_components/DashboardOrders';

const Orders = async () => {
  return (
    <ConfigProvider theme={theme}>
      <DashboardContainer title='Orders'>
        <DashboardOrders />
      </DashboardContainer>
    </ConfigProvider>
  );
};

export default Orders;
