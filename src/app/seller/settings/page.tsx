"use client";

// src/app/seller/settings/page.tsx
import { Box, Heading } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";

import ButtonComponent from "@/components/Buttons/Button";
import InputComponent from "@/components/Inputs/CustomInputField";
import axiosInstance from "@/app/_utils/axiosInstance";
import { businessSchemaValidator } from "@/app/_validators/userValidator";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const BusinessSettingsPage = () => {
  const [businessDetails, setBusinessDetails] = useState({
    businessName: "",
    businessPhone: "",
    businessAddress: "",
    aboutUs: "",
    keywords: "",
    userId: "", // Add userId to reference business to user
  });
  const session = useSession();
  console.log(
    session,
    "(session?.data?.user as any)?.id;",
    (session?.data?.user as any)?.id
  );
  const userId = (session?.data?.user as any)?.id;
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: any) => {
      const response = await axiosInstance.post("/api/business", data);
      return response.data;
    },
    onSuccess: () => {
      console.log("Business details updated successfully:");
    },
    onError: (error) => {
      console.error("Error updating business details:", error);
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBusinessDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /*************  ✨ Codeium Command 🌟  *************/
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
        const validatedData = await businessSchemaValidator.validateAsync({
          ...userId,
          ...businessDetails,
        });
        mutate(validatedData);
      } catch (error) {
        console.error("Error validating business details:", error);
      }
    },
    [businessDetails, mutate, userId]
  );

  return (
    <Box p={5}>
      <Heading>Business Settings</Heading>
      <form onSubmit={handleSubmit}>
        <InputComponent
          label="Business Name"
          name="businessName"
          placeholder="Enter Business Name"
          value={businessDetails.businessName}
          onChange={handleInputChange}
          required
        />
        <InputComponent
          label="Business Phone"
          name="businessPhone"
          placeholder="Enter Business Phone"
          value={businessDetails.businessPhone}
          onChange={handleInputChange}
          required
        />
        <InputComponent
          label="Business Address"
          name="businessAddress"
          placeholder="Enter Business Address"
          value={businessDetails.businessAddress}
          onChange={handleInputChange}
          required
        />
        <InputComponent
          type="textarea"
          label="About Us"
          name="aboutUs"
          placeholder="Enter About Us"
          value={businessDetails.aboutUs}
          onChange={handleInputChange}
        />
        <InputComponent
          label="Keywords"
          name="keywords"
          placeholder="Enter Keywords"
          value={businessDetails.keywords}
          onChange={handleInputChange}
        />
        <ButtonComponent
          float={"right"}
          mt={8}
          className="gradient-btn"
          type="submit"
          loading={isPending}
        >
          Update
        </ButtonComponent>
      </form>
    </Box>
  );
};

export default BusinessSettingsPage;
