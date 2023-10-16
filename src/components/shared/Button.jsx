"use client";
import React from "react";

// Button FC
const Button = ({ title, clickHandler = null }) => {
  // Button FC return
  return (
    <button
      onClick={() => {
        clickHandler ? clickHandler() : null;
      }}
      className="rounded-md bg-primary hover:bg-primary-hover px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-hover"
    >
      {title}
    </button>
  );
};

export default Button;
