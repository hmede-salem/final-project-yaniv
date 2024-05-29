import { Button, HStack, Image, List, ListItem } from "@chakra-ui/react";
import Category, { allCategories } from "../entities/Category";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { selectCategory } from "../state/products/productsSlice";

const CategoriesList = () => {
  const dispatch = useDispatch();

  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );
  const selectedCategory = useSelector(
    (state: RootState) => state.products.selectedCategory
  );

  return (
    <List>
      <ListItem>
        <HStack>
          <Image boxSize="32px" borderRadius={1} src={allCategories.image} />
          <Button
            onClick={() => dispatch(selectCategory(allCategories))}
            fontSize={"lg"}
            variant={"link"}
            fontWeight={
              selectedCategory.id === allCategories.id ? "bold" : "normal"
            }
          >
            {allCategories.category}
          </Button>
        </HStack>
      </ListItem>
      {categories?.map((cat: Category) => (
        <ListItem key={cat.id} paddingY={"5px"}>
          <HStack>
            <Image boxSize="32px" borderRadius={1} src={cat.image} />
            <Button
              onClick={() => dispatch(selectCategory(cat))}
              fontSize={"lg"}
              variant={"link"}
              fontWeight={selectedCategory.id === cat.id ? "bold" : "normal"}
            >
              {cat.category}
            </Button>
          </HStack>
        </ListItem>
      ))}
    </List>
  );
};

export default CategoriesList;
