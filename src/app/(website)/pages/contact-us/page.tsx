"use client";
// react imports
import React, { useState } from "react";
import axios from "axios";

// custom imports
import { Wrapper } from "@/components";

// Contact Us FC
const ContactUs = () => {
  // react hooks
  // useState to manage the form data
  const [input, setInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  // useState to manage the error or messages
  const [status, setStatus] = useState("");

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

    if (input.name === "" || input.email === "" || input.message === "") {
      setStatus("Please fill all the fields");
      return;
    }
    // submitting user
    try {
      const { data } = await axios.post(
        "/api/v1/contact/create-contact",
        {
          name: input.name,
          email: input.email,
          message: input.message,
        },
        {
          headers: { "Content-Type": "application/Json" },
        }
      );

      if (data.success) {
        // send message
        setStatus(data.message);

        // clear state
        setInput({
          name: "",
          email: "",
          message: "",
        });
      } else {
        setStatus(data.message);
      }
    } catch (error) {
      console.log("Error in contact form submission: ", error);
    }
  };

  // FC return
  return (
    <>
      <main className="min-h-screen">
        <Wrapper>
          <div className="flex flex-1 flex-col justify-center">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center">Contact Us</h2>
              <form
                className="space-y-6 mt-10"
                method="POST"
                onSubmit={formSubmitHandler}
              >
                <div>
                  <label htmlFor="name" className="userFormLabel">
                    Full name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="Enter name"
                      name="name"
                      value={input.name}
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
                    <label htmlFor="message" className="userFormLabel">
                      Message
                    </label>
                  </div>
                  <div className="mt-2">
                    <textarea
                      rows={3}
                      name="message"
                      value={input.message}
                      onChange={inputChangeHandler}
                      className="userFormInput"
                    ></textarea>
                  </div>
                </div>

                <div className="text-center text-sm font-medium">
                  <span>{status}</span>
                </div>

                <div>
                  <button type="submit" className="userAccountButton">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Wrapper>
      </main>
    </>
  );
};

export default ContactUs;
