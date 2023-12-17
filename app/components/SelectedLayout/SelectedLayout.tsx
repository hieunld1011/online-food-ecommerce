'use client';

import { usePathname } from 'next/navigation';

const SelectedLayout = ({
  selectedRoutes,
  children,
}: {
  selectedRoutes: string[];
  children: React.ReactNode;
}) => {
  const path = usePathname();

  return <>{[...selectedRoutes].includes(path) ? <></> : <>{children}</>}</>;
};

export default SelectedLayout;
