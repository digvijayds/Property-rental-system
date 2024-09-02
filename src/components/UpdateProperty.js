import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateProperty = ({ property, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    ...property,
    newImages: [],
  });
  const [currentImages, setCurrentImages] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);

  useEffect(() => {
    if (property.image_url && Array.isArray(property.image_url)) {
      setCurrentImages(property.image_url);
    }
  }, [property]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // Allow only numeric input for specific fields
    if (['bedrooms', 'bathrooms', 'price'].includes(name)) {
      if (/^\d*$/.test(value)) {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      } else {
        alert('Please enter only numbers');
      }
    } else if (name === 'newImages') {
      setFormData((prev) => ({
        ...prev,
        [name]: [...prev.newImages, ...Array.from(files)],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleRemoveCurrentImage = (index) => {
    setDeletedImages((prev) => [...prev, currentImages[index]]);
    setCurrentImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleRemoveNewImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      newImages: prev.newImages.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    for (let key in formData) {
      if (key !== 'newImages' && key !== 'deletedImages') {
        data.append(key, formData[key]);
      }
    }

    formData.newImages.forEach((image) => {
      data.append('newImages[]', image);
    });

    if (deletedImages.length > 0) {
      data.append('deletedImages', JSON.stringify(deletedImages));
    }

    try {
      const response = await axios.post(
        `http://localhost/propertymanagement/api/update_property.php?id=${property.id}`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        onUpdate();
        onClose();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Failed to update property');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Update Property</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Type</label>
          <select name="type" value={formData.type} onChange={handleChange} className="w-full px-3 py-2 border rounded">
            <option value="">Select Type</option>
            <option value="House/Villa">House/Villa</option>
            <option value="Apartment">Apartment</option>
            <option value="Open land">Open Land</option>
            <option value="Flat">Flat</option>
            <option value="Commercial shop">Commercial Shop</option>
            <option value="Commercial land">Commercial Land</option>
            <option value="godown">Godown</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            
          >
            <option value="">Select Category</option>
            <option value="upcoming">Upcoming Property</option>
            <option value="highlighted">Highlighted Property</option>
            <option value="property_of_week">Property Of Week</option>
            
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Rooms</label>
          <input
            type="text"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
       
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Bathrooms</label>
          <input
            type="text"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
           
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
           
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Square Feet</label>
          <input
            type="text"
            name="square_feet"
            value={formData.square_feet}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
           
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Price</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
           
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Add New Images</label>
          <input
            type="file"
            name="newImages"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            multiple
            accept="image/*"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Current Images</label>
          <div className="grid grid-cols-2 gap-2">
            {currentImages.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={`http://localhost/propertymanagement/images/${image}`}
                  alt={`Property Image ${index + 1}`}
                  className="w-full h-32 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveCurrentImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">New Images</label>
          <div className="grid grid-cols-2 gap-2">
            {formData.newImages.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`New Property Image ${index + 1}`}
                  className="w-full h-32 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveNewImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="text-right">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-600 text-white px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Update Property
          </button>
        </div>
        <br/><br/><br/><br/>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UpdateProperty;
