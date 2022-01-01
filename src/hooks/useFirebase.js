import { useEffect, useState } from 'react';
import {
  getAuth,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth';
import initializeFirebase from '../firebase/Firebase.init';

// initialize firebase app
initializeFirebase();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [adminLoading, setAdminLoading] = useState(true);
  const [authError, setAuthError] = useState('');
  const [admin, setAdmin] = useState(false);

  const auth = getAuth();
  //   const googleProvider = new GoogleAuthProvider();

  const signUpUser = (email, password, name, userData, state, navigate) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const newUser = { email, displayName: name };
        setUser(newUser);
        // save user to database
        saveUsersToDb(userData, 'POST');
        // update user profile
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {})
          .catch((error) => {});
        // redirect after sign up
        const redirectUri = state?.from || '/';
        navigate(redirectUri, { replace: true });
      })
      .catch((error) => {
        setAuthError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const signinUser = (email, password, state, navigate) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const redirectUri = state?.from || '/';
        navigate(redirectUri, { replace: true });
        setAuthError('');
      })
      .catch((error) => {
        setAuthError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleForgotPassword = (email) => {
    setIsLoading(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert('Password reset email sent!');
      })
      .catch((error) => {
        setAuthError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
      setIsLoading(false);
    });
    return () => unsubscribed;
  }, [auth]);

  useEffect(() => {
    setAdminLoading(true);
    fetch(`http://localhost:4000/users/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setAdmin(data.admin);
        setAdminLoading(false);
      });
  }, [user.email]);

  const userSignOut = () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        // sign out successful
      })
      .catch((error) => {
        //   An error happened
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const saveUsersToDb = (userData, method) => {
    fetch('http://localhost:4000/users', {
      method: method,
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(userData),
    }).then();
  };

  return {
    user,
    admin,
    adminLoading,
    isLoading,
    authError,
    signUpUser,
    userSignOut,
    signinUser,
    handleForgotPassword,
  };
};

export default useFirebase;
