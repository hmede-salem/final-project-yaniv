import { HStack, Text } from "@chakra-ui/react";
import Product from "../entities/Product";

interface Props {
  product: Product;
}
const Price = ({ product }: Props) => {
  if (product.discountPercentage) {
    const newPrice = Math.floor(
      product.price - product.price * (product.discountPercentage / 100)
    );
    return (
      <HStack>
        <Text as={"s"} fontWeight={"semibold"} fontSize={20} color={"gray.300"}>
          ${product.price}
        </Text>
        <Text fontWeight={"semibold"} fontSize={35} color={"green.500"}>
          ${newPrice}
        </Text>
      </HStack>
    );
  } else {
    return (
      <Text fontWeight={"semibold"} fontSize={25} color={"gray.600"}>
        ${product.price}
      </Text>
    );
  }
};

export default Price;
