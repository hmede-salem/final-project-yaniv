import {
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { selectSearch } from "../state/products/productsSlice";
import { useDispatch } from "react-redux";
import { FaSearch } from "react-icons/fa";

const SearchInput = () => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (ref.current) {
      dispatch(selectSearch(ref.current.value));
      navigate("/home");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup>
        <Input
          width={"100%"}
          ref={ref}
          borderRadius={17}
          placeholder="Search product..."
          variant={"filled"}
        />
        <InputRightElement>
          <IconButton
            type="submit"
            aria-label="Search"
            icon={<FaSearch />}
            variant="unstyled"
          />
        </InputRightElement>
      </InputGroup>
    </form>
  );
};

export default SearchInput;
