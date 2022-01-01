import React, { createContext, useContext } from 'react';
import useFirebase from '../hooks/useFirebase';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const allAuthContext = useFirebase();
  return (
    <AuthContext.Provider value={allAuthContext}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;
