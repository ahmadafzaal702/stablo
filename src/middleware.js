import { NextResponse } from "next/server";

export function middleware(request) {
  const isUserToken = request.cookies.get("jwtoken")?.value;

  const loggedUserNotAccessPages =
    request.nextUrl.pathname == "/accounts/signup" ||
    request.nextUrl.pathname == "/accounts/login";

  // In the if statement, we will check if logged user are accessing the login and signup page.
  // we will redirect to the profile page

  if (loggedUserNotAccessPages) {
    if (isUserToken) {
      return NextResponse.redirect(new URL("/users/profile", request.url));
    }
  } else {
    // In the else statement, we will check if user accessing the protected routes and user is not logged in.
    // we will redirect to the login page
    if (!isUserToken) {
      return NextResponse.redirect(new URL("/accounts/login", request.url));
    }
  }
}

// Matching Paths
export const config = {
  matcher: ["/accounts/:path*", "/users/:path*"],
};
