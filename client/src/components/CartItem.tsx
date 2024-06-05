import {
  Box,
  Grid,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import Product from "../entities/Product";
import Price from "./Price";
import ItemCount from "./ItemCount";
import { useDispatch } from "react-redux";
import { fetchCartData } from "../state/cart/cartSlice";
import deleteCartItem from "../hooks/deleteCartItem";
import { AppDispatch } from "../state/store";

interface Props {
  product: Product;
  count: number;
}

const CartItem = ({ product, count }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteItem = async () => {
    const response = await deleteCartItem(product._id || "");
    if (response.data.success) {
      dispatch(fetchCartData());
    }
  };

  return (
    <Grid>
      <HStack justifyContent={"space-evenly"} padding={5}>
        <Image
          src={product.images[1]}
          height={40}
          width={28}
          objectFit={"cover"}
          borderRadius={12}
        />
        <Box>
          <Heading maxWidth={"150px"} fontSize={"20px"}>
            {product.title}
          </Heading>
          <Text marginTop={1} fontSize={"12px"}>
            {product.brand}
          </Text>
          <br />
          <Text fontSize={"12px"}>add gift wrapping</Text>
        </Box>
        <Price product={product} />
        <ItemCount product={product} count={count} />
        <IconButton
          colorScheme={"gray"}
          aria-label="delete-item"
          icon={<CloseIcon color={"black"} boxSize={4} />}
          onClick={handleDeleteItem}
        />
      </HStack>
    </Grid>
  );
};

export default CartItem;
