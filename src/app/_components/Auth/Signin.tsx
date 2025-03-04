import ButtonComponent from "@/components/Buttons/Button";
import InputComponent from "@/components/Inputs/CustomInputField";
import { signIn } from "next-auth/react";
import { useState } from "react";
export const Signin = ({ isLogin }: { isLogin: boolean }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
  };
  return (
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
        {error && <div style={{ color: "red", fontSize:'12px', padding:'8px',  }}>{error}</div>}

        <div className="forms_buttons">
          <button type="button" className="forms_buttons-forgot">
            Forgot password?
          </button>
          <ButtonComponent width={"100%"} type="submit" className="btn-3d">
            Login
          </ButtonComponent>
        </div>
      </form>
    </div>
  );
};
