import HeroSection from '@/app/components/Hero&Title/HeroSection';
import React from 'react';
import MapContact from './_components/MapContact';
import ContactInfo from './_components/ContactInfo';
import ContactForm from './_components/ContactForm';

const Contact = () => {
  return (
    <>
      <HeroSection title={'Contact Us'} />
      <MapContact />
      <ContactInfo />
      <ContactForm />
    </>
  );
};

export default Contact;
