"use client";
import React, { useState, useEffect } from "react";
import userContext from "./userContext";

// UserContextProvider FC
const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // getCurrentUser
  const getCurrentUser = async () => {
    try {
      const user = await fetch("/api/currentuser");
      const data = await user.json();

      if (data.success) {
        setUser(data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Useeffect
  useEffect(() => {
    getCurrentUser();
  }, []);

  // UserContextProvider FC return
  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
};

export default UserContextProvider;
