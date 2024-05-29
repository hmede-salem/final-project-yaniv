import { Input } from "@chakra-ui/react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { selectSearch } from "../state/products/productsSlice";
import { useDispatch } from "react-redux";

const SearchInput = () => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (ref.current) dispatch(selectSearch(ref.current.value));
        navigate("/home");
      }}
    >
      <Input
        width={"100%"}
        ref={ref}
        borderRadius={17}
        placeholder="Search product..."
        variant={"filled"}
      ></Input>
    </form>
  );
};

export default SearchInput;
