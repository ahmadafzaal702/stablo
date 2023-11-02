"use client";
import React, { useContext } from "react";
import styles from "./slideshow.module.css";

import userContext from "@/context/userContext";
import { Button, Wrapper } from "..";
import Link from "next/link";

const SlideShow = () => {
  const { user } = useContext(userContext) as any;

  return (
    <>
      <section
        className={`${styles.backgroundImage} w-full h-[70vh] md:h-[90vh]`}
      >
        <div className="w-1/2 mt-52 ml-16 text-white">
          <h1 className="text-5xl">
            Welcome {user ? user.username : "to the Stablo"}
          </h1>
          <p className="mt-5">
            Dive into a world of thought-provoking tech blogs that unravel
            industry trends, dissect innovations, and explore the future of
            technology.
          </p>
          <div className="mt-5">
            <Link href="/blogs">
              <Button title="Explore Blogs" />
            </Link>
          </div>
        </div>
      </section>

      <Wrapper>
        {/* about company section */}
        <section className="text-center mt-10 w-full md:w-4/5 mx-auto">
          <h2>About Stablo</h2>
          <p className="mt-5">
            Welcome to Stablo, where technology meets creativity, and ideas find
            their digital home. At Stablo, we are more than just a platform; we
            are a vibrant community of tech enthusiasts, innovators, and
            storytellers. Founded with a passion for technology and a commitment
            to empowering voices, Stablo is the go-to destination for insightful
            tech blogs and a platform where your thoughts and ideas can thrive.
          </p>
          <div className="mt-5">
            <Link
              href="/pages/about-us"
              className="font-semibold hover:underline"
            >
              Read More
            </Link>
          </div>
        </section>
      </Wrapper>
    </>
  );
};

export default SlideShow;
