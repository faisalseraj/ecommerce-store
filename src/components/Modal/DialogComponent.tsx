import { Button, CloseButton, DialogCloseTrigger } from "@chakra-ui/react";
import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface DialogProps {
  isOpen: boolean;
  onOpenChange: (details: any) => void;
  title: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "xs" | "cover" | "full";
}

const DialogComponent: React.FC<DialogProps> = ({
  isOpen,
  onOpenChange,
  title,
  children,
  size = "md",
}) => {
  return (
    <DialogRoot open={isOpen} onOpenChange={onOpenChange} size={size}>
      <DialogContent background={"white"}>
        <DialogHeader
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <DialogTitle fontSize={"24px"} fontWeight={"700"}>
            {title}
          </DialogTitle>
          <DialogCloseTrigger asChild>
            <CloseButton />
          </DialogCloseTrigger>
        </DialogHeader>
        <DialogBody>{children}</DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};

export default DialogComponent;
