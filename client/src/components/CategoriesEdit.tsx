import { Button, Input } from "@chakra-ui/react";
import { useRef } from "react";
import Category from "../entities/Category";
import { useDispatch, useSelector } from "react-redux";
import deleteCategory from "../hooks/deleteCategory";
import { fetchCategoriesData } from "../state/categories/categoriesSlice";
import { AppDispatch, RootState } from "../state/store";

const CategoriesEdit = () => {
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );
  const catName = useRef<string>("");

  const handleDelete = () => {};

  return (
    <div style={{ width: "50%" }}>
      <label style={{ fontWeight: "bolder" }}>Categories</label>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 15,
          justifyContent: "flex-start",
        }}
      >
        {!categories ? (
          <h2>No categories</h2>
        ) : (
          categories.map((cat) => <CategoryCard key={cat.id} data={cat} />)
        )}
      </div>
      <div style={{ margin: "10px 0px", display: "flex" }}>
        <Input
          flex={0.4}
          onInput={(e: any) => (catName.current = e.target.value)}
          style={{ border: "1px solid grey" }}
          placeholder="add cat"
        />
        <Button marginLeft={10}>Add</Button>
      </div>
    </div>
  );
};

export default CategoriesEdit;

const CategoryCard: React.FC<{ data: Category }> = ({ data }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = async () => {
    const response = await deleteCategory(data._id);
    if (response.data.success) {
      dispatch(fetchCategoriesData());
    }
  };

  return (
    <div
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
      <label style={{ flex: 0.3 }}>{data.category}</label>
      <div
        style={{
          flex: 0.5,
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <Button>Update</Button>
        <Button onClick={handleDelete}>Delete</Button>
      </div>
    </div>
  );
};
