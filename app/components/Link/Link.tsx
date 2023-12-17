'use client';
import clsx from 'clsx';
import Link from 'next/link';

interface LinkProps {
  pad?: string;
  fullWidth?: boolean;
  children?: React.ReactNode;
  primary?: boolean;
  secondary?: boolean;
  danger?: boolean;
  classLink?: string;
  disabled?: boolean;
  href: string;
}

const LinkCustom = ({
  fullWidth,
  children,
  pad,
  primary,
  classLink,
  secondary,
  danger,
  href,
}: LinkProps) => {
  return (
    <Link
      href={href}
      className={clsx(
        `relative cursor-pointer border text-sm transition-all duration-500
            hover:bg-transparent hover:text-white sm:text-lg`,
        pad && `${pad}`,
        fullWidth && 'w-full',
        primary && 'border-yellowBorder bg-yellowBg text-black',
        secondary && 'border-black bg-black text-white ',
        danger &&
          'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600',
        classLink && `${classLink}`
      )}
    >
      {children}
    </Link>
  );
};

export default LinkCustom;
