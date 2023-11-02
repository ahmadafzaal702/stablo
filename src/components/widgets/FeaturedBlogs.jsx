"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { BlogCard } from "..";

// FeaturedBlogs FC
const FeaturedBlogs = () => {
  const [blogs, setBlogs] = useState(null);
  const [loading, setLoading] = useState(true);

  // getFeaturedBlogs
  const getFeaturedBlogs = async () => {
    try {
      const { data } = await axios.get("/api/blogs");
      if (data.success) {
        setBlogs(data.blogs);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeaturedBlogs();
  }, []);

  if (loading) {
    return (
      <div>
        <p className="text-center font-semibold">
          Please Wait! Blogs are loading.
        </p>
      </div>
    );
  }
  // FeaturedBlogs FC return
  return (
    <>
      <section className="mt-10 w-full md:w-4/5 mx-auto">
        <h2 className="text-center">Featured Blogs</h2>
        <div className="mt-2 text-center">
          <Link href="/blogs" className="font-semibold hover:underline">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {blogs?.slice(0, 6).map((blog, index) => (
            <BlogCard key={index} {...blog} />
          ))}
        </div>
      </section>
    </>
  );
};

export default FeaturedBlogs;
