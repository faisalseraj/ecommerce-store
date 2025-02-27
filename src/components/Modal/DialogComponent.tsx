import { DialogBody, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { Button } from "@chakra-ui/react";

interface DialogProps {
  isOpen: boolean;
  onOpenChange: (details: any) => void;
  title: string;
  children: React.ReactNode;
}

const DialogComponent: React.FC<DialogProps> = ({ isOpen, onOpenChange, title, children }) => {
  return (
    <DialogRoot open={isOpen} onOpenChange={onOpenChange}>
      {/* <DialogTrigger asChild>
        <Button colorScheme="teal">Add Product</Button>
      </DialogTrigger> */}
      <DialogContent background={'white'}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogBody>{children}</DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};

export default DialogComponent;