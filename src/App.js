// App.js
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import PropertyDetails from './pages/PropertyDetails';
import AddProperty from './components/AddProperty';
import PropertyList from './components/PropertyList';
import Inquiry from './components/Inquiry';
import DeletedProperty from './components/DeletedProperty';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/dashboard'
const App = () => {
  const location = useLocation();
  const fixedRoutes = ['/propertylist', '/addproperty', '/updateproperty', '/inquiry', '/dashboard','/login'];
  const isFixed = fixedRoutes.includes(location.pathname);

  return (
    <div className="max-w-[1440px] mx-auto bg-white">
    <React.Fragment>
      <Header fixed={isFixed} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/addproperty" element={<AddProperty />} />
          <Route path="/propertylist" element={<PropertyList />} />
          <Route path="/inquiry" element={<Inquiry />} />
          <Route path="/deleted" element={<DeletedProperty />} />
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Route>
      </Routes>
      <Footer fixed={isFixed} />
      </React.Fragment>
    </div>
  );
};

export default App;
