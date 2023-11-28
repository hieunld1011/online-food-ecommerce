import React from 'react';
import DashboardContainer from '../_components/DashboardContainer';
import DashboardUsers from './_components/DashboardUsers';
import theme from '../../../theme/themeConfig';
import { ConfigProvider } from 'antd';

const Users = async () => {
  return (
    <ConfigProvider theme={theme}>
      <DashboardContainer title='Users'>
        <DashboardUsers />
      </DashboardContainer>
    </ConfigProvider>
  );
};

export default Users;
