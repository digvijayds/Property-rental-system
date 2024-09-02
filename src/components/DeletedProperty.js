import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeletedProperty = () => {
  const [deletedProperties, setDeletedProperties] = useState([]);

  useEffect(() => {
    fetchDeletedProperties();
  }, []);

  const fetchDeletedProperties = async () => {
    try {
      const response = await axios.get('http://localhost/propertymanagement/api/manage_properties.php');
      setDeletedProperties(response.data);
    } catch (error) {
      console.error('Error fetching deleted properties:', error);
      toast.error('Failed to fetch deleted properties');
    }
  };

  const handleRestore = async (id) => {
    try {
      const response = await axios.post('http://localhost/propertymanagement/api/manage_properties.php', { id });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchDeletedProperties(); // Refresh the list
      } else {
        toast.error(response.data.message || 'Failed to restore property');
      }
    } catch (error) {
      console.error('Error restoring property:', error);
      toast.error('Failed to restore property');
    }
  };

  const handlePermanentDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost/propertymanagement/api/manage_properties.php?id=${id}`);
      if (response.data.success) {
        toast.success(response.data.message);
        fetchDeletedProperties(); // Refresh the list
      } else {
        toast.error(response.data.message || 'Failed to permanently delete property');
      }
    } catch (error) {
      console.error('Error permanently deleting property:', error);
      toast.error('Failed to permanently delete property');
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Deleted Properties</h2>
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
          {deletedProperties.map((property) => (
            <tr key={property.id}>
              <td className="border px-4 py-2">{property.type}</td>
              <td className="border px-4 py-2">{property.bedrooms}</td>
              <td className="border px-4 py-2">{property.bathrooms}</td>
              <td className="border px-4 py-2">{property.city}</td>
              <td className="border px-4 py-2">{property.square_feet}</td>
              <td className="border px-4 py-2">{property.price}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => handleRestore(property.id)}
                >
                  Restore
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handlePermanentDelete(property.id)}
                >
                  Delete Permanently
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default DeletedProperty;
