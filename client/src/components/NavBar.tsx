import { Box, Button, HStack, Image } from "@chakra-ui/react";
import { Link, Navigate } from "react-router-dom";
import logo from "../assets/mainIcon.webp";
// import CartLogo from "./CartLogo";
// import ColorModeSwitch from "./ColorModeSwitch";
// import CustomerMenu from "./customerMenu";
// import SearchInput from "./SearchInput";

const admin = true;

const NavBar = () => {
  return (
    <Box>
      <HStack padding={"10px"}>
        <Link to={"/home"}>
          <Image src={logo} boxSize="60px" objectFit={"cover"}></Image>
        </Link>
        {/* <SearchInput /> */}

        {/* <CustomerMenu /> */}
        {/* <CartLogo /> */}
        {admin?<Button></Button>:null}
        {/* <ColorModeSwitch /> */}
      </HStack>
    </Box>
  );
};

export default NavBar;
