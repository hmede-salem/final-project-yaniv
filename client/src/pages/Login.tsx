import { Link, useNavigate } from "react-router-dom";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import signIn from "../hooks/signIn";
import { useState, useEffect } from "react";
import { AxiosError } from "axios";
import InfoResult from "../components/InfoResult";
import { useDispatch } from "react-redux";
import { setData } from "../state/cart/cartSlice";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [info, setInfo] = useState<Boolean>(false);
  const [errMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let data = {};
  useEffect(() => {
    data = { email, password };
  }, [email, password]);

  const tryLogin = async () => {
    let res = await signIn(data);

    if (res instanceof AxiosError) {
      setInfo(true);
      setErrorMessage(res.response?.data.msg);
    } else {
      localStorage.setItem("token", res.data.token);
      sessionStorage.setItem("token", `${res.data.token}`);
      sessionStorage.setItem("firstName", `${res.data.firstName}`);
      sessionStorage.setItem("lastName", `${res.data.lastName}`);
      sessionStorage.setItem("role", `${res.data.role}`);
      dispatch(setData(res.data.cart));
      navigate("/home");
    }
  };

  return (
    <>
      <InfoResult
        message={errMessage}
        info={info}
        setInfo={(info) => setInfo(info)}
        form={"login"}
      />
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Text color={"blue.400"}>Forgot password?</Text>
                </Stack>
                <Button
                  onClick={() => tryLogin()}
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign in
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Not registered yet?{" "}
                  <Link
                    style={{ color: "blue", textDecoration: "underline" }}
                    to={"/register"}
                    color={"blue.400"}
                  >
                    Register
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default Login;
