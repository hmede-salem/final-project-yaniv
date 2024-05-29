import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  Radio,
  RadioGroup,
  Select,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Cart from "../components/Cart";
import addOrder from "../hooks/addOrder";
import { RootState } from "../state/store";

const Checkout = () => {
  const { cart } = useSelector((state: RootState) => state.cart);

  const [shipping, setShipping] = useState("1");
  const [payment, setPayment] = useState("1");
  return (
    <SimpleGrid
      columns={{ base: 1, md: 2 }}
      templateColumns={{ base: "1fr", md: "0.6fr 0.4fr" }}
      spacing={5}
    >
      <Box padding={8}>
        <VStack>
          <Heading marginBottom={"8"} fontSize={"2xl"} alignSelf={"flex-start"}>
            Shipping Information
          </Heading>

          <FormControl id="fullName">
            <FormLabel>Full name</FormLabel>
            <Input placeholder="Your first and last name" type="text" />
          </FormControl>
          <FormControl id="adress">
            <FormLabel>Street address</FormLabel>
            <Input placeholder="123 Example Street" type="text" />
          </FormControl>
          <HStack width={"100%"}>
            <Box width={"30%"}>
              <FormControl id="zipCode">
                <FormLabel>Zip Code</FormLabel>
                <Input placeholder="Zip Code" type="number" />
              </FormControl>
            </Box>
            <Box width={"70%"}>
              <FormControl id="city">
                <FormLabel>City</FormLabel>
                <Input placeholder="City" type="text" />
              </FormControl>
            </Box>
          </HStack>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input placeholder="you@example.com" type="email" />
          </FormControl>
          <Checkbox marginTop={8} alignSelf={"flex-start"}>
            Billing address is same as shipping
          </Checkbox>
          <Box alignSelf={"flex-start"}>
            <Heading margin={10} fontSize={"2xl"} alignSelf={"flex-start"}>
              Shipping Method
            </Heading>
            <RadioGroup width={"100%"} onChange={setShipping} value={shipping}>
              <Stack direction="row" spacing={40}>
                <Radio value="1">
                  <Stack spacing={1}>
                    <Text fontWeight={"medium"}>Standart $4.99</Text>
                    <Text>Dispatched in 6-8 days</Text>
                  </Stack>
                </Radio>
                <Radio value="2">
                  <Stack spacing={1}>
                    <Text fontWeight={"bold"}>Express $14.99</Text>
                    <Text>Dispatched in 48 hours</Text>
                  </Stack>
                </Radio>
              </Stack>
            </RadioGroup>
          </Box>
          <Box alignSelf={"flex-start"}>
            <Heading margin={10} fontSize={"2xl"} alignSelf={"flex-start"}>
              Payment Information
            </Heading>
            <RadioGroup width={"100%"} onChange={setPayment} value={payment}>
              <Stack direction="row" spacing={40}>
                <Radio value="1">
                  <Stack spacing={1}>
                    <Text fontSize={18} fontWeight={"bold"}>
                      Credit Card
                    </Text>
                    <Text>Pay with credit card via Stripe</Text>
                    <HStack>
                      <Image
                        boxSize={8}
                        src="https://www.svgrepo.com/show/328104/visa.svg"
                      />
                      <Image
                        boxSize={8}
                        src="https://www.svgrepo.com/show/508701/mastercard-full.svg"
                      />
                      <Image
                        boxSize={8}
                        src="https://www.svgrepo.com/show/452222/google-pay.svg"
                      />
                    </HStack>
                  </Stack>
                </Radio>
                <Radio value="2">
                  <Stack spacing={1}>
                    <Text fontSize={18} fontWeight={"bold"}>
                      PayPal
                    </Text>
                    <Text>Pay with your PayPal acoount</Text>
                    <Image
                      boxSize={6}
                      src="https://www.svgrepo.com/show/349473/paypal.svg"
                    />
                  </Stack>
                </Radio>
              </Stack>
            </RadioGroup>
            <HStack spacing={7} marginTop={10} width={"100%"}>
              <Box width={"50%"}>
                <FormControl id="carNumber">
                  <FormLabel>Credit card number</FormLabel>
                  <Input placeholder="xxxx xxxx xxxx xxxx" type="number" />
                </FormControl>
              </Box>
              <Box width={"50%"}>
                <FormControl id="cardName">
                  <FormLabel>Name on card</FormLabel>
                  <Input placeholder="Card name" type="text" />
                </FormControl>
              </Box>
            </HStack>
            <HStack spacing={7} marginTop={8} width={"100%"}>
              <Box width={"50%"}>
                <FormControl id="expiryDate">
                  <FormLabel>Expiry date</FormLabel>
                  <Stack direction={"row"} spacing={3}>
                    <Select defaultValue={1} size="md">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                    </Select>
                    <Select defaultValue={2023} size="md">
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                      <option value="2028">2028</option>
                      <option value="2029">2029</option>
                      <option value="2023">2030</option>
                    </Select>
                  </Stack>
                </FormControl>
              </Box>
              <Box width={"50%"}>
                <FormControl id="cvv">
                  <FormLabel>CVV</FormLabel>
                  <Input placeholder="CVV" type="number" />
                </FormControl>
              </Box>
            </HStack>
          </Box>
        </VStack>
      </Box>
      <Box transform={"scale(0.8)"} alignSelf={"flex-start"}>
        <Cart cart={cart} />
        <Button onClick={() => addOrder()} colorScheme="blue">
          Buy
        </Button>
      </Box>
    </SimpleGrid>
  );
};

export default Checkout;
