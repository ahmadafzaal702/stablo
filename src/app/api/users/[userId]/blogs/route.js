import { NextResponse } from "next/server";

import { BlogModel } from "@/models/blogModel";

// get the blogs for a specific user
export async function GET(request, { params }) {
  const { userId } = params;

  try {
    const userBlogs = await BlogModel.find({ userId: userId });

    // If no blog found
    if (!userBlogs) {
      return NextResponse.json(
        {
          success: false,
          message: "No blog found",
        },
        { status: 404 }
      );
    }

    // final return
    return NextResponse.json(
      {
        success: true,
        message: "Blogs found",
        totalBlogs: userBlogs.length,
        userBlogs,
      },
      { status: 200 }
    );
    // try block ends here
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Error in specific user Blogs by userId Callback",
        error,
      },
      { status: 500 }
    );
  }
}
