import React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { Navbar } from '../components';
import { useAuthContext } from '../contexts/AuthProvider';
import ScrollToTop from '../utilities/ScrollToTop';

const SignUpToRidePage = () => {
  const { isLoading, signUpUser, authError } = useAuthContext();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    if (data.password !== data.confirm_password) {
      alert('Password did not match');
      return;
    }
    signUpUser(data.email, data.password, data.name, data, state, navigate);
    reset();
  };
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <section className="py-12 w-full max-w-7xl mx-auto px-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div>
                <h3 className="font-body font-bold text-2xl leading-6">
                  User Information
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Your full name, email, age, address, mobile number is required
                  to sign in as rider.
                </p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="shadow rounded-md overflow-hidden">
                <div className="px-4 py-5 bg-gray-50 space-y-6 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    {/* full name */}
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-900"
                      >
                        Full name<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        name="name"
                        id="name"
                        {...register('name')}
                        autoComplete="given-name"
                        className="bg-gray-50 mt-1 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    {/* email */}
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-900"
                      >
                        Email<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        name="email"
                        id="email"
                        {...register('email')}
                        autoComplete="email"
                        className="bg-gray-50 mt-1 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    {/* mobile number */}
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-900"
                      >
                        Mobile number
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        pattern="\d{1,11}"
                        maxLength="11"
                        name="phone"
                        {...register('phone')}
                        id="phone"
                        autoComplete="tel-local"
                        className="bg-gray-50 mt-1 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    {/* age */}
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="age"
                        className="block text-sm font-medium text-gray-900"
                      >
                        Age
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        required
                        {...register('age')}
                        name="age"
                        id="age"
                        className="bg-gray-50 mt-1 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    {/* profile photo */}
                    <div className="col-span-6 sm:col-span-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Profile photo<span className="text-red-500">*</span>
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                          <div className="space-y-1 flex flex-col justify-center items-center">
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <div className="flex text-sm text-center text-gray-600">
                              <label
                                htmlFor="propfile_photo"
                                className="text-center relative cursor-pointer rounded font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                              >
                                <span>Upload an image</span>
                                <input
                                  id="propfile_photo"
                                  required
                                  name="propfile_photo"
                                  accept="image/png, image/jpg, image/jpeg"
                                  {...register('propfile_photo')}
                                  type="file"
                                  className="sr-only"
                                />
                              </label>
                            </div>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, JPEG up to 2MB
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* nid photo */}
                    <div className="col-span-6 sm:col-span-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          NID photo<span className="text-red-500">*</span>
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                          <div className="space-y-1 flex flex-col justify-center items-center">
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <div className="flex text-sm text-center text-gray-600">
                              <label
                                htmlFor="nid_photo"
                                className="relative cursor-pointer rounded font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                              >
                                <span>Upload an image</span>
                                <input
                                  id="nid_photo"
                                  name="nid_photo"
                                  required
                                  accept="image/png, image/jpg, image/jpeg"
                                  type="file"
                                  {...register('nid_photo')}
                                  className="sr-only"
                                />
                              </label>
                            </div>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, JPEG up to 2MB
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* address */}
                    <div className="col-span-6">
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-900"
                      >
                        Full address
                        <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        required
                        className="bg-gray-50 mt-1 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        name="address"
                        id="address"
                        {...register('address')}
                        rows="3"
                        placeholder="Enter full address."
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* border */}
          <div className="py-6"></div>
          {/* border */}

          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div>
                <h3 className="font-body font-bold text-2xl leading-6">
                  Set Password
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Choose a strong password and Re-type to confirm the password.
                  This is required for further sign in.
                </p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="shadow overflow-hidden rounded-md">
                <div className="px-4 py-5 bg-gray-50 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    {/* password */}
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-900"
                      >
                        Password<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="password"
                        required
                        name="password"
                        id="password"
                        {...register('password')}
                        className="bg-gray-50 mt-1 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    {/* confirm password */}
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="confirm_password"
                        className="block text-sm font-medium text-gray-900"
                      >
                        Confirm password<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="password"
                        required
                        name="confirm_password"
                        id="confirm_password"
                        {...register('confirm_password')}
                        className="bg-gray-50 mt-1 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    {authError && <p className="text-red-500">{authError}</p>}
                    {/* submit form */}
                    <div className="col-span-6">
                      <div className="pt-4 rounded">
                        <button
                          type="submit"
                          className="block w-full py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
                        >
                          {isLoading ? 'Loading...' : 'Sign Up'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default SignUpToRidePage;
