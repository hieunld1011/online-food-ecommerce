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
        `relative inline-block cursor-pointer
                border
                text-sm
                font-medium
                transition-all
                duration-500
                hover:bg-transparent
                hover:text-white
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-2
                sm:text-lg`,
        pad && `${pad}`,
        fullWidth && 'w-full',
        primary && 'border-yellowBorder bg-yellowBg text-black',
        secondary && 'border-black bg-black text-white before:bg-yellowBg',
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
