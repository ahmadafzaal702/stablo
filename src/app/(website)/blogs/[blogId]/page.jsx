"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Wrapper } from "@/components";
import moment from "moment/moment";

// Blog Page FC
const BlogPage = ({ params }) => {
  // react states
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  console.log(data);

  // getting the id
  const blogId = params.blogId;

  // getting single block
  const getSingleBlock = async () => {
    try {
      const blogs = await axios.get(`/api/blogs/${blogId}`);

      if (blogs.status == 200) {
        setData(blogs.data);
        setLoading(false);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect Hook
  useEffect(() => {
    getSingleBlock();
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  // Blog Page FC return
  return (
    <>
      <main>
        <Wrapper>
          <div className="container mx-auto mt-8 p-8">
            <h1 className="text-3xl font-semibold mb-4">{data?.blog?.title}</h1>
            <p className="text-gray-600 mb-4 mt-2">
              {" "}
              Blog Created:{" "}
              <span className="font-semibold">
                {moment(data?.blog?.createdAt).format("MM/DD/YYYY")}
              </span>
            </p>

            <img
              className="w-full h-[500px] object-cover object-center"
              src={data?.blog?.imageUrl}
              alt="blog picture"
            />

            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-800">{data?.blog?.content}</p>
            </div>

            <p className="text-gray-600 mb-4 mt-2">
              {" "}
              Last Updated At:{" "}
              <span className="font-semibold">
                {moment(data?.blog?.updatedAt).format("MM/DD/YYYY")}
              </span>
            </p>
          </div>
        </Wrapper>
      </main>
    </>
  );
};

export default BlogPage;
