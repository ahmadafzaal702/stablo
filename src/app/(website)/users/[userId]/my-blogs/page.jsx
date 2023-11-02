"use client";
import React, { useState, useEffect, useContext } from "react";
import { BlogCard, Button, Spinner, Wrapper } from "@/components";
import { useRouter } from "next/navigation";

// context imports
import userContext from "@/context/userContext";

// UserBlogs FC
const UserBlogs = () => {
  const { user } = useContext(userContext);
  const [blogs, setBlogs] = useState(null);

  const router = useRouter();

  // useEffect that retrieve the blogs
  useEffect(() => {
    const getUserBlogs = async () => {
      try {
        const response = await fetch(`/api/users/${user._id}/blogs`);
        const data = await response.json();

        if (response.ok) {
          setBlogs(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getUserBlogs();
  }, [user]);

  if (blogs?.totalBlogs == 0) {
    return (
      <main>
        <div className="mt-24 mb-24 text-center">
          <p className="font-semibold mb-2">
            You have not created any blog yet.
          </p>
          <Button
            title="Go to Homepage"
            clickHandler={() => {
              router.push("/");
            }}
          />
        </div>
      </main>
    );
  }

  // UserBlogs FC return
  return (
    <>
      <main className="min-h-screen">
        <Wrapper>
          <h2 className="text-center mt-10">My Blogs</h2>
          {!blogs ? (
            <Spinner></Spinner>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {blogs?.userBlogs?.map((blog, index) => (
                <BlogCard key={index} {...blog} currentUserId={user._id} />
              ))}
            </div>
          )}
        </Wrapper>
      </main>
    </>
  );
};

export default UserBlogs;
