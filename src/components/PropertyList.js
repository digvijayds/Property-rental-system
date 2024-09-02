import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UpdateProperty from './UpdateProperty';
import PropertySearchBar from './PropertySearchbar';
import LogoutButton from './LogoutButton';
import Sidebar from './sidebar';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [editProperty, setEditProperty] = useState(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get('http://localhost/propertymanagement/api/property.php');
      setProperties(response.data);
      setFilteredProperties(response.data);
    } catch (error) {
      toast.error('Failed to fetch properties');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost/propertymanagement/api/property.php?id=${id}`);
      if (response.data.success) {
        toast.success(response.data.message);
        fetchProperties(); // Refresh the property list
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Failed to delete property');
    }
  };

  const handleEdit = (property) => {
    setEditProperty(property);
  };

  const handleSearch = ({ city, type, category }) => {
    let filtered = properties;

    if (city) {
      filtered = filtered.filter((property) => property.city === city);
    }

    if (type) {
      filtered = filtered.filter((property) => property.type === type);
    }

    if (category) {
      filtered = filtered.filter((property) => property.category === category);
    }

    setFilteredProperties(filtered);
  };

  return (
    <div>
      <Sidebar/>
      <br/><br/><br/><br/><br/>
      {editProperty ? (
        <UpdateProperty property={editProperty} onClose={() => setEditProperty(null)} onUpdate={fetchProperties} />
      ) : (
        <div className="max-w-7xl mx-auto p-4 bg-white rounded shadow-lg"style={{marginLeft:'310px',width:'1100px'}}>
          <h2 className="text-2xl font-bold mb-4">Property List</h2>
          <PropertySearchBar onSearch={handleSearch} />
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2">Type</th>
                <th className="py-2">Rooms</th>
                <th className="py-2">Bathrooms</th>
                <th className="py-2">City</th>
                <th className="py-2">Square Feet</th>
                <th className="py-2">Price</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProperties.map((property) => (
                <tr key={property.id}>
                  <td className="border px-4 py-2">{property.type}</td>
                  <td className="border px-4 py-2">{property.bedrooms}</td>
                  <td className="border px-4 py-2">{property.bathrooms}</td>
                  <td className="border px-4 py-2">{property.city}</td>
                  <td className="border px-4 py-2">{property.square_feet}</td>
                  <td className="border px-4 py-2">{property.price}</td>
                  <td className="border px-4 py-2">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={() => handleEdit(property)}>Edit</button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => handleDelete(property.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      <ToastContainer />
    </div>
  );
};

export default PropertyList;
