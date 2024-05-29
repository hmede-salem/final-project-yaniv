import { Badge, Button } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Product from "../entities/Product";
import modifyCartItem from "../hooks/modifyCartItem";
import { setData } from "../state/cart/cartSlice";

interface Props {
  product: Product;
}

const PriceBadge = ({ product }: Props) => {
  const dispatch = useDispatch();

  const handleModifyItem = async (implementation: string) => {
    const response = await modifyCartItem(product._id, implementation);
    if (response.data.success) {
      dispatch(setData(response.data.newCart));
    }
  };
  const [mouseover, setMouseover] = useState(false);
  return (
    <Badge
      colorScheme={"blue"}
      style={{ display: "flex" }}
      fontSize="20px"
      paddingX={3}
      marginY={1}
      borderRadius={5}
      onMouseOver={() => setMouseover(true)}
      onMouseLeave={() => setMouseover(false)}
    >
      $ {product.price}
      {mouseover && (
        <Button
          style={{ margin: "auto", marginLeft: "10px" }}
          colorScheme="cyan"
          variant="ghost"
          size="sm"
          padding={0}
          marginLeft={2}
          height={6}
          onClick={() => handleModifyItem("increment")}
        >
          Add to cart
        </Button>
      )}
    </Badge>
  );
};

export default PriceBadge;
