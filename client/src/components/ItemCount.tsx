import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import Product from "../entities/Product";
import modifyCartItem from "../hooks/modifyCartItem";
import { useDispatch } from "react-redux";
import { fetchCartData } from "../state/cart/cartSlice";
import { AppDispatch } from "../state/store";

interface Props {
  product: Product;
  count: number;
}

const ItemCount = ({ product, count }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleModifyItem = async (implementation: string) => {
    const response = await modifyCartItem(product._id, implementation);
    if (response.data.success) {
      dispatch(fetchCartData());
    }
  };
  return (
    <NumberInput size="sm" maxW={20} defaultValue={count} max={10} min={1}>
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper
          onClick={() => {
            handleModifyItem("increment");
          }}
        />
        <NumberDecrementStepper
          onClick={() => {
            handleModifyItem("decrement");
          }}
        />
      </NumberInputStepper>
    </NumberInput>
  );
};

export default ItemCount;
