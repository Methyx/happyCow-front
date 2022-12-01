import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

// style
import "../style/signup.css";

// functions
import { checkEmail, checkPassword } from "../functions/utils";
import handleUser from "../functions/handleUser";

import nobody from "../img/Unknown_person.jpg";

const SignUp = ({ setUser, setModalLoginVisible }) => {
  // STATES
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [message, setMessage] = useState({ text: "", color: "black" });
  const [viewPassword, setViewPassword] = useState(false);
  const [isBusy, setIsBusy] = useState(false);

  // function
  const handleSignUp = async (event) => {
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
      const url =
        "https://site--happycow-back--gw6mlgwnmzwz.code.run/user/signup";
      const formData = new FormData();
      formData.append("email", email);
      formData.append("username", username);
      formData.append("password", password);
      formData.append("picture", avatar);

      const response = await axios.post(url, formData);
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
      if (error.response?.data.message) {
        setMessage({ text: error.response.data.message, color: "red" });
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
    <div className="signup-form">
      <form onSubmit={handleSignUp}>
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
          placeholder="Type your email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setIsEmailValid(checkEmail(event.target.value));
            setMessage({ text: "", color: "black" });
          }}
        />

        {/* USENAME */}
        <h4>Username</h4>
        <input
          className="text"
          type="text"
          placeholder="Choose your username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
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
            placeholder="Choose your password"
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

        {/* AVATAR */}
        <div className="avatar">
          <h4>Avatar</h4>
          <div className="avatar-container">
            <img
              src={avatar ? URL.createObjectURL(avatar) : nobody}
              alt="avatar"
            />
            <label htmlFor="avatar-picture">
              <FontAwesomeIcon icon="upload" />
              <br />
              Upload image
            </label>
            <input
              type="file"
              style={{ display: "none" }}
              id="avatar-picture"
              accept="image/*"
              onChange={(event) => {
                if (event.target.files.length > 0) {
                  setAvatar(event.target.files[0]);
                }
              }}
            />
            {avatar && (
              <label
                onClick={() => {
                  setAvatar(null);
                }}
              >
                Delete image
              </label>
            )}
          </div>
        </div>

        {/* SUBMIT */}
        {!isBusy && (
          <button type="submit" className="submit">
            Register
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
export default SignUp;
