"use client";
import React, { useState, useEffect } from "react";
import userContext from "./userContext";

// UserContextProvider FC
const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const user = await fetch("/api/currentuser");
        const data = await user.json();

        if (user.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

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
