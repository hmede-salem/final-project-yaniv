import { Badge } from "@chakra-ui/react";

interface Props {
  rating: number;
}

const RatingBadge = ({ rating }: Props) => {
  let color = rating >= 4.5 ? "green" : rating > 4 ? "linkedin" : "yellow";
  return (
    <Badge colorScheme={color} fontSize="14px" paddingX={1} borderRadius={4}>
      {rating}
    </Badge>
  );
};

export default RatingBadge;
