import React from "react";
import { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import "./Home.css";
import { db, storage } from "./firebase";
import Intro from "./Intro";

function Home() {
  const [blogs, setBlogs] = useState([]);

  // fetch blog posts
  useEffect(() => {
    console.log("🔥");
    const query = db
      .collection("blogs")
      .get()
      .then(async (snapshot) => {
        snapshot.docs.forEach(async (doc) => {
          let data = doc.data();
          let image = await storage.child(data.filename).getDownloadURL();
          data.id = doc.id;
          data.downloadUrl = image;
          console.log(data);
          setBlogs((oldBlogs) => [...oldBlogs, data]);
        });
      });
    console.log(blogs);
  }, []);

  useEffect(() => {
    console.log(blogs);
  }, [blogs]);

  return (
    <div className="home">
      <Intro />
      <div className="home__blogsHeader">
        <span className="home__blogsHeaderText">BLOGS</span>
      </div>
      <div className="container home__blogs">
        {blogs.map((blog) => (
          <BlogCard
            description={blog?.description}
            title={blog?.title}
            id={blog.id}
            image={blog.downloadUrl}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
