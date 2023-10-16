import { NextResponse } from "next/server";

// logout api
export async function GET(request) {
  console.log("api hit");
  try {
    const response = NextResponse.json({
      success: true,
      message: "Logout Successfully",
    });

    response.cookies.delete("jwtoken");
    return response;

    // try block ends here
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Error in logout Callback",
        error,
      },
      { status: 500 }
    );
  }
}
