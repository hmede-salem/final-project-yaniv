import {
  Grid,
  GridItem,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  IconButton,
  useDisclosure,
  useBreakpointValue,
  Button,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import CategoriesList from "../components/CategoriesList";
import PriceRange from "../components/PriceRange";
import ProductsGrid from "../components/ProductsGrid";

const HomePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, lg: false });

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
      <GridItem area="main">
        <ProductsGrid />
      </GridItem>
      {isMobile ? (
        <>
          <Button
            aria-label="Menu"
            onClick={onOpen}
            position="fixed"
            bottom={4}
            right={4}
            zIndex={10}
            bg="blue.500"
            boxShadow="lg"
            size="lg"
            color="white"
          >
            Filter Products
          </Button>
          <Drawer placement="top" isOpen={isOpen} onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Filter Options</DrawerHeader>
              <DrawerBody>
                <CategoriesList />
                <PriceRange />
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
      ) : (
        <GridItem area="aside" paddingX={5}>
          <CategoriesList />
          &nbsp;
          <PriceRange />
        </GridItem>
      )}
    </Grid>
  );
};

export default HomePage;
