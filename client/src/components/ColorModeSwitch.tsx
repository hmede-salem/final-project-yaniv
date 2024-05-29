import { Switch, Text, useColorMode, VStack } from "@chakra-ui/react";

const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <VStack>
      <Switch
        size={"md"}
        colorScheme="green"
        isChecked={colorMode === "dark"}
        onChange={toggleColorMode}
      />
      <Text fontSize="xs" whiteSpace="nowrap">
        Dark Mode
      </Text>
    </VStack>
  );
};

export default ColorModeSwitch;
