import { contactInfo } from '@/app/constants/home.constants';
import { LuPhone } from 'react-icons/lu';

const ContactInfo = () => {
  return (
    <div className='pb-24'>
      <div className='container mx-auto'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {contactInfo.map((info) => (
            <div
              key={info.title}
              className='group rounded-lg bg-[url("/images/contact_info_bg.png")] px-[52px] py-14 shadow-[0px_-4px_30px_rgb(1_15_28_/_8%)]'
            >
              <div className='flex flex-col items-center justify-center'>
                <div
                  className='relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-yellowColor text-3xl
                text-white before:absolute before:left-0 before:top-0 before:-z-[1] before:h-full before:w-full
                before:rounded-full before:bg-yellowColor before:opacity-40 before:transition-all before:duration-500
                after:absolute after:left-0 after:top-0 after:-z-[1] after:h-full after:w-full after:rounded-full after:bg-yellowColor after:opacity-40
                after:transition-all after:duration-500 group-hover:before:left-2 group-hover:before:top-1 group-hover:after:-left-2 group-hover:after:-top-1'
                >
                  <info.icon size={32} />
                </div>
                <h3 className='pb-2 pt-6 text-2xl font-semibold'>
                  {info.title}
                </h3>
                <p>{info.upContent}</p>
                <p>{info.lowContent}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
