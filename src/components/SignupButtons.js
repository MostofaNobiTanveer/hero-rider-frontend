import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsChevronRight } from 'react-icons/bs';
import { AiOutlineCar } from 'react-icons/ai';
import { RiMotorbikeLine } from 'react-icons/ri';
import { useAuthContext } from '../contexts/AuthProvider';

const links = [
  { id: 1, title: 'Sign up to ride', href: '/signup-to-ride' },
  { id: 2, title: 'Create rider account', href: '/signup-as-rider' },
];
// const adminLinks = [
//   { id: 1, title: 'Manage Users', href: '/users' },
//   { id: 2, title: 'Manage Orders', href: '/orders' },
// ];

const SignupButtons = () => {
  const { rider, admin, user } = useAuthContext();
  const [services, setServices] = useState([]);
  useEffect(() => {
    fetch('https://still-island-68728.herokuapp.com/services')
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, [user.email]);
  return (
    <section className="font-body">
      {!user?.email ? (
        <div className="flex-1 overflow-hidden grid md:grid-cols-2 border-y border-slate-200 md:divide-x md:divide-y-0 divide-y divide-slate-200">
          {links.map((item) => {
            const { id, title, href } = item;
            return (
              <Link
                key={id}
                to={href}
                className="card sm:py-12 overflow-hidden relative p-4 group focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
              >
                <div className="flex flex-col gap-3 justify-center items-center h-full">
                  <div className="truncate text-center">
                    <p className="text-2xl text-black font-title tracking-wider">
                      {title}
                    </p>
                  </div>
                  <div>
                    <BsChevronRight className="text-2xl font-extralight" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="flex-1 overflow-hidden grid md:grid-cols-2 border-y border-slate-200 md:divide-x md:divide-y-0 divide-y divide-slate-200">
          {services.map((item) => {
            const { _id, title, price } = item;
            return (
              <Link
                key={_id}
                to={`/payment/${_id}`}
                className="card sm:py-12 overflow-hidden relative p-4 group focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
              >
                <div className="flex flex-col gap-3 justify-center items-center h-full">
                  {title.includes('car') ? (
                    <AiOutlineCar className="text-4xl text-gray-500 font-extralight" />
                  ) : (
                    <RiMotorbikeLine className="text-4xl text-gray-500 font-extralight" />
                  )}
                  <div className="truncate text-center">
                    <p className="text-2xl text-black font-title tracking-wider">
                      {title}
                    </p>
                  </div>
                  <p className="font-bold text-xl">${price}</p>
                  <div></div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default SignupButtons;
