"use client";
// react imports
import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

// custom imports
import { Wrapper, FormStatusDisplay } from "@/components";

// CreateBlog FC
const CreateBlog = () => {
  // useState for blog Data
  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    imageUrl: "",
  });
  const [imagePreview, setImagePreview] = useState("");

  // useState to manage the error or messages
  const [status, setStatus] = useState("");

  // onImageChangeHandler
  const onImageChangeHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState == 2) {
        setImagePreview(reader.result);
      }
    };
    setBlogData({
      ...blogData,
      imageUrl: e.target.files[0],
    });
    reader.readAsDataURL(e.target.files[0]);
  };

  // submitBlogHandler
  const submitBlogHandler = async (event) => {
    event.preventDefault();

    // validation
    if (
      blogData.title.trim() === "" ||
      blogData.content.trim() === "" ||
      !blogData.imageUrl
    ) {
      toast.error("Please fill all the fields");
      setStatus("Please fill all the fields");
      return;
    }

    const formData = new FormData();
    formData.append("blogTitle", blogData.title);
    formData.append("blogContent", blogData.content);
    formData.append("blogImage", blogData.imageUrl);

    try {
      const { data } = await axios.post("/api/blogs", formData);

      // if blog created
      if (data.success == true) {
        toast.success(data.message);
        setBlogData({
          title: "",
          content: "",
          imageUrl: "",
        });
        setImagePreview("");
        setStatus(data.message);
      } else {
        toast.error("Error occur. Please try again.");
        setStatus(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // CreateBlog FC return
  return (
    <>
      <main className="min-h-screen">
        <Wrapper>
          <div className="sm:mx-auto sm:w-full sm:max-w-2xl bg-gray-light rounded-md shadow-sm px-5 py-5 mt-10">
            <h2 className="text-center">Create a new blog</h2>

            <form
              className="space-y-6 mt-10"
              method="POST"
              onSubmit={submitBlogHandler}
            >
              {/* blog title */}
              <div>
                <label htmlFor="blogTitle" className="blogFormLabel">
                  Blog Title
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="(e.g) Introduction to Quantum Computing"
                    name="blogTitle"
                    className="blogFormInput"
                    value={blogData.title}
                    onChange={(e) =>
                      setBlogData({ ...blogData, title: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* blog description */}
              <div>
                <div>
                  <label htmlFor="blogDescription" className="blogFormLabel">
                    Blog Description
                  </label>
                </div>
                <div className="mt-2">
                  <textarea
                    rows={5}
                    name="blogDescription"
                    className="blogFormInput"
                    value={blogData.content}
                    onChange={(e) => {
                      setBlogData({ ...blogData, content: e.target.value });
                    }}
                  ></textarea>
                </div>
              </div>
              {/* blog picture */}
              <div>
                <div>
                  <label htmlFor="file-upload" className="blogFormLabel">
                    Cover Image
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="blogFormInput"
                    onChange={onImageChangeHandler}
                  />
                </div>
              </div>

              {/* Image Preview */}
              <div>
                <div className="mt-2">
                  <img
                    src={imagePreview}
                    alt="Picture of the author"
                    style={{ display: imagePreview ? "block" : "none" }}
                  />
                </div>
              </div>

              {/* status display */}
              <FormStatusDisplay statusText={status} />

              {/* submit button */}
              <div>
                <button type="submit" className="userAccountButton">
                  Create Blog
                </button>
              </div>
            </form>
          </div>
        </Wrapper>
      </main>
    </>
  );
};

export default CreateBlog;
