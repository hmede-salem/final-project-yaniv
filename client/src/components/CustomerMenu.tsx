import {
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import ContactUs from "./ContactUs";
import { useDispatch } from "react-redux";
import { persistor, store } from "../state/store";

const CustomerMenu = () => {
  const dispatch = useDispatch();
  const firstName = sessionStorage.getItem("firstName");
  const role = sessionStorage.getItem("role");
  const navigate = useNavigate();
  return (
    <>
      <Menu>
        <MenuButton
          px={4}
          py={2}
          transition="all 0.3s"
          borderRadius="md"
          borderWidth="1px"
          _hover={{ bg: "gray.400" }}
          _expanded={{ bg: "gray.400" }}
        >
          <Text
            width={"140px"}
            fontFamily={"sans-serif"}
            fontWeight={"bold"}
            fontSize={19}
          >
            {`Hello ${firstName}`} <HamburgerIcon />
          </Text>
        </MenuButton>
        <MenuList padding={1}>
          {role === "admin" ? (
            <Button
              w={"100%"}
              colorScheme={"gray"}
              onClick={() => navigate("administration")}
            >
              Adminstraion
            </Button>
          ) : (
            <>
              <Button colorScheme={"gray"} w={"100%"}>
                Shopping History
              </Button>
              <ContactUs />
            </>
          )}
          <MenuDivider />
          <Button
            onClick={() => {
              store.dispatch({ type: "LOGOUT" });
              persistor.purge();
              // localStorage.clear();
              navigate("/login");
              // sessionStorage.clear();
            }}
            colorScheme={"red"}
            w={"100%"}
          >
            Logout
          </Button>
        </MenuList>
      </Menu>
    </>
  );
};

export default CustomerMenu;
