import { Card, CardBody, Image, Heading, HStack } from "@chakra-ui/react";
import RatingBadge from "./RatingBadge";
import PriceBadge from "./PriceBadge";
import { useState } from "react";
import Product from "../entities/Product";
import { Link, useNavigate } from "react-router-dom";
import saleLogo from "../assets/sale-tag.webp";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const navigate = useNavigate();
  const [mouseOver, setMouseOver] = useState(0);
  return (
    <Card
      onMouseOver={() => setMouseOver(1)}
      onMouseOut={() => setMouseOver(0)}
      alignItems={"center"}
      style={{ height: "100%" }}
    >
      {product.discountPercentage ? (
        <span
          style={{
            width: "20%",
            textAlign: "center",
            position: "absolute",
            top: 10,
            left: 10,
          }}
        >
          <Image src={saleLogo} />
        </span>
      ) : null}
      <Image
        src={product.images[mouseOver]}
        boxSize={400}
        objectFit={"contain"}
        onClick={() => navigate(`products/${product.id}`)}
      />
      <CardBody width={"100%"}>
        <Link to={`products/${product.id}`}>
          <Heading fontSize={"xl"}>{product.title}</Heading>
        </Link>
        <HStack justifyContent={"space-between"}>
          <PriceBadge product={product} />
          <RatingBadge rating={product.rating} />
        </HStack>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
