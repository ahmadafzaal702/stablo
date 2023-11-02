"use client";
// react imports
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

// context imports
import { useContext } from "react";
import userContext from "@/context/userContext";

// custom imports
import { toast } from "react-toastify";
import { Button, Wrapper } from "..";
import logo from "../../../public/logo.svg";
import userImage from "@/assests/background.png";
import { AiOutlineClose, AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";

// Header FC
const Header = () => {
  // react hooks
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const { user } = useContext(userContext);
  const { setUser } = useContext(userContext);

  // User email before @
  const userEmailBeforeAt = user?.email.split("@")[0];

  // refs for menus
  const menuRef = useRef();
  const imageRef = useRef();

  if (typeof window !== "undefined") {
    window.addEventListener("click", (e) => {
      if (e.target !== menuRef.current && e.target !== imageRef.current) {
        setMenuOpen(false);
      }
    });
  }

  // logoutHandler
  const logoutHandler = async () => {
    const response = await fetch("/api/users/logout");
    const data = await response.json();

    if (response.ok) {
      // clear the userContext, show toast and redirect to the homepage
      setUser(null);
      toast.success(data.message);
      setTimeout(() => {
        router.push("/");
      }, 500);
    }
  };
  // Header FC return
  return (
    <>
      <header className="w-full bg-gray-light sticky top-0 z-[99]">
        <Wrapper>
          <div className="flex justify-between items-center">
            {/* column 1 - logo */}
            <div className="cursor-pointer ml-16 md:ml-0">
              <Image src={logo} alt="logo" />
            </div>

            {/* column 2 - menu */}
            <div className="navbar-menu">
              {/* hamburger work */}
              <div
                onClick={() => {
                  setIsMobile(!isMobile);
                }}
                className="text-4xl p-[6px] absolute left-6 top-6 cursor-pointer md:hidden"
              >
                {isMobile ? <AiOutlineClose /> : <AiOutlineMenu />}
              </div>

              {/* navigation */}
              <ul
                className={`text-lg md:flex md:items-center md:p-0 p-5 absolute md:static top-24 md:mt-0 h-screen md:h-auto w-3/5 md:w-auto bg-gray-light border-t-2 border-t-gray-medium md:border-t-0  md:z-auto z-[99] transition-all duration-500 ${
                  isMobile ? "left-0 " : "left-[-600px]"
                }`}
              >
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/blogs">Blogs</Link>
                </li>
                {user && (
                  <li>
                    <Link href={`/users/${userEmailBeforeAt}/my-blogs`}>
                      My Blogs
                    </Link>
                  </li>
                )}

                <li>
                  <Link href="/pages/contact-us">Contact Us</Link>
                </li>
              </ul>
            </div>

            {/* column 3 - accounts */}
            <div className="flex gap-4 items-center">
              {/* <div>
                <Link href="/" className="text-2xl">
                  <AiOutlineSearch />
                </Link>
              </div> */}

              {/* If user is not logged in */}
              {!user && (
                <>
                  <div>
                    <Button
                      title="Signup"
                      clickHandler={() => {
                        router.push("/accounts/signup");
                      }}
                    />
                  </div>
                  <div>
                    <Button
                      title="Login"
                      clickHandler={() => {
                        router.push("/accounts/login");
                      }}
                    />
                  </div>
                </>
              )}

              {/* If user is logged in */}
              {user && (
                <>
                  <div className="relative">
                    <div className="flex gap-x-2 items-center">
                      <p className="text-sm">
                        <Link
                          href={`/users/${userEmailBeforeAt}`}
                          className="text-sm font-semibold underline"
                        >
                          {user.username}
                        </Link>
                      </p>
                      <img
                        ref={imageRef}
                        src={`${user ? user.profilePic : userImage}`}
                        className="h-12 w-12 object-cover 
                        border-2 border-gray-medium rounded-full cursor-pointer"
                        onClick={() => {
                          setMenuOpen(!menuOpen);
                        }}
                      />
                    </div>

                    {/* user account menu section */}
                    {menuOpen && (
                      <div
                        ref={menuRef}
                        className="w-52 pt-2 bg-white shadow-lg rounded absolute top-14 -left-8"
                      >
                        <ul className="p-2 userHeaderMenu">
                          <li>
                            <Link href={`/users/${userEmailBeforeAt}`}>
                              My Profile
                            </Link>
                          </li>
                          <li>
                            <Link
                              href={`/users/${userEmailBeforeAt}/create-blog`}
                            >
                              Create Blog
                            </Link>
                          </li>
                          <li>
                            <Link href={`/users/${userEmailBeforeAt}/my-blogs`}>
                              My Blogs
                            </Link>
                          </li>
                          <li onClick={logoutHandler}>Logout</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </Wrapper>
      </header>
    </>
  );
};

export default Header;
