import {
  Badge,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { TbShoppingBag } from "react-icons/tb";
// import useCart from "../hooks/useCart";
import Cart from "./Cart";
import { useNavigate } from "react-router-dom";
import {  useSelector } from "react-redux";
import { RootState } from "../state/store";

const CartLogo = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { cart } = useSelector((state: RootState) => state.cart);

  const navigate = useNavigate();
  const itemscount = cart.reduce((subTotal: number, item) => {
    return (subTotal += item.count);
  }, 0);

  return (
    <>
      <Button
        _hover={{ bg: "gray.300" }}
        borderRadius={10}
        px={4}
        py={2}
        onClick={onOpen}
      >
        <HStack>
          <Icon as={TbShoppingBag} boxSize={"25px"} />
          {cart.length && (
            <Badge
              border={"1px"}
              borderRadius={10}
              fontSize={"10px"}
              marginLeft={-5}
              marginBottom={5}
              colorScheme={"green"}
            >
              {itemscount}
            </Badge>
          )}
        </HStack>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size={"3xl"}>
        <ModalOverlay backdropFilter="blur(7px)" />
        <ModalContent margin={2}>
          <ModalHeader fontSize={30}>
            {cart.length > 0 ? "Your Cart:" : "Your cart is empty."}
          </ModalHeader>
          <ModalBody>{cart.length > 0 ? <Cart cart={cart} /> : null}</ModalBody>
          <ModalFooter>
            <Button
              colorScheme="black"
              variant={"ghost"}
              mr={4}
              onClick={onClose}
            >
              Close
            </Button>
            <Button
              isDisabled={cart.length ? false : true}
              onClick={() => {
                navigate("checkout");
                onClose();
              }}
              colorScheme="blue"
            >
              Checkout
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CartLogo;
