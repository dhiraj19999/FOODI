import React, { createContext, useEffect, useState } from "react";
//import admin from "firebase-admin";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  deleteUser,
  updateProfile,
} from "firebase/auth";

import app from "../firebase/firebase.config";
import { Navigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartcount, setCartcount] = useState(0);
  const [userInfo, setUserInfo] = useState("");
  const [cartPrice, setCartPrice] = useState(
    localStorage.getItem("cartPrice") || 0
  );
  // create an account
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateCartcount = (count) => {
    setCartcount(count);
  };

  // signup with gmail
  const signUpWithGmail = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // login using email & password
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // logout
  const logOut = () => {
    setCartcount(0);

    return signOut(auth);
  };

  // delete user

  const deleteUserfirebase = (uid) => {
    // return admin.auth.deleteUser(uid);
    // deleteUser(auth);
  };

  // update profile
  const updateUserProfile = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };

  // check signed-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log(currentUser);
      setUser(currentUser);
      if (currentUser) {
        const userInfo = { email: currentUser.email };
        /* axios
          .post("https://foodi-server-t8gj.onrender.com//jwt", userInfo)
          .then((res) => localStorage.setItem("Access-Token", res.data.token));*/
      } else {
        localStorage.removeItem("Access-Token");
      }
      setLoading(false);
    });

    return () => {
      return unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    createUser,
    signUpWithGmail,
    login,
    logOut,
    updateUserProfile,
    loading,
    updateCartcount,
    cartcount,
    setUserInfo,
    setCartcount,
    userInfo,
    cartPrice,
    setCartPrice,
    deleteUserfirebase,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
