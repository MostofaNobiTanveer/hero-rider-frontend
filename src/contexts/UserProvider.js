import React, { createContext, useContext } from 'react';
import useUsers from '../hooks/useUsers';

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const allUserContext = useUsers();
  return (
    <UserContext.Provider value={allUserContext}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

export default UserProvider;
