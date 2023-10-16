import { NextResponse } from "next/server";
import { userModel } from "@/models/userModel";

// get single user by ID
export async function GET(request, { params }) {
  // destructure the userId
  const { userId } = params;

  try {
    // find the user
    const singleUser = await userModel.findOne({ _id: userId });

    // If user not found
    if (!singleUser) {
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
        message: "User found",
        user: singleUser,
      },
      { status: 200 }
    );

    // try block ends here
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Error in get single user by ID Callback",
        error,
      },
      { status: 500 }
    );
  }
}

// update the user
export async function PATCH(request, { params }) {
  // destructure the userId
  const { userId } = params;
  const userNewInfo = await request.json();

  try {
    // find the user and update
    const updatedUser = await userModel.findOneAndUpdate(
      { _id: userId },
      userNewInfo,
      { new: true }
    );

    return NextResponse.json(
      {
        succcess: true,
        message: "User Updated",
        updatedUser,
      },
      { status: 200 }
    );

    // try block ends here
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Error in update user Callback",
        error,
      },
      { status: 500 }
    );
  }
}

// delete the user
export async function DELETE(request, { params }) {
  // destructure the userId
  const { userId } = params;

  try {
    // find the user and delete
    const deletedUser = await userModel.findByIdAndDelete({ _id: userId });

    return NextResponse.json(
      {
        succcess: true,
        message: `User with username -> ${deletedUser.username} <- has been deleted`,
        deletedUser,
      },
      { status: 200 }
    );

    // try block ends here
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Error in delete user Callback",
        error,
      },
      { status: 500 }
    );
  }
}
