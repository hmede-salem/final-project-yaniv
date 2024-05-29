import { SimpleGrid, Text } from "@chakra-ui/react";
import Product from "../entities/Product";
import DefinitionItem from "./DefinitionItem";
import Price from "./Price";
import RatingBadge from "./RatingBadge";

interface Props {
  product: Product;
}

const ProductDetail = ({ product }: Props) => {
  return (
    <SimpleGrid columns={3} spacing={20} as="dl">
      <DefinitionItem term={"Price"}>
        <Price product={product} />
      </DefinitionItem>
      <DefinitionItem term={"Brand"}>
        <Text fontWeight={"bold"} color={"gray.600"}>
          {product.brand}
        </Text>
      </DefinitionItem>
      <DefinitionItem term={"Rating"}>
        <RatingBadge rating={product.rating} />
      </DefinitionItem>
    </SimpleGrid>
  );
};

export default ProductDetail;
