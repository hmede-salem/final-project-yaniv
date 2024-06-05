import { Badge, Button, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Product from "../entities/Product";
import modifyCartItem from "../hooks/modifyCartItem";
import { setData } from "../state/cart/cartSlice";

interface Props {
  product: Product;
  inDiscount: boolean;
}

const PriceBadge = ({ product, inDiscount }: Props) => {
  const dispatch = useDispatch();

  const handleModifyItem = async (implementation: string) => {
    const response = await modifyCartItem(product._id, implementation);
    if (response.data.success) {
      dispatch(setData(response.data.newCart));
    }
  };
  const [mouseover, setMouseover] = useState(false);
  const role = sessionStorage.getItem("role");
  return (
    <Badge
      colorScheme={"blue"}
      style={{
        display: "flex",
      }}
      fontSize="20px"
      paddingX={3}
      marginY={1}
      borderRadius={5}
      onMouseOver={() => setMouseover(true)}
      onMouseLeave={() => setMouseover(false)}
    >
      <Text
        as={"span"}
        style={{
          textDecoration: inDiscount ? "line-through" : "none",
          textDecorationColor: "red",
          textDecorationThickness: "0.25rem",
        }}
      >
        $ {product.price}
      </Text>
      {mouseover && role ==="customer" && (
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
