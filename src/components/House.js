import React from 'react';
import { BiBed, BiBath, BiArea } from 'react-icons/bi';

const House = ({ house }) => {
  const { image_url, type, city, address, bedrooms, bathrooms, square_feet, price } = house;
  
  // Ensure image_url is a valid JSON string before parsing
  let images = [];
  try {
    // Handle different formats of image_url
    if (typeof image_url === 'string' && image_url.trim() !== '') {
      // Try parsing if image_url looks like a JSON string
      images = JSON.parse(image_url);
    } else if (Array.isArray(image_url)) {
      images = image_url;
    }
  } catch (e) {
    console.error('Error parsing image_url:', e);
    images = []; // Fallback to an empty array if parsing fails
  }

  return (
    <div className='bg-white shadow-1 p-5  w-full max-w-[352px] mx-auto cursor-pointer hover:shadow-2xl transition'>
      <div className='mb-8'>
        {images.length > 0 ? (
          <img className='w-full h-64 object-cover rounded-lg' src={`http://localhost/propertymanagement/images/${images[0]}`} alt='property' />
        ) : (
          <div className='w-full h-64 bg-gray-200 rounded-lg'></div>
        )}
      </div>
      <div className='mb-4 flex gap-x-2 text-sm'>
        <div className='bg-green-500 rounded-full text-white px-3'>{type}</div>
        <div className='bg-blue-500 rounded-full text-white px-3'>{city}</div>
      </div>
      <div className='text-lg font-semibold max-w-[260px]'>{address}</div>
      <div className='flex gap-x-4 my-4'>
        <div className='flex items-center text-gray-600 gap-1'>
          <div className='text-[20px]'><BiBed /></div>
          <div>{bedrooms}</div>
        </div>
        <div className='flex items-center text-gray-600 gap-1'>
          <div className='text-[20px]'><BiBath /></div>
          <div>{bathrooms}</div>
        </div>
        <div className='flex items-center text-gray-600 gap-1'>
          <div className='text-[20px]'><BiArea /></div>
          <div>{square_feet} sqft</div>
        </div>
      </div>
      <div className='text-lg font-semibold text-blue-600 mb-4'>Rs.{price}</div>
    </div>
  );
};

export default House;
