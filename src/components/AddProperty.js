import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './sidebar';

const AddProperty = () => {
  const [formData, setFormData] = useState({
    type: '',
    rooms: '',
    bathrooms: '',
    city: '',
    description: '',
    address: '',
    square_feet: '',
    price: '',
    category: '' // Added category field
  });
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
  
    // Allow only numeric input for specific fields
    if (['rooms', 'bathrooms', 'price'].includes(name)) {
      if (/^\d*$/.test(value)) {
        setFormData({ ...formData, [name]: value });
      } else {
        alert('Please enter only numbers');
      }
    } else if (name === 'images') {
      setImages((prevImages) => [
        ...prevImages,
        ...Array.from(files)
      ]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    
    // Append form data
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    // Append images
    images.forEach((image) => {
      data.append('images[]', image);
    });

    // Log the FormData contents for debugging
    for (let pair of data.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {
      const response = await axios.post('http://localhost/propertymanagement/api/property.php', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.success) {
        toast.success(response.data.message);
        // Clear form and images
        setFormData({
          type: '',
          rooms: '',
          bathrooms: '',
          city: '',
          description: '',
          address: '',
          square_feet: '',
          price: '',
          category: '' // Reset category field
        });
        setImages([]);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Failed to add property');
    }
  };

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded shadow-lg">
      <Sidebar/>
      <br/><br/><br/><br/>

      <br/><br/>
      <h2 className="text-2xl font-bold mb-4" >Add Property</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data"  >
        <div className="mb-4" >
          <label className="block text-sm font-bold mb-2">Type</label>
          <select name="type" value={formData.type} onChange={handleChange} className="w-full px-3 py-2 border rounded" required>
            <option value="">Select Type</option>
            <option value="House/Villa">House/Villa</option>
            <option value="Apartment">Apartment</option>
            <option value="Open Land">Open Land</option>
            <option value="Flat">Flat</option>
            <option value="Commercial shop">Commercial Shop</option>
            <option value="Commercial land">Commercial Land</option>
            <option value="Godown">Godown</option>
            
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Rooms</label>
          <input type="text" name="rooms" value={formData.rooms} onChange={handleChange} className="w-full px-3 py-2 border rounded"  />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Bathrooms</label>
          <input type="text" name="bathrooms" value={formData.bathrooms} onChange={handleChange} className="w-full px-3 py-2 border rounded"  />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">City</label>
          <input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} className="w-full px-3 py-2 border rounded" rows="4" required />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Address</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Square Feet</label>
          <input type="text" name="square_feet" value={formData.square_feet} onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Price</label>
          <input type="text" name="price" value={formData.price} onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Category</label>
          <select name="category" value={formData.category} onChange={handleChange} className="w-full px-3 py-2 border rounded" required>
            <option value="">Select Category</option>
            <option value="upcoming">Upcoming Property</option>
            <option value="highlighted">Highlighted Property</option>
            <option value="property_of_week">Property Of Week</option>
            <option value="all_properties">All properties</option>
           
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Images</label>
          <input type="file" name="images" onChange={handleChange} className="w-full px-3 py-2 border rounded" multiple accept="image/*" />
        </div>
        <div className="mb-4 grid grid-cols-2 gap-2">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <img src={URL.createObjectURL(image)} alt={`Property Image ${index + 1}`} className="w-full h-32 object-cover rounded" />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded"
              >
                X
              </button>
            </div>
          ))}
        </div>
        <button type="submit" className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-600">Add Property</button>
        <br/><br/><br/><br/>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddProperty;
