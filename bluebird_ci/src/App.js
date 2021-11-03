import React, { useState, useEffect } from "react";
import AppRouter from "./components/Router";
import axios from "axios";

// const fakeUser = { id: 0, name: "hs" };

function App() {
  const [userObj, setUserObj] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const result = await axios("https://jsonplaceholder.typicode.com/users");
      setUserObj(result.data[0]);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  // 유저 불러오기
  useEffect(() => {
    console.log("첫 렌더 유저 불러오기");
    fetchUser();
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
    <AppRouter
      setUserObj={setUserObj}
      userObj={userObj}
      isLoggedIn={Boolean(userObj)}
    />
  );
}

export default App;
