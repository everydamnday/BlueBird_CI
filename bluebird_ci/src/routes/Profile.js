import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Profile = ({ setUserObj, userObj }) => {
  const [newDisplayname, setnewDisplayname] = useState(userObj.name);
  const history = useHistory();
  const Logout = () => {
    // userObj 초기화
    setUserObj();
    history.push("/");
  };
  const onChange = (e) => {
    const { value } = e.target;
    setnewDisplayname(value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (userObj.name !== newDisplayname) {
      // userObj 수정
      // refreshUser();
    }
  };
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
