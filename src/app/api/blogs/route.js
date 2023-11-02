import { NextResponse } from "next/server";
import connectDB from "@/config/database";
import { BlogModel } from "@/models/blogModel";
import jwt from "jsonwebtoken";
import { writeFile } from "fs/promises";
import cloudinary from "@/helper/cloudinary";

// Database Call
connectDB();

export async function POST(request) {
  const blogFormData = await request.formData();

  // destructure the fields
  const title = blogFormData.get("blogTitle");
  const content = blogFormData.get("blogContent");
  const blogImage = blogFormData.get("blogImage");

  // getting the user token from cookie
  const userToken = request.cookies.get("jwtoken")?.value;
  const tokenUserData = await jwt.verify(userToken, process.env.JWT_SECRET);
  const userId = tokenUserData.id;

  try {
    // validation
    if ((!title, !content, !blogImage, !userId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill all the Fields",
        },
        { status: 422 }
      );
    }

    // save image to a local folder and cloudinary
    const blogImageByte = await blogImage.arrayBuffer();
    const blogImageBuffer = Buffer.from(blogImageByte);
    const blogImagePath = `./public/${blogImage.name}`;
    await writeFile(blogImagePath, blogImageBuffer);

    const uploadBlogImage = await cloudinary.uploader.upload(blogImagePath);

    // save Blog to database
    const newBlog = await new BlogModel({
      title,
      content,
      imageUrl: uploadBlogImage.secure_url,
      userId,
    });

    await newBlog.save();

    // success response
    return NextResponse.json(
      {
        success: true,
        message: "Blog Created",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Error in create Blog callback",
        error,
      },
      { status: 500 }
    );
  }
}

// create new Blog
// export async function POST(request) {
//   // destructure the elements
//   const { title, content, imageUrl } = await request.json();

//   // getting the user token from cookie
//   const userToken = request.cookies.get("jwtoken")?.value;
//   const tokenUserData = await jwt.verify(userToken, process.env.JWT_SECRET);
//   const userId = tokenUserData.id;

//   try {
//     // validation
//     if ((!title, !content, !imageUrl, !userId)) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Please fill all the Fields",
//         },
//         { status: 422 }
//       );
//     }

//     // save Blog to database
//     const newBlog = await new BlogModel({
//       title,
//       content,
//       imageUrl,
//       userId,
//     });

//     await newBlog.save();

//     // success response
//     return NextResponse.json(
//       {
//         success: true,
//         message: "Blog created",
//       },
//       { status: 201 }
//     );

//     // try block ends here
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: "Error in register Blog Callback",
//         error,
//       },
//       { status: 500 }
//     );
//   }
// }

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
        success: true,
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
