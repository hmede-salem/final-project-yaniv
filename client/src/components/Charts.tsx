import { Box, HStack, Select, Spinner, Text } from "@chakra-ui/react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto";
import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import Customer from "../entities/Customer";
import generateRandomColors from "../services/generateColors";
import Product from "../entities/Product";
import useProducts from "../hooks/useProducts";
import useCustomers from "../hooks/useCustomers";

ChartJS.register(ArcElement, Tooltip, Legend);

interface IBarData {
  [key: string]: {
    count: number;
    name: string;
  };
}

const Charts = () => {
  const {
    data: products = [],
    error: pError,
    isLoading: pIsLoading,
  } = useProducts("", "all");
  const {
    data: customers = [],
    error: cError,
    isLoading: cIsLoading,
  } = useCustomers();

  const [selectedUser, setSelectedUser] = useState<Customer | null>(null);
  const [users, setUsers] = useState<Customer[]>([]);
  const [barData, setBarData] = useState<IBarData>();
  const [soldProducts, setSoldProducts] = useState<Product[]>([]);
  const [colors, setColors] = useState<string[]>([]);

  useEffect(() => {
    if (!cIsLoading && !pIsLoading && customers.length > 0) {
      const usersWithOrders = customers.filter(
        (user) => user.orders.length > 0
      );
      setSelectedUser(usersWithOrders[0]);
      setUsers(usersWithOrders);
      setSoldProducts(products.filter((p) => p.sold > 0));
    }
  }, [customers, products, cIsLoading, pIsLoading]);

  useEffect(() => {
    if (soldProducts.length > 0) {
      setColors(generateRandomColors(soldProducts.length));
    }
  }, [soldProducts]);

  useEffect(() => {
    if (selectedUser) {
      barCalculation();
    }
  }, [selectedUser]);

  const barCalculation = () => {
    let sum: IBarData = {};
    for (const order of selectedUser?.orders || []) {
      const product = products?.find((p) => p.id === order.productId.id);
      if (product) {
        if (!sum[product.id]) {
          sum[product.id] = {
            count: order.count,
            name: `${product.brand} ${product.type}`,
          };
        } else {
          sum[product.id].count += order.count;
        }
      }
    }
    setBarData(sum);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const currentUser = users.find((c) => c.email === e.target.value);
    setSelectedUser(currentUser || null);
  };

  if (pError) return <Text>{pError.message}</Text>;
  if (pIsLoading || cIsLoading) return <Spinner size={"xl"} />;
  if (cError) return <Text>{cError.message}</Text>;

  return (
    <HStack
      spacing={8}
      align="stretch"
      flexWrap={{ base: "wrap", md: "nowrap" }}
      justifyContent="space-around"
    >
      <Box
        flex="1"
        minW={{ base: "100%", md: "50%" }}
        p={4}
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Select value={selectedUser?.email} onChange={handleChange}>
          {users.map((user, index) => (
            <option key={index} value={user.email}>
              {user.firstName}
            </option>
          ))}
        </Select>
        {barData && (
          <Box flex="1" mt={4}>
            <Bar
              data={{
                labels: Object.entries(barData).map((data) => data[1].name),
                datasets: [
                  {
                    data: Object.entries(barData).map((data) => data[1].count),
                    label: "Product count",
                    borderWidth: 1,
                    borderRadius: 10,
                    hoverBorderColor: "black",
                    hoverBorderWidth: 3,
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
              }}
            />
          </Box>
        )}
      </Box>
      <Box
        flex="1"
        minW={{ base: "100%", md: "50%" }}
        p={4}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {soldProducts?.length > 0 && (
          <Pie
            data={{
              labels: soldProducts.map((p) => `${p.brand} ${p.type}`),
              datasets: [
                {
                  data: soldProducts.map((p) => p.sold),
                  label: "Total Sold Products",
                  backgroundColor: colors,
                  borderColor: "white",
                  borderWidth: 1,
                  borderRadius: 10,
                  hoverBorderColor: "black",
                  hoverBorderWidth: 3,
                  hoverOffset: 50,
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: true,
                  position: "bottom",
                },
              },
            }}
            style={{
              width: "80%",
              height: "80%",
            }}
          />
        )}
      </Box>
    </HStack>
  );
};

export default Charts;
