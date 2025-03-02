"use client"; // Allowing the use of React hooks

import { Field, Input, InputProps, Stack } from "@chakra-ui/react";
import { PasswordInput, PasswordStrengthMeter } from "../ui/password-input";

import { Checkbox } from "../ui/checkbox";
import { Field as CustomField } from "@/components/ui/field";

interface CustomInputProps extends InputProps {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  helperText?: string;
}

const InputComponent: React.FC<CustomInputProps> = ({
  label,
  value,
  onChange,
  required,
  checked,
  helperText,
  placeholder,
  mt = 4,
  type,
  ...rest
}) => {
  return (
    <CustomField mt={mt} label={label} helperText={helperText}>
      {type === "password" ? (
        <Stack w={"100%"}>
          <PasswordInput
            p={2}
            border={"1px solid lightgray"}
            _focus={{
              border: "1px solid gray",
            }}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            {...rest}
          />
          <PasswordStrengthMeter value={value?.toString()?.length || 0} />
        </Stack>
      ) : type === "checkbox" ? (
        <Checkbox
          checked={checked}
          inputProps={{
            onChange,
          }}
        />
      ) : (
        <Input
          p={2}
          border={"1px solid lightgray"}
          _focus={{
            border: "1px solid gray",
          }}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          {...rest}
        />
      )}
    </CustomField>
  );
};

export default InputComponent;
