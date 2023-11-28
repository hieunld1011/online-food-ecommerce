interface SectionTitleProps {
  title: string;
  section: string;
  desc: string;
}

const SectionTitle = ({ title, section, desc }: SectionTitleProps) => {
  return (
    <>
      <div className='flex items-center justify-center'>
        <span className='mr-2 h-1 w-12 rounded-[30px] bg-yellowColor' />
        <span className='mr-4 h-4 w-4 rounded-full bg-yellowColor' />
        <h4 className='text-center text-xl font-semibold uppercase'>
          {section}
        </h4>
        <span className='ml-4 h-4 w-4 rounded-full bg-yellowColor' />
        <span className='ml-2 h-1 w-12 rounded-[30px] bg-yellowColor' />
      </div>
      <h3 className='py-4 text-center text-3xl font-semibold md:text-4xl lg:text-[46px]'>
        {title}
      </h3>
      <p className='mx-auto mb-16 text-center md:max-w-[65%] lg:max-w-[43%]'>
        {desc}
      </p>
    </>
  );
};

export default SectionTitle;
