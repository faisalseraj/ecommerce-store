import { Radio, RadioGroup } from "@/components/ui/radio";

import ButtonComponent from "@/components/Buttons/Button";
import { Field } from "@/components/ui/field";
import InputComponent from "@/components/Inputs/CustomInputField";
import axiosInstance from "@/app/_utils/axiosInstance";
import { registerSchema } from "@/app/_validators/userValidator";
import { signIn } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export const Signup = ({ isLogin }: { isLogin: boolean }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("seller");
  const [error, setError] = useState("");

  const { mutate: registerUser, isPending } = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post("/auth/register", {
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
        role,
      });
      return response.data;
    },
    onSuccess: async () => {
      await signIn("credentials", {
        redirect: true,
        email,
        password,
      });
      window.location.href = "/products";
      console.log("User registered successfully!");
    },
    onError: () => {
      console.log("Failed to create user!");
    },
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await registerSchema.validateAsync({
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
        role,
      });

      await registerUser();
    } catch (error: any) {
      setError(error.message);
    }
  };
  return (
    <div className={`user_forms-signup ${!isLogin ? "visible" : "hidden"}`}>
      <h2 className="forms_title">Register yourself</h2>
      <form className="forms_form" onSubmit={handleSubmit}>
        <fieldset className="forms_fieldset">
          <div className="forms_field flex gap-8">
            <InputComponent
              size={"sm"}
              type="text"
              label="First Name"
              placeholder="first Name"
              className="forms_field-input"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <InputComponent
              size={"sm"}
              type="text"
              label="Last Name"
              placeholder="Last Name"
              className="forms_field-input"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="forms_field flex gap-8">
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
            <InputComponent
              size={"sm"}
              type="Phone Number"
              placeholder="Phone Number"
              label="Phone Number"
              className="forms_field-input"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <div className="forms_field ">
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

          <Field
            label={"What classifies you?"}
            helperText={`You're confirming that you will ${
              role === "buyer" ? "Buy" : "sell"
            } items`}
          >
            <RadioGroup
              //   onChange={(value) => {debugger}}
              value={role}
              colorPalette={"green"}
              spaceX="8"
            >
              <Radio value="buyer" onClick={() => setRole("buyer")}>
                I am a Buyer
              </Radio>
              <Radio value="seller" onClick={() => setRole("seller")}>
                I am a Seller
              </Radio>
            </RadioGroup>
          </Field>
        </fieldset>
        <div className="forms_buttons">
          <ButtonComponent
            loading={isPending}
            w="100%"
            type="submit"
            className="btn-3d"
          >
            Sign up
          </ButtonComponent>
        </div>
      </form>
    </div>
  );
};
