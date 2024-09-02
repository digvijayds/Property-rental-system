import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BiBed, BiBath, BiArea } from 'react-icons/bi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', color: 'black', background: 'none' }}
      onClick={onClick}
    />
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', color: 'black', background: 'none' }}
      onClick={onClick}
    />
  );
};

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: 'Hello, I am interested in Apartment'
  });

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`http://localhost/propertymanagement/api/property.php?id=${id}`);
        const propertyDetails = response.data;

        if (Array.isArray(propertyDetails.image_url)) {
          setProperty(propertyDetails);
        } else {
          setProperty({
            ...propertyDetails,
            image_url: []
          });
        }

        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch property details:', error);
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost/propertymanagement/api/inquiry.php', {
        ...formData,
        property_id: id
      });
      const result = response.data;
  
      if (result.success) {
        toast.success(result.message || 'Message sent successfully');
      } else {
        toast.error(result.message || 'Failed to send message');
      }
    } catch (error) {
      console.error("Error submitting inquiry:", error.response || error.message);
      toast.error('Error submitting inquiry');
    }
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!property) {
    return <div>Property not found</div>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: property.image_url.length > 1,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='container mx-auto min-h-[800px] mb-14 px-4' // Added padding for mobile view
    >
      <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4'>
        <div>
          <h2 className='text-xl lg:text-2xl font-semibold'>{property.type}</h2>
          <h3 className='text-base lg:text-lg mb-2'>{property.address}</h3>
        </div>
        <div className='flex gap-x-2 text-xs lg:text-sm mb-2 lg:mb-0'>
          <div className='bg-green-500 text-white px-3 py-1 rounded-full'>{property.type}</div>
          <div className='bg-blue-500 text-white px-3 py-1 rounded-full'>{property.city}</div>
        </div>
        <div className='text-2xl lg:text-3xl font-semibold text-blue-600'>
          Rs. {property.price}
        </div>
      </div>
      <div className='flex flex-col lg:flex-row items-start gap-4'>
        <div className='w-full lg:max-w-[768px]'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className='mb-4'
          >
            <Slider {...settings}>
              {property.image_url.length > 0 ? (
                property.image_url.map((img, index) => (
                  <div key={index}>
                    <img
                      src={`http://localhost/propertymanagement/images/${img}`}
                      alt={`Slide ${index}`}
                      className='rounded-lg shadow-lg w-full'
                    />
                  </div>
                ))
              ) : (
                <div>No images available</div>
              )}
            </Slider>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className='flex gap-x-4 text-blue-700 mb-4 text-xs lg:text-sm'
          >
            <div className='flex gap-x-2 items-center'>
              <BiBed className='text-lg lg:text-2xl' />
              <div>{property.bedrooms}</div>
            </div>
            <div className='flex gap-x-2 items-center'>
              <BiBath className='text-lg lg:text-2xl' />
              <div>{property.bathrooms}</div>
            </div>
            <div className='flex gap-x-2 items-center'>
              <BiArea className='text-lg lg:text-2xl' />
              <div>{property.square_feet} sqft</div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className='text-gray-700 mb-8 leading-relaxed text-sm lg:text-base'
          >
            {property.description}
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className='w-full lg:flex-1 mb-8 bg-white border border-gray-300 rounded-lg p-4 lg:p-8 shadow-md'
        >
          <form className='flex flex-col gap-y-4' onSubmit={handleSubmit}>
            <input
              className='border border-gray-300 focus:border-blue-500 outline-none rounded w-full px-4 h-12 lg:h-14 text-sm'
              type='text'
              name='name'
              placeholder='Name*'
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              className='border border-gray-300 focus:border-blue-500 outline-none rounded w-full px-4 h-12 lg:h-14 text-sm'
              type='email'
              name='email'
              placeholder='Email*'
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              className='border border-gray-300 focus:border-blue-500 outline-none rounded w-full px-4 h-12 lg:h-14 text-sm'
              type='tel'
              name='phone'
              placeholder='Phone*'
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <textarea
              className='border border-gray-300 focus:border-blue-500 outline-none rounded w-full p-4 h-24 lg:h-36 text-sm text-gray-400'
              name='message'
              placeholder='Hello, I am interested in [Property Type]'
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            <button
              type='submit'
              className='bg-blue-700 hover:bg-blue-800 text-white rounded p-4 text-sm w-full transition'
            >
              Send Inquiry
            </button>
            <ToastContainer />
          </form>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default PropertyDetails;
