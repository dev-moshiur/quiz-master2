import "./login.scss";
import React from "react";

import { Link } from "react-router-dom";
import { Facebook, LinkedIn } from "@material-ui/icons";
import { useRef, useState } from "react";

export default function LogIn({}) {
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const server = `https://quiz-app-api-nine.vercel.app`;

  const email = useRef();
  const password = useRef();

  async function handleSubmit() {
    try {
      setError("");
      setLoading(true);
      // await login(email.current.value, password.current.value);
      fetch(`${server}/auth/login`, {
        method: "post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          email: email.current.value,
          password: password.current.value,
        }),
      })
        .then((data) => data.json())
        .then((data) => console.log(data));
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("Failed to login!");
    }
  }

  return (
    <div className="login">
      <div className="heading">LOGIN</div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <label htmlFor="email">Email</label>
        <input ref={email} type="email" name="email" id="email" />
        <label htmlFor="passwoed">Password</label>
        <input ref={password} type="password" name="password" id="password" />
        <div className="cheak">
          <input type="checkbox" name="checkbox" id="checkbox" />{" "}
          <span>Remind Me</span>
        </div>
        <input
          disabled={loading}
          className="submit"
          type="submit"
          value="LOGIN"
        />
      </form>
      <div className="forgot">Forgot Password?</div>
      <div className="or">
        <span>OR</span>
      </div>
      <div className="googleAndFacebook">
        <span>
          <Facebook />
        </span>
        <span>
          <LinkedIn />
        </span>
      </div>
      <div className="signLog">
        Need A Account
        <Link to="/signUp">Sign Up</Link>
      </div>
    </div>
  );
}
