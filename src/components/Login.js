import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

// style
import "../style/login.css";

// functions
import { checkEmail, checkPassword } from "../functions/utils";
import handleUser from "../functions/handleUser";

const Login = ({ setUser, setModalLoginVisible }) => {
  // STATES
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [message, setMessage] = useState({ text: "", color: "black" });
  const [viewPassword, setViewPassword] = useState(false);
  const [isBusy, setIsBusy] = useState(false);

  // function
  const handleLogin = async (event) => {
    event.preventDefault();
    setMessage({ text: "", color: "black" });
    if (!email || !password || !isEmailValid || !isPasswordValid) {
      setMessage({
        text: "Please enter valid Email and Password",
        color: "red",
      });
      return;
    }
    setIsBusy(true);
    try {
      let url = "https://site--happycow-back--gw6mlgwnmzwz.code.run/user/login";
      const response = await axios.post(url, {
        email: email,
        password: password,
      });
      handleUser("login", response.data, setUser);
      setMessage({
        text: `Welcome ${response.data.account.username} !`,
        color: "green",
      });
      setIsBusy(false);
      setTimeout(() => {
        setModalLoginVisible(false);
        document.body.style.overflow = "auto";
      }, 1000);
    } catch (error) {
      if (error.response?.data.message === "Unauthorized") {
        setMessage({
          text: "There is no account corresponding these data. Please check an retry",
          color: "red",
        });
      } else {
        setMessage({
          text: `An error occurs : ${error.message}`,
          color: "red",
        });
      }
      setIsBusy(false);
    }
  };

  return (
    <div className="login-form">
      <form onSubmit={handleLogin}>
        {/* EMAIL */}
        {isEmailValid ? (
          <h4>Email</h4>
        ) : (
          <h4>
            Email
            <span className="warning">please enter valid email</span>
          </h4>
        )}
        <input
          className="text"
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setIsEmailValid(checkEmail(event.target.value));
            setMessage({ text: "", color: "black" });
          }}
        />

        {/* PASSWORD */}
        {isPasswordValid ? (
          <h4>Password</h4>
        ) : (
          <h4>
            Password
            <span className="warning">
              password must have at least 4 characters
            </span>
          </h4>
        )}
        <div className="password">
          <input
            className="text"
            type={viewPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setIsPasswordValid(checkPassword(event.target.value));
              setMessage({ text: "", color: "black" });
            }}
          />
          <FontAwesomeIcon
            icon="eye"
            className="eye"
            onClick={() => {
              setViewPassword(!viewPassword);
            }}
          />
        </div>

        {/* SUBMIT */}
        {!isBusy && (
          <button type="submit" className="submit">
            Login
          </button>
        )}

        {/* MESSAGE */}
        {message.text && (
          <p className="message" style={{ color: message.color }}>
            {message.text}
          </p>
        )}
      </form>
    </div>
  );
};
export default Login;
