import React, { useContext } from 'react';
import CityDropdown from './CityDropdown';
import PropertyDropdown from './PropertyDropdown';
import PriceRangeDropdown from './PriceRangeDropdown';
import TransactionTypeDropdown from './TransactionTypeDropdown'; // Import the new component
import { RiSearch2Line } from 'react-icons/ri';
import { HouseContext } from './HouseContext';

const Search = () => {
  const { handleSearch } = useContext(HouseContext);

  return (
    <div className='bg-gray-500 px-[30px] py-6 max-w-[1170px] mx-auto flex flex-col lg:flex-row justify-between gap-4 lg:gap-x-3 relative lg:-top-4 lg:shadow-1 lg:bg-transparent lg:backdrop-blur rounded-lg'>
      <CityDropdown />
      <PropertyDropdown />
      <PriceRangeDropdown />
      <TransactionTypeDropdown /> {/* Add the new dropdown here */}
      <button
        onClick={handleSearch}
        className='bg-blue-700 hover:bg-blue-800 transition w-full lg:max-w-[162px] h-16 rounded-lg flex justify-center items-center text-white text-lg'
      >
        <RiSearch2Line />
      </button>
    </div>
  );
};

export default Search;
