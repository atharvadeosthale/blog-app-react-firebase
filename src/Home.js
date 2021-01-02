import React from "react";
import "./Home.css";
import Intro from "./Intro";

function Home() {
  return (
    <div className="home">
      <Intro />
      <div className="home__blogsHeader">
        <span className="home__blogsHeaderText">BLOGS</span>
      </div>
    </div>
  );
}

export default Home;
