import { SimpleGrid, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import useProducts from "../hooks/useProducts";
import { RootState } from "../state/store";
import ProductCard from "./ProductCard";
import ProductcardContainer from "./ProductcardContainer";
import ProductCardSkeleton from "./ProductCardSkeleton";

const ProductsGrid = () => {
  const { selectedCategory, range, searchText } = useSelector(
    (state: RootState) => state.products
  );

  const {
    data: products,
    error,
    isLoading,
  } = useProducts(searchText, selectedCategory._id);

  if (error) return <Text>{error.message}</Text>;
  if (isLoading)
    return (
      <>
        {[1, 2, 3].map((s) => (
          <ProductcardContainer key={s}>
            <ProductCardSkeleton />
          </ProductcardContainer>
        ))}
      </>
    );

  const productsByRange = products.filter(
    (p) => p.price >= range.min && p.price <= range.max
  );

  return (
    <>
      <Text margin={2} fontSize={30} fontWeight={"semibold"}>
        {`${productsByRange.length} Products for ${selectedCategory.category}`}
      </Text>

      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
        padding={"10px"}
        spacing={4}
      >
        {productsByRange.map((p) => (
          <ProductcardContainer key={p.id}>
            <ProductCard product={p} />
          </ProductcardContainer>
        ))}
      </SimpleGrid>
    </>
  );
};

export default ProductsGrid;
