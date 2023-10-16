import { NextResponse } from "next/server";
import connectDB from "@/config/database";
import { BlogModel } from "@/models/blogModel";

// Database Call
connectDB();

// create new Blog
export async function POST(request) {
  // destructure the elements
  const { title, content, imageUrl, userId } = await request.json();
  try {
    // validation
    if ((!title, !content, !imageUrl, !userId)) {
      return NextResponse.json(
        {
          succcess: false,
          message: "Please fill all the Fields",
        },
        { status: 422 }
      );
    }

    // save Blog to database
    const newBlog = await new BlogModel({
      title,
      content,
      imageUrl,
      userId,
    });

    await newBlog.save();

    // success response
    return NextResponse.json(
      {
        success: true,
        message: "Blog created",
      },
      { status: 201 }
    );

    // try block ends here
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Error in register Blog Callback",
        error,
      },
      { status: 500 }
    );
  }
}

// get all blogs
export async function GET() {
  try {
    const blogs = await BlogModel.find();

    // If user not found
    if (blogs.length == 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No blogs found",
        },
        { status: 404 }
      );
    }

    // If blogs exist, final return
    return NextResponse.json(
      {
        succcess: true,
        totalBlogs: blogs.length,
        blogs,
      },
      { status: 200 }
    );

    // try block ends here
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Error in get all blogs Callback",
        error,
      },
      { status: 500 }
    );
  }
}
