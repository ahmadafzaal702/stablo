import { NextResponse } from "next/server";
import { BlogModel } from "@/models/blogModel";

// get single blog by ID
export async function GET(request, { params }) {
  // destructure the blogId
  const { blogId } = params;

  try {
    // find the Blog
    const singleBlog = await BlogModel.findOne({ _id: blogId });

    // If Blog not found
    if (!singleBlog) {
      return NextResponse.json(
        {
          success: false,
          message: "No Blog found with this id",
        },
        { status: 404 }
      );
    }

    // If Blog exist, final return
    return NextResponse.json(
      {
        success: true,
        message: "Blog found",
        blog: singleBlog,
      },
      { status: 200 }
    );

    // try block ends here
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Error in get single Blog by ID Callback",
        error,
      },
      { status: 500 }
    );
  }
}

// update the blog
export async function PATCH(request, { params }) {
  // destructure the blogId
  const { blogId } = params;
  const blogNewInfo = await request.json();

  try {
    // find the blog and update
    const updatedBlog = await BlogModel.findOneAndUpdate(
      { _id: blogId },
      blogNewInfo,
      { new: true }
    );

    return NextResponse.json(
      {
        succcess: true,
        message: "blog Updated",
        updatedBlog,
      },
      { status: 200 }
    );

    // try block ends here
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Error in update blog Callback",
        error,
      },
      { status: 500 }
    );
  }
}

// delete the blog
export async function DELETE(request, { params }) {
  // destructure the blogId
  const { blogId } = params;

  try {
    // find the blog and delete
    await BlogModel.findByIdAndDelete({ _id: blogId });

    return NextResponse.json(
      {
        succcess: true,
        message: `blog deleted`,
      },
      { status: 200 }
    );

    // try block ends here
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Error in delete blog Callback",
        error,
      },
      { status: 500 }
    );
  }
}
