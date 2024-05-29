import { Grid, GridItem, Show } from "@chakra-ui/react";
import CategoriesList from "../components/CategoriesList";
import PriceRange from "../components/PriceRange";
import ProductsGrid from "../components/ProductsGrid";

const HomePage = () => {
  return (
    <Grid
      templateAreas={{
        base: `"main"`,
        lg: `"aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "230px 1fr",
      }}
    >
      <Show above="lg">
        <GridItem area="aside" paddingX={5}>
          <CategoriesList />
          &nbsp;
          <PriceRange />
        </GridItem>
      </Show>
      <GridItem area="main">
        <ProductsGrid />
      </GridItem>
    </Grid>
  );
};

export default HomePage;
