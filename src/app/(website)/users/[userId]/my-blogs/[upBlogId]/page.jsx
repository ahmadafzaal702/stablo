"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Wrapper } from "@/components";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

// UpdateBlog FC
const UpdateBlog = ({ params }) => {
  const [getBlogToUpdate, setGetBlogToUpdate] = useState({});
  const [imagePreview, setImagePreview] = useState("");
  const router = useRouter();
  const blogToUpdateId = params.upBlogId;

  console.log(getBlogToUpdate);

  // useEffect
  useEffect(() => {
    const updateBlogHandler = async () => {
      try {
        const { data } = await axios.get(`/api/blogs/${blogToUpdateId}`);
        if (data.success) {
          setGetBlogToUpdate(data.blog);
          setImagePreview(data.blog.imageUrl);
          return;
        }
      } catch (error) {
        console.log(error);
      }
    };

    updateBlogHandler();
  }, [blogToUpdateId]);

  // onImageChangeHandler
  const onImageChangeHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState == 2) {
        setImagePreview(reader.result);
      }
    };
    setGetBlogToUpdate({
      ...getBlogToUpdate,
      imageUrl: e.target.files[0],
    });
    reader.readAsDataURL(e.target.files[0]);
  };

  const updateBlogHandler = async (e) => {
    e.preventDefault();
    // validation
    if (
      getBlogToUpdate.title.trim() === "" ||
      getBlogToUpdate.content.trim() === "" ||
      !getBlogToUpdate.imageUrl
    ) {
      toast.error("Please fill all the fields");
      setStatus("Please fill all the fields");
      return;
    }

    const formData = new FormData();
    formData.append("newTitle", getBlogToUpdate.title);
    formData.append("newContent", getBlogToUpdate.content);
    formData.append("newImage", getBlogToUpdate.imageUrl);

    try {
      const { data } = await axios.patch(
        `/api/blogs/${blogToUpdateId}`,
        formData
      );

      if (data.success) {
        setGetBlogToUpdate(null);
        setImagePreview("");
        toast.success(data.message);
        router.back();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // UpdateBlog FC return
  return (
    <>
      <main className="min-h-screen">
        <Wrapper>
          <div className="sm:mx-auto sm:w-full sm:max-w-2xl bg-gray-light rounded-md shadow-sm px-5 py-5 mt-10">
            <h2 className="text-center">Update the Blog</h2>

            <form
              className="space-y-6 mt-10"
              method="POST"
              onSubmit={updateBlogHandler}
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
                    value={getBlogToUpdate?.title}
                    onChange={(e) =>
                      setGetBlogToUpdate({
                        ...getBlogToUpdate,
                        title: e.target.value,
                      })
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
                    value={getBlogToUpdate?.content}
                    onChange={(e) => {
                      setGetBlogToUpdate({
                        ...getBlogToUpdate,
                        content: e.target.value,
                      });
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

              {/* submit button */}
              <div>
                <button type="submit" className="userAccountButton">
                  Update Blog
                </button>
              </div>
            </form>
          </div>
        </Wrapper>
      </main>
    </>
  );
};

export default UpdateBlog;
