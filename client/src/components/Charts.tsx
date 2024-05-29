import { HStack, Select, Spinner, Text } from "@chakra-ui/react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto";
import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import Customer from "../entities/Customer";
import Order from "../entities/Order";
import generateRandomColors from "../services/generateColors";
import Product from "../entities/Product";
import useProducts from "../hooks/useProducts";
import useCustomers from "../hooks/useCustomers";
import { produceWithPatches } from "immer";

ChartJS.register(ArcElement, Tooltip, Legend);

const Charts = () => {
  const {
    data: products,
    error: pError,
    isLoading: pIsLoading,
  } = useProducts("", "all");
  const {
    data: customers,
    error: cError,
    isLoading: cIsLoading,
  } = useCustomers();

  if (pError) return <Text>{pError.message}</Text>;
  if (pIsLoading) return <Spinner size={"xl"} />;
  if (cError) return <Text>{cError.message}</Text>;
  if (cIsLoading) return <Spinner size={"xl"} />;
  interface IBarData {
    [key: string]: {
      count: number;
      name: string;
    };
  }
  const [selectedUser, setSelectedUser] = useState<Customer | null>(null);
  const [users, setUsers] = useState<Customer[]>([]);
  const [barData, setBarData] = useState<IBarData>();
  const [soldProducts, setSoldProducts] = useState<Product[]>();
  const [colors, setColors] = useState<string[]>();

  const barCalculation = (): void => {
    let sum: IBarData = {};
    for (const product of selectedUser?.orders as Order[]) {
      if (!sum[product.productId.id as keyof IBarData]) {
        sum[product.productId.id as keyof IBarData] = {
          count: product.count,
          name: `${product.productId.brand} ${product.productId.type}`,
        };
      } else {
        sum[product.productId.id as keyof IBarData].count += product.count;
      }
    }
    setBarData(sum);
  };

  useEffect(() => {
    if (soldProducts) {
      setColors(generateRandomColors(soldProducts.length));
    }
  }, [soldProducts]);

  useEffect(() => {
    if (selectedUser === null) {
      const usersWithOrders = customers.filter(
        (user) => user.orders.length > 0
      );
      setSelectedUser(usersWithOrders[1]);
      setUsers(usersWithOrders);
      setSoldProducts(products.filter((p) => p.sold > 0));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const current = users.find((c) => c.email === e.target.value);
    setSelectedUser(current!);
  };

  useEffect(() => {
    if (selectedUser !== null) barCalculation();
  }, [selectedUser]);

  return (
    <HStack
      style={{
        height: "80vh",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          flex: 0.5,
          height: "100%",
          display: "flex",
          justifyContent: "space-evenly",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <Select value={selectedUser?.email} onChange={handleChange}>
          {users.map((user, index) => (
            <option key={index} value={user.email}>
              {user.firstName}
            </option>
          ))}
        </Select>
        {barData && (
          <Bar
            style={{ height: "70%" }}
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
          />
        )}
      </div>
      <div
        style={{
          height: "100%",
          flex: 0.5,
          display: "flex",
          justifyContent: "center",
        }}
      >
        {soldProducts && (
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
          />
        )}
      </div>
    </HStack>
  );
};

export default Charts;
