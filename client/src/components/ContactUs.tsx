import {
  Box,
  Heading,
  Text,
  IconButton,
  Button,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalBody,
  ModalContent,
  SimpleGrid,
  GridItem,
} from "@chakra-ui/react";
import {
  MdPhone,
  MdEmail,
  MdLocationOn,
  MdFacebook,
  MdOutlineEmail,
} from "react-icons/md";
import { BsGithub, BsPerson, BsInstagram } from "react-icons/bs";

const ContactUs = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button w={"100%"} _hover={{ bg: "gray.300" }} onClick={onOpen}>
        Contact Us
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size={"4xl"}>
        <ModalOverlay backdropFilter="blur(7px)" />
        <ModalContent margin={7} borderRadius="xl">
          <ModalBody padding={0}>
            <SimpleGrid
              bg={"telegram.400"}
              color="gray.700"
              borderRadius={"xl"}
              p={{ base: 7, md: 9, lg: 16, xl: 20 }}
              spacing={{ base: 10, sm: 20, md: 39, lg: 40 }}
              columns={{ base: 1, md: 2 }}
              justifyItems={"center"}
            >
              <GridItem>
                <Box>
                  <Heading>Contact</Heading>
                  <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.600">
                    Fill up the form below to contact
                  </Text>
                  <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                    <VStack pl={0} spacing={3} alignItems="flex-start">
                      <Button
                        size="md"
                        height="48px"
                        width="200px"
                        justifyContent={"flex-start"}
                        variant="ghost"
                        color="#DCE2FF"
                        _hover={{ border: "2px solid #1C6FEB" }}
                        leftIcon={<MdPhone color="#1970F1" size="20px" />}
                        onClick={() => window.location.href = `tel:+972549321997`}
                      >
                        +972-549321997
                      </Button>
                      <Button
                        size="md"
                        height="48px"
                        width="265px"
                        justifyContent={"flex-start"}
                        variant="ghost"
                        color="#DCE2FF"
                        _hover={{ border: "2px solid #1C6FEB" }}
                        leftIcon={<MdEmail color="#1970F1" size="20px" />}
                        onClick={() => window.location.href = `mailto:hmede3310@hotmail.com`}
                      >
                        hmede3310@hotmail.com
                      </Button>
                      <Button
                        size="md"
                        height="48px"
                        width="200px"
                        justifyContent={"flex-start"}
                        variant="ghost"
                        color="#DCE2FF"
                        _hover={{ border: "2px solid #1C6FEB" }}
                        leftIcon={<MdLocationOn color="#1970F1" size="20px" />}
                        onClick={() =>
                          window.open(
                            "https://maps.app.goo.gl/bPFFMJLZ1qxxhRMF6"
                          )
                        }
                      >
                        Haifa, Israel
                      </Button>
                    </VStack>
                  </Box>
                  <HStack
                    mt={{ lg: 10, md: 10 }}
                    spacing={4}
                    px={5}
                    alignItems="flex-start"
                  >
                    <IconButton
                      aria-label="facebook"
                      variant="ghost"
                      size="lg"
                      colorScheme={"facebook"}
                      isRound={true}
                      _hover={{ bg: "#0D74FF" }}
                      icon={<MdFacebook size="32px" />}
                    />
                    <IconButton
                      aria-label="github"
                      variant="ghost"
                      size="lg"
                      colorScheme={"github"}
                      isRound={true}
                      _hover={{ bg: "#0D74FF" }}
                      icon={<BsGithub size="28px" />}
                    />
                    <IconButton
                      aria-label="instagram"
                      variant="ghost"
                      size="lg"
                      colorScheme={"pink"}
                      isRound={true}
                      _hover={{ bg: "#0D74FF" }}
                      icon={<BsInstagram size="26px" />}
                    />
                  </HStack>
                </Box>
              </GridItem>
              <GridItem>
                <Box p={8} bg="white" borderRadius="lg" h={"100%"}>
                  <VStack spacing={5}>
                    <FormControl id="name">
                      <FormLabel>Your Name</FormLabel>
                      <InputGroup borderColor="#E0E1E7">
                        <InputLeftElement pointerEvents="none">
                          <BsPerson color="gray.800" />
                        </InputLeftElement>
                        <Input type="text" size="md" />
                      </InputGroup>
                    </FormControl>
                    <FormControl id="name">
                      <FormLabel>Email</FormLabel>
                      <InputGroup borderColor="#E0E1E7">
                        <InputLeftElement pointerEvents="none">
                          <MdOutlineEmail color="gray.800" />
                        </InputLeftElement>
                        <Input type="email" size="md" />
                      </InputGroup>
                    </FormControl>
                    <FormControl id="name">
                      <FormLabel>Message</FormLabel>
                      <Textarea
                        borderColor="gray.300"
                        _hover={{
                          borderColor: "gray.500",
                        }}
                        placeholder="message"
                      />
                    </FormControl>
                    <FormControl id="name" float="right">
                      <Button
                        variant="solid"
                        bg="#0D74FF"
                        color="white"
                        _hover={{}}
                      >
                        Send Message
                      </Button>
                    </FormControl>
                  </VStack>
                </Box>
              </GridItem>
            </SimpleGrid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ContactUs;
