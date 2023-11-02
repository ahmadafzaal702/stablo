"use client";
// react imports
import React, { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import moment from "moment";
import { FaCheck, FaTimes } from "react-icons/fa";

// context imports
import userContext from "@/context/userContext";

// custom imports
import { Spinner, Wrapper } from "@/components";
import axios from "axios";

// User Profile FC
const UserProfile = () => {
  // useState for user profile data
  const [userProfile, setUserProfile] = useState(undefined);
  const [updateOn, setUpdateOn] = useState(false);
  const [newUserName, setNewUserName] = useState("");

  // userContext
  const { user, setUser } = useContext(userContext);

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

  // Update work
  const usernameUpdateHandler = async () => {
    try {
      const { data } = await axios.patch(`/api/users/${user._id}`, {
        username: newUserName,
      });

      if (data.success) {
        setNewUserName("");
        setUpdateOn(false);
        setUser(data.updatedUser);
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("An Error Occured. Please try again.");
    }
  };

  // FC return
  return (
    <>
      <main className="min-h-screen">
        <Wrapper>
          <div className="container mx-auto mt-8 p-8">
            <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="bg-gray-200 h-40 flex justify-center items-center">
                <img
                  src={`${userProfile.profilePic}`}
                  alt="Profile"
                  className="rounded-full h-24 w-24 object-cover"
                />
              </div>
              <div className="p-6">
                <div>
                  {updateOn === false && (
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold mb-2">
                        {userProfile.username}
                      </h2>
                      <button
                        className="bg-accent-orange px-3 py-1 text-sm font-semibold rounded-sm"
                        onClick={() => {
                          setNewUserName(userProfile?.username);
                          setUpdateOn(true);
                        }}
                      >
                        Update
                      </button>
                    </div>
                  )}

                  {/* If user click on the update button */}
                  {updateOn && (
                    <div>
                      <div className="flex gap-x-2 items-center">
                        <input
                          type="text"
                          className="updateFormInput"
                          value={newUserName}
                          onChange={(e) => {
                            setNewUserName(e.target.value);
                          }}
                        />
                        <span>
                          <FaCheck
                            className="cursor-pointer text-xl"
                            onClick={usernameUpdateHandler}
                          />
                        </span>
                        <span>
                          <FaTimes
                            className="cursor-pointer text-xl"
                            onClick={() => {
                              setNewUserName("");
                              setUpdateOn(false);
                            }}
                          />
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <p className="text-gray-600 mt-5 mb-4">{userProfile.email}</p>
                <p className="text-gray-600 mb-4">
                  {" "}
                  Registered Date:{" "}
                  <span className="font-semibold">
                    {moment(userProfile.createdAt).format("MM/DD/YYYY")}
                  </span>
                </p>
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
