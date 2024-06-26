import {
  Box,
  Button,
  Heading,
  Image,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import useProduct from "../hooks/useProduct";
import { useParams } from "react-router-dom";
import ProductDetail from "../components/ProductDetail";
import modifyCartItem from "../hooks/modifyCartItem";
import { useDispatch } from "react-redux";
import { fetchCartData } from "../state/cart/cartSlice";
import { AppDispatch } from "../state/store";

const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const { data: product, isLoading, error } = useProduct(id!);
  const role = sessionStorage.getItem("role");

  const handleModifyItem = async () => {
    if (product) {
      const response = await modifyCartItem(product._id, "increment");
      if (response.data.success) {
        dispatch(fetchCartData());
      }
    }
  };

  if (isLoading) return <Spinner />;
  if (error) return <Text>{error.message}</Text>;

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
      <Box>
        <Heading>{product.title}</Heading>
        &nbsp;
        <Text fontSize={"xl"}>{product.description}</Text>
        &nbsp;
        <Text fontSize={"sm"}>{product.details}</Text>
        <ProductDetail product={product} />
        {role === "customer" && (
          <Button
            size={"lg"}
            transform={"scale(1.7)"}
            marginTop={3}
            marginLeft={20}
            color={"blackAlpha.900"}
            onClick={handleModifyItem}
          >
            Add To Bag
          </Button>
        )}
      </Box>
      <Box>
        <SimpleGrid spacing={2} columns={{ base: 1, md: 2 }}>
          {product.images.map((image) => (
            <Image key={image} src={image}></Image>
          ))}
        </SimpleGrid>
      </Box>
    </SimpleGrid>
  );
};

export default ProductPage;
