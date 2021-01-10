import { Avatar, Drawer, IconButton } from "@material-ui/core";
import { SendOutlined } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import "./Comment.css";
import { auth, db } from "./firebase";
import { useStateValue } from "./StateProvider";
import firebase from "firebase";
import { toast } from "react-toastify";

function Comment() {
  const [
    { commentDrawer, commentBlog, user, name },
    dispatch,
  ] = useStateValue();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const closeDrawer = () => {
    dispatch({
      type: "CLOSE_COMMENT_DRAWER",
    });
  };

  useEffect(() => {}, []);

  useEffect(() => {
    fetchComments();
  }, [commentBlog]);

  const fetchComments = async () => {
    db.collection("blogs")
      .doc(commentBlog)
      .onSnapshot((snapshot) => {
        const comments = snapshot.data()?.comments;
        comments?.forEach((comment) => {
          setComments(comments);
        });
      });
  };

  const postComment = (e) => {
    e.preventDefault();

    if (!auth.currentUser) {
      return toast.error("You need to be logged in to post a comment.");
    }

    db.collection("blogs")
      .doc(commentBlog)
      .update({
        comments: firebase.firestore.FieldValue.arrayUnion({
          userId: user.uid,
          comment: comment,
          name: name,
        }),
      });
  };

  return (
    <div className="comment">
      <Drawer open={commentDrawer} onClose={closeDrawer} anchor="right">
        <div className="comment__container">
          <div className="comment__commentsContainer">
            {comments.map((comment) => (
              <div>
                {comment.name} - {comment.comment}
              </div>
            ))}
          </div>
          <div className="comment__commentBox">
            <form
              style={{
                width: "100%",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
              }}
              onSubmit={postComment}
            >
              <div className="comment__inputContainer">
                <Avatar />
                <input
                  type="text"
                  className="comment__input"
                  placeholder="Type your comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <IconButton type="submit">
                  <SendOutlined />
                </IconButton>
              </div>
            </form>
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default Comment;
