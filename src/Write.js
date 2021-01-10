import { Drawer } from "@material-ui/core";
import React, { useState } from "react";
import { useStateValue } from "./StateProvider";
import "./Write.css";
import MUIRichTextEditor from "mui-rte";
import { EditorState } from "draft-js";
import RichTextEditor from "react-rte";
import { db, storage } from "./firebase";
import { toast } from "react-toastify";

function Write() {
  const [{ drawer, role }, dispatch] = useStateValue();
  const [drawerContent, setDrawerContent] = useState(
    RichTextEditor.createEmptyValue()
  );
  const [inputFile, setInputFile] = useState(null);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

  const closeDrawer = () => {
    dispatch({
      type: "CLOSE_DRAWER",
    });
  };

  const handlePublish = async () => {
    try {
      // check if not admin
      if (role !== "admin") {
        return toast.error("You're not authorized to make posts on this site.");
      }
      // validate everything
      if (title === "" || description === "" || !inputFile) {
        return toast.error("Please fill all the fields to publish the blog!");
      }
      // upload pic
      await storage.child(`uploads/${inputFile.name}`).put(inputFile);
      // make entry in firestore
      await db.collection("blogs").add({
        filename: `uploads/${inputFile.name}`,
        title: title,
        description: description,
        likes: [],
        comments: [],
        content: drawerContent.toString("html"),
      });
      toast.success("Blog published!");
      dispatch({
        type: "CLOSE_DRAWER",
      });
    } catch (err) {
      return toast.error(err.message);
    }
  };

  return (
    <div className="write">
      <Drawer open={drawer} anchor="right" onClose={closeDrawer}>
        <div className="write__container">
          <h1>Write Blog</h1>
          <input
            type="file"
            onChange={(e) => setInputFile(e.target.files[0])}
            className="write__inputFile"
            placeholder="Upload photo"
          />

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="write__titleBox"
          />
          <textarea
            placeholder="Card description"
            className="write__cardDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <div className="write__textEditor">
            <RichTextEditor
              value={drawerContent}
              onChange={(e) => setDrawerContent(e)}
              placeholder="Start typing..."
            />
          </div>
          <button className="write__publishBtn" onClick={handlePublish}>
            Publish
          </button>
        </div>
      </Drawer>
    </div>
  );
}

export default Write;
