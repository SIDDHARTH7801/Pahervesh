import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Order = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getOrdersData();
  }, []);

  const getOrdersData = async () => {
    try {
      const res = await axios("/order/getallorders");
      const ordersData = res.data.orders;

      setData(ordersData);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <Box p={8} textAlign="center">
      <h1 fontSize="2xl" fontWeight="bold" mb={6}>
        Recent Orders
      </h1>
      <TableContainer borderRadius="md" overflow="hidden">
        <Table variant="simple" size="lg">
          <Thead>
            <Tr bg="gray.100">
              <Th>Order ID</Th>
              <Th>Title</Th>
              <Th>Status</Th>
              <Th isNumeric>Total Products</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((order) => (
              <Tr key={order._id} _odd={{ bg: "gray.50" }}>
                <Td>{order._id}</Td>
                <Td>{order.user}</Td>

                {order.items.map((product) => (
                  <Tr key={product.productID}>
                    <Th>Product</Th>
                    <Td>{product.title}</Td>
                    <Th>Status</Th>
                    <Td
                      style={{
                        borderRadius: "`10px",
                        background: product.status === "Shipped" ? "green" : "red",
                        color: "white",
                        fontSize: "sm",
                      }}
                    >
                      {product.status}
                    </Td>
                  </Tr>
                ))}
                <Td>{order.items.length}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Order;
