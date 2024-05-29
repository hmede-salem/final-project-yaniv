import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const ProductcardContainer = ({ children }: Props) => {
  return (
    <Box
      borderRadius={10}
      boxShadow={"dark-lg"}
      overflow={"hidden"}
      width="100%"
      _hover={{
        transform: "scale(1.05)",
        transition: "transform 0.2s ease-in-out",
      }}
    >
      {children}
    </Box>
  );
};

export default ProductcardContainer;
