import React from "react";
import Header from "./Header/Header";
import Navber from "./Header/Navber";
import Hero from "./Header/Hero/Hero";
import Visioned from "./Fetured/Visioned";

const Home = () => {
  return (
    <div>
      <div className=" sticky-top top-0">
        <Navber />
      </div>
      <div className=" p-3">
        <Hero />
      </div>
      <Visioned />
    </div>
  );
};

export default Home;
