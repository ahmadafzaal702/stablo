"use client";
// react imports
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

// custom imports
import { Wrapper } from "@/components";

// Signup FC
const SignupPage = () => {
  // useState to manage the form data
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  // useState to manage the error or messages
  const [status, setStatus] = useState("");

  const router = useRouter();

  // input change handler
  const inputChangeHandler = (event: any) => {
    const { name, value } = event.target;
    setInput((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  // form submit handler
  const formSubmitHandler = async (event: any) => {
    event.preventDefault();

    if (input.username === "" || input.email === "" || input.password === "") {
      setStatus("Please fill all the fields");
      return;
    }

    // submitting user
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/Json" },
        body: JSON.stringify(input),
      });
      const data = await res.json();

      // const { data } = await axios.post("/api/v1/user/register", {
      //   username: input.username,
      //   email: input.email,
      //   password: input.password,
      // });

      if (data.success) {
        // show toast and message
        toast.success(data.message);
        setStatus(data.message);

        // clear state
        setInput({
          username: "",
          email: "",
          password: "",
        });

        // navigate to login page after 1 seconds
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      } else {
        toast.error(data.message);
        setStatus(data.message);
      }
    } catch (error) {
      console.log("Error in create account submission: ", error);
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
