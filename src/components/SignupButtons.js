import React from 'react';
import { Link } from 'react-router-dom';
import { BsChevronRight } from 'react-icons/bs';

const links = [
  { id: 1, title: 'Sign up to ride', href: '/signup-to-ride' },
  { id: 2, title: 'Create rider account', href: '/signup-as-rider' },
];
const SignupButtons = () => {
  return (
    <section className="font-body">
      <div className="flex-1 overflow-hidden grid md:grid-cols-2 h-72 md:h-60 border-y border-slate-200 md:divide-x md:divide-y-0 divide-y divide-slate-200">
        {links.map(({ id, title, href }) => (
          <Link
            key={id}
            to={href}
            className="card overflow-hidden relative p-4 group focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
          >
            <div className="flex flex-col gap-4 justify-center items-center h-full">
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
        ))}
      </div>
    </section>
  );
};

export default SignupButtons;
