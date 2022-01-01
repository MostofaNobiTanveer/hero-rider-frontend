import React from 'react';

const SingleUserList = ({ user, userState, setUserState }) => {
  //   console.log(arr);
  return (
    <tr key={user._id}>
      <td className="px-6 py-4 whitespace-nowrap">
        <input
          id={user._id}
          checked={user.select}
          onChange={(e) => {
            let value = e.target.checked;
            setUserState(
              userState.map((sd) => {
                if (sd._id === user._id) {
                  sd.select = value;
                }
                return sd;
              })
            );
          }}
          type="checkbox"
          className="rounded"
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div>
            <div className="text-sm font-medium text-gray-900">
              <label htmlFor={user._id}>{user.name}</label>
            </div>
            <div className="truncate text-sm text-gray-500">{user.email}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 capitalize whitespace-nowrap text-sm text-gray-500">
        {user.age}
      </td>
      <td className="px-6 py-4 capitalize whitespace-nowrap text-sm text-gray-500">
        {user.phone}
      </td>
      <td className="px-6 py-4 capitalize whitespace-nowrap text-sm text-gray-500">
        {user.role ? user.role : 'User'}
      </td>
    </tr>
  );
};

export default SingleUserList;
