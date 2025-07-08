import React from "react";
import logo from "../../../../assets/gstu_logo.jpeg";
import "./heade.css";

const Header = () => {
  return (
    <div className="back">
      <div className="flex flex-col sm:flex-row items-center sm:justify-start gap-4 sm:p-6 sm:gap-6">
        <img
          className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
          src={logo}
          alt="GSTU Logo"
        />
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#fbfbfb] text-center sm:text-left roboto-slab">
          Gopalganj Science and Technology University
        </h1>
      </div>
    </div>
  );
};

export default Header;
