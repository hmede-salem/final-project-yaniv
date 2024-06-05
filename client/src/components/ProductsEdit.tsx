import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Spinner,
  Text,
  Image,
  Grid,
  Center,
  Card,
  Box,
} from "@chakra-ui/react";
import Product, { newProduct } from "../entities/Product";
import useProducts from "../hooks/useProducts";
import ProductForm from "./ProductForm";
import { useState } from "react";

const ProductsEdit = () => {
  const { data: products, error, isLoading, refetch } = useProducts("", "all");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  if (error) return <Text>{error.message}</Text>;
  if (isLoading)
    return (
      <Center>
        <Spinner size={"xl"} />
      </Center>
    );

  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
    onOpen();
  };

  return (
    <>
      <Grid
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        gap={6}
        p={6}
      >
        {products.map((p: Product) => (
          <Card
            key={p.id}
            borderWidth="1.5px"
            borderRadius="lg"
            borderColor="black"
            boxShadow="md"
            bg="gray.200"
            transition="all 0.3s"
            _hover={{ transform: "scale(1.05)", shadow: "lg" }}
            width="200px"
            height="300px"
            position="relative"
          >
            <Image
              src={p.images[0]}
              alt={p.title}
              boxSize="100%"
              objectFit="cover"
              borderRadius="lg"
              position="absolute"
              top="0"
              left="0"
            />
            <Text
              fontWeight="bold"
              position="absolute"
              bottom="0"
              left="0"
              right="0"
              textAlign="center"
              padding={2}
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
              bg="rgba(255, 255, 255, 0.7)"
            >
              {p.title}
            </Text>
            <Button
              variant="unstyled"
              onClick={() => handleOpenModal(p)}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="flex-end"
              p={0}
              width="100%"
              height="100%"
            />
          </Card>
        ))}
      </Grid>
      <Box position="fixed" bottom="4" right="4">
        <Button
          onClick={() => handleOpenModal({ ...newProduct })}
          size="lg"
          colorScheme="teal"
          borderRadius="full"
          boxShadow="lg"
          _hover={{ boxShadow: "xl" }}
        >
          Add Product
        </Button>
      </Box>
      <Modal
        closeOnOverlayClick={false}
        size={"xl"}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent>
          <ModalHeader>
            {selectedProduct?.title || "Add new product"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedProduct && (
              <ProductForm
                product={selectedProduct}
                newProduct={!selectedProduct.id}
                refetch={() => refetch()}
                handleClose={() => onClose()}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductsEdit;
