import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// style
import "../style/login.css";

// functions
import { checkEmail, checkPassword } from "../functions/utils";

const Login = () => {
  // STATES
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [message, setMessage] = useState({ text: "", color: "black" });
  const [viewPassword, setViewPassword] = useState(false);

  // function
  const handleLogin = (event) => {
    event.preventDefault();
    setMessage({ text: "", color: "black" });
    if (!email || !password || !isEmailValid || !isPasswordValid) {
      setMessage({
        text: "Please enter valid Email and Password",
        color: "red",
      });
    }
  };

  return (
    <div className="login-form">
      <form onSubmit={handleLogin}>
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
          placeholder=" Enter your email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setIsEmailValid(checkEmail(event.target.value));
          }}
        />
        {isPasswordValid ? (
          <h4>Password</h4>
        ) : (
          <h4>
            Password
            <span className="warning">
              password must have at least 8 characters
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
        <button type="submit" className="submit">
          Login
        </button>
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
