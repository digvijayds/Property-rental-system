import React, { useContext } from 'react';
import { HouseContext } from './HouseContext';

const TransactionTypeDropdown = () => {
  const { transactionType, setTransactionType } = useContext(HouseContext);

  const handleTransactionTypeChange = (e) => {
    setTransactionType(e.target.value);
  };

  return (
    <select
      className='bg-white w-full lg:max-w-[162px] h-16 rounded-lg px-4 text-gray-700'
      value={transactionType}
      onChange={handleTransactionTypeChange}
    >
      <option value="">All</option>
      <option value="rent">Rent</option>
      <option value="buy">Buy</option>
    </select>
  );
};

export default TransactionTypeDropdown;
