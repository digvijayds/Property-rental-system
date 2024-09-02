import React, { useEffect, useState } from 'react';
import Sidebar from './sidebar';

const Inquiry = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await fetch('http://localhost/propertymanagement/api/inquiry.php');
        const data = await response.json();
        setInquiries(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching inquiries:", error);
        setLoading(false);
      }
    };

    fetchInquiries();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto min-h-[800px] mb-14">
      <Sidebar />
      <br/><br/><br/><br/>
      <div className="ml-[150px]">
        <br/><br/><br/>
        <h2 className="text-2xl font-semibold mb-6">Inquiries</h2>
        <div className="bg-white border rounded-lg shadow-md p-6" style={{ width: '1100px' }}>
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="py-2 border-b">Name</th>
                <th className="py-2 border-b">Email</th>
                <th className="py-2 border-b">Phone</th>
                <th className="py-2 border-b">Message</th>
                <th className="py-2 border-b">Property ID</th>
                <th className="py-2 border-b">Created At</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inquiry) => (
                <tr key={inquiry.id}>
                  <td className="border px-4 py-2">{inquiry.name}</td>
                  <td className="border px-4 py-2">{inquiry.email}</td>
                  <td className="border px-4 py-2">{inquiry.phone}</td>
                  <td className="border px-4 py-2">{inquiry.message}</td>
                  <td className="border px-4 py-2">{inquiry.property_id}</td>
                  <td className="border px-4 py-2">{inquiry.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <br/><br/><br/><br/>
        </div>
      </div>
    </div>
  );
};

export default Inquiry;
