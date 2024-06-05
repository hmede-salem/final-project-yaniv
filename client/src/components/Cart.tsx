import { Box, Divider, Grid, HStack, Text } from "@chakra-ui/react";
import ICartItem from "../entities/ICartItem";
import CartItem from "./CartItem";

interface Props {
  cart: ICartItem[];
}

const Cart = ({ cart }: Props) => {
  return (
    <>
      <Grid>
        <HStack justifyContent={"space-evenly"}>
          <Text marginRight={12} fontWeight={"bold"}>
            PRODUCT
          </Text>
          <Text fontWeight={"bold"} marginRight={12}>
            PRICE
          </Text>
          <Text fontWeight={"bold"}>QTY</Text>
        </HStack>
        {cart.map((item) => (
          <Box key={item.productId.id}>
            <CartItem product={item.productId} count={item.count} />
            <Divider />
          </Box>
        ))}
      </Grid>
    </>
  );
};

export default Cart;
