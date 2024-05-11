import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface Props {
  success: Boolean;
}

const SuccessResult = ({ success }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  useEffect(() => {
    success ? onOpen() : onClose();
  }, [success]);

  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <ModalOverlay />
        <ModalContent textAlign="center" py={10} px={6}>
          <CheckCircleIcon
            alignSelf={"center"}
            boxSize={"50px"}
            color={"green.500"}
          />
          <ModalHeader>You Have Successfully Registered</ModalHeader>
          <ModalBody color={"gray.600"}>
            Thanks for signing up. Welcome to our community. We are happy to
            have you on board.
          </ModalBody>
          <ModalFooter>
            <Button colorScheme={"blue"} onClick={() => navigate("/login")}>
              Login Page
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SuccessResult;
