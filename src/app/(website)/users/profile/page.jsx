"use client";
// react imports
import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";

// context imports
import userContext from "@/context/userContext";

// custom imports
import { Spinner, Wrapper } from "@/components";
import logo from "@/assests/background.png";

// User Profile FC
const UserProfile = () => {
  // useState for user profile data

  const [userProfile, setUserProfile] = useState(undefined);

  // userContext
  const { user } = useContext(userContext);

  // useEffect for getting user Data

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const response = await fetch(`/api/users/${user._id}`);
        const data = await response.json();

        if (response.ok) {
          setUserProfile(data.user);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getUserProfile();
  }, [user]);

  // If user loading, show spinner
  if (!userProfile) {
    return (
      <main className="min-h-screen">
        <Spinner></Spinner>
      </main>
    );
  }

  // FC return
  return (
    <>
      <main className="min-h-screen">
        <Wrapper>
          <div className="container mx-auto mt-8 p-8">
            <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="bg-gray-200 h-40 flex justify-center items-center">
                <Image
                  src={logo}
                  alt="Profile"
                  className="rounded-full h-24 w-24 object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">
                  {userProfile.username}
                </h2>
                <p className="text-gray-600 mb-4">{userProfile.email}</p>
                {/* Additional user details can be displayed here */}
              </div>
            </div>
          </div>
        </Wrapper>
      </main>
    </>
  );
};

export default UserProfile;
