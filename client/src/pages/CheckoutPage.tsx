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
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Select,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cart from "../components/Cart";
import addOrder from "../hooks/addOrder";
import { fetchCartData } from "../state/cart/cartSlice";
import { AppDispatch, RootState } from "../state/store";
import orderIcon from "../assets/shopping-bag.webp";

const Checkout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { cart } = useSelector((state: RootState) => state.cart);

  const [shipping, setShipping] = useState("1");
  const [payment, setPayment] = useState("1");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddOrder = async () => {
    const response = await addOrder();
    if (response.data.success) {
      dispatch(fetchCartData());
      onOpen();
    }
  };

  return (
    <>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        size="lg"
      >
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent>
          <ModalHeader textAlign="center" bg="blue.500" color="white">
            Order Confirmed!
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody>
            <VStack spacing={4} align="center">
              <Image src={orderIcon} alt="Order Confirmed" boxSize="100px" />
              <Text fontSize="2xl" fontWeight="bold">
                Thank You for Your Purchase!
              </Text>
              <Text textAlign="center" fontSize="lg">
                We appreciate your order and hope you enjoy your new items.
                <br />
                You'll receive an email confirmation shortly with your order
                details.
              </Text>
              <Text textAlign="center" fontSize="lg">
                If you have any questions, feel free to contact our support
                team.
              </Text>
            </VStack>
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Button colorScheme="blue" onClick={() => navigate("/home")}>
              Back to Home Page
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
        <Box p={8}>
          <VStack spacing={6}>
            <Heading mb={8} fontSize="2xl" alignSelf="flex-start">
              Shipping Information
            </Heading>
            <FormControl id="fullName">
              <FormLabel>Full name</FormLabel>
              <Input placeholder="Your first and last name" type="text" />
            </FormControl>
            <FormControl id="address">
              <FormLabel>Street address</FormLabel>
              <Input placeholder="123 Example Street" type="text" />
            </FormControl>
            <HStack width="100%">
              <Box width="30%">
                <FormControl id="zipCode">
                  <FormLabel>Zip Code</FormLabel>
                  <Input placeholder="Zip Code" type="number" />
                </FormControl>
              </Box>
              <Box width="70%">
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
            <Checkbox mt={8} alignSelf="flex-start">
              Billing address is same as shipping
            </Checkbox>
            <Box alignSelf="flex-start" width="100%">
              <Heading my={4} fontSize="2xl">
                Shipping Method
              </Heading>
              <RadioGroup width="100%" onChange={setShipping} value={shipping}>
                <Stack direction="row" spacing={40}>
                  <Radio value="1">
                    <Stack spacing={1}>
                      <Text fontWeight="medium">Standard $4.99</Text>
                      <Text>Dispatched in 6-8 days</Text>
                    </Stack>
                  </Radio>
                  <Radio value="2">
                    <Stack spacing={1}>
                      <Text fontWeight="bold">Express $14.99</Text>
                      <Text>Dispatched in 48 hours</Text>
                    </Stack>
                  </Radio>
                </Stack>
              </RadioGroup>
            </Box>
            <Box alignSelf="flex-start" width="100%">
              <Heading my={4} fontSize="2xl">
                Payment Information
              </Heading>
              <RadioGroup width="100%" onChange={setPayment} value={payment}>
                <Stack direction="row" spacing={40}>
                  <Radio value="1">
                    <Stack spacing={1}>
                      <Text fontSize={18} fontWeight="bold">
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
                      <Text fontSize={18} fontWeight="bold">
                        PayPal
                      </Text>
                      <Text>Pay with your PayPal account</Text>
                      <Image
                        boxSize={6}
                        src="https://www.svgrepo.com/show/349473/paypal.svg"
                      />
                    </Stack>
                  </Radio>
                </Stack>
              </RadioGroup>
              <HStack spacing={7} mt={10} width="100%">
                <Box width="50%">
                  <FormControl id="cardNumber">
                    <FormLabel>Credit card number</FormLabel>
                    <Input placeholder="xxxx xxxx xxxx xxxx" type="number" />
                  </FormControl>
                </Box>
                <Box width="50%">
                  <FormControl id="cardName">
                    <FormLabel>Name on card</FormLabel>
                    <Input placeholder="Card name" type="text" />
                  </FormControl>
                </Box>
              </HStack>
              <HStack spacing={7} mt={8} width="100%">
                <Box width="50%">
                  <FormControl id="expiryDate">
                    <FormLabel>Expiry date</FormLabel>
                    <Stack direction="row" spacing={3}>
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
                        <option value="2030">2030</option>
                      </Select>
                    </Stack>
                  </FormControl>
                </Box>
                <Box width="50%">
                  <FormControl id="cvv">
                    <FormLabel>CVV</FormLabel>
                    <Input placeholder="CVV" type="number" />
                  </FormControl>
                </Box>
              </HStack>
            </Box>
          </VStack>
        </Box>
        <Box transform="scale(0.8)" alignSelf="flex-start">
          <Cart cart={cart} />
          <Button onClick={handleAddOrder} colorScheme="blue" mt={4}>
            Buy
          </Button>
        </Box>
      </SimpleGrid>
    </>
  );
};

export default Checkout;
