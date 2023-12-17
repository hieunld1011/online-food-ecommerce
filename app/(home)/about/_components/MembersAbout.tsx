import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import SectionTitle from '@/app/components/Hero&Title/SectionTitile';

import staff1 from '../../../assets/about/team-img.jpg';
import staff2 from '../../../assets/about/team-thumb-2.jpg';
import staff3 from '../../../assets/about/team-thum-3.jpg';
import staff4 from '../../../assets/about/team-thumb-4.jpg';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';

const teamMembers = [
  {
    img: staff1 as StaticImageData,
    position: 'Chief Executive' as string,
    name: 'David Latham' as string,
  },
  {
    img: staff2 as StaticImageData,
    position: 'Senior Chef' as string,
    name: 'Joseph Carter' as string,
  },
  {
    img: staff3 as StaticImageData,
    position: 'Head Chef' as string,
    name: 'David Degea' as string,
  },
  {
    img: staff4 as StaticImageData,
    position: 'Vice Head Chef' as string,
    name: 'Anjelina Rosee' as string,
  },
];

const MembersAbout = () => {
  return (
    <div className='pt-24'>
      <div className='container mx-auto'>
        <SectionTitle
          section='Team members'
          title='Meet Our Expart Chefs'
          desc={`Objectively pontificate quality models before intuitive information. 
        Dramatically recaptiualize multifunctional materials.`}
        />
        <div className='mt-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className='group relative z-[1] mb-36 rounded-[20px] bg-white px-7 pb-8 pt-32 shadow-[0px_6px_15px_rgb(1_15_28_/_6%)] before:absolute before:bottom-0
            before:left-0 before:-z-[1] before:h-0 before:w-full before:rounded-[20px] before:bg-yellowColor before:transition-all before:duration-500 hover:before:h-full'
            >
              <div className='absolute -top-[90px] left-0 right-0 flex items-center justify-center'>
                <Image
                  src={member.img}
                  alt='staff'
                  className='aspect-square max-w-[200px] rounded-full border border-yellowColor p-2'
                />
              </div>
              <div className='flex flex-col items-center justify-center'>
                <h3 className='text-3xl font-semibold transition-all duration-500 group-hover:text-white'>
                  {member.name}
                </h3>
                <span className='opacity-70 transition-all duration-500 group-hover:text-white'>
                  {member.position}
                </span>
                <div className='my-4 flex w-full justify-around border-t border-[#4d5765] transition-all duration-500 group-hover:border-white'>
                  <Link
                    href={'#'}
                    className='mt-5 rounded-full border p-3 group-hover:text-white'
                  >
                    <FaFacebookF size={16} />
                  </Link>
                  <Link
                    href={'#'}
                    className='mt-5 rounded-full border p-3 group-hover:text-white'
                  >
                    <FaTwitter size={16} />
                  </Link>
                  <Link
                    href={'#'}
                    className='mt-5 rounded-full border p-3 group-hover:text-white'
                  >
                    <FaInstagram size={16} />
                  </Link>
                  <Link
                    href={'#'}
                    className='mt-5 rounded-full border p-3 group-hover:text-white'
                  >
                    <FaLinkedinIn size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MembersAbout;
