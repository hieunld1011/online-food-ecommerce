'use client';
import clsx from 'clsx';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  primary?: boolean;
  secondary?: boolean;
  third?: boolean;
  pad?: string;
  danger?: boolean;
  classBtn?: string;
}

const Button = ({
  type,
  fullWidth,
  children,
  onClick,
  primary,
  secondary,
  pad,
  third,
  danger,
  classBtn,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={clsx(
        `
                border
                border-black
                text-sm
                font-semibold
                transition-all
                duration-300 hover:opacity-70
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-2`,
        pad && `${pad}`,
        classBtn && `${classBtn}`,
        fullWidth && 'w-full',
        primary && 'border-greenBorder bg-greenBg',
        secondary ? 'text-gray-900' : 'text-white',
        third && 'border-yellowColor bg-yellowColor',
        danger && 'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600'
      )}
    >
      {children}
    </button>
  );
};

export default Button;
