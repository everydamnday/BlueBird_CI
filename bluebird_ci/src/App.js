import React, { useState } from "react";
import AppRouter from "./components/Router";

const fakeUser = { id: 0, name: "hs" };

function App() {
  const [userObj, setUserObj] = useState(fakeUser);
  return <AppRouter userObj={userObj} />;
}

export default App;
