"use client";
import React, { FC, useContext } from "react";

import Link from "next/link";
import moment from "moment";
import axios from "axios";
import { toast } from "react-toastify";

import userContext from "@/context/userContext";

import { FaEdit, FaRegTrashAlt } from "react-icons/fa";

interface Iblogs {
  _id: number;
  title: string;
  content: string;
  createdAt: string;
  imageUrl: string;
  userId: string;
  currentUserId?: string;
}

// BlogCard FC
const BlogCard: FC<Iblogs> = (props) => {
  const { user } = useContext(userContext) as any;
  const { _id, title, content, createdAt, imageUrl, currentUserId } = props;
  const userEmailBeforeAt = user?.email.split("@")[0];

  // deleteBlogHandler
  const deleteBlogHandler = async () => {
    const wantToDelete = confirm("Do you want to delete this blog?");
    if (wantToDelete) {
      const { data } = (await axios.delete(`/api/blogs/${_id}`)) as any;
      console.log(data);
      if (data.success) {
        toast.success(data.message);
        window.location.reload();
      }
    }
  };
  // BlogCard FC return
  return (
    <div className="relative w-full mx-auto bg-white rounded-xl overflow-hidden shadow-lg my-4">
      <img
        className="w-full h-56 object-cover object-center"
        src={imageUrl}
        alt={imageUrl}
      />
      <div className="p-6">
        <h2 className="text-xl">{title}</h2>
        <div className="max-h-[150px] overflow-hidden">
          <p className="mt-2 text-gray">{content}</p>
        </div>
        <div className="mt-4 flex justify-between items-center font-semibold">
          <p className="text-gray">{moment(createdAt).format("MM/DD/YYYY")}</p>
          <Link href={`/blogs/${_id}`}>Read More</Link>
        </div>
      </div>

      {currentUserId && (
        <div className="absolute top-3 right-5 text-accent-orange shadow-md flex gap-x-2">
          <span>
            <Link href={`/users/${userEmailBeforeAt}/my-blogs/${_id}`}>
              <FaEdit className="text-2xl cursor-pointer" />
            </Link>
          </span>
          <span>
            <FaRegTrashAlt
              className="text-2xl cursor-pointer text-primary"
              onClick={deleteBlogHandler}
            />
          </span>
        </div>
      )}
    </div>
  );
};

export default BlogCard;
