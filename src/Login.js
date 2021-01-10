import { Email, Person, VpnKey } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, db } from "./firebase";
import "./Login.css";
import { useStateValue } from "./StateProvider";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const history = useHistory();
  const [{ user }, dispatch] = useStateValue();

  const handleRegister = () => {
    if (email === "" || password === "" || name === "") {
      return alert("Please fill all the fields.");
    }
    // register to firebase
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          history.replace("/");
          db.collection("users").add({
            uid: auth.user.uid,
            name: name,
            email: email,
            role: "user",
          });
        }
      })
      .catch((err) => toast.error(err.message));
  };

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          history.replace("/");
        }
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__inputContainer">
          <Email />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="login__input"
          />
        </div>
        <div className="login__inputContainer">
          <VpnKey />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="login__input"
          />
        </div>

        <button className="login__loginBtn" onClick={handleLogin}>
          Login
        </button>
        <div className="login__inputContainer">
          <Person />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
          />
        </div>
        <button className="login__registerBtn" onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
}

export default Login;
