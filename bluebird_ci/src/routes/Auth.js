import React, { useCallback, useState } from "react";

const inputStyles = {};

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);

    const onChange = (event) => {
        const {target: {name, value}} = event;
        if(name === "email"){
            setEmail(value);
        }else if(name === "password"){
            setPassword(value)
        }
    };

    const onSubmit = (event) => {
        event.preventDefault();
    };

    const toggleAccount = () => setNewAccount(prev => !prev);

    return (
        <div>
            <form onSubmit={onSubmit} className="container">
                <input type="text" name="email" placeholder="Email" required value={email} onChange={onChange} className="authInput"/>
                <input type="password" name="password" placeholder="Passoword" required value={password} onChange={onChange} className="authInput"/>
                <input type="submit" value={newAccount ? "Create Account" : "Log In"} className="authInput authSubmit" />
            </form>
            <span onClick={toggleAccount}>{newAccount ? "Sign In" : "Create Account"} className="authSwitch" </span>
            <div>
                <button>Continue with Google</button>
                <button>Continue with Github</button>
            </div>
        </div>
    );


};


export default Auth;
