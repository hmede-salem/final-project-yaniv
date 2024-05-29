import {
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderMark,
  RangeSliderThumb,
  RangeSliderTrack,
  Text,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { selectRange } from "../state/products/productsSlice";
import { RootState } from "../state/store";

const PriceRange = () => {
  const currentRange = useSelector((state: RootState) => state.products.range);
  const dispatch = useDispatch();
  return (
    <>
      <Text fontSize={"lg"} fontWeight="bold">
        Price Range:
      </Text>
      <RangeSlider
        defaultValue={[1, 2500]}
        min={1}
        max={2500}
        step={5}
        onChange={(val) => dispatch(selectRange({ min: val[0], max: val[1] }))}
      >
        <RangeSliderTrack bg={"green.700"}>
          <RangeSliderFilledTrack bg={"green.200"} />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} bg={"green.500"} />
        <RangeSliderMark
          value={currentRange.min}
          textAlign="center"
          bg="blue.500"
          color="white"
          mt="3"
          ml="-5"
          w="10"
          borderRadius="10"
        >
          {currentRange.min}
        </RangeSliderMark>
        <RangeSliderMark
          value={currentRange.max}
          textAlign="center"
          bg="blue.500"
          color="white"
          mt="3"
          ml="-5"
          w="10"
          borderRadius="10"
        >
          {currentRange.max}
        </RangeSliderMark>
        <RangeSliderThumb index={1} bg={"green.500"} />
      </RangeSlider>
    </>
  );
};

export default PriceRange;
