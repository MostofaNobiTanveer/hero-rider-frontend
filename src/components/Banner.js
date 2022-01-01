import React from 'react';

const Banner = () => {
  return (
    <section className='flex-1'>
      <div className="relative py-6">
        <div className="mt-16 mx-auto max-w-6xl px-4 sm:mt-24 sm:px-6">
          <div className="text-center">
            <h1 className="font-body tracking-wide text-4xl text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Earn, Connect</span>
              <span className="block">With the Safest Rides</span>
            </h1>
            <p className=" mt-8 max-w-4xl mx-auto text-base text-gray-500 sm:text-lg md:text-xl">
              With every safety feature and every standard in our Community
              Guidelines, we're committed to helping to create a safe
              environment for our users. We monitor rides to help you get
              where you need to go.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
