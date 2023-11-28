import Link from 'next/link';

interface MobileHeaderListsProps {
  href: string;
  label: string;
}

const MobileHeaderLists = ({ href, label }: MobileHeaderListsProps) => {
  return (
    <Link
      href={href}
      className='block border-t border-[#ddd] px-7 py-4 uppercase transition-all duration-300 hover:bg-[#f8f8f8] hover:text-[#87C03D]'
    >
      {label}
    </Link>
  );
};

export default MobileHeaderLists;
