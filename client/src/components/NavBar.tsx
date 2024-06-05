import { Box, HStack, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import CartLogo from "./CartLogo";
import ColorModeSwitch from "./ColorModeSwitch";
import CustomerMenu from "./CustomerMenu";
import SearchInput from "./SearchInput";
import logo from "../assets/mainIcon.webp";

const NavBar = () => {
  const role = sessionStorage.getItem("role");

  return (
    <Box>
      <HStack padding={"10px"}>
        <Link to={"/home"}>
          <Image
            src={
              "https://cdn0.iconfinder.com/data/icons/online-shopping-and-e-commerce-3/100/shop-08-1024.png"
            }
            alt={logo}
            boxSize="60px"
            objectFit={"cover"}
          />
        </Link>
        <SearchInput />
        <CustomerMenu />
        {role === "customer" ? <CartLogo /> : null}
        <ColorModeSwitch />
      </HStack>
    </Box>
  );
};

export default NavBar;
