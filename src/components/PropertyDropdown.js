import React, { useContext, useState } from 'react';
import { HouseContext } from './HouseContext';
import { Menu } from '@headlessui/react';
import { RiHome5Line, RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import { motion } from 'framer-motion';

// Define your static list of property types
const staticPropertyTypes = ['Property type (any)', 'Apartment', 'House/Villa', 'Open Land'];

const PropertyDropdown = () => {
  const { propertyType, setPropertyType, fetchHouses } = useContext(HouseContext);
  const [isOpen, setIsOpen] = useState(false);

  const handlePropertyTypeChange = (selectedType) => {
    if (selectedType === propertyType) return; // Avoid unnecessary state updates
    setPropertyType(selectedType);
    if (fetchHouses) {
      fetchHouses(selectedType); // Adjust this function as needed
    } else {
      console.error("fetchHouses function is not defined in HouseContext");
    }
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <Menu as='div' className='dropdown relative'>
      <Menu.Button onClick={() => setIsOpen(!isOpen)} className='dropdown-btn w-full text-left'>
        <RiHome5Line className='dropdown-icon-primary ' />
        <div>
          <div className='text-[15px] font-medium leading-tight'>{propertyType}</div>
          <div className='text-[13px]'>Select property</div>
        </div>
        {isOpen ? <RiArrowUpSLine className='dropdown-icon-secondary ' /> : <RiArrowDownSLine className='dropdown-icon-secondary ' />}
      </Menu.Button>
      <Menu.Items as={motion.ul} className='dropdown-menu' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        {staticPropertyTypes.map((type, index) => (
          <Menu.Item onClick={() => handlePropertyTypeChange(type)} className='cursor-pointer hover:text-blue-700 transition' as='li' key={index}>
            {type}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
};

export default PropertyDropdown;
