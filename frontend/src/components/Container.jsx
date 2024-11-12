import React from "react";

const Container = ({ children, className }) => {
  return (
    <div
      className={` max-w-5xl xl:px-16 xl:py-8 lg:px-12 lg:py-6 md:px-8 md:py-4 px-4 py-2 mx-auto ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
