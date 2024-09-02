import React from 'react';

const Footer = ({ fixed }) => {
  return (
    <footer className={`bg-black py-6 text-center text-white ${fixed ? 'fixed bottom-0 left-0 w-full' : ''}`}>
      <div className='container mx-auto'>
        Copyright &copy; 2024. All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
