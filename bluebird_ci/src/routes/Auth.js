import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const Auth = ({ setUserObj }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (newAccount) {
      console.log("회원가입");
      try {
        setLoading(true);
        // const res = await axios.post(); 가입정보 서버송신 > db저장 > 유저객체 복원 > 프론트 수신(res)
        setUserObj({ id: 0, name: "hs" }); // 유저상태 업데이트
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    } else {
      console.log("로그인");
      try {
        setLoading(true);
        // const res = await axios.post(); 로그인정보 서버송신 > db조회 > 유저객체 복원 > 프론트 수신(res)
        setUserObj({ id: 0, name: "hs" }); // 유저상태 업데이트
      } catch (error) {
        setError(e);
      }
      setLoading(false);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  const SocialLogin = (e) => {};
  if (loading)
    return (
      <div class="loadingBox">
        <div class="dim"></div>
        <div class="circle"></div>
      </div>
    );
  if (error) return <div className="statusBar">Error!</div>;
  return (
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <form onSubmit={onSubmit} className="container">
        <input
          type="text"
          name="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
          className="authInput"
        />
        <input
          type="password"
          name="password"
          placeholder="Passoword"
          required
          value={password}
          onChange={onChange}
          className="authInput"
        />
        <input
          type="submit"
          value={newAccount ? "Create Account" : "Log In"}
          className="authInput authSubmit"
        />
      </form>
      <span onClick={toggleAccount} className="authSwitch">
        {newAccount ? "Sign In" : "Create Account"}{" "}
      </span>
      <div className="authBtns">
        <button onClick={SocialLogin} name="google" className="authBtn">
          Continue with Google <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button onClick={SocialLogin} name="github" className="authBtn">
          Continue with Github <FontAwesomeIcon icon={faGithub} />
        </button>
      </div>
    </div>
  );
};

export default Auth;
