import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Profile = ({ setUserObj, userObj }) => {
  const [newDisplayname, setnewDisplayname] = useState(userObj.name);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const Logout = async () => {
    // userObj 초기화
    // try {
    //   setLoading(true);
    //   const res = await axios(`/user/${userObj}/logout`);
    //   if(res.data) {
    setUserObj();
    //   }
    history.push("/");
    // } catch (e) {
    //   setError(e.response);
    //   console.log(e);
    // }
    // setLoading(false);
  };

  const onChange = (e) => {
    const { value } = e.target;
    setnewDisplayname(value);
  };

  // fetchUser를 불러와서 유저를 갱신 시킬 것인지 고민
  const onSubmit = async (e) => {
    e.preventDefault();
    // if (userObj.name !== newDisplayname) {
    //   // userObj 수정
    //   try {
    //     setLoading(true);
    //     const res = await axios.post(`/user/${userObj.id}`, newDisplayname);
    //     setUserObj(res.data);
    //   } catch (e) {
    //     setError(e.response);
    //     console.log(e)
    //   }
    //   setLoading(false);
    // }
  };

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
      <form onSubmit={onSubmit} className="profileForm">
        <input
          onChange={onChange}
          type="text"
          autoFocus
          placeholder="Display name"
          value={newDisplayname}
          className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={Logout}>
        Log Out
      </span>
    </div>
  );
};

export default Profile;
