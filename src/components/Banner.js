import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from '../assets/img/house-banner.png';
import Search from '../components/Search';

const Banner = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <motion.section 
      className='h-full max-h-[640px] mb-8 xl:mb-24  p-6 rounded-lg lg' // Added 'shadow-lg' for the shadow effect
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 1 }}
    >
      <div className="flex flex-col lg:flex-row">
        <div className='lg:ml-8 xl:ml-[135px] flex flex-col items-center lg:items-start text-center lg:text-left justify-center flex-1 px-4 lg:px-0'>
          <motion.h1 
            className='text-4xl lg:text-[58px] font-semibold leading-none mb-6'
            initial={{ y: '-100vh' }}
            animate={{ y: isLoaded ? 0 : '-100vh' }}
            transition={{ type: 'spring', stiffness: 50, damping: 10, duration: 2 }}
          >
            <span className='text-blue-700'>Rent</span> Your Dream Home
          </motion.h1>
          <motion.p 
            className='max-w-[480px] mb-8 text-gray-700'
            initial={{ y: '-100vh' }}
            animate={{ y: isLoaded ? 0 : '-100vh' }}
            transition={{ type: 'spring', stiffness: 50, damping: 10, duration: 2 }}
          >
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna. Nunc viverra imperdiet enim. Fusce est. Vivamus a tellus.
          </motion.p>
        </div>
        <div className='hidden flex-1 lg:flex justify-end items-end'>
          <motion.img 
            src={Image} 
            alt='House banner'
            initial={{ scale: 0 }}
            animate={{ scale: isLoaded ? 1 : 0 }}
            transition={{ duration: 1.5 }}
            className='rounded-lg ' // Added 'shadow-lg' for the shadow effect
          />
        </div>
      </div>
      <br/>
      {/* <Search /> */}
    </motion.section>
  );
};

export default Banner;
