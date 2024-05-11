import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useEffect } from "react";

interface Props {
  message: string;
  info: Boolean ;
  setInfo: (info: Boolean) => void;
  form: string;
}

const InfoResult = ({ info, setInfo, message,form }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    info ? onOpen() : onClose();
  }, [info]);
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
          <Flex
            justifyContent={"center"}
            alignSelf={"center"}
            bg={"red.500"}
            boxSize={"55px"}
            rounded={"50px"}
          >
            <CloseIcon alignSelf={"center"} boxSize={"20px"} color={"white"} />
          </Flex>

          <ModalHeader>Your {form} request has been denied</ModalHeader>
          <ModalBody color={"gray.600"}>{message}</ModalBody>
          <ModalFooter>
            <Button colorScheme={"blackAlpha"} onClick={() => setInfo(false)}>
              Try Again
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default InfoResult;
