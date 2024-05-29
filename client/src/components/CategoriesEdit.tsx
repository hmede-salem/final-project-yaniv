import { Box, Button, Input } from "@chakra-ui/react";
import { useMemo, useRef, useState } from "react";
import Category from "../entities/Category";
import { useDispatch, useSelector } from "react-redux";
import deleteCategory from "../hooks/deleteCategory";
import { fetchCategoriesData } from "../state/categories/categoriesSlice";
import { AppDispatch, RootState } from "../state/store";
import addCategory from "../hooks/addCategory";
import updateCategory from "../hooks/updateCategory";

const CategoriesEdit = () => {
  const dispatch = useDispatch<AppDispatch>();

  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );

  const [newCatName, setNewCatName] = useState<string>("");

  const handleAdd = async () => {
    const response = await addCategory(newCatName);
    if (response.data.success) {
      dispatch(fetchCategoriesData());
    }
    setNewCatName("");
  };

  const categoriesRender = useMemo(
    () =>
      categories?.map((cat, index) => <CategoryCard key={index} data={cat} />),
    [categories]
  );

  return (
    <Box style={{ width: "50%" }}>
      <label style={{ fontWeight: "bolder" }}>Categories</label>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 15,
          justifyContent: "flex-start",
        }}
      >
        {!categories ? <h2>No categories</h2> : categoriesRender}
      </div>
      <div style={{ margin: "10px 0px", display: "flex" }}>
        <Input
          flex={0.4}
          value={newCatName}
          onInput={(e: any) => setNewCatName(e.target.value)}
          style={{ border: "1px solid grey" }}
          placeholder="Category name.."
        />
        <Button onClick={handleAdd} marginLeft={10}>
          Add
        </Button>
      </div>
    </Box>
  );
};

export default CategoriesEdit;

const CategoryCard: React.FC<{ data: Category }> = ({ data }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [updating, setUpdating] = useState<boolean>(false);
  const [categoryName, setCategoryName] = useState<string>(data.category);

  const handleDelete = async () => {
    const response = await deleteCategory(data._id);
    if (response.data.success) {
      dispatch(fetchCategoriesData());
    }
  };

  const handleCatUpdate = async () => {
    if (updating) {
      const response = await updateCategory(categoryName, data._id);
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
        padding: 10,
        border: "1px solid black",
        borderRadius: 10,
        display: "flex",
        justifyContent: "flex-start",
        gap: 30,
        height: 50,
        alignItems: "center",
      }}
    >
      {!updating ? (
        <label style={{ width: "25%" }}>{data.category}</label>
      ) : (
        <Input
          style={{ width: "25%" }}
          defaultValue={data.category}
          onInput={(e: any) => setCategoryName(e.target.value)}
        />
      )}
      <div
        style={{
          flex: 0.5,
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <Button onClick={handleCatUpdate}>Update</Button>
        <Button onClick={handleDelete}>Delete</Button>
      </div>
    </Box>
  );
};
