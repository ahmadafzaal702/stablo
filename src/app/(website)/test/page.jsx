"use client";
import React from "react";
import { Wrapper } from "@/components";
import axios from "axios";

const TestPage = () => {
  const [name, setName] = React.useState("Afzaal Ahmad");
  const [avatar, setAvatar] = React.useState("");

  const fileSubmitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("userName", name);
    formData.append("userAvatar", avatar);

    const res = await fetch("/api/test", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    alert(data.message);
  };
  return (
    <>
      <main className="min-h-screen">
        <Wrapper>
          <h2>Working on upload file</h2>
          <form onSubmit={fileSubmitHandler}>
            <input
              type="file"
              onChange={(event) => {
                setAvatar(event.target.files[0]);
              }}
            />
            <button type="submit" className="bg-accent-green p-3">
              Submit
            </button>
          </form>
        </Wrapper>
      </main>
    </>
  );
};

export default TestPage;
