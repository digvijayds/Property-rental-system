import React, { useState } from 'react';

const PropertySearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');

  const handleSearch = () => {
    onSearch({ city, type, category });
  };

  return (
    <div className="flex mb-4">
      <select
        className="border px-4 py-2 rounded mr-2"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      >
        <option value="">All Cities</option>
        {/* Add city options dynamically based on available cities */}
        <option value="City1">City1</option>
        <option value="City2">City2</option>
      </select>
      <select
        className="border px-4 py-2 rounded mr-2"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="">All Types</option>
        <option value="House/Villa">House/Villa</option>
        <option value="Apartment">Apartment</option>
        <option value="Open Land">Open Land</option>
        <option value="Flat">Flat</option>
        <option value="Commercial Shop">Commercial Shop</option>
        <option value="Commercial Land">Commercial Land</option>
        <option value="Godown">Godown</option>
      </select>
      <select
        className="border px-4 py-2 rounded mr-2"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        {/* Add category options dynamically based on available categories */}
        <option value="rent">Rent</option>
        <option value="selling">Selling</option>
        <option value="trending">Trending</option>
      </select>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default PropertySearchBar;
