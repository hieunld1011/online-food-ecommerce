import { PATH_HOME } from '@/app/routes/router.path';
import { TiHome } from 'react-icons/ti';
import Link from 'next/link';

const DashboardContainer = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className='p-7'>
      <div className='flex flex-col'>
        <nav className='mb-4 flex py-3 font-medium'>
          <Link href={PATH_HOME} className='flex items-center text-yellowColor'>
            <TiHome size={16} />
            <span className='ml-1'>Home</span>
          </Link>
          <div className='pl-2 before:pr-2 before:text-[#6c757d] before:content-["/"]'>
            {title}
          </div>
        </nav>
        {children}
      </div>
    </div>
  );
};

export default DashboardContainer;
