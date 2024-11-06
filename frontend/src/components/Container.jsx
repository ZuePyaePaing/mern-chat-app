import React from "react";

const Container = ({ children, className }) => {
  return (
    <div
      className={` md:px-8 md:py-4  sm:px-6 sm:py-3 w-full  px-4 py-2 mx-auto ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
