import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./signup.module.css";

function Signup() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const navigate = useNavigate();

  const signUpHandler = (e) => {
    e.preventDefault();

    fetch("http://localhost:4000/api/v1/user/signup", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password,
      }),
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("token", JSON.stringify(data.token));
        navigate("/todolist");
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <div className={styles["main-container"]}>
      <div className={styles["main-signup-container"]}>
        <div className={styles["signup-message-block"]}>
          <h1>Sign up</h1>
          <div className={styles['signup-note']}>Sign up to create your To Do List!</div>
        </div>


        <div className={styles["signup-container"]}>
          <form onSubmit={(e) => signUpHandler(e)}>
            <label>
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                id="login-name"
                type="text"
                placeholder="Username"
              />
            </label>
            <label>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                id="login-email"
                type="text"
                placeholder="Email"
              />
            </label>

            <label>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                id="login-password"
                type="password"
                placeholder="Password"
              />
            </label>

            <button className={styles['submit-btn']}>SUBMIT</button>
          </form>
          <div>
            Already Signed up? <Link to="/">Log In!</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
