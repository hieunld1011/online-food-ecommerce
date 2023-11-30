import getUser from '@/app/actions/getUser';
import DashboardHeader from './_components/DashboardHeader';
import DashboardSidebar from './_components/DashboardSidebar';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUser();

  return (
    <div className='flex min-h-screen bg-neutral-100'>
      <DashboardSidebar />
      <div className='flex flex-1 flex-col'>
        <DashboardHeader user={user!} />
        {children}
      </div>
    </div>
  );
};

export default Layout;
