import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../assets/img/logo.svg';

const Header = ({ fixed }) => {
  return <header className={`py-6 mb-12 border-b ${fixed ? 'fixed top-0 left-0 w-full z-10 bg-white shadow-lg' : ''}`}>
    <div className='container mx-auto flex justify-between items-center'>
        <Link to='/'>
            <img src={Logo} alt=''/>
        </Link>
        <div className='flex items-center gap-6'>
          <Link className='hover:text-blue-900 transition' to='/login'>Log in</Link>
          <Link className='bg-blue-700 hover:bg-blue-800 text-white px-4 py-3 rounded-lg transition' to=''>Sign up</Link>
        </div>
    </div>
  </header>;
};

export default Header;
