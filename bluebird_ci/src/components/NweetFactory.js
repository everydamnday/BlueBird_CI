import React, { useState } from "react";

const NweetFactory = ({ fetchData }) => {
  const [nweet, setNweet] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    fetchData();
    setNweet("");
  };
  const onChange = (e) => {
    const { value } = e.target;
    setNweet(value);
  };
  return (
    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <input
          className="factoryInput__input"
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="what's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="&rarr;" className="factoryInput__arrow" />
      </div>
    </form>
  );
};

export default NweetFactory;
