import React, { useEffect, useState } from "react";
import Nweet from "../components/Nweet";
import NweetFactory from "../components/NweetFactory";
import axios from "axios";

const initialV = [
  { id: 0, text: "ex 0", creatorId: 0, creator: "me" },
  { id: 1, text: "ex 1", creatorId: 0, creator: "me" },
];

const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState(initialV);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 첫 렌더 & 갱신 게시글 불러오기(GET:/posts)
  const fetchData = async () => {
    console.log("게시글갱신");
    try {
      setLoading(true);
      const result = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setNweets(result.data);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading)
    return (
      <div class="loadingBox">
        <div class="dim"></div>
        <div class="circle"></div>
      </div>
    );
  if (error) return <div className="statusBar">Error!</div>;

  return (
    <div className="container">
      <NweetFactory fetchData={fetchData} userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {!!nweets &&
          nweets.map((nweet) => (
            <Nweet
              fetchData={fetchData}
              key={nweet.id}
              nweetObj={nweet}
              isOwner={nweet.userId === userObj.id}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
