import { useState } from "react";

// components
import Login from "./Login";
import SignUp from "./SignUp";

// style
import "../style/modalLogin.css";

const ModalLogin = ({ setModalLoginVisible, setUser }) => {
  // States
  const [form, setForm] = useState("login");

  document.body.style.overflow = "hidden";
  return (
    <div className="modalLogin-root">
      <div
        className="modalLogin"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div className="left-side">
          <h2>HappyCow</h2>
          <h3>Welcome to HappyCow !</h3>
        </div>
        <div className="right-side">
          <button
            className="close"
            onClick={() => {
              setModalLoginVisible(false);
              document.body.style.overflow = "auto";
            }}
          >
            X
          </button>
          <div className="selection">
            <p
              onClick={() => {
                setForm("login");
              }}
              className={form === "login" && "selected"}
            >
              Login
            </p>
            <p
              onClick={() => {
                setForm("signup");
              }}
              className={form === "signup" && "selected"}
            >
              Sign Up
            </p>
          </div>
          <div className="form">
            {form === "login" ? (
              <Login
                setUser={setUser}
                setModalLoginVisible={setModalLoginVisible}
              />
            ) : (
              form === "signup" && (
                <SignUp
                  setUser={setUser}
                  setModalLoginVisible={setModalLoginVisible}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalLogin;
