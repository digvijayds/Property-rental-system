// HouseContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const HouseContext = createContext();

const HouseProvider = ({ children }) => {
  const [houses, setHouses] = useState([]);
  const [filteredHouses, setFilteredHouses] = useState([]); // Separate state for filtered houses
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('City (any)');
  const [propertyType, setPropertyType] = useState('Property type (any)');
  const [priceRange, setPriceRange] = useState('Price range (any)');

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await axios.get('http://localhost/propertymanagement/api/property.php');
        setHouses(response.data);
        setFilteredHouses(response.data); // Initialize filteredHouses with the full list
        // console.log("Api response:", response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching houses:', error);
        setError('Failed to load properties');
        setLoading(false);
      }
    };

    fetchHouses();
  }, []);

  const handleSearch = () => {
    let results = houses; // Start with the full list

    if (city !== 'City (any)') {
      results = results.filter(house => house.city === city);
    }

    if (propertyType !== 'Property type (any)') {
      results = results.filter(house => house.type === propertyType);
    }

    if (priceRange !== 'Price range (any)') {
      const [minPrice, maxPrice] = priceRange.split(' - ').map(price => parseInt(price));
      results = results.filter(house => house.price >= minPrice && house.price <= maxPrice);
    }

    setFilteredHouses(results); // Update filtered houses
  };

  return (
    <HouseContext.Provider value={{ 
      houses, filteredHouses, // Provide the filtered houses to other components
      loading, 
      error, 
      city, 
      setCity, 
      propertyType, 
      setPropertyType, 
      priceRange, 
      setPriceRange, 
      handleSearch 
    }}>
      {children}
    </HouseContext.Provider>
  );
};


export default HouseProvider;
