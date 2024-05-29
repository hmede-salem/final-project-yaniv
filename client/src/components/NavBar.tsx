import { Box, HStack, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import CartLogo from "./CartLogo";
import ColorModeSwitch from "./ColorModeSwitch";
import CustomerMenu from "./CustomerMenu";
import SearchInput from "./SearchInput";
import logo from "../assets/mainIcon.webp";

const NavBar = () => {

  return (
    <Box>
      <HStack padding={"10px"}>
        <Link to={"/home"}>
          <Image src={logo} boxSize="60px" objectFit={"cover"}></Image>
        </Link>
        <SearchInput />
        <CustomerMenu />
        <CartLogo />
        <ColorModeSwitch />
      </HStack>
    </Box>
  );
};

export default NavBar;
