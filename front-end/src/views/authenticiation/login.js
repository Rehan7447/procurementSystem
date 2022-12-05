import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import "./home.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function Login(e) {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const data = {
      email,
      password,
    };
    axios
      .post("/user/login", data, config)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        if (res.data.isAdmin) {
          navigate("/admin");
        } else {
          navigate("/userHome");
        }
      })
      .catch((err) => {
        alert("Loagin Failed");
      });
  }

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/userHome");
    }
  }, [navigate]);
  return (
    <div className="container">
      <div className="textMain">
        <h1>Welcome To Company Procurement System</h1>
        <p>
          A one stop solution to manage and track all your comapnies procurement
          requests from one place.
        </p>
      </div>
      <div className="screen">
        <div className="screen__content">
          <form className="login" onSubmit={(e) => Login(e)}>
            <div className="login__field">
              <i className="login__icon fas fa-user"></i>
              <input
                type="email"
                className="login__input"
                placeholder="User name / Email"
                name="email"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-lock"></i>
              <input
                type="password"
                className="login__input"
                placeholder="Password"
                name="password"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <button className="button login__submit" type="submit">
              <span className="button__text">Log In Now</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
          </form>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  );
}
