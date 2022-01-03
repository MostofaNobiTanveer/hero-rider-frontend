import React, { useState } from 'react';
import { Loading, Navbar, SingleUserList } from '../components';
import { BsSearch } from 'react-icons/bs';
import { useUserContext } from '../contexts/UserProvider';
import ScrollToTop from '../utilities/ScrollToTop';

const UsersPage = () => {
  const [age, setAge] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [userState, setUserState] = useState([]);
  // const arr = [];

  const {
    displayUsers: users,
    setAgeValue,
    isLoading,
    setPageNumber,
    pageCount,
    page,
    searchFilter,
    blockUsers,
  } = useUserContext();

  return (
    <>
      <Navbar />
      <ScrollToTop />
      {isLoading && <Loading />}

      {/* Table list */}
      <div className="flex flex-col">
        {/* filter */}
        <div className="max-w-7xl px-4 w-full mx-auto m-4 flex flex-col sm:flex-row gap-2 items-center">
          <div className="w-full sm:w-1/2">
            <select
              required
              id="age"
              value={age}
              onChange={(e) => {
                setAgeValue(e.target.value);
                setAge(e.target.value);
              }}
              name="age"
              className="bg-gray-50 mt-1 text-gray-900 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select age range</option>
              <option value="0,15"> 0 - 15</option>
              <option value="16,25">16 - 25</option>
              <option value="26,35">26 - 35</option>
              <option value="36,45">36 - 45</option>
              <option value="46,55">46 - 55</option>
              <option value="56,65">56 - 65</option>
              <option value="66,75">66 - 75</option>
              <option value="76,85">76 - 85</option>
              <option value="86,95">86 - 95</option>
            </select>
          </div>
          {/* search */}
          <div className="w-full sm:w-1/2  pt-2 relative mx-auto text-gray-600 justify-self-end">
            <input
              className="border-2 w-full border-gray-300 bg-white px-5 pr-16 rounded-lg text-sm focus:outline-none"
              type="search"
              name="search"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                searchFilter(e.target.value);
              }}
              placeholder="Search by name, email or phone"
            />
            <button type="submit" className="absolute right-0 top-0 mt-5 mr-4">
              <BsSearch className="text-gray-400 h-4 w-4 fill-current" />
            </button>
          </div>
        </div>
        {/* filter */}
        <div className="-my-2 overflow-x-auto">
          <div className="py-3 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <button
            className="py-2 mb-4 ml-4 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
            onClick={() => blockUsers(userState)}
          >
            Block
          </button>
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {/* All checkbox */}
                      <input
                        type="checkbox"
                        className="rounded"
                        onChange={(e) => {
                          let value = e.target.checked;
                          setUserState(
                            users.map((d) => {
                              d.select = value;
                              return d;
                            })
                          );
                        }}
                      />
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Age
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Phone
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Role
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <SingleUserList
                      userState={userState}
                      setUserState={setUserState}
                      key={user._id}
                      user={user}
                    />
                  ))}
                </tbody>
              </table>
              {/* Pagination */}
              <nav className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="block w-full">
                  <div className="flex-1 flex justify-between sm:justify-end">
                    <p className="text-sm text-gray-700">
                      {[...Array(pageCount).keys()].map((number) => {
                        return (
                          <button
                            onClick={() => setPageNumber(number)}
                            key={number}
                            className={
                              number === page
                                ? 'border rounded mr-3 border-blue-500 h-8 w-7 bg-blue-500 text-white'
                                : 'border rounded mr-3 border-gray-400 h-8 w-7 hover:bg-blue-500 hover:text-white'
                            }
                          >
                            {number}
                          </button>
                        );
                      })}
                    </p>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersPage;
