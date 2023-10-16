import React, { FC } from "react";
import Link from "next/link";

interface Iblogs {
  _id: number;
  title: string;
  content: string;
  date: string;
  imageUrl: string;
}

// BlogCard FC
const BlogCard: FC<Iblogs> = ({ _id, title, content, date, imageUrl }) => {
  // BlogCard FC return
  return (
    <div className="w-full mx-auto bg-white rounded-xl overflow-hidden shadow-lg my-4">
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
        <div className="mt-4 flex justify-between items-center">
          <p className="text-gray">{date}</p>
          <Link href={`/blogs/${_id}`}>Read More</Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
