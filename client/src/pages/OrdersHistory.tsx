import {
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Divider,
  useColorMode,
  Box,
  Center,
} from "@chakra-ui/react";
import React from "react";
import Order from "../entities/Order";
import useOrders from "../hooks/useOrders";

const OrdersHistory = () => {
  const { data: orders, error, isLoading } = useOrders();
  const { colorMode } = useColorMode();

  if (error) return <Text>{error.message}</Text>;
  if (isLoading) return <Spinner />;

  const groupOrdersById = (orders: Order[]): Order[][] => {
    const groupedOrders: { [key: string]: Order[] } = {};

    orders.forEach((order) => {
      if (!groupedOrders[order.id]) {
        groupedOrders[order.id] = [];
      }
      groupedOrders[order.id].push(order);
    });

    return Object.values(groupedOrders);
  };

  const calculatePrice = (price: number, discount: number): number => {
    const calculatedPrice = price - price * (discount / 100);
    return calculatedPrice;
  };

  const groupedOrders = groupOrdersById(orders);

  if (groupedOrders.length === 0)
  return (
    <Center height="80vh">
      <Box textAlign="center">
        <Text fontSize="3xl" fontWeight="bold" color="teal.500">
          No Orders Yet
        </Text>
        <Text fontSize="lg" color="gray.500">
          It looks like you haven't placed any orders yet.
        </Text>
        <Text fontSize="lg" color="gray.500">
          Start shopping to see your orders here!
        </Text>
      </Box>
    </Center>
  );

  return (
    <TableContainer>
      <Table
        variant="unstyled"
        colorScheme={colorMode === "dark" ? "gray" : "green"}
        size="md"
        border="1px"
        borderColor={colorMode === "dark" ? "gray.700" : "green.500"}
        boxShadow="md"
      >
        <TableCaption placement="top" fontSize="xl" fontWeight="bold">
          Orders History
        </TableCaption>
        <Thead bg={colorMode === "dark" ? "gray.700" : "teal.500"}>
          <Tr>
            <Th color={colorMode === "dark" ? "white" : "gray.800"}>
              Order Number
            </Th>
            <Th color={colorMode === "dark" ? "white" : "gray.800"}>
              Product Title
            </Th>
            <Th color={colorMode === "dark" ? "white" : "gray.800"}>Qty</Th>
            <Th color={colorMode === "dark" ? "white" : "gray.800"}>Total</Th>
            <Th color={colorMode === "dark" ? "white" : "gray.800"}>Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {groupedOrders.map((orderGroup, index) => (
            <React.Fragment key={index}>
              {orderGroup.map((order, subIndex) => (
                <React.Fragment key={subIndex}>
                  <Tr>
                    {subIndex === 0 && (
                      <>
                        <Td
                          rowSpan={orderGroup.length}
                          bg={colorMode === "dark" ? "gray.600" : "gray.50"}
                          fontWeight="bold"
                          color={colorMode === "dark" ? "white" : "gray.800"}
                        >
                          {index + 1}
                        </Td>
                        <Td
                          rowSpan={orderGroup.length}
                          colSpan={1}
                          bg={colorMode === "dark" ? "gray.600" : "gray.50"}
                        >
                          <Table variant="unstyled" size="sm">
                            <Tbody>
                              {orderGroup.map((o, i) => (
                                <React.Fragment key={i}>
                                  <Tr>
                                    <Td
                                      borderBottom="1px"
                                      borderColor={
                                        colorMode === "dark"
                                          ? "gray.700"
                                          : "gray.300"
                                      }
                                      color={
                                        colorMode === "dark"
                                          ? "white"
                                          : "gray.800"
                                      }
                                    >
                                      {`${o.productId.brand} ${o.productId.type}`}
                                    </Td>
                                  </Tr>
                                  {i < orderGroup.length - 1 && (
                                    <Tr>
                                      <Td>
                                        <Divider />
                                      </Td>
                                    </Tr>
                                  )}
                                </React.Fragment>
                              ))}
                            </Tbody>
                          </Table>
                        </Td>
                        <Td
                          rowSpan={orderGroup.length}
                          colSpan={1}
                          bg={colorMode === "dark" ? "gray.600" : "gray.50"}
                        >
                          <Table variant="unstyled" size="sm">
                            <Tbody>
                              {orderGroup.map((o, i) => (
                                <React.Fragment key={i}>
                                  <Tr>
                                    <Td
                                      borderBottom="1px"
                                      borderColor={
                                        colorMode === "dark"
                                          ? "gray.700"
                                          : "gray.300"
                                      }
                                      color={
                                        colorMode === "dark"
                                          ? "white"
                                          : "gray.800"
                                      }
                                    >
                                      {o.count}
                                    </Td>
                                  </Tr>
                                  {i < orderGroup.length - 1 && (
                                    <Tr>
                                      <Td>
                                        <Divider />
                                      </Td>
                                    </Tr>
                                  )}
                                </React.Fragment>
                              ))}
                            </Tbody>
                          </Table>
                        </Td>
                        <Td
                          rowSpan={orderGroup.length}
                          colSpan={1}
                          bg={colorMode === "dark" ? "gray.600" : "gray.50"}
                        >
                          <Table variant="unstyled" size="sm">
                            <Tbody>
                              {orderGroup.map((o, i) => (
                                <React.Fragment key={i}>
                                  <Tr>
                                    <Td
                                      borderBottom="1px"
                                      borderColor={
                                        colorMode === "dark"
                                          ? "gray.700"
                                          : "gray.300"
                                      }
                                      color={
                                        colorMode === "dark"
                                          ? "white"
                                          : "gray.800"
                                      }
                                    >
                                      {o.count *
                                        calculatePrice(
                                          o.productId.price,
                                          o.productId.discountPercentage
                                        )}
                                    </Td>
                                  </Tr>
                                  {i < orderGroup.length - 1 && (
                                    <Tr>
                                      <Td>
                                        <Divider />
                                      </Td>
                                    </Tr>
                                  )}
                                </React.Fragment>
                              ))}
                            </Tbody>
                          </Table>
                        </Td>
                        <Td
                          rowSpan={orderGroup.length}
                          bg={colorMode === "dark" ? "gray.600" : "gray.50"}
                          color={colorMode === "dark" ? "white" : "gray.800"}
                        >
                          {order.orderDate}
                        </Td>
                      </>
                    )}
                  </Tr>
                </React.Fragment>
              ))}
              <Tr>
                <Td colSpan={5}>
                  <Divider
                    borderColor={colorMode === "dark" ? "gray.700" : "gray.500"}
                  />
                </Td>
              </Tr>
            </React.Fragment>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default OrdersHistory;
