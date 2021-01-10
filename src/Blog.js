import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";
import { db, storage } from "./firebase";
import "./Blog.css";
import reactHtmlParser from "react-html-parser";
import { useStateValue } from "./StateProvider";

function Blog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(0);
  const [liked, setLiked] = useState(false);
  const [image, setImage] = useState("");
  const [imageFileName, setIimageFileName] = useState("");
  const [{ user }, dispatch] = useStateValue();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    db.collection("blogs")
      .doc(id)
      .get()
      .then((snapshot) => {
        let data = snapshot.data();
        setTitle(data.title);
        setContent(data.content);
        setLikes(data.likes.length);
        setComments(data.comments.length);
        setIimageFileName(data.filename);
      })
      .catch((err) => {
        console.log(err.message);
        history.push("/");
      });
    const imageUrl = await storage.child(imageFileName).getDownloadURL();
    setImage(imageUrl);
  };

  return (
    <div className="blog">
      <div className="container">
        <div className="blog__image">
          <img src={image} />
        </div>
        <div className="blog__title">
          <h1>{title}</h1>
        </div>
        <div className="blog__content">{reactHtmlParser(content)}</div>
      </div>
    </div>
  );
}

export default Blog;
