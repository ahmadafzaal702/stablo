"use client";
// react imports
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

// custom imports
import { Wrapper } from "@/components";
import axios from "axios";

// Signup FC
const SignupPage = () => {
  // useState to manage the form data
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    profilePic: "",
  });
  const [profilePicPreview, setProfilePicPreview] = useState("");

  // useState to manage the error or messages
  const [status, setStatus] = useState("");

  const router = useRouter();

  // input change handler
  const inputChangeHandler = (event: any) => {
    setStatus("");
    const { name, value } = event.target;
    setInput((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  // onImageChangeHandler
  const onImageChangeHandler = (e: any) => {
    setStatus("");
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState == 2) {
        setProfilePicPreview(reader.result as any);
      }
    };
    setInput({
      ...input,
      profilePic: e.target.files[0],
    });
    reader.readAsDataURL(e.target.files[0]);
  };

  // form submit handler
  const formSubmitHandler = async (event: any) => {
    event.preventDefault();

    if (
      input.username.trim() === "" ||
      input.email.trim() === "" ||
      input.password.trim() === "" ||
      !input.profilePic
    ) {
      setStatus("Please fill all the fields");
      toast.error("Please fill all the fields");
      return;
    }

    const formData = new FormData();
    formData.append("username", input.username);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("profilePic", input.profilePic);

    // submitting user
    try {
      const res = await axios.post("/api/users", formData);
      const data = res.data;

      if (data?.success) {
        // show toast and message
        toast.success(data.message);
        setStatus(data.message);

        // clear state
        setInput({
          username: "",
          email: "",
          password: "",
          profilePic: "",
        });

        // navigate to login page after 1 seconds
        setTimeout(() => {
          router.push("/accounts/login");
        }, 500);
      }
      // try block ends here
    } catch (error: any) {
      console.log("Error in create account submission: ", error);
      toast.error(error.response.data.message);
      setStatus(error.response.data.message);
    }
  };

  // FC return
  return (
    <>
      <main>
        <Wrapper>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-5 text-center">Create Your Account</h2>
            <form
              className="space-y-6 mt-10"
              method="POST"
              onSubmit={formSubmitHandler}
            >
              <div>
                <label htmlFor="username" className="userFormLabel">
                  Full name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Enter name"
                    name="username"
                    value={input.username}
                    onChange={inputChangeHandler}
                    className="userFormInput"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="userFormLabel">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={input.email}
                    autoComplete="off"
                    onChange={inputChangeHandler}
                    className="userFormInput"
                  />
                </div>
              </div>

              <div>
                <div>
                  <label htmlFor="password" className="userFormLabel">
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    type="password"
                    placeholder="Enter password"
                    name="password"
                    value={input.password}
                    onChange={inputChangeHandler}
                    className="userFormInput"
                  />
                </div>
              </div>
              {/* profile picture */}
              <div>
                <div>
                  <label htmlFor="profilePic" className="userFormLabel">
                    Profile Picture
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    type="file"
                    name="profilePic"
                    className="userFormInput"
                    onChange={onImageChangeHandler}
                  />

                  <div
                    className={`mt-2 border border-gray-medium rounded-md w-24 h-24 ${
                      profilePicPreview ? "block" : "hidden"
                    }`}
                  >
                    <img src={profilePicPreview} className="w-full h-full" />
                  </div>
                </div>
              </div>

              <div className="text-center">
                <span className="text-sm font-semibold text-error">
                  {status}
                </span>
              </div>

              <div>
                <button type="submit" className="userAccountButton">
                  Register
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm font-semibold">
              Already a member?{" "}
              <Link href="/accounts/login" className="font-semibold">
                Sign in here
              </Link>
            </p>
          </div>
        </Wrapper>
      </main>
    </>
  );
};

export default SignupPage;
