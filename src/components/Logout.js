import axios from 'axios';

const logout = async () => {
  try {
    const response = await axios.post(
      'http://localhost/propertymanagement/api/logout.php',
      {},
      { withCredentials: true }
    );
    if (response.data.success) {
      console.log(response.data.message); // For testing purposes
      // Redirect to login page or home page after logout
      window.location.href = '/login';
    } else {
      console.error('Logout failed:', response.data.message);
    }
  } catch (error) {
    console.error('Error logging out:', error);
  }
};

export default logout;
