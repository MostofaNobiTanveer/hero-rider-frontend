import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components';

const NotFoundPage = () => {
  return (
    <>
      <Navbar />
      <div className="mt-16 mx-auto max-w-6xl px-4 sm:mt-24 sm:px-6">
        <div className="text-center">
          <h1 className="font-body tracking-wide text-4xl text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">No Way Found</span>
          </h1>
          <Link to='/' className='font-body text-2xl mt-8 block'>
            <span className="block underline text-gray-500 hover:text-black">Return Home</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
