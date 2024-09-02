import React, { useContext, useState } from 'react';
import { HouseContext } from './HouseContext';
import { Menu } from '@headlessui/react';
import { RiWallet3Line, RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import { motion } from 'framer-motion';

const PriceRangeDropdown = () => {
  const { priceRange, setPriceRange } = useContext(HouseContext);
  const [isOpen, setIsOpen] = useState(false);

  const prices = [
    'Price range (any)',
    '1000000 - 30000000',
    '100000 - 130000',
    '130000 - 160000',
    '160000 - 190000',
    '190000 - 220000',
    '10000 - 30000',
    '30000 - 40000',
  ];

  return (
    <Menu as='div' className='dropdown relative'>
      <Menu.Button onClick={() => setIsOpen(!isOpen)} className='dropdown-btn w-full text-left'>
        <RiWallet3Line className='dropdown-icon-primary' />
        <div>
          <div className='text-[15px] font-medium leading-tight'>{priceRange}</div>
          <div className='text-[13px]'>Choose price range</div>
        </div>
        {isOpen ? <RiArrowUpSLine className='dropdown-icon-secondary' /> : <RiArrowDownSLine className='dropdown-icon-secondary' />}
      </Menu.Button>
      <Menu.Items as={motion.ul} className='dropdown-menu' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        {prices.map((price, index) => (
          <Menu.Item onClick={() => setPriceRange(price)} className='cursor-pointer hover:text-blue-700 transition' as='li' key={index}>
            {price}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
};

export default PriceRangeDropdown;
