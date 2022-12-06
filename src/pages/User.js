import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// component
import IsLoading from "../components/IsLoading";

// style
import "../style/user.css";

// functions
import { checkEmail } from "../functions/utils";
import handleUser from "../functions/handleUser";

import nobody from "../img/Unknown_person.jpg";

const User = ({ user, setUser }) => {
  // STATES
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [newAvatarPicture, setNewAvatarPicture] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [message, setMessage] = useState({ text: "", color: "black" });
  const [isBusy, setIsBusy] = useState(false);

  const [onlyFirstTime, setOnlyFirstTime] = useState(true);

  // function
  const handleUpdateUser = async (event) => {
    event.preventDefault();
    setMessage({ text: "", color: "black" });
    if (!email || !isEmailValid) {
      setMessage({
        text: "Please enter valid Email",
        color: "red",
      });
      return;
    }
    setIsBusy(true);
    const save = await handleUser(
      "save",
      {
        token: user.token,
        email: email,
        username: username,
        avatar: newAvatarPicture,
      },
      setUser
    );
    if (save === "ok") {
      setNewAvatarPicture(null);
      setMessage({
        text: `${user.username}, your account is updated !`,
        color: "green",
      });
      setTimeout(() => {
        setMessage({ text: "", color: "black" });
      }, 1000);
      setIsBusy(false);
    } else {
      setMessage({ text: save, color: "red" });
    }
    setIsBusy(false);
  };

  // UseEffect
  useEffect(() => {
    const waitForEmail = async () => {
      const mail = await handleUser("load", user, setUser);
      setUsername(user.username);
      setEmail(mail);
      setAvatar(user.avatar);
      setIsLoading(false);
    };
    if (onlyFirstTime) {
      waitForEmail();
      setOnlyFirstTime(false);
    }
  }, [user, setUser, onlyFirstTime]);

  return (
    <div className="container">
      {user.token ? (
        <>
          {isLoading ? (
            <IsLoading />
          ) : (
            <div className="user-account">
              <form onSubmit={handleUpdateUser}>
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

                {/* AVATAR */}
                <div className="avatar">
                  <h4>Avatar</h4>
                  <div className="avatar-container">
                    <img src={avatar ? avatar : nobody} alt="avatar" />
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
                          setNewAvatarPicture(event.target.files[0]);
                          setAvatar(URL.createObjectURL(event.target.files[0]));
                        }
                      }}
                    />
                    {avatar && (
                      <label
                        onClick={() => {
                          setAvatar(null);
                          if (user.avatar) {
                            setNewAvatarPicture("delete");
                          }
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
                    Update
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
          )}
        </>
      ) : (
        <Navigate to="/" />
      )}
    </div>
  );
};

export default User;
