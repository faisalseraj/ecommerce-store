"use client";

import "./styles/style.css";

import ButtonComponent from "@/components/Buttons/Button";
import InputComponent from "@/components/Inputs/CustomInputField";
import { Signin } from "../_components/Auth/Signin";
import { Signup } from "../_components/Auth/Signup";
import { signIn } from "next-auth/react";
import { useState } from "react";

const SignInPage = () => {
  const [isLogin, setIsLogin] = useState(true);

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
          <Signin isLogin={isLogin} />
          <Signup isLogin={isLogin} />
        </div>
      </div>
    </section>
  );
};

export default SignInPage;
