import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Nweet = ({ fetchData, nweetObj, isOwner }) => {
  const [editMode, setEditmode] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.body);

  const onEditToggle = () => {
    setEditmode((prev) => !prev);
  };

  const onChange = (e) => {
    const { value } = e.target;
    setNewNweet(value);
  };

  // 게시글 수정(POST:post/id)
  const onSubmit = async () => {
    console.log("수정");
    // 서버에 postID와 수정데이터를 전달
    // await axios.post(`/post/${nweetObj.id}`, newNweet);
    fetchData();
    setNewNweet("");
  };

  // 게시글 삭제(DELETE:post/id)
  const onDelete = async () => {
    console.log("삭제");
    // 서버에 postID를 전달
    // await axios.delete(`/post/${nweetObj.id}`);
    // fetchData();
    setNewNweet("");
  };

  return (
    <div className="nweet">
      {editMode ? (
        <>
          <form onSubmit={onSubmit} className="container nweetEdit">
            <input
              type="text"
              placeholder="Edit your nweet"
              value={newNweet}
              required
              autoFocus
              onChange={onChange}
              className="formInput"
            />
            <input type="submit" value="Update Nweet" className="formBtn" />
          </form>
          <span onClick={onEditToggle} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
          <div className="nweet_title">{nweetObj.title}</div>
          <div className="nweet_body">{nweetObj.body}</div>
          {isOwner && (
            <div class="nweet__actions">
              <span onClick={onDelete}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={onEditToggle}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
