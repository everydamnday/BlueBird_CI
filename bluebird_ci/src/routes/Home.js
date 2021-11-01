import React, { useEffect, useState } from "react";
import Nweet from "../components/Nweet";
import NweetFactory from "../components/NweetFactory";

const initialV = [
  { id: 0, text: "ex 0", creatorId: 0, creator: "me" },
  { id: 1, text: "ex 1", creatorId: 0, creator: "me" },
];

const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState(initialV);
  useEffect(() => {}, []);
  return (
    <div className="container">
      <NweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
