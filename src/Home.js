import React from "react";
import BlogCard from "./BlogCard";
import "./Home.css";
import Intro from "./Intro";

function Home() {
  return (
    <div className="home">
      <Intro />
      <div className="home__blogsHeader">
        <span className="home__blogsHeaderText">BLOGS</span>
      </div>
      <div className="container home__blogs">
        <BlogCard
          description="In this blog I tell you why having a portfolio website is important."
          title="Importance of having a portfolio"
          slug="importance-of-having-portfolio"
          image="https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2020/07/shutterstock_582803470.jpg?w=750"
        />
      </div>
    </div>
  );
}

export default Home;
