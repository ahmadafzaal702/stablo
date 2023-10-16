import { NextResponse } from "next/server";
import { userModel } from "@/models/userModel";

import connectDB from "@/config/database";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Database Call
connectDB();

// login user
export async function POST(request) {
  const { email, password } = await request.json();
  try {
    // validation
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill all the fields",
        },
        {
          status: 422,
        }
      );
    }

    // find user
    const user = await userModel.findOne({ email });
    // validation - Email does not exist
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is not registered",
        },
        {
          status: 400,
        }
      );
    }
    // validation - Password does not match
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        {
          status: 400,
        }
      );
    }

    // generating JWT token
    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    user.token = token;
    await user.save();

    // if the above conditions doesn't meet, allow login
    const response = NextResponse.json(
      {
        success: true,
        message: "Login Successfully",
        user,
      },
      {
        status: 200,
      }
    );
    response.cookies.set("jwtoken", token, {
      expires: new Date(Date.now() + 86400000),
      httpOnly: true,
    });

    return response;

    // try block ends here
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Error in login callback",
        error,
      },
      { status: 500 }
    );
  }
}
