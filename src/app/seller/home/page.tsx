"use client";

import {
  Box,
  Button,
  Field,
  Heading,
  Input,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useState } from "react";

import ButtonComponent from "@/components/Buttons/Button";
import DialogComponent from "@/components/Modal/DialogComponent";
import InputComponent from "@/components/Inputs/CustomInputField";

const BusinessSettingsPage = () => {
  return (
    <Box p={5}>
      <Heading>Business Home page dashboard items will appear here</Heading>
    </Box>
  );
};

export default BusinessSettingsPage;
