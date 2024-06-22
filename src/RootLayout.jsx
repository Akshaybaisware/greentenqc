// RootLayout.jsx
import React from "react";
import { Flex, Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";


function RootLayout() {
  const role = localStorage.getItem("role");
  return (

<>
<Flex direction="column" height="100vh">
      {/* Navbar */}


      {/* Outlet */}
      <Flex flexGrow={1} position="relative" mt={"10%"}>
        <Box flexBasis="100%" overflowY="auto">
          <Outlet />
        </Box>
      </Flex>
    </Flex>
  </>
  );
}


export default RootLayout;


