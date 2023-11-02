import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { userModel } from "@/models/userModel";

export async function GET(request) {
  try {
    // getting the user token from cookie
    const userToken = request.cookies.get("jwtoken")?.value;
    if (!userToken) {
      return NextResponse.json({
        success: false,
        message: "User is not logged in",
      });
    }
    const tokenUserData = await jwt.verify(userToken, process.env.JWT_SECRET);

    // getting the user from Database
    const user = await userModel.findById(tokenUserData.id).select("-password");

    // return user as response
    return NextResponse.json({
      success: true,
      message: "Token Exist",
      user,
    });

    // try block ends here
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Error in get current user Callback",
      },
      { status: 500 }
    );
  }
}
