import { Box, Button, Input } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import Category from "../entities/Category";
import { useDispatch, useSelector } from "react-redux";
import deleteCategory from "../hooks/deleteCategory";
import { fetchCategoriesData } from "../state/categories/categoriesSlice";
import { AppDispatch, RootState } from "../state/store";
import addCategory from "../hooks/addCategory";
import updateCategory from "../hooks/updateCategory";

const defaultCategoryImage: string =
  "https://img.icons8.com/?size=160&id=bJIfhsuTzM2A&format=png";

const CategoriesEdit = () => {
  const dispatch = useDispatch<AppDispatch>();

  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );

  const [newCatName, setNewCatName] = useState<string>("");
  const [newCatImage, setNewCatImage] = useState<string>("");

  const handleAdd = async () => {
    const response = await addCategory(
      newCatName,
      newCatImage || defaultCategoryImage
    );
    if (response.data.success) {
      dispatch(fetchCategoriesData());
    }
    setNewCatName("");
    setNewCatImage("");
  };

  const categoriesRender = useMemo(
    () =>
      categories?.map((cat, index) => <CategoryCard key={index} data={cat} />),
    [categories]
  );

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
    >
      <Box width="50%">
        <label style={{ fontWeight: "bolder", marginBottom: "1rem" }}>
          Categories
        </label>
        <Box display="flex" flexDirection="column" gap="1rem">
          {!categories ? <h2>No categories</h2> : categoriesRender}
        </Box>
        <Box display="flex" marginTop="1rem">
          <Input
            flex={0.4}
            value={newCatName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewCatName(e.target.value)
            }
            style={{ border: "1px solid grey" }}
            placeholder="Category name.."
          />
          <Input
            flex={0.4}
            value={newCatImage}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewCatImage(e.target.value)
            }
            style={{ border: "1px solid grey", marginLeft: "1rem" }}
            placeholder="Category image URL.."
          />
          <Button onClick={handleAdd} marginLeft="1rem">
            Add
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CategoriesEdit;

const CategoryCard: React.FC<{ data: Category }> = ({ data }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [updating, setUpdating] = useState<boolean>(false);
  const [categoryName, setCategoryName] = useState<string>(data.category);
  const [categoryImage, setCategoryImage] = useState<string>(data.image);

  const handleDelete = async () => {
    const response = await deleteCategory(data._id);
    if (response.data.success) {
      dispatch(fetchCategoriesData());
    }
  };

  const handleCatUpdate = async () => {
    if (updating) {
      const response = await updateCategory(
        categoryName,
        categoryImage,
        data._id
      );
      if (response.data.success) {
        dispatch(fetchCategoriesData());
      }
      setUpdating(false);
      return;
    }
    setUpdating(true);
  };

  return (
    <Box
      style={{
        padding: "10px",
        border: "1px solid black",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      {!updating ? (
        <Box style={{ width: "50%" }}>
          <label>{data.category}</label>
          <img
            src={data.image}
            alt={""}
            style={{ width: 48, height: 48, borderRadius: "50%" }}
          />
        </Box>
      ) : (
        <Box style={{ width: "50%" }}>
          <Input
            defaultValue={data.category}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCategoryName(e.target.value)
            }
          />
          <Input
            defaultValue={data.image}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCategoryImage(e.target.value)
            }
          />
        </Box>
      )}
      <Box>
        <Button onClick={handleCatUpdate}>
          {updating ? "Save" : "Update"}
        </Button>
        <Button onClick={handleDelete} marginLeft="1rem">
          Delete
        </Button>
      </Box>
    </Box>
  );
};
