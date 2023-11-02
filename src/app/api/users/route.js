import { NextResponse } from "next/server";
import connectDB from "@/config/database";

import { userModel } from "@/models/userModel";

import bcrypt from "bcrypt";

import { writeFile } from "fs/promises";
import cloudinary from "@/helper/cloudinary";

// Database Call
connectDB();

// create new user
export async function POST(request) {
  const userFormData = await request.formData();

  // destructure the fields
  const username = userFormData.get("username");
  const email = userFormData.get("email");
  const password = userFormData.get("password");
  const profilePic = userFormData.get("profilePic");

  try {
    // validation
    if (!username || !email || !password || !profilePic) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill all the Fields",
        },
        { status: 422 }
      );
    }

    // existing user
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Email already exists",
        },
        { status: 409 }
      );
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // save image to a local folder and cloudinary
    const profileImageByte = await profilePic.arrayBuffer();
    const profileImageBuffer = Buffer.from(profileImageByte);
    const profileImagePath = `./public/${profilePic.name}`;
    await writeFile(profileImagePath, profileImageBuffer);

    const uploadProfileImage = await cloudinary.uploader.upload(
      profileImagePath
    );
    console.log(uploadProfileImage);

    // save user to database
    const newUser = await new userModel({
      username,
      email,
      password: hashedPassword,
      profilePic: uploadProfileImage.secure_url,
    });
    await newUser.save();

    console.log(newUser);

    // success response
    return NextResponse.json(
      {
        success: true,
        message: "User Created",
      },
      { status: 201 }
    );
    // try block ends here
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Error in register Callback",
        error,
      },
      { status: 500 }
    );
  }
}

// create new user
// export async function POST(request) {
//   // destructure the fields
//   const { username, email, password } = await request.json();

//   try {
//     // validation
//     if (!username || !email || !password) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Please fill all the Fields",
//         },
//         { status: 422 }
//       );
//     }

//     // existing user
//     const existingUser = await userModel.findOne({ email: email });
//     if (existingUser) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Email already exists",
//         },
//         { status: 409 }
//       );
//     }

//     // hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // save user to database
//     const newUser = await new userModel({
//       username,
//       email,
//       password: hashedPassword,
//     });
//     await newUser.save();

//     // success response
//     return NextResponse.json(
//       {
//         success: true,
//         message: "User Created",
//       },
//       { status: 201 }
//     );
//     // try block ends here
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: "Error in register Callback",
//         error,
//       },
//       { status: 500 }
//     );
//   }
// }

// get all users
export async function GET() {
  try {
    const users = await userModel.find().select("-password");

    // If user not found
    if (!users) {
      return NextResponse.json(
        {
          success: false,
          message: "No record found",
        },
        { status: 404 }
      );
    }

    // If user exist, final return
    return NextResponse.json(
      {
        success: true,
        totalUsers: users.length,
        users,
      },
      { status: 200 }
    );

    // try block ends here
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Error in get all users Callback",
        error,
      },
      { status: 500 }
    );
  }
}
