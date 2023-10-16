"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

import { BlogCard, Spinner, Wrapper } from "@/components";

// Blogs Page FC
const Blogs = () => {
  // react hooks
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetching the blogs
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("/api/blogs");
      setData(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // useEffect hook
  useEffect(() => {
    getAllBlogs();
  }, []);

  // If blogs loading, show spinner
  if (loading) {
    return (
      <main className="min-h-screen">
        <Spinner></Spinner>
      </main>
    );
  }

  // Blogs Page FC return
  return (
    <>
      <main className="min-h-screen">
        <Wrapper>
          <h2 className="text-center mt-10">Blog Page</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {data.blogs?.map((blog, index) => (
              <BlogCard key={index} {...blog} />
            ))}
          </div>
        </Wrapper>
      </main>
    </>
  );
};

export default Blogs;
