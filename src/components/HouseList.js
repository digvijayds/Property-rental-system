import React, { useContext } from 'react';
import { HouseContext } from './HouseContext';
import House from './House';
import { Link } from 'react-router-dom';
import { ImSpinner2 } from 'react-icons/im';
import Search from './Search';

const HouseList = () => {
  const { houses, loading } = useContext(HouseContext);
  const { filteredHouses, loading1 } = useContext(HouseContext);
  if (loading1) {
    return <div>Loading...</div>;
  }

  if (loading) {
    return (
      <ImSpinner2 className="mx-auto animate-spin text-blue-700 text-4xl mt-[200px]" size="50px" />
    );
  }

  const trendingHouses = houses.filter(house => house.category === 'upcoming');
  const rentalHouses = houses.filter(house => house.category === 'highlighted');
  const forSaleHouses = houses.filter(house => house.category === 'property_of_week');

  return (
    <section className='m-20'>
      <div className='container mx-auto'>
        {/* Trending Houses Section */}
        <h2 className='text-2xl font-bold mb-4 text-center text-gray-600'>Upcoming Houses</h2>
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12'>
          {trendingHouses.map((house, index) => (
            <Link to={`/property/${house.id}`} key={index}>
              <House house={house} />
            </Link>
          ))}
        </div>

        {/* Rental Houses Section */}
        <h2 className='text-2xl font-bold mb-4 text-center text-gray-600'>Highlighted Houses</h2>
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12'>
          {rentalHouses.map((house, index) => (
            <Link to={`/property/${house.id}`} key={index}>
              <House house={house} />
            </Link>
          ))}
        </div>

        {/* Houses for Sale Section */}
        <h2 className='text-2xl font-bold mb-4 text-center text-gray-600'>Property Of Week</h2>
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6'>
          {forSaleHouses.map((house, index) => (
            <Link to={`/property/${house.id}`} key={index}>
              <House house={house} />
            </Link>
          ))}
          
        </div>
      <br/><br/>
      <Search/>
      <br/>
      {/* Houses for Sale Section */}
      <h2 className='text-2xl font-bold mb-4 text-center text-gray-600'>All Houses</h2>
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6'>
       
           {filteredHouses.map(house => (
        
        <Link to= {`/property/${house.id}`} key={house.id}>
        <House house={house}/>
      </Link>

      ))}
        </div>
      </div>
    
  </section>
  );

};

export default HouseList;
