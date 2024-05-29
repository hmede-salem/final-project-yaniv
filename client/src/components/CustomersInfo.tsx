import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Box,
  Spinner,
  Text,
} from "@chakra-ui/react";
import Customer from "../entities/Customer";
import useCustomers from "../hooks/useCustomers";

const CustomersInfo = () => {
  const { data: customers, error, isLoading } = useCustomers();

  if (error) return <Text>{error.message}</Text>;
  if (isLoading) return <Spinner size={"xl"} />;

  return (
    <TableContainer>
      <Table colorScheme={"blackAlpha"} variant="simple">
        <Thead>
          <Tr>
            <Th>Full Name</Th>
            <Th>Joined At</Th>
            <Th isNumeric>Products Bought</Th>
          </Tr>
        </Thead>
        <Tbody>
          {customers.map((customer: Customer, index) => (
            <Tr key={index}>
              <Td>{`${customer.firstName} ${customer.lastName}`}</Td>
              <Td>{customer.creationDate}</Td>
              <Td>
                {customer.orders.length > 0 ? (
                  <Box maxH="160px" overflowY="auto">
                    <Table variant="striped" size={"sm"}>
                      <Thead>
                        <Tr>
                          <Th>Product</Th>
                          <Th>Qty</Th>
                          <Th>Date</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {customer.orders.map((order, index) => (
                          <Tr key={index}>
                            <Td>{order.productId.title}</Td>
                            <Td>{order.count}</Td>
                            <Td>{order.orderDate}</Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </Box>
                ) : (
                  `The customer has not ordered yet.`
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default CustomersInfo;
