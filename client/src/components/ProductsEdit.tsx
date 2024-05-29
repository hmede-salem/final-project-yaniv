import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Spinner,
  Text,
} from "@chakra-ui/react";
import Product, { newProduct } from "../entities/Product";
import useProducts from "../hooks/useProducts";
import ProductForm from "./ProductForm";

const ProductsEdit = () => {
  const { data: products, error, isLoading } = useProducts("", "all");
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (error) return <Text>{error.message}</Text>;
  if (isLoading) return <Spinner size={"xl"} />;

  return (
    <>
      {products.map((p: Product) => (
        <ProductForm key={p.id} product={p} />
      ))}
      <Button onClick={onOpen}>Add Product</Button>
      <Modal
        closeOnOverlayClick={false}
        size={"xl"}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent>
          <ModalHeader>Add new product to your store</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ProductForm product={{ ...newProduct }} newProduct={true} />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductsEdit;
