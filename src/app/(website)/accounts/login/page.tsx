"use client";
// react imports
import React, { useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

// context imports
import userContext from "@/context/userContext";

// custom imports
import { Wrapper } from "@/components";

// Login FC return
const LoginPage = () => {
  // react hooks
  // useState to manage the form data
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  // useState to manage the error or messages
  const [status, setStatus] = useState("");
  const router = useRouter();

  const { setUser } = useContext(userContext) as any;

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

    if (input.email.trim() === "" || input.password.trim() === "") {
      setStatus("Please fill all the fields");
      return;
    }

    // submitting user
    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/Json" },
        body: JSON.stringify(input),
      });
      const data = await res.json();

      // const { data } = await axios.post(
      //   "/api/v1/user/login",
      //   {
      //     email: input.email,
      //     password: input.password,
      //   },
      //   {
      //     headers: { "Content-Type": "application/Json" },
      //   }
      // );

      if (data.success) {
        // pass user to userContext and send message
        setUser(data.user);
        toast.success(data.message);
        setStatus(data.message);

        // clear state
        setInput({
          email: "",
          password: "",
        });

        // navigate to login page after 3 seconds
        setTimeout(() => {
          router.push("/");
        }, 3000);
      } else {
        toast.error(data.message);
        setStatus(data.message);
      }
    } catch (error) {
      console.log("Error in create account submission: ", error);
    }
  };

  // Login FC return
  return (
    <>
      <main>
        <div className="flex flex-1 flex-col justify-center px-8 py-12">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-5 text-center">Sign in to your account</h2>

            <form
              className="space-y-6 mt-10"
              method="POST"
              onSubmit={formSubmitHandler}
            >
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
                    onChange={inputChangeHandler}
                    className="userFormInput"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="userFormLabel">
                    Password
                  </label>
                  <div className="text-sm">
                    <Link href="/">Forgot password?</Link>
                  </div>
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
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm font-semibold">
              Not a member?{" "}
              <Link href="/accounts/signup" className="font-semibold">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default LoginPage;
