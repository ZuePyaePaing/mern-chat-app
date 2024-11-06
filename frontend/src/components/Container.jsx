import React from "react";

const Container = ({ children, className }) => {
  return (
    <div
      className={`xl:w-[1390px] xl:px-12 xl:py-6  lg:w-[1180px] lg:px-10 lg:py-5 md:w-[960px] md:px-8 md:py-4 sm:w-[720px] sm:px-6 sm:py-3 w-full  px-4 py-2 mx-auto ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
