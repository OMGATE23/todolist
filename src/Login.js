import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  function loginHandler(e) {
    e.preventDefault();

    fetch("http://localhost:4000/api/v1/user/login", {
      method: "POST",
      body: JSON.stringify({
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
  }
  return (
    <div className={styles["main-container"]}>
      <div className={styles["main-login-container"]}>
        <div className={styles["login-message-block"]}>
          <h1>LOGIN</h1>
          <div className={styles["login-note"]}>
            Hurry up! Your tasks are waiting!
          </div>
        </div>
        <div className={styles["login-container"]}>
          <form onSubmit={loginHandler}>
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

            <button className={styles["submit-btn"]}>SUBMIT</button>
          </form>
          <div>
            Not signed Up? <Link to="/signup">Sign up!</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
