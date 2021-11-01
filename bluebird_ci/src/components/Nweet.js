import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editMode, setEditmode] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);

  const onEditToggle = () => {
    setEditmode((prev) => !prev);
  };

  const onChange = (e) => {
    const { value } = e.target;
    setNewNweet(value);
  };

  const onSubmit = () => {};

  const onDelete = () => {};

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
          <h3>{nweetObj.text}</h3>
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
