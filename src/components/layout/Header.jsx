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

  // const isLogin = false;

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
      }, 2000);
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
                    <Link href="/blogs/my-blogs">My Blogs</Link>
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

              {user && (
                <>
                  <div className="relative">
                    <div className="flex gap-x-2 items-center">
                      <p className="text-sm">
                        Welcome{" "}
                        <Link
                          href={"/users/profile"}
                          className="text-sm font-semibold underline"
                        >
                          {user.username.split(" ")[0]}
                        </Link>
                      </p>
                      <Image
                        ref={imageRef}
                        src={userImage}
                        className="h-12 w-12 object-cover 
                        border-2 border-gray-medium rounded-full cursor-pointer"
                        onClick={() => {
                          setMenuOpen(!menuOpen);
                        }}
                      />
                    </div>

                    {menuOpen && (
                      <div
                        ref={menuRef}
                        className="w-52 pt-2 bg-white shadow-lg rounded absolute top-14 -left-8"
                      >
                        <ul className="p-2">
                          <li
                            onClick={() => setMenuOpen(false)}
                            className="p-2 text-sm font-semibold cursor-pointer rounded hover:bg-primary"
                          >
                            My Profile
                          </li>
                          <li className="p-2 text-sm font-semibold cursor-pointer rounded hover:bg-primary">
                            My Blogs
                          </li>
                          <li className="p-2 text-sm font-semibold cursor-pointer rounded hover:bg-primary">
                            Logout
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* <div className="flex gap-x-2 items-center">
                    <div>
                      <p className="text-xs">
                        Welcome{" "}
                        <Link
                          href={"/users/profile"}
                          className="text-xs font-semibold underline"
                        >
                          {user.username.split(" ")[0]}
                        </Link>
                      </p>
                    </div>
                    <Button title="Logout" clickHandler={logoutHandler} />
                  </div> */}
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
