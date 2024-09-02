import React, { useContext, useState } from 'react';
import { HouseContext } from './HouseContext';
import { Menu } from '@headlessui/react';
import { RiMapPinLine, RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import { motion } from 'framer-motion';

const CityDropdown = () => {
  const { city, setCity, houses } = useContext(HouseContext); // Using full houses list
  const [isOpen, setIsOpen] = useState(false);

  const cities = ['City (any)', ...new Set(houses.map(house => house.city))]; // Get all cities from the original list

  return (
    <Menu as='div' className='dropdown relative'>
      <Menu.Button onClick={() => setIsOpen(!isOpen)} className='dropdown-btn w-full text-left'>
        <RiMapPinLine className='dropdown-icon-primary' />
        <div>
          <div className='text-[15px] font-medium leading-tight'>{city}</div>
          <div className='text-[13px]'>Select place</div>
        </div>
        {isOpen ? <RiArrowUpSLine className='dropdown-icon-secondary' /> : <RiArrowDownSLine className='dropdown-icon-secondary' />}
      </Menu.Button>
      <Menu.Items as={motion.ul} className='dropdown-menu' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        {cities.map((city, index) => (
          <Menu.Item onClick={() => setCity(city)} className='cursor-pointer hover:text-blue-700 transition' as='li' key={index}>
            {city}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
};


export default CityDropdown;