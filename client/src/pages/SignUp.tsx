import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  // Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import signUp from "../hooks/signUp";
import SuccessResult from "../components/SuccessResult";
import InfoResult from "../components/InfoResult";
import { AxiosError } from "axios";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  const [firstName, setFirstName] = useState<String>();
  const [lastName, setLastName] = useState<String>();
  const [email, setEmail] = useState<String>();
  const [password, setPassword] = useState<String>();
  const [info, setInfo] = useState<Boolean>(false);
  const [success, setSuccess] = useState<Boolean>(false);
  const [errMessage, setErrorMessage] = useState<string>("");

  let data = {};
  useEffect(() => {
    data = { firstName, lastName, email, password };
  }, [firstName, lastName, email, password]);

  const trySignUp = async () => {
    let res = await signUp(data);
    console.log(res);
    if (!res.data.success) {
      setInfo(true);
      setErrorMessage(res.response.data.msg);
    } else {
      setSuccess(true);
    }
  };

  return (
    <>
      <SuccessResult success={success} />
      <InfoResult
        message={errMessage}
        info={info}
        setInfo={(info) => setInfo(info)}
        form={"register"}
      />
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              New User Registration
            </Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      onChange={(e) => setFirstName(e.target.value)}
                      type="text"
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName" isRequired>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      onChange={(e) => setLastName(e.target.value)}
                      type="text"
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  onClick={() => trySignUp()}
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign up
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default SignUp;
