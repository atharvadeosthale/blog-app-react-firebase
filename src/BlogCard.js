import { IconButton } from "@material-ui/core";
import {
  CommentOutlined,
  ShareOutlined,
  ThumbDownOutlined,
  ThumbUpOutlined,
} from "@material-ui/icons";
import React from "react";
import "./BlogCard.css";

function BlogCard({ title, image, description, slug }) {
  return (
    <div className="blogCard">
      <div className="blogCard__mainContainer">
        <div className="blogCard__image">
          <img src={image} className="blogCard__img" />
        </div>
        <div className="blogCard__contentBox">
          <div className="blogCard__contentBoxDetails">
            <h1>{title}</h1>
            <p className="blogCard__description">{description}</p>
          </div>
          <div className="blogCard__contentBoxOptions">
            <div className="blogCard__options">
              <IconButton>
                <ThumbUpOutlined className="blogCard__option" />
              </IconButton>
              0
              <IconButton>
                <CommentOutlined className="blogCard__option" />
              </IconButton>
              0
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
