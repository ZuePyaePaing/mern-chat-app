import React from "react";

const Container = ({ children, className }) => {
  return (
    <div
      className={`md:w-[786px] md:px-8 md:py-4  sm:px-6 sm:py-3 w-[cal(100%-50px)]  px-4 py-2 mx-auto ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
