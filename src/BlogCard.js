import { IconButton } from "@material-ui/core";
import {
  CommentOutlined,
  ShareOutlined,
  ThumbDownOutlined,
  ThumbUp,
  ThumbUpOutlined,
} from "@material-ui/icons";
import { auth, db } from "./firebase";
import { useStateValue } from "./StateProvider";
import React, { useEffect, useState } from "react";
import firebase from "firebase";
import "./BlogCard.css";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

function BlogCard({ title, image, description, id }) {
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(0);
  const [liked, setLiked] = useState(false);
  const [{ user }, dispatch] = useStateValue();
  const history = useHistory();

  useEffect(() => {
    const query = db.collection("blogs").doc(id).get();
    query.then((snapshot) => {
      setLikes(snapshot.data().likes.length);
      setComments(snapshot.data().comments.length);
      snapshot.data().likes.forEach((like) => {
        if (user?.uid === like.userId) setLiked(true);
      });
    });
  }, []);

  const goToBlog = () => {
    history.push(`/blog/${id}`);
  };

  const likePost = () => {
    // Check auth
    if (!auth.currentUser) return toast.error("You need to be logged in!");
    // TODO: Check if the post is already liked, and if it's then just remove it on click
    if (liked) {
      const query = db
        .collection("blogs")
        .doc(id)
        .update({
          likes: firebase.firestore.FieldValue.arrayRemove({
            userId: auth.currentUser.uid,
          }),
        });
      setLikes(likes - 1);
      return setLiked(false);
    }

    // Like the post, add the user id in array
    const query = db
      .collection("blogs")
      .doc(id)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion({
          userId: auth.currentUser.uid,
        }),
      });
    setLiked(true);
    setLikes(likes + 1);
  };

  const commentPost = () => {
    dispatch({
      type: "OPEN_COMMENT_DRAWER",
      blogId: id,
    });
  };

  return (
    <div className="blogCard">
      <div className="blogCard__mainContainer">
        <div className="blogCard__image">
          <img src={image} className="blogCard__img" />
        </div>
        <div className="blogCard__contentBox">
          <div className="blogCard__contentBoxDetails" onClick={goToBlog}>
            <h1>{title}</h1>
            <p className="blogCard__description">{description}</p>
          </div>
          <div className="blogCard__contentBoxOptions">
            <div className="blogCard__options">
              <IconButton onClick={likePost}>
                {liked ? (
                  <ThumbUp className="blogCard__option" />
                ) : (
                  <ThumbUpOutlined className="blogCard__option" />
                )}
              </IconButton>
              {likes}
              <IconButton onClick={commentPost}>
                <CommentOutlined className="blogCard__option" />
              </IconButton>
              {comments}
            </div>
            <div className="blogCard__options">
              <ShareOutlined className="blogCard__option" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
