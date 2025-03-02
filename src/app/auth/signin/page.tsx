"use client";

import "./styles/style.css";

import ButtonComponent from "@/components/Buttons/Button";
import InputComponent from "@/components/Inputs/CustomInputField";
import { signIn } from "next-auth/react";
import { useState } from "react";

const SignInPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLogin) {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        window.location.href = "/";
      }
    } else {
      console.log("Sign up", { fullName, email, password });
    }
  };

  return (
    <section className="user">
      <div className="user_options-container">
        <div className="user_options-text">
          <div className={`user_options-unregistered `}>
            <h2 className="user_unregistered-title">Don't have an account?</h2>
            <p className="user_unregistered-text">
              Explore amazing features. Sign up now!
            </p>
            <button
              className="user_unregistered-signup"
              onClick={() => setIsLogin(false)}
            >
              Sign up
            </button>
          </div>

          <div className={`user_options-registered `}>
            <h2 className="user_registered-title">Have an account?</h2>
            <p className="user_registered-text">
              Welcome back! Login to continue!
            </p>
            <button
              className="user_registered-login"
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
          </div>
        </div>

        <div
          className={`user_options-forms ${
            isLogin ? "bounceRight" : "bounceLeft"
          }`}
          id="user_options-forms"
        >
          <div className={`user_forms-login ${isLogin ? "visible" : "hidden"}`}>
            <h2 className="forms_title">Login</h2>
            <form className="forms_form" onSubmit={handleSubmit}>
              <fieldset className="forms_fieldset">
                <div className="forms_field">
                  <InputComponent
                    size={"sm"}
                    label="Email"
                    placeholder="Email"
                    // className="forms_field-input"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                  />
                </div>
                <div className="forms_field">
                  <InputComponent
                    size={"sm"}
                    type="password"
                    placeholder="Password"
                    label="Password"
                    className="forms_field-input"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </fieldset>
              <div className="forms_buttons">
                <button type="button" className="forms_buttons-forgot">
                  Forgot password?
                </button>
                <ButtonComponent
                  width={"100%"}
                  type="submit"
                  className="btn-3d"
                >
                  Login
                </ButtonComponent>
              </div>
              {error && <div style={{ color: "red" }}>{error}</div>}
            </form>
          </div>

          <div
            className={`user_forms-signup ${!isLogin ? "visible" : "hidden"}`}
          >
            <h2 className="forms_title">Sign Up</h2>
            <form className="forms_form" onSubmit={handleSubmit}>
              <fieldset className="forms_fieldset">
                <div className="forms_field">
                  <InputComponent
                    size={"sm"}
                    type="text"
                    label="Full Name"
                    placeholder="Full Name"
                    className="forms_field-input"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="forms_field">
                  <InputComponent
                    size={"sm"}
                    type="email"
                    placeholder="Email"
                    label="Email"
                    className="forms_field-input"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="forms_field">
                  <InputComponent
                    size={"sm"}
                    type="password"
                    placeholder="Password"
                    label="Password"
                    className="forms_field-input"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </fieldset>
              <div className="forms_buttons">
                <ButtonComponent type="submit" className="btn-3d">
                  Sign up
                </ButtonComponent>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignInPage;
