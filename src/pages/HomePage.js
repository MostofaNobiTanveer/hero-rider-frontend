import React from 'react';
import { Banner, Navbar, SignupButtons } from '../components';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar />
      <Banner />
      <SignupButtons />
    </div>
  );
};

export default HomePage;
