import NavBar from "../components/NavBar";
import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesData } from "../state/categories/categoriesSlice";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../state/store";

const Layout = () => {
  const dispatch = useDispatch<AppDispatch>();

  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );

  useEffect(() => {
    if (localStorage.getItem("token") && categories === undefined) {
      dispatch(fetchCategoriesData());
    }
  }, [localStorage.getItem("token")]);

  return (
    <>
      <NavBar />
      <Box padding={5}>
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;
