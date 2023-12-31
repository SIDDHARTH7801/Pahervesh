// import {
//   Table,
//   Thead,
//   Tbody,
//   Tr,
//   Th,
//   Td,
//   TableContainer,
// } from "@chakra-ui/react";

// import React, { useState, useEffect } from "react";
// import axios from "axios";



// const Order = () => {
//   const [total, setTotal] = useState(0);

//   const [data, setData] = React.useState([]);


//   React.useEffect(() => {
//     getCartData();
//   }, []);

//   const getCartData = async (params) => {
  
//     let res = await axios("/cart/getcart");
    
//     const d = await res.data;
   
//   };

//   return (
//     <div>
//       <h1
//         style={{
//           textAlign: "center",
//           marginTop: "10px",
//           fontSize: "20px",
//           fontWeight: "bold",
//         }}
//       >
//         Recent Orders
//       </h1>
//       <TableContainer>
//         <Table variant="simple">
//           <Thead>
//             <Tr>
//               <Th>Id</Th>
//               <Th>Order ID</Th>
//               <Th>Title</Th>
//               <Th isNumeric>Total Products</Th>
//             </Tr>
//           </Thead>
//           <Tbody>
//             {data?.map((items) => {
//               return (
//                 <Tr>
//                   <Td fontFamily="'Philosopher', sans-serif;">{items.id}</Td>
//                   <Td>{items.orderId}</Td>

//                   {items.products.map((e) => (
//                     <Tr>
//                       <Th>Products</Th>
//                       <Td>{e.title}</Td>
//                       <Th>Price</Th>
//                       <Td>₹{e.price}</Td>
//                       <Th>Status</Th>
//                       <Td style={{ borderRadius: "20px", background: "green" }}>
//                         {e.status}
//                       </Td>
//                     </Tr>
//                   ))}
//                   <Td>{items.products.length}</Td>
//                 </Tr>
//               );
//             })}
//           </Tbody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// };

// export default Order;


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
                        borderRadius: "20px",
                        background: product.status === "Shipped" ? "green" : "red",
                        color: "white",
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
